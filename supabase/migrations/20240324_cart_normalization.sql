
-- 1. Create the 'carts' table to link users to sessions
CREATE TABLE IF NOT EXISTS public.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Drop the old cart_items and recreate it with the new schema
DROP TABLE IF EXISTS public.cart_items CASCADE;

CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(cart_id, product_id)
);

-- 3. Enable RLS
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Users can only view/edit their own cart"
ON public.carts FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only view/edit items in their own cart"
ON public.cart_items FOR ALL
TO authenticated
USING (
    cart_id IN (SELECT id FROM public.carts WHERE user_id = auth.uid())
)
WITH CHECK (
    cart_id IN (SELECT id FROM public.carts WHERE user_id = auth.uid())
);

-- 5. Helper function to get or create a cart for the current user
CREATE OR REPLACE FUNCTION get_or_create_cart()
RETURNS UUID AS $$
DECLARE
    v_cart_id UUID;
BEGIN
    INSERT INTO public.carts (user_id)
    VALUES (auth.uid())
    ON CONFLICT (user_id) DO UPDATE SET updated_at = now()
    RETURNING id INTO v_cart_id;
    
    RETURN v_cart_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Updated RPC: add_to_cart
CREATE OR REPLACE FUNCTION add_to_cart(p_product_id UUID, p_quantity INT DEFAULT 1)
RETURNS void AS $$
DECLARE
    v_cart_id UUID;
    v_stock INT;
    v_is_active BOOLEAN;
BEGIN
    -- Check product availability
    SELECT stock_quantity, is_active INTO v_stock, v_is_active
    FROM public.products
    WHERE id = p_product_id;

    IF v_stock IS NULL OR NOT v_is_active THEN
        RAISE EXCEPTION 'Product is unavailable' USING ERRCODE = 'P0001';
    END IF;

    -- Get/Create user cart
    v_cart_id := get_or_create_cart();

    -- Upsert item
    INSERT INTO public.cart_items (cart_id, product_id, quantity)
    VALUES (v_cart_id, p_product_id, p_quantity)
    ON CONFLICT (cart_id, product_id)
    DO UPDATE SET 
        quantity = public.cart_items.quantity + EXCLUDED.quantity;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Updated RPC: update_cart_quantity
CREATE OR REPLACE FUNCTION update_cart_quantity(p_cart_item_id UUID, p_quantity INT)
RETURNS void AS $$
DECLARE
    v_product_id UUID;
    v_stock INT;
    v_cart_id UUID;
BEGIN
    -- Security check: item must belong to user's cart
    SELECT ci.product_id, ci.cart_id INTO v_product_id, v_cart_id
    FROM public.cart_items ci
    JOIN public.carts c ON ci.cart_id = c.id
    WHERE ci.id = p_cart_item_id AND c.user_id = auth.uid();

    IF v_cart_id IS NULL THEN
        RAISE EXCEPTION 'Item not found in your cart' USING ERRCODE = 'P0002';
    END IF;

    IF p_quantity <= 0 THEN
        DELETE FROM public.cart_items WHERE id = p_cart_item_id;
        RETURN;
    END IF;

    -- Stock check
    SELECT stock_quantity INTO v_stock FROM public.products WHERE id = v_product_id;
    IF v_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock' USING ERRCODE = '40001';
    END IF;

    UPDATE public.cart_items SET quantity = p_quantity WHERE id = p_cart_item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Updated RPC: clear_cart
CREATE OR REPLACE FUNCTION clear_cart()
RETURNS void AS $$
BEGIN
    DELETE FROM public.cart_items 
    WHERE cart_id IN (SELECT id FROM public.carts WHERE user_id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Updated RPC: get_cart_total
CREATE OR REPLACE FUNCTION get_cart_total()
RETURNS TABLE (
    subtotal DECIMAL(12, 2),
    tax DECIMAL(12, 2),
    shipping DECIMAL(12, 2),
    total DECIMAL(12, 2)
) AS $$
DECLARE
    v_subtotal DECIMAL(12, 2);
    v_tax_rate CONSTANT DECIMAL := 0.08;
    v_shipping_flat CONSTANT DECIMAL := 10.00;
BEGIN
    SELECT COALESCE(SUM(p.price * ci.quantity), 0)
    INTO v_subtotal
    FROM public.cart_items ci
    JOIN public.products p ON ci.product_id = p.id
    JOIN public.carts c ON ci.cart_id = c.id
    WHERE c.user_id = auth.uid();

    subtotal := v_subtotal;
    tax := ROUND(v_subtotal * v_tax_rate, 2);
    shipping := CASE WHEN v_subtotal > 0 THEN v_shipping_flat ELSE 0 END;
    total := subtotal + tax + shipping;

    RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Updated RPC: sync_guest_cart
CREATE OR REPLACE FUNCTION sync_guest_cart(guest_items JSONB)
RETURNS void AS $$
DECLARE
    item RECORD;
    v_cart_id UUID;
BEGIN
    v_cart_id := get_or_create_cart();

    FOR item IN SELECT * FROM jsonb_to_recordset(guest_items) AS x(product_id UUID, quantity INT)
    LOOP
        INSERT INTO public.cart_items (cart_id, product_id, quantity)
        VALUES (v_cart_id, item.product_id, item.quantity)
        ON CONFLICT (cart_id, product_id)
        DO UPDATE SET quantity = public.cart_items.quantity + EXCLUDED.quantity;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Updated RPC: place_order (to reflect carts table)
CREATE OR REPLACE FUNCTION place_order()
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_new_order_id UUID;
    v_total DECIMAL(12, 2);
    v_user_id UUID := auth.uid();
    v_cart_id UUID;
BEGIN
    SELECT id INTO v_cart_id FROM public.carts WHERE user_id = v_user_id;
    SELECT total INTO v_total FROM get_cart_total();

    IF v_cart_id IS NULL OR v_total = 0 THEN
        RAISE EXCEPTION 'Cart is empty' USING ERRCODE = 'P0003';
    END IF;

    -- Create Order
    INSERT INTO public.orders (user_id, total_amount, status)
    VALUES (v_user_id, v_total, 'processing')
    RETURNING id INTO v_new_order_id;

    -- Copy to Order Items
    INSERT INTO public.order_items (order_id, product_id, quantity, price)
    SELECT v_new_order_id, ci.product_id, ci.quantity, p.price
    FROM public.cart_items ci
    JOIN public.products p ON p.id = ci.product_id
    WHERE ci.cart_id = v_cart_id;

    -- Stock Update
    UPDATE public.products p
    SET stock_quantity = p.stock_quantity - ci.quantity
    FROM public.cart_items ci
    WHERE ci.product_id = p.id AND ci.cart_id = v_cart_id;

    -- Clear Cart
    DELETE FROM public.cart_items WHERE cart_id = v_cart_id;

    RETURN v_new_order_id;
END;
$$;

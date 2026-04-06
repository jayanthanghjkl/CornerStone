
-- 1. Create Orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    total_amount DECIMAL(12, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Order Items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own order items" 
ON public.order_items FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE id = order_items.order_id AND user_id = auth.uid()
    )
);

-- 5. RPC: place_order
-- This function handles the atomic transition from cart to order
CREATE OR REPLACE FUNCTION place_order()
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_new_order_id UUID;
    v_total DECIMAL(12, 2);
    v_user_id UUID := auth.uid();
BEGIN
    -- 1. Check if cart is empty and calculate total
    SELECT total INTO v_total FROM get_cart_total();

    IF v_total IS NULL OR v_total = 0 THEN
        RAISE EXCEPTION 'Cart is empty' USING ERRCODE = 'P0003';
    END IF;

    -- 2. Verify stock for all items before proceeding
    IF EXISTS (
        SELECT 1 
        FROM public.cart_items c
        JOIN public.products p ON c.product_id = p.id
        WHERE c.user_id = v_user_id AND p.stock_quantity < c.quantity
    ) THEN
        RAISE EXCEPTION 'One or more items are out of stock' USING ERRCODE = '40001';
    END IF;

    -- 3. Create Order record
    INSERT INTO public.orders (user_id, total_amount, status)
    VALUES (v_user_id, v_total, 'processing')
    RETURNING id INTO v_new_order_id;

    -- 4. Copy cart items to order items
    INSERT INTO public.order_items (order_id, product_id, quantity, price)
    SELECT v_new_order_id, c.product_id, c.quantity, p.price
    FROM public.cart_items c
    JOIN public.products p ON p.id = c.product_id
    WHERE c.user_id = v_user_id;

    -- 5. Deduct stock from products
    UPDATE public.products p
    SET stock_quantity = p.stock_quantity - c.quantity
    FROM public.cart_items c
    WHERE c.product_id = p.id AND c.user_id = v_user_id;

    -- 6. Clear the user's cart
    DELETE FROM public.cart_items WHERE user_id = v_user_id;

    RETURN v_new_order_id;
END;
$$;

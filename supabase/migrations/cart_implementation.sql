
-- 1. Update products table
ALTER TABLE public.products RENAME COLUMN stock TO stock_quantity;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.products ADD CONSTRAINT products_stock_quantity_check CHECK (stock_quantity >= 0);

-- 2. Update cart_items table
ALTER TABLE public.cart_items ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
-- Add constraint for quantity > 0
ALTER TABLE public.cart_items ADD CONSTRAINT cart_items_quantity_check CHECK (quantity > 0);

-- 3. Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cart_items_updated_at
    BEFORE UPDATE ON public.cart_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Trigger to delete row if quantity hits 0 (must be BEFORE UPDATE to bypass CHECK constraint if we want to allow 0 to trigger deletion)
-- Actually, if we want to allow 0 to trigger deletion, we need to handle it before the check.
-- But CHECK constraints are checked after triggers.
-- Alternatively, we can make the RPC handle 0 by deleting.
-- The requirement says: "Add a DB constraint: CHECK (quantity > 0). If quantity hits 0 via an update, the row should be automatically deleted via a Database Trigger."
-- To make this work, the trigger must DELETE and then RETURN NULL.

CREATE OR REPLACE FUNCTION delete_cart_item_on_zero()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity <= 0 THEN
        DELETE FROM public.cart_items WHERE id = OLD.id;
        RETURN NULL; -- Cancel the update
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_delete_cart_item_on_zero
    BEFORE UPDATE ON public.cart_items
    FOR EACH ROW
    EXECUTE FUNCTION delete_cart_item_on_zero();

-- 5. RPC: addToCart
CREATE OR REPLACE FUNCTION add_to_cart(p_product_id UUID, p_quantity INT DEFAULT 1)
RETURNS void AS $$
DECLARE
    v_stock INT;
    v_is_active BOOLEAN;
    v_existing_quantity INT;
    v_total INT;
BEGIN
    -- Check stock and is_active
    SELECT stock_quantity, is_active INTO v_stock, v_is_active
    FROM public.products
    WHERE id = p_product_id;

    IF NOT v_is_active THEN
        RAISE EXCEPTION 'Product is currently unavailable' USING ERRCODE = 'P0001';
    END IF;

    -- Check existing cart quantity for this user/product
    SELECT COALESCE((SELECT quantity FROM public.cart_items WHERE user_id = auth.uid() AND product_id = p_product_id), 0) INTO v_existing_quantity;

    -- Validate total quantity (existing + new) against stock
    v_total := v_existing_quantity + p_quantity;
    IF v_stock < v_total THEN
        RAISE EXCEPTION 'Insufficient stock' USING ERRCODE = '40001';
    END IF;

    -- Insert or update
    INSERT INTO public.cart_items (user_id, product_id, quantity)
    VALUES (auth.uid(), p_product_id, p_quantity)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET 
        quantity = public.cart_items.quantity + EXCLUDED.quantity,
        updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. RPC: updateCartQuantity
CREATE OR REPLACE FUNCTION update_cart_quantity(p_cart_item_id UUID, p_quantity INT)
RETURNS void AS $$
DECLARE
    v_product_id UUID;
    v_stock INT;
BEGIN
    IF p_quantity <= 0 THEN
        DELETE FROM public.cart_items WHERE id = p_cart_item_id AND user_id = auth.uid();
        -- Verify the cart item was actually deleted (existed and belonged to user)
        SELECT product_id INTO v_product_id FROM public.cart_items WHERE id = p_cart_item_id AND user_id = auth.uid();
        IF v_product_id IS NOT NULL THEN
            RAISE NOTICE 'Cart item was not fully deleted';
        END IF;
        RETURN;
    END IF;

    -- First verify the cart item exists and belongs to the user
    SELECT product_id INTO v_product_id FROM public.cart_items WHERE id = p_cart_item_id AND user_id = auth.uid();
    
    IF v_product_id IS NULL THEN
        RAISE EXCEPTION 'Cart item not found or does not belong to user' USING ERRCODE = 'P0002';
    END IF;
    
    SELECT stock_quantity INTO v_stock FROM public.products WHERE id = v_product_id FOR SHARE;

    IF v_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock' USING ERRCODE = '40001';
    END IF;

    UPDATE public.cart_items
    SET quantity = p_quantity
    WHERE id = p_cart_item_id AND user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. RPC: clearCart
CREATE OR REPLACE FUNCTION clear_cart()
RETURNS void AS $$
BEGIN
    DELETE FROM public.cart_items WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. RPC: syncGuestCart
-- guest_items should be an array of {product_id, quantity}
CREATE OR REPLACE FUNCTION sync_guest_cart(guest_items JSONB)
RETURNS void AS $$
DECLARE
    item RECORD;
    v_stock INT;
    v_is_active BOOLEAN;
    v_existing_quantity INT;
    v_final_quantity INT;
BEGIN
    FOR item IN SELECT * FROM jsonb_to_recordset(guest_items) AS x(product_id UUID, quantity INT)
    LOOP
        -- Validate product exists and is active with available stock
        SELECT stock_quantity, is_active INTO v_stock, v_is_active
        FROM public.products
        WHERE id = item.product_id;
        
        -- Skip items where product doesn't exist, is inactive, or has no stock
        IF v_stock IS NULL OR NOT v_is_active OR v_stock <= 0 THEN
            CONTINUE;
        END IF;
        
        -- Get existing cart quantity for this user/product
        SELECT COALESCE(quantity, 0) INTO v_existing_quantity
        FROM public.cart_items
        WHERE user_id = auth.uid() AND product_id = item.product_id;
        
        -- Calculate final quantity, capped by remaining stock
        v_final_quantity := v_existing_quantity + item.quantity;
        IF v_final_quantity > v_stock THEN
            v_final_quantity := v_stock;
        END IF;
        
        -- Skip if nothing to add
        IF v_existing_quantity >= v_stock THEN
            CONTINUE;
        END IF;
        
        -- Insert or update cart item
        INSERT INTO public.cart_items (user_id, product_id, quantity)
        VALUES (auth.uid(), item.product_id, item.quantity)
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET 
            quantity = public.cart_items.quantity + EXCLUDED.quantity;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. RPC/View: get_cart_total
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
    SELECT COALESCE(SUM(p.price * c.quantity), 0)
    INTO v_subtotal
    FROM public.cart_items c
    JOIN public.products p ON c.product_id = p.id
    WHERE c.user_id = auth.uid();

    subtotal := v_subtotal;
    tax := ROUND(v_subtotal * v_tax_rate, 2);
    shipping := CASE WHEN v_subtotal > 0 THEN v_shipping_flat ELSE 0 END;
    total := subtotal + tax + shipping;

    RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Enable Realtime
-- This is usually done via:
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.cart_items;
-- But since I might not have access to the publication name or if it exists, 
-- I'll just write it as a comment or try if common.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.cart_items;
    END IF;
END $$;

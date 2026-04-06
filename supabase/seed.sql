
-- 1. Create a profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create the products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    rating FLOAT DEFAULT 0,
    reviews_count INT DEFAULT 0,
    specs JSONB DEFAULT '{}'::jsonb,
    stock_quantity INT DEFAULT 10 CHECK (stock_quantity >= 0),
    is_active BOOLEAN DEFAULT true
);

-- Ensure newer columns exist (if table was created before)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS rating FLOAT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS reviews_count INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS specs JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock_quantity INT DEFAULT 10;

-- 3. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. Profiles RLS Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- 5. Products RLS Policies
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Only admins can modify products" ON public.products;

CREATE POLICY "Anyone can view products" 
ON public.products FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Only admins can modify products" 
ON public.products FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- 6. Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    CASE 
      WHEN new.email = 'admin@harmonicwave.store' THEN 'admin'
      ELSE 'user'
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
-- 7. Create cart_items table
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, product_id)
);

-- 8. Enable RLS on cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- 9. Cart Items RLS Policies (Strict auth.uid() checks)
DROP POLICY IF EXISTS "Users can view their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can insert their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can update their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can delete their own cart items" ON public.cart_items;

CREATE POLICY "Users can view their own cart items" 
ON public.cart_items FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items" 
ON public.cart_items FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" 
ON public.cart_items FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" 
ON public.cart_items FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- 10. Insert Sample Data (Laptops)
INSERT INTO public.products (name, description, price, category, image_url, rating, reviews_count, specs, stock_quantity)
VALUES 
(
    'WaveBook Pro 16', 
    'The ultimate professional laptop with M3 Max silicon, offering unparalleled performance for the most demanding tasks.', 
    2499.99, 
    'Professional', 
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000', 
    4.9, 
    1240, 
    '{"cpu": "M3 Max", "ram": "64GB", "storage": "2TB SSD", "screen": "16-inch Liquid Retina XDR"}', 
    15
),
(
    'Zenith Gaming G15', 
    'Dominate the battlefield with the Zenith G15. Features NVIDIA RTX 4080 graphics and a 240Hz display.', 
    1899.99, 
    'Gaming', 
    'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=1000', 
    4.8, 
    876, 
    '{"cpu": "Intel Core i9-14900H", "gpu": "RTX 4080", "ram": "32GB DDR5", "screen": "15.6-inch QHD 240Hz"}', 
    10
),
(
    'Aero UltraThin 14', 
    'The perfect companion for the digital nomad. Light as a feather, powerful as a storm.', 
    1299.99, 
    'Ultraportable', 
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000', 
    4.7, 
    512, 
    '{"cpu": "Intel Core i7-1370P", "ram": "16GB LPDDR5", "storage": "1TB NVMe SSD", "screen": "14-inch OLED"}', 
    25
),
(
    'Titan Workstation 17', 
    'The most powerful mobile workstation ever built. Designed for data science, 3D rendering, and AI development.', 
    3599.99, 
    'Workstation', 
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000', 
    5.0, 
    204, 
    '{"cpu": "AMD Threadripper", "ram": "128GB ECC", "storage": "4TB RAID 0 SSD", "screen": "17.3-inch 4K OLED"}', 
    5
);

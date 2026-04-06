
-- 1. Create a function to check if the current user is an admin
-- SECURITY DEFINER runs the function with the privileges of the owner (postgres),
-- which bypasses RLS and prevents recursion.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Fix Profiles RLS Policies
-- Drop the old recursive policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create the new non-recursive policy using the function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (public.is_admin());

-- 3. Fix Products RLS Policies (for consistency and safety)
-- Drop the old policy that was also querying profiles (which could trigger recursion indirectly)
DROP POLICY IF EXISTS "Only admins can modify products" ON public.products;

-- Create the new non-recursive policy
CREATE POLICY "Only admins can modify products" 
ON public.products FOR ALL 
TO authenticated 
USING (public.is_admin());

-- 4. Fix Cart Items RLS (if any used similar logic)
-- Looking at seed.sql, cart_items used auth.uid() directly, which is safe.
-- But if we ever add admin viewing for carts, we should use is_admin().

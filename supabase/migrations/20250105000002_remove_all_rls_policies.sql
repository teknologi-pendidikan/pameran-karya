-- Remove RLS policies from comments table for fresh start

-- Remove all policies from comments table
DROP POLICY IF EXISTS "Allow read access to approved comments" ON public.comments;
DROP POLICY IF EXISTS "Allow operations users to update comments" ON public.comments;
DROP POLICY IF EXISTS "Allow anonymous comment submissions" ON public.comments;
DROP POLICY IF EXISTS "Deny delete operations" ON public.comments;

-- Disable RLS on comments table
ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;

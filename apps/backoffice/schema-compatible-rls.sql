-- Simple RLS policies that work with the existing schema
-- No schema changes required - just enable RLS and basic policies

-- Enable Row Level Security on tables
ALTER TABLE public.work ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.person ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_person ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Simple policies for authenticated users
-- All authenticated users can perform all operations on these tables

-- Profiles table - allow users to manage their own profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Work table - allow authenticated users to do everything
CREATE POLICY "Allow authenticated users full access to works" ON public.work
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Category table - allow authenticated users to read and potentially add categories
CREATE POLICY "Allow authenticated users to view categories" ON public.category
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage categories" ON public.category
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Person table - allow authenticated users to manage persons
CREATE POLICY "Allow authenticated users to manage persons" ON public.person
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Asset table - allow authenticated users to manage assets
CREATE POLICY "Allow authenticated users to manage assets" ON public.asset
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Work-category junction table
CREATE POLICY "Allow authenticated users to manage work categories" ON public.work_category
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Work-person junction table
CREATE POLICY "Allow authenticated users to manage work persons" ON public.work_person
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Optional: If you have story and project tables, add policies for them too
-- ALTER TABLE public.story ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.project ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.story_work ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Allow authenticated users to manage stories" ON public.story
--   FOR ALL TO authenticated
--   USING (true)
--   WITH CHECK (true);

-- CREATE POLICY "Allow authenticated users to manage projects" ON public.project
--   FOR ALL TO authenticated
--   USING (true)
--   WITH CHECK (true);

-- CREATE POLICY "Allow authenticated users to manage story works" ON public.story_work
--   FOR ALL TO authenticated
--   USING (true)
--   WITH CHECK (true);

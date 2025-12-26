-- Quick setup: Basic RLS policies for immediate functionality
-- Run this first to get the app working, then consider the restrictive version

-- Enable Row Level Security on main tables
ALTER TABLE public.work ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.person ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_person ENABLE ROW LEVEL SECURITY;

-- Basic policies - Allow authenticated users to do everything
-- (You can make these more restrictive later)

-- Work table policies
CREATE POLICY "Authenticated users can manage works" ON public.work
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Category table policies
CREATE POLICY "Authenticated users can view categories" ON public.category
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage categories" ON public.category
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Person table policies
CREATE POLICY "Authenticated users can manage persons" ON public.person
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Asset table policies
CREATE POLICY "Authenticated users can manage assets" ON public.asset
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Work-category junction table policies
CREATE POLICY "Authenticated users can manage work categories" ON public.work_category
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Work-person junction table policies
CREATE POLICY "Authenticated users can manage work persons" ON public.work_person
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Enable Row Level Security on all tables
ALTER TABLE public.work ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.person ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_person ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_work ENABLE ROW LEVEL SECURITY;

-- Policies for work table
-- Allow authenticated users to insert their own works
CREATE POLICY "Users can insert works" ON public.work
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to view all works
CREATE POLICY "Users can view works" ON public.work
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update works (you might want to restrict this further)
CREATE POLICY "Users can update works" ON public.work
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete works (you might want to restrict this further)
CREATE POLICY "Users can delete works" ON public.work
  FOR DELETE TO authenticated
  USING (true);

-- Policies for category table
-- Allow authenticated users to view all categories
CREATE POLICY "Users can view categories" ON public.category
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to insert categories (optional, might want to restrict to admins only)
CREATE POLICY "Users can insert categories" ON public.category
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Policies for person table
-- Allow authenticated users to view all people
CREATE POLICY "Users can view people" ON public.person
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to insert people
CREATE POLICY "Users can insert people" ON public.person
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Policies for asset table
-- Allow authenticated users to insert assets for works
CREATE POLICY "Users can insert assets" ON public.asset
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to view all assets
CREATE POLICY "Users can view assets" ON public.asset
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update assets
CREATE POLICY "Users can update assets" ON public.asset
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete assets
CREATE POLICY "Users can delete assets" ON public.asset
  FOR DELETE TO authenticated
  USING (true);

-- Policies for work_category junction table
-- Allow authenticated users to manage work-category relationships
CREATE POLICY "Users can insert work categories" ON public.work_category
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view work categories" ON public.work_category
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can delete work categories" ON public.work_category
  FOR DELETE TO authenticated
  USING (true);

-- Policies for work_person junction table
-- Allow authenticated users to manage work-person relationships
CREATE POLICY "Users can insert work persons" ON public.work_person
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view work persons" ON public.work_person
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can update work persons" ON public.work_person
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete work persons" ON public.work_person
  FOR DELETE TO authenticated
  USING (true);

-- Policies for story table (if used)
CREATE POLICY "Users can view stories" ON public.story
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can insert stories" ON public.story
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update stories" ON public.story
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete stories" ON public.story
  FOR DELETE TO authenticated
  USING (true);

-- Policies for project table (if used)
CREATE POLICY "Users can view projects" ON public.project
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can insert projects" ON public.project
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update projects" ON public.project
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete projects" ON public.project
  FOR DELETE TO authenticated
  USING (true);

-- Policies for story_work junction table (if used)
CREATE POLICY "Users can insert story works" ON public.story_work
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view story works" ON public.story_work
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can delete story works" ON public.story_work
  FOR DELETE TO authenticated
  USING (true);

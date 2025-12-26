-- Alternative approach: Add created_by field to work table and create more restrictive policies

-- Add created_by field to work table to track who created each work
ALTER TABLE public.work ADD COLUMN created_by uuid REFERENCES auth.users(id);

-- Update existing works to have a created_by value (optional, for existing data)
-- UPDATE public.work SET created_by = (SELECT id FROM auth.users LIMIT 1) WHERE created_by IS NULL;

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can insert works" ON public.work;
DROP POLICY IF EXISTS "Users can view works" ON public.work;
DROP POLICY IF EXISTS "Users can update works" ON public.work;
DROP POLICY IF EXISTS "Users can delete works" ON public.work;

-- More restrictive policies for work table
-- Allow authenticated users to insert works (will be automatically assigned to them)
CREATE POLICY "Users can insert works" ON public.work
  FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Allow authenticated users to view all works (or restrict to own works only)
CREATE POLICY "Users can view all works" ON public.work
  FOR SELECT TO authenticated
  USING (true);

-- Alternative: Only allow users to view their own works
-- CREATE POLICY "Users can view own works" ON public.work
--   FOR SELECT TO authenticated
--   USING (created_by = auth.uid());

-- Allow users to update only their own works
CREATE POLICY "Users can update own works" ON public.work
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Allow users to delete only their own works
CREATE POLICY "Users can delete own works" ON public.work
  FOR DELETE TO authenticated
  USING (created_by = auth.uid());

-- More restrictive policies for assets (only for own works)
DROP POLICY IF EXISTS "Users can insert assets" ON public.asset;
DROP POLICY IF EXISTS "Users can view assets" ON public.asset;
DROP POLICY IF EXISTS "Users can update assets" ON public.asset;
DROP POLICY IF EXISTS "Users can delete assets" ON public.asset;

CREATE POLICY "Users can insert assets for own works" ON public.asset
  FOR INSERT TO authenticated
  WITH CHECK (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Users can view all assets" ON public.asset
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can update assets for own works" ON public.asset
  FOR UPDATE TO authenticated
  USING (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  )
  WITH CHECK (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Users can delete assets for own works" ON public.asset
  FOR DELETE TO authenticated
  USING (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  );

-- More restrictive policies for work_category (only for own works)
DROP POLICY IF EXISTS "Users can insert work categories" ON public.work_category;
DROP POLICY IF EXISTS "Users can delete work categories" ON public.work_category;

CREATE POLICY "Users can insert categories for own works" ON public.work_category
  FOR INSERT TO authenticated
  WITH CHECK (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Users can delete categories for own works" ON public.work_category
  FOR DELETE TO authenticated
  USING (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  );

-- More restrictive policies for work_person (only for own works)
DROP POLICY IF EXISTS "Users can insert work persons" ON public.work_person;
DROP POLICY IF EXISTS "Users can update work persons" ON public.work_person;
DROP POLICY IF EXISTS "Users can delete work persons" ON public.work_person;

CREATE POLICY "Users can insert persons for own works" ON public.work_person
  FOR INSERT TO authenticated
  WITH CHECK (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Users can update persons for own works" ON public.work_person
  FOR UPDATE TO authenticated
  USING (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  )
  WITH CHECK (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Users can delete persons for own works" ON public.work_person
  FOR DELETE TO authenticated
  USING (
    work_id IN (
      SELECT work_id FROM public.work WHERE created_by = auth.uid()
    )
  );

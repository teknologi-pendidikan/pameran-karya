-- Create new RLS policies for comments table

-- Enable Row Level Security on comments table
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow everyone (including anon) to read approved comments
CREATE POLICY "Public read access to approved comments" ON public.comments
  FOR SELECT
  USING (is_approved = true);

-- Policy 2: Allow anyone to insert comments (they start as unapproved)
CREATE POLICY "Allow comment submissions" ON public.comments
  FOR INSERT
  WITH CHECK (is_approved = false);

-- Policy 3: Allow authenticated users with operations/serviceaccount access to read all comments
CREATE POLICY "Operations users can read all comments" ON public.comments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.access_level IN ('operations', 'serviceaccount')
    )
  );

-- Policy 4: Allow authenticated users with operations/serviceaccount access to update comments
CREATE POLICY "Operations users can update comments" ON public.comments
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.access_level IN ('operations', 'serviceaccount')
    )
  );

-- Policy 5: Prevent deletion of comments (soft delete through moderation instead)
-- No explicit delete policy means delete is denied by default

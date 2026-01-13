-- Create comments table
CREATE TABLE public.comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  author_name text NOT NULL,
  body text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  is_approved boolean NOT NULL DEFAULT false,
  ip_hash text,
  moderated_by uuid,
  moderated_at timestamp with time zone,
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_moderated_by_fkey FOREIGN KEY (moderated_by) REFERENCES auth.users(id)
);

-- Create index for efficient queries
CREATE INDEX comments_page_slug_created_at_idx ON public.comments(page_slug, created_at DESC);
CREATE INDEX comments_is_approved_idx ON public.comments(is_approved);
CREATE INDEX comments_moderated_by_idx ON public.comments(moderated_by);

-- Enable Row Level Security
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Public policy: select only approved comments
CREATE POLICY "Allow read access to approved comments" ON public.comments
  FOR SELECT
  USING (is_approved = true);

-- Operations policy: authenticated users with operations role may update and approve
CREATE POLICY "Allow operations users to update comments" ON public.comments
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.access_level IN ('operations', 'serviceaccount')
    )
  );

-- Allow anonymous users to insert comments (they start as unapproved)
CREATE POLICY "Allow anonymous comment submissions" ON public.comments
  FOR INSERT
  TO anon
  WITH CHECK (is_approved = false);

-- Deny delete operations for all users through RLS
CREATE POLICY "Deny delete operations" ON public.comments
  FOR DELETE
  USING (false);

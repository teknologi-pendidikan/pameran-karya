-- Create affiliation table
CREATE TABLE public.affiliation (
  affiliation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_name text,
  type text CHECK (type = ANY (ARRAY['university'::text, 'institute'::text, 'company'::text, 'organization'::text, 'other'::text])),
  country text,
  website text,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT affiliation_pkey PRIMARY KEY (affiliation_id),
  CONSTRAINT affiliation_name_unique UNIQUE (name)
);

-- Add affiliation_id column to person table
ALTER TABLE public.person
ADD COLUMN affiliation_id uuid,
ADD CONSTRAINT person_affiliation_id_fkey FOREIGN KEY (affiliation_id) REFERENCES public.affiliation(affiliation_id);

-- Create index for better performance
CREATE INDEX idx_person_affiliation_id ON public.person(affiliation_id);
CREATE INDEX idx_affiliation_slug ON public.affiliation(slug);
CREATE INDEX idx_affiliation_name ON public.affiliation(name);

-- Set up RLS (Row Level Security) for affiliation table
ALTER TABLE public.affiliation ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read affiliations
CREATE POLICY "Allow public read access to affiliations" ON public.affiliation
  FOR SELECT USING (true);

-- Only authenticated users can insert/update affiliations (for future admin functionality)
CREATE POLICY "Allow authenticated users to insert affiliations" ON public.affiliation
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update affiliations" ON public.affiliation
  FOR UPDATE USING (auth.role() = 'authenticated');

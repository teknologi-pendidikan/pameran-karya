-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.asset (
  asset_id uuid NOT NULL DEFAULT gen_random_uuid(),
  work_id uuid,
  type text CHECK (type = ANY (ARRAY['image'::text, 'video'::text, 'audio'::text, 'document'::text, 'link'::text])),
  file_url text NOT NULL,
  thumbnail_url text,
  license text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT asset_pkey PRIMARY KEY (asset_id),
  CONSTRAINT asset_work_id_fkey FOREIGN KEY (work_id) REFERENCES public.work(work_id)
);
CREATE TABLE public.category (
  category_id uuid NOT NULL DEFAULT gen_random_uuid(),
  type text,
  label text NOT NULL,
  slug text NOT NULL UNIQUE,
  CONSTRAINT category_pkey PRIMARY KEY (category_id)
);
CREATE TABLE public.person (
  person_id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  affiliation text,
  slug text NOT NULL UNIQUE,
  bio text,
  tag text,
  email text,
  profile_id uuid,
  CONSTRAINT person_pkey PRIMARY KEY (person_id),
  CONSTRAINT person_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  access_level text,
  full_name text,
  email text NOT NULL UNIQUE,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.project (
  project_id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  edition text,
  description text,
  slug text NOT NULL UNIQUE,
  CONSTRAINT project_pkey PRIMARY KEY (project_id)
);
CREATE TABLE public.story (
  story_id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  title text NOT NULL,
  summary text,
  slug text NOT NULL UNIQUE,
  CONSTRAINT story_pkey PRIMARY KEY (story_id),
  CONSTRAINT story_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(project_id)
);
CREATE TABLE public.story_work (
  story_id uuid NOT NULL,
  work_id uuid NOT NULL,
  ordering integer,
  CONSTRAINT story_work_pkey PRIMARY KEY (story_id, work_id),
  CONSTRAINT story_work_story_id_fkey FOREIGN KEY (story_id) REFERENCES public.story(story_id),
  CONSTRAINT story_work_work_id_fkey FOREIGN KEY (work_id) REFERENCES public.work(work_id)
);
CREATE TABLE public.work (
  work_id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  abstract text,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['Ready for Review'::text, 'ready for review'::text, 'draft'::text, 'final'::text, 'archived'::text])),
  created_at timestamp with time zone DEFAULT now(),
  slug text NOT NULL UNIQUE,
  CONSTRAINT work_pkey PRIMARY KEY (work_id)
);
CREATE TABLE public.work_category (
  work_id uuid NOT NULL,
  category_id uuid NOT NULL,
  CONSTRAINT work_category_pkey PRIMARY KEY (work_id, category_id),
  CONSTRAINT work_category_work_id_fkey FOREIGN KEY (work_id) REFERENCES public.work(work_id),
  CONSTRAINT work_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id)
);
CREATE TABLE public.work_person (
  work_id uuid NOT NULL,
  person_id uuid NOT NULL,
  contribution_role text,
  ordering integer,
  CONSTRAINT work_person_pkey PRIMARY KEY (work_id, person_id),
  CONSTRAINT work_person_work_id_fkey FOREIGN KEY (work_id) REFERENCES public.work(work_id),
  CONSTRAINT work_person_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(person_id)
);

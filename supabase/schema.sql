


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."get_assets_by_person"("p_person_id" "uuid" DEFAULT NULL::"uuid", "p_slug" "text" DEFAULT NULL::"text") RETURNS TABLE("asset_id" "uuid", "work_id" "uuid", "work_title" "text", "person_id" "uuid", "contribution_role" "text", "ordering" integer, "type" "text", "file_url" "text", "thumbnail_url" "text", "license" "text", "created_at" timestamp with time zone)
    LANGUAGE "sql" STABLE
    AS $$
WITH person_cte AS (
  SELECT person_id FROM public.person
  WHERE (p_person_id IS NOT NULL AND person_id = p_person_id)
     OR (p_person_id IS NULL AND p_slug IS NOT NULL AND slug = p_slug)
  LIMIT 1
), works_cte AS (
  SELECT wp.work_id, wp.person_id, wp.contribution_role, wp.ordering
  FROM public.work_person wp
  JOIN person_cte p ON p.person_id = wp.person_id
)
SELECT
  a.asset_id,
  a.work_id,
  w.title AS work_title,
  wc.person_id,
  wc.contribution_role,
  wc.ordering,
  a.type,
  a.file_url,
  a.thumbnail_url,
  a.license,
  a.created_at
FROM public.asset a
JOIN works_cte wc ON wc.work_id = a.work_id
LEFT JOIN public.work w ON w.work_id = a.work_id
ORDER BY wc.ordering NULLS LAST, a.created_at DESC;
$$;


ALTER FUNCTION "public"."get_assets_by_person"("p_person_id" "uuid", "p_slug" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."asset" (
    "asset_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "work_id" "uuid",
    "type" "text",
    "file_url" "text" NOT NULL,
    "thumbnail_url" "text",
    "license" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "asset_type_check" CHECK (("type" = ANY (ARRAY['image'::"text", 'video'::"text", 'audio'::"text", 'document'::"text", 'link'::"text"])))
);


ALTER TABLE "public"."asset" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_assets_by_work"("wid" "uuid") RETURNS SETOF "public"."asset"
    LANGUAGE "sql" STABLE
    AS $$
  select *
  from asset
  where work_id = wid
  order by created_at;
$$;


ALTER FUNCTION "public"."get_assets_by_work"("wid" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_story_works"("story" "uuid") RETURNS TABLE("ordering" integer, "work_id" "uuid", "title" "text", "abstract" "text")
    LANGUAGE "sql" STABLE
    AS $$
  select
    sw.ordering,
    w.work_id,
    w.title,
    w.abstract
  from story_work sw
  join work w on sw.work_id = w.work_id
  where sw.story_id = story
  order by sw.ordering;
$$;


ALTER FUNCTION "public"."get_story_works"("story" "uuid") OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work" (
    "work_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "abstract" "text",
    "status" "text" DEFAULT 'draft'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "slug" "text" NOT NULL,
    CONSTRAINT "work_status_check" CHECK (("status" = ANY (ARRAY['draft'::"text", 'final'::"text", 'archived'::"text"])))
);


ALTER TABLE "public"."work" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_works_by_category"("cat_id" "uuid") RETURNS SETOF "public"."work"
    LANGUAGE "sql" STABLE
    AS $$
  select w.*
  from work w
  join work_category wc on w.work_id = wc.work_id
  where wc.category_id = cat_id;
$$;


ALTER FUNCTION "public"."get_works_by_category"("cat_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_works_by_person"("p_person_id" "uuid" DEFAULT NULL::"uuid", "p_slug" "text" DEFAULT NULL::"text") RETURNS TABLE("work_id" "uuid", "title" "text", "abstract" "text", "status" "text", "created_at" timestamp with time zone, "slug" "text", "contribution_role" "text", "ordering" integer, "assets" "jsonb", "categories" "jsonb")
    LANGUAGE "sql" STABLE
    AS $$
WITH person_cte AS (
  SELECT person_id FROM public.person
  WHERE (p_person_id IS NOT NULL AND person_id = p_person_id)
     OR (p_person_id IS NULL AND p_slug IS NOT NULL AND slug = p_slug)
  LIMIT 1
), wp AS (
  SELECT wp.work_id, wp.person_id, wp.contribution_role, wp.ordering
  FROM public.work_person wp
  JOIN person_cte p ON p.person_id = wp.person_id
)
SELECT
  w.work_id,
  w.title,
  w.abstract,
  w.status,
  w.created_at,
  w.slug,
  wp.contribution_role,
  wp.ordering,
  COALESCE(
    (SELECT jsonb_agg(jsonb_build_object('asset_id', a.asset_id, 'type', a.type, 'file_url', a.file_url, 'thumbnail_url', a.thumbnail_url, 'license', a.license))
     FROM public.asset a WHERE a.work_id = w.work_id), '[]'::jsonb) AS assets,
  COALESCE(
    (SELECT jsonb_agg(jsonb_build_object('category_id', c.category_id, 'label', c.label, 'slug', c.slug))
     FROM public.work_category wc
     JOIN public.category c ON c.category_id = wc.category_id
     WHERE wc.work_id = w.work_id), '[]'::jsonb) AS categories
FROM public.work w
JOIN wp ON wp.work_id = w.work_id
ORDER BY wp.ordering NULLS LAST, w.created_at DESC;
$$;


ALTER FUNCTION "public"."get_works_by_person"("p_person_id" "uuid", "p_slug" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_works_with_assets_by_person"("p_person_id" "uuid" DEFAULT NULL::"uuid", "p_slug" "text" DEFAULT NULL::"text") RETURNS TABLE("work_id" "uuid", "title" "text", "slug" "text", "abstract" "text", "contribution_role" "text", "ordering" integer, "work_created_at" timestamp with time zone, "assets" "jsonb")
    LANGUAGE "sql" STABLE
    AS $$
WITH person_cte AS (
  SELECT person_id FROM public.person
  WHERE (p_person_id IS NOT NULL AND person_id = p_person_id)
     OR (p_person_id IS NULL AND p_slug IS NOT NULL AND slug = p_slug)
  LIMIT 1
), works_cte AS (
  SELECT w.work_id, w.title, w.slug, w.abstract, w.created_at, wp.contribution_role, wp.ordering
  FROM public.work w
  JOIN public.work_person wp ON wp.work_id = w.work_id
  JOIN person_cte p ON p.person_id = wp.person_id
)
SELECT
  wc.work_id,
  wc.title,
  wc.slug,
  wc.abstract,
  wc.contribution_role,
  wc.ordering,
  wc.created_at AS work_created_at,
  COALESCE(jsonb_agg(
    jsonb_build_object(
      'asset_id', a.asset_id,
      'type', a.type,
      'file_url', a.file_url,
      'thumbnail_url', a.thumbnail_url,
      'license', a.license,
      'created_at', a.created_at
    ) ORDER BY a.created_at DESC
  ) FILTER (WHERE a.asset_id IS NOT NULL), '[]'::jsonb) AS assets
FROM works_cte wc
LEFT JOIN public.asset a ON a.work_id = wc.work_id
GROUP BY wc.work_id, wc.title, wc.slug, wc.abstract, wc.contribution_role, wc.ordering, wc.created_at
ORDER BY wc.ordering NULLS LAST, wc.created_at DESC;
$$;


ALTER FUNCTION "public"."get_works_with_assets_by_person"("p_person_id" "uuid", "p_slug" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_works_with_authors"() RETURNS TABLE("work_id" "uuid", "title" "text", "abstract" "text", "status" "text", "created_at" timestamp with time zone, "authors" "jsonb")
    LANGUAGE "sql" STABLE
    AS $$
  select
    w.work_id,
    w.title,
    w.abstract,
    w.status,
    w.created_at,
    jsonb_agg(
      jsonb_build_object(
        'person_id', p.person_id,
        'name', p.name,
        'role', wp.contribution_role,
        'ordering', wp.ordering
      )
      order by wp.ordering
    ) as authors
  from work w
  left join work_person wp on w.work_id = wp.work_id
  left join person p on wp.person_id = p.person_id
  group by w.work_id;
$$;


ALTER FUNCTION "public"."get_works_with_authors"() OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."category" (
    "category_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "type" "text",
    "label" "text" NOT NULL,
    "slug" "text" NOT NULL
);


ALTER TABLE "public"."category" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."person" (
    "person_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "affiliation" "text",
    "slug" "text" NOT NULL,
    "bio" "text",
    "tag" "text"
);


ALTER TABLE "public"."person" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."project" (
    "project_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "edition" "text",
    "description" "text",
    "slug" "text" NOT NULL
);


ALTER TABLE "public"."project" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."story" (
    "story_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "project_id" "uuid",
    "title" "text" NOT NULL,
    "summary" "text",
    "slug" "text" NOT NULL
);


ALTER TABLE "public"."story" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."story_work" (
    "story_id" "uuid" NOT NULL,
    "work_id" "uuid" NOT NULL,
    "ordering" integer
);


ALTER TABLE "public"."story_work" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work_category" (
    "work_id" "uuid" NOT NULL,
    "category_id" "uuid" NOT NULL
);


ALTER TABLE "public"."work_category" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work_person" (
    "work_id" "uuid" NOT NULL,
    "person_id" "uuid" NOT NULL,
    "contribution_role" "text",
    "ordering" integer
);


ALTER TABLE "public"."work_person" OWNER TO "postgres";


ALTER TABLE ONLY "public"."asset"
    ADD CONSTRAINT "asset_pkey" PRIMARY KEY ("asset_id");



ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_pkey" PRIMARY KEY ("category_id");



ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."person"
    ADD CONSTRAINT "person_pkey" PRIMARY KEY ("person_id");



ALTER TABLE ONLY "public"."person"
    ADD CONSTRAINT "person_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."project"
    ADD CONSTRAINT "project_pkey" PRIMARY KEY ("project_id");



ALTER TABLE ONLY "public"."project"
    ADD CONSTRAINT "project_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."story"
    ADD CONSTRAINT "story_pkey" PRIMARY KEY ("story_id");



ALTER TABLE ONLY "public"."story"
    ADD CONSTRAINT "story_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."story_work"
    ADD CONSTRAINT "story_work_pkey" PRIMARY KEY ("story_id", "work_id");



ALTER TABLE ONLY "public"."work_category"
    ADD CONSTRAINT "work_category_pkey" PRIMARY KEY ("work_id", "category_id");



ALTER TABLE ONLY "public"."work_person"
    ADD CONSTRAINT "work_person_pkey" PRIMARY KEY ("work_id", "person_id");



ALTER TABLE ONLY "public"."work"
    ADD CONSTRAINT "work_pkey" PRIMARY KEY ("work_id");



ALTER TABLE ONLY "public"."work"
    ADD CONSTRAINT "work_slug_key" UNIQUE ("slug");



CREATE INDEX "idx_asset_work" ON "public"."asset" USING "btree" ("work_id");



CREATE INDEX "idx_category_type" ON "public"."category" USING "btree" ("type");



CREATE INDEX "idx_story_project" ON "public"."story" USING "btree" ("project_id");



CREATE INDEX "idx_story_work_ordering" ON "public"."story_work" USING "btree" ("story_id", "ordering");



CREATE INDEX "idx_story_work_work" ON "public"."story_work" USING "btree" ("work_id");



CREATE INDEX "idx_work_category_category" ON "public"."work_category" USING "btree" ("category_id");



CREATE INDEX "idx_work_created_at" ON "public"."work" USING "btree" ("created_at");



CREATE INDEX "idx_work_person_person" ON "public"."work_person" USING "btree" ("person_id");



CREATE INDEX "idx_work_status" ON "public"."work" USING "btree" ("status");



ALTER TABLE ONLY "public"."asset"
    ADD CONSTRAINT "asset_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."work"("work_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."story"
    ADD CONSTRAINT "story_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("project_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."story_work"
    ADD CONSTRAINT "story_work_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."story"("story_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."story_work"
    ADD CONSTRAINT "story_work_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."work"("work_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_category"
    ADD CONSTRAINT "work_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_category"
    ADD CONSTRAINT "work_category_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."work"("work_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_person"
    ADD CONSTRAINT "work_person_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."person"("person_id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_person"
    ADD CONSTRAINT "work_person_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."work"("work_id") ON DELETE CASCADE;



ALTER TABLE "public"."asset" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."category" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."person" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."project" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "public read asset" ON "public"."asset" FOR SELECT USING (true);



CREATE POLICY "public read category" ON "public"."category" FOR SELECT USING (true);



CREATE POLICY "public read person" ON "public"."person" FOR SELECT USING (true);



CREATE POLICY "public read project" ON "public"."project" FOR SELECT USING (true);



CREATE POLICY "public read story" ON "public"."story" FOR SELECT USING (true);



CREATE POLICY "public read story_work" ON "public"."story_work" FOR SELECT USING (true);



CREATE POLICY "public read work" ON "public"."work" FOR SELECT USING (true);



CREATE POLICY "public read work_category" ON "public"."work_category" FOR SELECT USING (true);



CREATE POLICY "public read work_person" ON "public"."work_person" FOR SELECT USING (true);



ALTER TABLE "public"."story" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."story_work" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_category" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_person" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."get_assets_by_person"("p_person_id" "uuid", "p_slug" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_assets_by_person"("p_person_id" "uuid", "p_slug" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_assets_by_person"("p_person_id" "uuid", "p_slug" "text") TO "service_role";



GRANT ALL ON TABLE "public"."asset" TO "anon";
GRANT ALL ON TABLE "public"."asset" TO "authenticated";
GRANT ALL ON TABLE "public"."asset" TO "service_role";



GRANT ALL ON FUNCTION "public"."get_assets_by_work"("wid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_assets_by_work"("wid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_assets_by_work"("wid" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_story_works"("story" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_story_works"("story" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_story_works"("story" "uuid") TO "service_role";



GRANT ALL ON TABLE "public"."work" TO "anon";
GRANT ALL ON TABLE "public"."work" TO "authenticated";
GRANT ALL ON TABLE "public"."work" TO "service_role";



GRANT ALL ON FUNCTION "public"."get_works_by_category"("cat_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_works_by_category"("cat_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_works_by_category"("cat_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_works_by_person"("p_person_id" "uuid", "p_slug" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_works_by_person"("p_person_id" "uuid", "p_slug" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_works_by_person"("p_person_id" "uuid", "p_slug" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_works_with_assets_by_person"("p_person_id" "uuid", "p_slug" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_works_with_assets_by_person"("p_person_id" "uuid", "p_slug" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_works_with_assets_by_person"("p_person_id" "uuid", "p_slug" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_works_with_authors"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_works_with_authors"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_works_with_authors"() TO "service_role";


















GRANT ALL ON TABLE "public"."category" TO "anon";
GRANT ALL ON TABLE "public"."category" TO "authenticated";
GRANT ALL ON TABLE "public"."category" TO "service_role";



GRANT ALL ON TABLE "public"."person" TO "anon";
GRANT ALL ON TABLE "public"."person" TO "authenticated";
GRANT ALL ON TABLE "public"."person" TO "service_role";



GRANT ALL ON TABLE "public"."project" TO "anon";
GRANT ALL ON TABLE "public"."project" TO "authenticated";
GRANT ALL ON TABLE "public"."project" TO "service_role";



GRANT ALL ON TABLE "public"."story" TO "anon";
GRANT ALL ON TABLE "public"."story" TO "authenticated";
GRANT ALL ON TABLE "public"."story" TO "service_role";



GRANT ALL ON TABLE "public"."story_work" TO "anon";
GRANT ALL ON TABLE "public"."story_work" TO "authenticated";
GRANT ALL ON TABLE "public"."story_work" TO "service_role";



GRANT ALL ON TABLE "public"."work_category" TO "anon";
GRANT ALL ON TABLE "public"."work_category" TO "authenticated";
GRANT ALL ON TABLE "public"."work_category" TO "service_role";



GRANT ALL ON TABLE "public"."work_person" TO "anon";
GRANT ALL ON TABLE "public"."work_person" TO "authenticated";
GRANT ALL ON TABLE "public"."work_person" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";
































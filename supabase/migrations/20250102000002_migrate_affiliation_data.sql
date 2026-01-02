-- Step 1: Extract unique affiliations from existing person records and create affiliation records
INSERT INTO public.affiliation (name, type, slug)
SELECT DISTINCT
  TRIM(affiliation) as name,
  CASE
    WHEN LOWER(TRIM(affiliation)) LIKE '%universitas%' OR LOWER(TRIM(affiliation)) LIKE '%university%' THEN 'university'
    WHEN LOWER(TRIM(affiliation)) LIKE '%institut%' OR LOWER(TRIM(affiliation)) LIKE '%institute%' THEN 'institute'
    WHEN LOWER(TRIM(affiliation)) LIKE '%sekolah%' OR LOWER(TRIM(affiliation)) LIKE '%school%' THEN 'university'
    WHEN LOWER(TRIM(affiliation)) LIKE '%politeknik%' OR LOWER(TRIM(affiliation)) LIKE '%polytechnic%' THEN 'university'
    ELSE 'organization'
  END as type,
  LOWER(REGEXP_REPLACE(TRIM(affiliation), '[^a-zA-Z0-9\s]', '', 'g')) || '-' || substr(gen_random_uuid()::text, 1, 8) as slug
FROM public.person
WHERE affiliation IS NOT NULL
  AND TRIM(affiliation) != ''
  AND TRIM(affiliation) != 'Tidak Ada'
ON CONFLICT (name) DO NOTHING;

-- Step 2: Update person records to reference the new affiliation table
UPDATE public.person
SET affiliation_id = (
  SELECT affiliation_id
  FROM public.affiliation
  WHERE affiliation.name = TRIM(person.affiliation)
)
WHERE affiliation IS NOT NULL
  AND TRIM(affiliation) != ''
  AND TRIM(affiliation) != 'Tidak Ada';

-- Step 3: Drop the old affiliation text column
-- Note: We'll keep it for now as a backup, but mark it as deprecated
ALTER TABLE public.person RENAME COLUMN affiliation TO affiliation_deprecated;

-- Add comment to indicate the column is deprecated
COMMENT ON COLUMN public.person.affiliation_deprecated IS 'DEPRECATED: Use affiliation_id instead. This column will be removed in a future migration.';

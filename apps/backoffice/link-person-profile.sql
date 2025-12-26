-- Add profile_id column to person table to link with profiles
ALTER TABLE person
ADD COLUMN profile_id UUID REFERENCES profiles(id);

-- Create index for better performance
CREATE INDEX idx_person_profile_id ON person(profile_id);

-- Update existing person records to link them with profiles
-- This attempts to match existing person records with profiles by email or name
UPDATE person
SET profile_id = profiles.id
FROM profiles
WHERE person.email = profiles.email
   OR person.name = profiles.full_name;

-- Add RLS policy to allow users to see their own person records
CREATE POLICY "Users can view their own person records"
ON person FOR SELECT
USING (profile_id = auth.uid());

-- Add RLS policy to allow users to insert their own person records
CREATE POLICY "Users can insert their own person records"
ON person FOR INSERT
WITH CHECK (profile_id = auth.uid());

-- Add RLS policy to allow users to update their own person records
CREATE POLICY "Users can update their own person records"
ON person FOR UPDATE
USING (profile_id = auth.uid());

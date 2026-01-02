-- Create votes table for the voting system
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  work_id UUID NOT NULL REFERENCES work(work_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id) -- Ensure each user can only vote once
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);
CREATE INDEX IF NOT EXISTS idx_votes_work_id ON votes(work_id);
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON votes(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to insert their own vote
CREATE POLICY "Users can insert their own vote" ON votes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to view their own vote
CREATE POLICY "Users can view their own vote" ON votes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for users to update their own vote
CREATE POLICY "Users can update their own vote" ON votes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to get vote counts per work
CREATE OR REPLACE FUNCTION get_vote_counts()
RETURNS TABLE (
  work_id UUID,
  vote_count BIGINT,
  work_title TEXT,
  work_slug TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    w.work_id,
    COALESCE(v.vote_count, 0) as vote_count,
    w.title as work_title,
    w.slug as work_slug
  FROM work w
  LEFT JOIN (
    SELECT
      votes.work_id,
      COUNT(*) as vote_count
    FROM votes
    GROUP BY votes.work_id
  ) v ON w.work_id = v.work_id
  ORDER BY COALESCE(v.vote_count, 0) DESC, w.title ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_vote_counts() TO authenticated;

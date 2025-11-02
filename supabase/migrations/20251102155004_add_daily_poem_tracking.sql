/*
  # Add Daily Poem Tracking

  1. New Tables
    - `daily_poem_tracking`
      - `id` (uuid, primary key)
      - `poem_id` (uuid, foreign key to poems)
      - `date` (date) - The date this poem should be displayed
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Public read access for tracking data
*/

CREATE TABLE IF NOT EXISTS daily_poem_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id uuid NOT NULL REFERENCES poems(id) ON DELETE CASCADE,
  date date NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_poem_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read daily poem tracking"
  ON daily_poem_tracking
  FOR SELECT
  TO anon, authenticated
  USING (true);
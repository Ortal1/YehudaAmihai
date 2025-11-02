/*
  # Create Poems Table for Yehuda Amichai Poetry Application

  1. New Tables
    - `poems`
      - `id` (uuid, primary key) - Unique identifier for each poem
      - `title` (text) - Title of the poem in Hebrew
      - `poet` (text) - Name of the poet (Yehuda Amichai)
      - `melody` (text) - Melody information in Hebrew
      - `tune` (text) - Tune information in Hebrew
      - `content` (text) - Full text of the poem
      - `created_at` (timestamptz) - Timestamp of record creation

  2. Security
    - Enable RLS on `poems` table
    - Add policy for public read access (poems are meant to be displayed publicly)
*/

CREATE TABLE IF NOT EXISTS poems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  poet text NOT NULL DEFAULT 'יהודה עמיחי',
  melody text NOT NULL,
  tune text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE poems ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read poems"
  ON poems
  FOR SELECT
  TO anon, authenticated
  USING (true);
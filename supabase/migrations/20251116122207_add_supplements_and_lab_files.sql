-- Add current_supplements column to consultations table
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS current_supplements TEXT;

-- Add lab_files column to store uploaded PDF paths/URLs
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS lab_files JSONB DEFAULT '[]'::jsonb;

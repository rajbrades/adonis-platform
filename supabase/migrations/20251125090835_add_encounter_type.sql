-- Add encounter_type column to encounter_notes table
ALTER TABLE encounter_notes 
ADD COLUMN encounter_type TEXT;

-- Add a check constraint for valid encounter types
ALTER TABLE encounter_notes
ADD CONSTRAINT valid_encounter_type CHECK (
  encounter_type IN (
    'initial_consultation',
    'followup_lab_review',
    'followup_treatment_adjustment',
    'followup_symptom_check',
    'annual_wellness',
    'treatment_planning'
  )
);

-- Set default for existing records
UPDATE encounter_notes 
SET encounter_type = 'followup_lab_review' 
WHERE encounter_type IS NULL;

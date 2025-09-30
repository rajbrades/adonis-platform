-- Patient Consultations Table for Provider Portal
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Personal Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE NOT NULL,
  age INTEGER,
  height VARCHAR(20),
  weight VARCHAR(20),
  occupation VARCHAR(200),
  
  -- Goals
  optimization_goals TEXT[] DEFAULT '{}',
  primary_concerns TEXT,
  
  -- Medical History
  current_medications TEXT,
  allergies TEXT,
  medical_conditions TEXT[] DEFAULT '{}',
  surgeries TEXT,
  family_history TEXT,
  previous_hormone_therapy TEXT,
  labs_recent TEXT,
  
  -- Lifestyle
  exercise_frequency VARCHAR(50),
  sleep_hours VARCHAR(50),
  stress_level VARCHAR(50),
  alcohol_consumption VARCHAR(50),
  smoking VARCHAR(50),
  diet VARCHAR(50),
  
  -- Symptoms
  symptoms TEXT[] DEFAULT '{}',
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'medium',
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by VARCHAR(100),
  provider_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_consultations_email ON consultations(email);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created ON consultations(created_at DESC);
CREATE INDEX idx_consultations_priority ON consultations(priority);

-- Enable RLS
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Simple policies - allow all operations for now (you can restrict later)
CREATE POLICY "Allow all operations on consultations" 
  ON consultations 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Add payment tracking fields to consultations table
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid',
ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS stripe_payment_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT,
ADD COLUMN IF NOT EXISTS lab_panel_type TEXT,
ADD COLUMN IF NOT EXISTS lab_panel_price INTEGER,
ADD COLUMN IF NOT EXISTS requisition_sent_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS results_notification_sent_at TIMESTAMP;

-- Create index for payment lookups
CREATE INDEX IF NOT EXISTS idx_consultations_payment_status ON consultations(payment_status);
CREATE INDEX IF NOT EXISTS idx_consultations_stripe_session ON consultations(stripe_session_id);

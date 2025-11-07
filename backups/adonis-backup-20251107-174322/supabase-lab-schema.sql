-- Lab Testing Database Schema for Adonis Platform
-- Run this in your Supabase SQL Editor

-- 1. Lab Test Categories Table
CREATE TABLE IF NOT EXISTS lab_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Individual Lab Tests/Biomarkers Table
CREATE TABLE IF NOT EXISTS lab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES lab_categories(id),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  test_code VARCHAR(50), -- LabCorp test code
  price DECIMAL(10,2) NOT NULL,
  sample_type VARCHAR(50), -- Blood, Urine, Saliva, etc.
  turnaround_days INTEGER DEFAULT 14,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Pre-built Lab Panels Table
CREATE TABLE IF NOT EXISTS lab_panels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  detailed_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  panel_type VARCHAR(50), -- comprehensive, complete, executive, specialty
  biomarker_count INTEGER,
  best_for TEXT,
  includes_venipuncture BOOLEAN DEFAULT true,
  meets_treatment_requirements BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Lab Panel Tests Junction Table (many-to-many)
CREATE TABLE IF NOT EXISTS lab_panel_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id UUID REFERENCES lab_panels(id) ON DELETE CASCADE,
  test_id UUID REFERENCES lab_tests(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(panel_id, test_id)
);

-- 5. Lab Orders Table
CREATE TABLE IF NOT EXISTS lab_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_first_name VARCHAR(100),
  customer_last_name VARCHAR(100),
  customer_phone VARCHAR(20),
  customer_address JSONB,
  subtotal DECIMAL(10,2) NOT NULL,
  venipuncture_fee DECIMAL(10,2) DEFAULT 5.00,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  payment_intent_id VARCHAR(255), -- Stripe payment intent ID
  requisition_sent BOOLEAN DEFAULT false,
  requisition_sent_at TIMESTAMP WITH TIME ZONE,
  results_received BOOLEAN DEFAULT false,
  results_received_at TIMESTAMP WITH TIME ZONE,
  results_sent BOOLEAN DEFAULT false,
  results_sent_at TIMESTAMP WITH TIME ZONE,
  state_restriction VARCHAR(2), -- NY, NJ, RI
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Lab Order Items Table
CREATE TABLE IF NOT EXISTS lab_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES lab_orders(id) ON DELETE CASCADE,
  item_type VARCHAR(20) NOT NULL, -- 'panel' or 'test'
  panel_id UUID REFERENCES lab_panels(id),
  test_id UUID REFERENCES lab_tests(id),
  item_name VARCHAR(200) NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Lab Reviews/Consultations Table
CREATE TABLE IF NOT EXISTS lab_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES lab_orders(id),
  customer_email VARCHAR(255) NOT NULL,
  review_type VARCHAR(50) DEFAULT 'standard', -- standard, premium
  price DECIMAL(10,2) NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER DEFAULT 45,
  health_coach_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_lab_tests_category ON lab_tests(category_id);
CREATE INDEX idx_lab_tests_active ON lab_tests(is_active);
CREATE INDEX idx_lab_panels_slug ON lab_panels(slug);
CREATE INDEX idx_lab_panels_type ON lab_panels(panel_type);
CREATE INDEX idx_lab_orders_email ON lab_orders(customer_email);
CREATE INDEX idx_lab_orders_status ON lab_orders(payment_status);
CREATE INDEX idx_lab_orders_created ON lab_orders(created_at DESC);
CREATE INDEX idx_lab_order_items_order ON lab_order_items(order_id);

-- Insert sample lab categories
INSERT INTO lab_categories (name, description, display_order) VALUES
('Hormones', 'Testosterone, estrogen, thyroid, and other hormonal markers', 1),
('Metabolic Health', 'Glucose, insulin, HbA1c, and metabolic markers', 2),
('Cardiovascular', 'Lipid panel, cholesterol, triglycerides, and heart health markers', 3),
('Vitamins & Minerals', 'Vitamin D, B12, iron, magnesium, and other nutrients', 4),
('Inflammation', 'CRP, homocysteine, and inflammatory markers', 5),
('Liver & Kidney', 'Liver enzymes, kidney function markers', 6),
('Complete Blood Count', 'Red blood cells, white blood cells, platelets', 7),
('Thyroid', 'TSH, T3, T4, thyroid antibodies', 8),
('Performance', 'IGF-1, cortisol, DHEA, and performance markers', 9),
('Longevity', 'Advanced markers for longevity and healthspan', 10);

-- Insert sample pre-built panels (similar to Marek's structure)
INSERT INTO lab_panels (name, slug, description, detailed_description, price, panel_type, biomarker_count, best_for, meets_treatment_requirements, is_featured, display_order) VALUES
(
  'Comprehensive Panel',
  'comprehensive-panel',
  'A strong foundation for better health',
  'This panel covers key areas like hormonal balance, metabolic function, cardiovascular health, and organ function, giving you clear insights into your body''s overall well-being. It screens for inflammation, insulin resistance, and lipid health, helping you take control of your long-term wellness.',
  299.00,
  'comprehensive',
  65,
  'Men starting their health optimization journey or establishing a baseline',
  true,
  true,
  1
),
(
  'Complete Panel',
  'complete-panel',
  'A more advanced layer of insight',
  'The Complete Panel includes everything in the Comprehensive Panel, plus additional markers for oxidative stress, blood clotting factors, tumor markers, and deeper organ function insights. This panel provides a more detailed look at hormonal health, vitamin status, and cardiovascular function.',
  499.00,
  'complete',
  100,
  'Men serious about optimizing their health with deeper, more advanced testing',
  true,
  true,
  2
),
(
  'Executive Panel',
  'executive-panel',
  'A top-tier diagnostic panel for peak performance and longevity',
  'Designed by leading experts, this panel offers the most advanced testing available, covering everything in the Complete Panel and more. You''ll gain insight into genetic risk factors, cognitive and dementia risk, micronutrient status, heavy metal exposure, and advanced cardiovascular markers.',
  799.00,
  'executive',
  150,
  'High performers focused on strategic, full-spectrum health optimization',
  true,
  true,
  3
),
(
  'Testosterone Optimization Panel',
  'testosterone-optimization',
  'Comprehensive hormone testing for TRT and optimization',
  'Specifically designed for men considering or currently on testosterone replacement therapy. Includes total testosterone, free testosterone, estradiol, SHBG, LH, FSH, prolactin, DHT, and thyroid markers.',
  249.00,
  'specialty',
  25,
  'Men considering TRT or optimizing current hormone therapy',
  true,
  true,
  4
),
(
  'Metabolic Health Panel',
  'metabolic-health',
  'Deep dive into metabolic function and insulin sensitivity',
  'Comprehensive metabolic testing including fasting glucose, insulin, HbA1c, lipid panel, liver enzymes, and kidney function. Perfect for men concerned about metabolic health, weight management, or diabetes risk.',
  199.00,
  'specialty',
  30,
  'Men focused on weight management and metabolic optimization',
  false,
  false,
  5
),
(
  'Thyroid Complete Panel',
  'thyroid-complete',
  'Complete thyroid function assessment',
  'Includes TSH, Free T3, Free T4, Reverse T3, and thyroid antibodies (TPO and Thyroglobulin). Essential for understanding thyroid function and detecting autoimmune thyroid conditions.',
  179.00,
  'specialty',
  8,
  'Men experiencing fatigue, weight changes, or suspected thyroid issues',
  false,
  false,
  6
);

-- Insert sample individual lab tests
INSERT INTO lab_tests (category_id, name, description, test_code, price, sample_type) 
SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Hormones'),
  'Total Testosterone',
  'Measures total testosterone levels in blood',
  'TT-001',
  39.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Hormones'),
  'Free Testosterone',
  'Measures bioavailable testosterone',
  'FT-001',
  49.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Hormones'),
  'Estradiol (E2)',
  'Measures estrogen levels',
  'E2-001',
  45.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Hormones'),
  'SHBG (Sex Hormone Binding Globulin)',
  'Protein that binds to sex hormones',
  'SHBG-001',
  42.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Hormones'),
  'LH (Luteinizing Hormone)',
  'Hormone that signals testosterone production',
  'LH-001',
  48.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Hormones'),
  'FSH (Follicle Stimulating Hormone)',
  'Important for sperm production',
  'FSH-001',
  48.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Thyroid'),
  'TSH (Thyroid Stimulating Hormone)',
  'Primary thyroid function marker',
  'TSH-001',
  35.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Thyroid'),
  'Free T3',
  'Active thyroid hormone',
  'T3-001',
  42.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Thyroid'),
  'Free T4',
  'Thyroid hormone precursor',
  'T4-001',
  42.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Metabolic Health'),
  'Fasting Glucose',
  'Blood sugar levels',
  'GLU-001',
  28.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Metabolic Health'),
  'HbA1c',
  '3-month average blood sugar',
  'A1C-001',
  38.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Metabolic Health'),
  'Fasting Insulin',
  'Insulin sensitivity marker',
  'INS-001',
  45.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Cardiovascular'),
  'Lipid Panel',
  'Total cholesterol, LDL, HDL, triglycerides',
  'LIP-001',
  42.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Vitamins & Minerals'),
  'Vitamin D (25-OH)',
  'Vitamin D status',
  'VITD-001',
  48.00,
  'Blood'
UNION ALL SELECT 
  (SELECT id FROM lab_categories WHERE name = 'Vitamins & Minerals'),
  'Vitamin B12',
  'B12 levels',
  'B12-001',
  42.00,
  'Blood';

-- Enable Row Level Security (RLS)
ALTER TABLE lab_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_panels ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_panel_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for catalog tables
CREATE POLICY "Public read access for categories" ON lab_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for tests" ON lab_tests FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for panels" ON lab_panels FOR SELECT USING (true);
CREATE POLICY "Public read access for panel tests" ON lab_panel_tests FOR SELECT USING (true);

-- Orders: Users can only see their own orders (by email)
CREATE POLICY "Users can view their own orders" ON lab_orders FOR SELECT USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');
CREATE POLICY "Users can insert their own orders" ON lab_orders FOR INSERT WITH CHECK (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Order items: Users can only see items for their orders
CREATE POLICY "Users can view their own order items" ON lab_order_items FOR SELECT USING (
  order_id IN (
    SELECT id FROM lab_orders WHERE customer_email = current_setting('request.jwt.claims', true)::json->>'email'
  )
);

-- Reviews: Users can only see their own reviews
CREATE POLICY "Users can view their own reviews" ON lab_reviews FOR SELECT USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

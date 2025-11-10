-- Check current lab_results table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'lab_results'
ORDER BY ordinal_position;

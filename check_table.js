const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkTable() {
  // Try to get one record to see the structure
  const { data, error } = await supabase
    .from('lab_results')
    .select('*')
    .limit(1)
  
  if (error) {
    console.log('Error:', error.message)
    console.log('Hint:', error.hint)
  } else {
    console.log('Table columns:', data && data[0] ? Object.keys(data[0]) : 'No data')
  }
  
  // Try inserting without lab_name
  console.log('\nTrying insert without lab_name...')
  const { error: insertError } = await supabase
    .from('lab_results')
    .insert({
      patient_id: 'test',
      patient_name: 'Test Patient',
      patient_dob: '01/01/1980',
      test_date: '2025-01-01',
      biomarkers: []
    })
    .select()
  
  if (insertError) {
    console.log('Insert error:', insertError.message)
  } else {
    console.log('Insert successful!')
  }
}

checkTable()

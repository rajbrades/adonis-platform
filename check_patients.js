const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkPatients() {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .limit(5)
  
  if (error) {
    console.log('Error or table does not exist:', error.message)
  } else {
    console.log('Found patients:', data)
  }
}

checkPatients()

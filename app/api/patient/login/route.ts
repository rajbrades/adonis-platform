import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function normalizeDateOfBirth(date: string): string {
  if (!date) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    const [month, day, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
  return date
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('📦 Received body:', JSON.stringify(body, null, 2))
    
    // Handle multiple possible field names
    const name = body.name || body.full_name || body.fullName
    const dob = body.date_of_birth || body.dob || body.dateOfBirth || body.birthDate
    const password = body.password

    console.log('🔍 Extracted:', { name, dob, hasPassword: !!password })

    if (!name || !dob || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const normalizedDOB = normalizeDateOfBirth(dob)
    console.log('📅 Normalized DOB:', normalizedDOB)

    // Get all patients with matching DOB first
    const { data: patients, error: searchError } = await supabase
      .from('patients')
      .select('*')
      .eq('date_of_birth', normalizedDOB)

    console.log('📊 Found patients:', patients?.length || 0)

    if (searchError || !patients || patients.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Find matching patient by name
    const patient = patients.find(p => 
      p.full_name === name || 
      p.name === name ||
      p.full_name?.replace(',', '') === name.replace(',', '') ||
      p.name?.replace(',', '') === name.replace(',', '')
    )

    if (!patient) {
      console.log('❌ No patient matched name:', name, 'Available:', patients.map(p => p.full_name || p.name))
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('✅ Found patient:', patient.full_name || patient.name)

    const passwordMatch = await bcrypt.compare(password, patient.password_hash)
    console.log('🔐 Password match:', passwordMatch)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    await supabase
      .from('patients')
      .update({ last_login: new Date().toISOString() })
      .eq('id', patient.id)

    return NextResponse.json({
      success: true,
      patient: {
        id: patient.id,
        full_name: patient.full_name || patient.name,
        name: patient.full_name || patient.name,
        email: patient.email,
        date_of_birth: patient.date_of_birth
      }
    })
  } catch (error: any) {
    console.error('💥 Login error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

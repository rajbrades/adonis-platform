import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, dob, password } = await req.json()

    console.log('🔐 Patient login attempt:', { email, dob })

    if (!email || !dob || !password) {
      return NextResponse.json(
        { error: 'Email, date of birth, and password are required' },
        { status: 400 }
      )
    }

    // Query by email and DOB
    const { data: patients, error: searchError } = await supabase
      .from('patients')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('date_of_birth', dob)

    console.log('📊 Found patients:', patients?.length || 0)

    if (searchError || !patients || patients.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const patient = patients[0]

    // Verify password
    const passwordMatch = await bcrypt.compare(password, patient.password_hash)
    console.log('🔐 Password match:', passwordMatch)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Update last login
    await supabase
      .from('patients')
      .update({ last_login: new Date().toISOString() })
      .eq('id', patient.id)

    console.log('✅ Patient logged in:', patient.email)

    return NextResponse.json({
      success: true,
      patient: {
        id: patient.id,
        full_name: patient.full_name || `${patient.first_name} ${patient.last_name}`,
        name: patient.full_name || `${patient.first_name} ${patient.last_name}`,
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

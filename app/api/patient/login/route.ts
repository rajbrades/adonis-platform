import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, dob, password } = body

    if (!name || !dob || !password) {
      return NextResponse.json({ 
        error: 'Name, date of birth, and password are required' 
      }, { status: 400 })
    }

    // Find patient
    const { data: patient, error } = await supabase
      .from('patients')
      .select('*')
      .eq('full_name', name)
      .eq('date_of_birth', dob)
      .single()

    if (error || !patient) {
      return NextResponse.json({ 
        error: 'Invalid credentials' 
      }, { status: 401 })
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, patient.password_hash)

    if (!passwordMatch) {
      return NextResponse.json({ 
        error: 'Invalid credentials' 
      }, { status: 401 })
    }

    // Update last login
    await supabase
      .from('patients')
      .update({ last_login: new Date().toISOString() })
      .eq('id', patient.id)

    // Return patient data (without password hash)
    return NextResponse.json({ 
      success: true,
      patient: {
        id: patient.id,
        full_name: patient.full_name,
        date_of_birth: patient.date_of_birth,
        email: patient.email
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      error: 'Login failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

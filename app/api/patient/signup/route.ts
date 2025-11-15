import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { name, date_of_birth, email, phone, password, consultation_id } = await request.json()

    const hashedPassword = await bcrypt.hash(password, 10)

    // If signing up from consultation, use consultation ID as patient ID
    const patientData: any = {
      full_name: name,
      name: name,
      date_of_birth,
      email,
      phone,
      password_hash: hashedPassword
    }

    // Use consultation ID as patient ID if provided
    if (consultation_id) {
      patientData.id = consultation_id
    }

    const { data: patient, error } = await supabase
      .from('patients')
      .insert(patientData)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already exists or you may have already registered' },
          { status: 400 }
        )
      }
      throw error
    }

    console.log('✅ Patient created:', patient.email, 'ID:', patient.id)

    return NextResponse.json({ 
      success: true, 
      patient: {
        id: patient.id,
        name: patient.full_name || patient.name,
        email: patient.email,
        date_of_birth: patient.date_of_birth
      }
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

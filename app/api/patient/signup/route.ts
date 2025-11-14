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

    const { data: patient, error } = await supabase
      .from('patients')
      .insert({
        full_name: name,
        name: name,
        date_of_birth,
        email,
        phone,
        password_hash: hashedPassword
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    if (consultation_id) {
      await supabase
        .from('consultations')
        .update({ patient_id: patient.id })
        .eq('id', consultation_id)
    }

    return NextResponse.json({ 
      success: true, 
      patient: {
        id: patient.id,
        name: patient.full_name || patient.name,
        email: patient.email
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

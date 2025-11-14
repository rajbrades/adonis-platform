import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { name, date_of_birth, password } = await request.json()

    const { data: patient, error } = await supabase
      .from('patients')
      .select('*')
      .or(`full_name.eq.${name},name.eq.${name}`)
      .eq('date_of_birth', date_of_birth)
      .single()

    if (error || !patient) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const passwordMatch = await bcrypt.compare(password, patient.password_hash)

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
        name: patient.full_name || patient.name,
        email: patient.email
      }
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

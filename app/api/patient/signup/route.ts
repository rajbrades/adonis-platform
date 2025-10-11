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
    const { name, dob, password, email, phone } = body

    if (!name || !dob || !password) {
      return NextResponse.json({ 
        error: 'Name, date of birth, and password are required' 
      }, { status: 400 })
    }

    // Check if patient already exists
    const { data: existing } = await supabase
      .from('patients')
      .select('id')
      .eq('full_name', name)
      .eq('date_of_birth', dob)
      .single()

    if (existing) {
      return NextResponse.json({ 
        error: 'An account with this name and date of birth already exists' 
      }, { status: 400 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create patient account
    const { data: patient, error } = await supabase
      .from('patients')
      .insert({
        full_name: name,
        date_of_birth: dob,
        password_hash: passwordHash,
        email: email || null,
        phone: phone || null
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating patient:', error)
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: 'Account created successfully'
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ 
      error: 'Signup failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const submissionData = {
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      date_of_birth: body.dateOfBirth,
      occupation: body.occupation || null,
      optimization_goals: body.optimizationGoals || [],
      medical_history: body.medicalHistory || {},
      status: 'pending',
      payment_status: 'unpaid'
    }

    const { data, error } = await supabase
      .from('consultation_submissions')
      .insert([submissionData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit consultation', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, submissionId: data.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
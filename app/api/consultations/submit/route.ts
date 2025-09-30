import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Calculate age from date of birth
    const dob = new Date(data.dateOfBirth)
    const today = new Date()
    const age = today.getFullYear() - dob.getFullYear()

    // Prepare data for database
    const consultationData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      date_of_birth: data.dateOfBirth,
      age: age,
      height: data.height || null,
      weight: data.weight || null,
      occupation: data.occupation || null,
      optimization_goals: data.optimizationGoals || [],
      primary_concerns: data.primaryConcerns || null,
      current_medications: data.currentMedications || null,
      allergies: data.allergies || null,
      medical_conditions: data.medicalConditions || [],
      surgeries: data.surgeries || null,
      family_history: data.familyHistory || null,
      previous_hormone_therapy: data.previousHormoneTherapy || null,
      labs_recent: data.labsRecent || null,
      exercise_frequency: data.lifestyle?.exerciseFrequency || null,
      sleep_hours: data.lifestyle?.sleepHours || null,
      stress_level: data.lifestyle?.stressLevel || null,
      alcohol_consumption: data.lifestyle?.alcohol || null,
      smoking: data.lifestyle?.smoking || null,
      diet: data.lifestyle?.diet || null,
      symptoms: data.symptoms || [],
      status: 'pending',
      priority: 'medium'
    }

    // Insert into Supabase
    const { data: result, error } = await supabase
      .from('consultations')
      .insert([consultationData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit consultation', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      submissionId: result.id,
      message: 'Consultation submitted successfully'
    })

  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { ConsultationSubmittedEmail } from '@/lib/emails/consultation-submitted'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const dob = new Date(data.dateOfBirth)
    const today = new Date()
    const age = today.getFullYear() - dob.getFullYear()

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

    if (process.env.RESEND_API_KEY) {
      try {
        console.log('Attempting to send email to:', data.email)
        
        const resend = new Resend(process.env.RESEND_API_KEY)
        const emailResult = await resend.emails.send({
          from: 'Adonis Health <onboarding@resend.dev>',
          to: data.email,
          subject: 'Consultation Submitted Successfully - Adonis Health',
          html: ConsultationSubmittedEmail({
            patientName: data.firstName,
            consultationId: result.id,
            goals: data.optimizationGoals || [],
            submittedDate: new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit'
            })
          })
        })
        
        console.log('✅ Confirmation email sent')
      } catch (emailError) {
        console.error('❌ Failed to send confirmation email:', emailError)
      }
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

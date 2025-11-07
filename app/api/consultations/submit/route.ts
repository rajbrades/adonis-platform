import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { ConsultationSubmittedEmail } from '@/lib/emails/consultation-submitted'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  console.log('📨 Consultation submission received')
  
  try {
    const data = await request.json()
    console.log('📋 Data received:', {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      goals: data.optimizationGoals?.length || 0
    })

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: consultation, error } = await supabase
      .from('consultations')
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          date_of_birth: data.dateOfBirth,
          height: data.height || null,
          weight: data.weight || null,
          occupation: data.occupation || null,
          optimization_goals: data.optimizationGoals || [],
          medical_conditions: data.medicalConditions || [],
          symptoms: data.symptoms || [],
          current_medications: data.currentMedications || null,
          allergies: data.allergies || null,
          surgeries: data.surgeries || null,
          family_history: data.familyHistory || null,
          previous_hormone_therapy: data.previousHormoneTherapy || null,
          labs_recent: data.labsRecent || null,
          lifestyle: data.lifestyle || {},
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('✅ Consultation saved:', consultation.id)

    // Send confirmation email
    try {
      const emailHtml = ConsultationSubmittedEmail({
        patientName: data.firstName,
        consultationId: consultation.id,
        goals: data.optimizationGoals || [],
        submittedDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      })

      await resend.emails.send({
        from: 'ADONIS Health <noreply@getadonishealth.com>',
        to: data.email,
        subject: '✓ Your Health Assessment Has Been Received',
        html: emailHtml
      })
      
      console.log('✅ Confirmation email sent to:', data.email)
    } catch (emailError) {
      console.error('⚠️ Email error:', emailError)
    }

    return NextResponse.json({ 
      success: true, 
      consultation 
    })

  } catch (error: any) {
    console.error('❌ API error:', error)
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    )
  }
}

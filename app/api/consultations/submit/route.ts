import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { ConsultationSubmittedEmail } from '@/lib/emails/consultation-submitted'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  console.log('📨 Consultation submission received')
  
  try {
    const data = await request.json()
    console.log('📋 Data received:', {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      goals: data.optimizationGoals?.length || 0,
      labFiles: data.lab_files?.length || 0
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
          current_supplements: data.currentSupplements || null,
          allergies: data.allergies || null,
          surgeries: data.surgeries || null,
          family_history: data.familyHistory || null,
          previous_hormone_therapy: data.previousHormoneTherapy || null,
          labs_recent: data.labsRecent || null,
          lab_files: data.lab_files || [],
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

    // Send confirmation email if Resend is configured
    if (resend) {
      try {
        const submittedDate = new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })

        const emailHtml = ConsultationSubmittedEmail({
          patientName: data.firstName,
          consultationId: consultation.id,
          goals: data.optimizationGoals || [],
          submittedDate
        })

        const emailText = `
Hi ${data.firstName},

Thank you for submitting your health optimization consultation with ADONIS.

Your Optimization Goals:
${(data.optimizationGoals || []).map((g: string) => `• ${g}`).join('\n')}

What happens next?
1. A licensed provider will review your consultation within 24-48 hours
2. You'll receive an email with their recommendations and lab test suggestions
3. You can then order any recommended labs directly from that email

Consultation ID: ${consultation.id}
Submitted: ${submittedDate}

Questions? Reply to this email or contact us at support@getadonishealth.com

© 2025 ADONIS Health. All rights reserved.
        `

        await resend.emails.send({
          from: 'ADONIS Health <noreply@getadonishealth.com>',
          replyTo: 'support@getadonishealth.com',
          to: data.email,
          subject: 'Your ADONIS Health Assessment Has Been Received',
          html: emailHtml,
          text: emailText
        })
        
        console.log('✅ Confirmation email sent to:', data.email)
      } catch (emailError) {
        console.error('⚠️ Email error:', emailError)
      }
    } else {
      console.log('⚠️ Resend not configured, skipping email')
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

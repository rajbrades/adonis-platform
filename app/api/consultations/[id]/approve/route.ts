import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { recommendedLabs, providerNotes, providerName } = body

    console.log('Approving consultation:', id)
    console.log('Recommended labs:', recommendedLabs)

    // Update consultation in database with recommended labs
    const { data: consultation, error: updateError } = await supabase
      .from('consultations')
      .update({
        status: 'approved',
        provider_notes: providerNotes,
        recommended_labs: recommendedLabs,
        reviewed_at: new Date().toISOString(),
        reviewed_by: providerName
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update consultation' },
        { status: 500 }
      )
    }

    console.log('Consultation updated, sending email to:', consultation.email)

    // Send email to patient
    try {
      const emailResult = await resend.emails.send({
        from: 'Adonis Health <onboarding@resend.dev>',
        to: consultation.email,
        subject: 'Your Health Optimization Plan is Ready',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #EAB308;">Your Personalized Health Plan</h1>
            
            <p>Hi ${consultation.first_name},</p>
            
            <p>Great news! Our medical team has reviewed your health assessment and created a personalized optimization plan for you.</p>
            
            <h2 style="color: #EAB308;">Recommended Lab Tests</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${recommendedLabs.map((lab: any) => `
                <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 6px;">
                  <h3 style="margin: 0 0 10px 0;">${lab.name}</h3>
                  <p style="margin: 5px 0; color: #666;">${lab.description}</p>
                  <p style="margin: 10px 0; font-size: 18px; font-weight: bold; color: #EAB308;">$${lab.price}</p>
                </div>
              `).join('')}
            </div>
            
            <h2 style="color: #EAB308;">Provider Notes</h2>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 8px;">${providerNotes}</p>
            
            <div style="margin: 30px 0; text-align: center;">
              <p style="margin-bottom: 20px; font-size: 16px;">Ready to move forward with your personalized health plan?</p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://adonis-platform.vercel.app'}/patient?link=${id}" 
                 style="background: linear-gradient(to right, #EAB308, #CA8A04); color: black; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                View Full Details & Proceed
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px;">This link will create your secure patient account and give you access to your complete treatment plan, lab ordering, and ongoing care.</p>
            <p style="color: #666; font-size: 14px;">Questions? Reply to this email or contact our support team.</p>
          </div>
        `
      })

      console.log('Email sent successfully:', emailResult)

    } catch (emailError: any) {
      console.error('Email send error:', emailError)
      console.error('Email error message:', emailError?.message)
      console.error('Email error details:', JSON.stringify(emailError, null, 2))
      console.error('Resend API Key present:', !!process.env.RESEND_API_KEY)
      console.error('Resend API Key length:', process.env.RESEND_API_KEY?.length)
      // Don't fail the whole request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation approved and patient notified'
    })

  } catch (error: any) {
    console.error('Approval error:', error)
    console.error('Approval error message:', error?.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

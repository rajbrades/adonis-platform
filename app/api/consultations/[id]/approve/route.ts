import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

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

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://adonis-platform.vercel.app'
        
        // Link directly to signup page with consultation parameter
        const signupLink = `${baseUrl}/patient/signup?consultation=${id}`
        
        const emailResult = await resend.emails.send({
          from: `Adonis Health <${fromEmail}>`,
          to: consultation.email,
          subject: 'Your Health Optimization Plan is Ready 🎯',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Your Health Optimization Plan</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background-color: #000000;">
              <div style="background: linear-gradient(to bottom right, #000000, #1a1a1a, #000000); min-height: 100vh; padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
                  
                  <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="color: #EAB308; font-size: 32px; font-weight: 800; margin: 0 0 10px 0; letter-spacing: 2px;">ADONIS</h1>
                    <div style="width: 60px; height: 3px; background: linear-gradient(to right, #EAB308, #CA8A04); margin: 0 auto;"></div>
                  </div>

                  <h2 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">Hi ${consultation.first_name},</h2>
                  
                  <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                    Great news! Our medical team has reviewed your health assessment and created a personalized optimization plan for you.
                  </p>

                  <div style="margin: 30px 0;">
                    <h3 style="color: #EAB308; font-size: 20px; font-weight: 700; margin: 0 0 20px 0;">📋 Recommended Lab Tests</h3>
                    ${recommendedLabs.map((lab: any) => `
                      <div style="background: linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(202, 138, 4, 0.05)); border: 1px solid rgba(234, 179, 8, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
                        <h4 style="color: #EAB308; font-size: 18px; font-weight: 700; margin: 0 0 8px 0;">${lab.name}</h4>
                        <p style="color: rgba(255, 255, 255, 0.7); font-size: 14px; margin: 0 0 12px 0; line-height: 1.5;">${lab.description}</p>
                        <div style="display: inline-block; background-color: rgba(234, 179, 8, 0.2); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 8px 16px;">
                          <span style="color: #EAB308; font-size: 20px; font-weight: 800;">$${lab.price}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <div style="background: linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(202, 138, 4, 0.05)); border: 1px solid rgba(234, 179, 8, 0.2); border-radius: 12px; padding: 20px; margin: 30px 0;">
                    <h3 style="color: #EAB308; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">💬 Provider Notes</h3>
                    <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px; line-height: 1.6; margin: 0;">${providerNotes}</p>
                  </div>

                  <div style="text-align: center; margin: 40px 0;">
                    <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0 0 20px 0;">Ready to move forward with your personalized health plan?</p>
                    <a href="${signupLink}" 
                       style="display: inline-block; background: linear-gradient(to right, #EAB308, #CA8A04); color: #000000; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
                      Create Account & Get Started
                    </a>
                  </div>
                  
                  <p style="color: rgba(255, 255, 255, 0.5); font-size: 13px; text-align: center; margin: 30px 0 0 0; line-height: 1.6;">
                    This link will create your secure patient account and give you access to your complete treatment plan, lab ordering, and ongoing care.
                  </p>
                </div>
              </div>
            </body>
            </html>
          `
        })

        console.log('Email sent successfully:', emailResult)

      } catch (emailError: any) {
        console.error('Email send error:', emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation approved and patient notified'
    })

  } catch (error: any) {
    console.error('Approval error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

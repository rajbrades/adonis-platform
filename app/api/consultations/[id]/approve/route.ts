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

    // Send email to patient with proper styling
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const emailResult = await resend.emails.send({
          from: 'Adonis Health <onboarding@resend.dev>',
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
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #000000;">
              <div style="background: linear-gradient(to bottom right, #000000, #1a1a1a, #000000); min-height: 100vh; padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
                  
                  <!-- Logo/Header -->
                  <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="color: #EAB308; font-size: 32px; font-weight: 800; margin: 0 0 10px 0; letter-spacing: 2px;">ADONIS</h1>
                    <div style="width: 60px; height: 3px; background: linear-gradient(to right, #EAB308, #CA8A04); margin: 0 auto;"></div>
                  </div>

                  <!-- Greeting -->
                  <h2 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">Hi ${consultation.first_name},</h2>
                  
                  <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                    Great news! Our medical team has reviewed your health assessment and created a personalized optimization plan for you.
                  </p>

                  <!-- Recommended Labs Section -->
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

                  <!-- Provider Notes -->
                  ${providerNotes ? `
                    <div style="margin: 30px 0;">
                      <h3 style="color: #EAB308; font-size: 20px; font-weight: 700; margin: 0 0 15px 0;">💬 Provider Notes</h3>
                      <div style="background-color: rgba(255, 255, 255, 0.05); border-left: 4px solid #EAB308; padding: 20px; border-radius: 8px;">
                        <p style="color: rgba(255, 255, 255, 0.8); font-size: 15px; line-height: 1.6; margin: 0;">${providerNotes}</p>
                      </div>
                    </div>
                  ` : ''}

                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 40px 0;">
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0 0 20px 0;">Ready to move forward with your personalized health plan?</p>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://adonis-platform.vercel.app'}/patient?link=${id}" 
                       style="display: inline-block; background: linear-gradient(to right, #EAB308, #CA8A04); color: #000000; font-size: 16px; font-weight: 700; text-decoration: none; padding: 16px 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(234, 179, 8, 0.3);">
                      View Full Details & Get Started
                    </a>
                  </div>

                  <!-- Footer Info -->
                  <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="color: rgba(255, 255, 255, 0.6); font-size: 13px; line-height: 1.6; margin: 0 0 10px 0;">
                      This secure link will create your patient account and give you access to your complete treatment plan, lab ordering, and ongoing care.
                    </p>
                    <p style="color: rgba(255, 255, 255, 0.5); font-size: 12px; margin: 0;">
                      Questions? Reply to this email or contact our support team.
                    </p>
                  </div>

                  <!-- Footer -->
                  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="color: rgba(255, 255, 255, 0.4); font-size: 12px; margin: 0;">
                      © 2025 Adonis Health. All rights reserved.
                    </p>
                  </div>

                </div>
              </div>
            </body>
            </html>
          `
        })

        console.log('Email sent successfully:', emailResult)

      } catch (emailError: any) {
        console.error('Email send error:', emailError)
        console.error('Email error message:', emailError?.message)
        // Don't fail the whole request if email fails
      }
    } else {
      console.warn('RESEND_API_KEY not set, skipping email notification')
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

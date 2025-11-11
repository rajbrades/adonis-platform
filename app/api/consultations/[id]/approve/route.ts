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
      return NextResponse.json({ error: 'Failed to update consultation' }, { status: 500 })
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const signupLink = `https://getadonishealth.com/patient/signup?consultation=${id}`
        
        await resend.emails.send({
          from: 'Adonis Health <onboarding@resend.dev>',
          to: consultation.email,
          subject: 'Your Health Optimization Plan is Ready 🎯',
          html: `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #000000;">
              <div style="background: linear-gradient(to bottom right, #000000, #1a1a1a, #000000); min-height: 100vh; padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px;">
                  
                  <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="color: #EAB308; font-size: 32px; font-weight: 800; margin: 0 0 10px 0;">ADONIS</h1>
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
                        <p style="color: rgba(255, 255, 255, 0.7); font-size: 14px; margin: 0 0 12px 0;">${lab.description}</p>
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
                    <a href="${signupLink}" 
                       style="display: inline-block; background: linear-gradient(to right, #EAB308, #CA8A04); color: #000000; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
                      Create Account & Get Started
                    </a>
                  </div>
                  
                  <p style="color: rgba(255, 255, 255, 0.5); font-size: 13px; text-align: center; margin: 30px 0 0 0;">
                    Questions? Reply to this email anytime.
                  </p>
                </div>
              </div>
            </body>
            </html>
          `
        })
      } catch (e) {
        console.error('Email error:', e)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { notes, providerId } = await request.json()

    // Update consultation status
    const { data: consultation, error } = await supabase
      .from('consultations')
      .update({
        status: 'approved',
        provider_notes: notes,
        provider_id: providerId,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    // Send approval email with patient portal link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://getadonishealth.com'
    
    await resend.emails.send({
      from: 'ADONIS Health <noreply@getadonishealth.com>',
      to: consultation.email,
      subject: 'Your ADONIS Consultation is Approved',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FBBF24;">Consultation Approved</h1>
          <p>Hi ${consultation.first_name},</p>
          <p>Great news! Your consultation has been reviewed and approved by our medical team.</p>
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Access your patient portal using the link below</li>
            <li>Review your personalized treatment plan</li>
            <li>Order your lab panel to get started</li>
          </ol>
          <div style="margin: 30px 0;">
            <a href="${baseUrl}/patient?link=${params.id}" 
               style="background: #FBBF24; color: black; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Access Your Portal
            </a>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 40px;">
            If you have any questions, reply to this email or contact us at support@getadonishealth.com
          </p>
        </div>
      `
    })

    return NextResponse.json({ success: true, data: consultation })
  } catch (error: any) {
    console.error('Approval error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

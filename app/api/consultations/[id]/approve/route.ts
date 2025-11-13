import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { notes, providerId } = await request.json()

    const { data: consultation, error } = await supabase
      .from('consultations')
      .update({
        status: 'approved',
        provider_notes: notes,
        provider_id: providerId,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://getadonishealth.com'
    
    await resend.emails.send({
      from: 'ADONIS Health <noreply@getadonishealth.com>',
      to: consultation.email,
      subject: 'Your ADONIS Consultation is Approved - Choose Your Lab Panel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FBBF24;">Consultation Approved!</h1>
          <p>Hi ${consultation.first_name},</p>
          <p>Great news! Your consultation has been reviewed and approved by our medical team.</p>
          <p><strong>Next Step: Choose Your Lab Panel</strong></p>
          <p>We've recommended lab panels based on your health goals. Click below to select the panel that's right for you:</p>
          <div style="margin: 30px 0;">
            <a href="${baseUrl}/checkout/${id}" 
               style="background: #FBBF24; color: black; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Choose Your Lab Panel
            </a>
          </div>
          <p><strong>Our Lab Panels:</strong></p>
          <ul>
            <li><strong>Essential Panel ($299)</strong> - Core biomarkers</li>
            <li><strong>Comprehensive Panel ($499)</strong> - Extended analysis</li>
            <li><strong>Elite Panel ($799)</strong> - Ultimate optimization</li>
          </ul>
          <p style="color: #666; font-size: 14px; margin-top: 40px;">
            Questions? Reply to this email or contact support@getadonishealth.com
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

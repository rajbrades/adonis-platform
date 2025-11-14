import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id
    
    const { recommendedLabs, providerNotes, providerName } = await request.json()

    const { data: consultation, error } = await supabase
      .from('consultations')
      .update({
        status: 'approved',
        provider_notes: providerNotes,
        recommended_labs: recommendedLabs,
        reviewed_by: providerName,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    await resend.emails.send({
      from: 'ADONIS Health <noreply@getadonishealth.com>',
      to: consultation.email,
      subject: 'Your Health Optimization Plan is Ready',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FBBF24;">Your Personalized Health Plan is Ready!</h1>
          <p>Hi ${consultation.first_name},</p>
          <p>Great news! Our medical team has reviewed your consultation and created a personalized health optimization plan for you.</p>
          
          <div style="margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/checkout/${id}" 
               style="background: #FBBF24; color: black; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Choose Your Lab Panel
            </a>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true, consultation })
  } catch (error: any) {
    console.error('Error approving consultation:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

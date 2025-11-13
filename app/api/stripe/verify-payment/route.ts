import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    const consultationId = session.metadata?.consultationId

    const { data: consultation, error } = await supabase
      .from('consultations')
      .update({
        payment_status: 'paid',
        payment_date: new Date().toISOString(),
        stripe_payment_id: session.payment_intent as string,
      })
      .eq('id', consultationId)
      .select()
      .single()

    if (error) throw error

    await resend.emails.send({
      from: 'ADONIS Health <noreply@getadonishealth.com>',
      to: consultation.email,
      subject: 'Your Lab Requisition is Ready',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FBBF24;">Your Lab Requisition</h1>
          <p>Hi ${consultation.first_name},</p>
          <p>Thank you for your payment! Your lab requisition has been generated.</p>
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Download your requisition form (attached or in patient portal)</li>
            <li>Visit any Quest Diagnostics location - no appointment needed</li>
            <li>Present your requisition and ID</li>
            <li>Results will be ready in 3-5 business days</li>
          </ol>
          <p style="color: #666; font-size: 14px; margin-top: 40px;">
            Find a Quest location: <a href="https://www.questdiagnostics.com">QuestDiagnostics.com</a>
          </p>
        </div>
      `
    })

    return NextResponse.json({ success: true, consultation })
  } catch (error: any) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

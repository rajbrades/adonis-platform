import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { generateRequisitionPDF } from '@/lib/pdf/generate-requisition'

const resend = new Resend(process.env.RESEND_API_KEY)

const TEST_FEATURES: Record<string, string[]> = {
  'Essential Panel': [
    'Hormone Panel (Testosterone, Estradiol, DHEA)',
    'Thyroid Function (TSH, T3, T4)',
    'Metabolic Panel (Glucose, HbA1c, Lipids)',
    'Vitamin D',
    'Complete Blood Count'
  ],
  'Comprehensive Panel': [
    'Everything in Essential Panel',
    'Advanced Hormone Panel',
    'Liver & Kidney Function',
    'Inflammation Markers (CRP)',
    'Vitamins & Minerals',
    'PSA (Prostate Health)'
  ],
  'Elite Panel': [
    'Everything in Comprehensive Panel',
    'Advanced Cardiovascular Markers',
    'Insulin Resistance Testing',
    'Cortisol & Stress Hormones',
    'Growth Hormone Markers',
    'Nutrient Optimization Panel'
  ]
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    const consultationId = session.metadata?.consultationId
    
    if (!consultationId) {
      return NextResponse.json({ error: 'Consultation ID not found' }, { status: 400 })
    }

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

    // Get panel info
    const recommendedLab = consultation.recommended_labs?.[0]
    const panelName = recommendedLab?.name || 'Comprehensive Panel'
    const tests = recommendedLab?.features || TEST_FEATURES[panelName] || TEST_FEATURES['Comprehensive Panel']

    // Generate PDF (stores in private bucket)
    const pdfUrl = await generateRequisitionPDF({
      patientName: consultation.first_name + ' ' + (consultation.last_name || ''),
      dateOfBirth: consultation.date_of_birth || 'N/A',
      email: consultation.email,
      phone: consultation.phone || 'N/A',
      panelName,
      orderDate: new Date().toLocaleDateString(),
      orderId: consultationId.slice(0, 8).toUpperCase(),
      tests
    })

    // Update consultation with PDF filename
    await supabase
      .from('consultations')
      .update({ requisition_pdf_url: pdfUrl })
      .eq('id', consultationId)

    // Send email directing to portal
    await resend.emails.send({
      from: 'ADONIS Health <noreply@getadonishealth.com>',
      to: consultation.email,
      subject: 'Your Lab Requisition is Ready',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FCD34D;">Your Lab Requisition is Ready!</h1>
          <p>Hi ${consultation.first_name},</p>
          <p>Thank you for your payment! Your lab requisition has been securely generated and is ready to download.</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="margin-top: 0; color: #111;">📄 Access Your Requisition</h3>
            <p style="color: #666; margin-bottom: 15px;">Log in to your patient portal to download your requisition form</p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/patient/login" 
               style="display: inline-block; background: #FCD34D; color: #000; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Access Patient Portal
            </a>
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ol style="line-height: 1.8; color: #333;">
            <li>Log in to your patient portal using the button above</li>
            <li>Download and print your requisition form</li>
            <li>Visit any Quest Diagnostics location - no appointment needed</li>
            <li>Present your requisition and photo ID</li>
            <li>Results will be ready in 3-5 business days</li>
          </ol>
          
          <p style="color: #666; font-size: 14px; margin-top: 40px;">
            Find a Quest location: <a href="https://www.questdiagnostics.com" style="color: #FCD34D;">QuestDiagnostics.com</a>
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

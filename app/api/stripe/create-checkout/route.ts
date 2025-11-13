import { NextResponse } from 'next/server'
import { stripe, LAB_PANELS } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { consultationId, panelType } = await request.json()

    const { data: consultation, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', consultationId)
      .single()

    if (error || !consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    const panel = LAB_PANELS[panelType as keyof typeof LAB_PANELS]
    if (!panel) {
      return NextResponse.json({ error: 'Invalid panel type' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: panel.name,
              description: panel.description,
            },
            unit_amount: panel.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://getadonishealth.com'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://getadonishealth.com'}/checkout/${consultationId}`,
      customer_email: consultation.email,
      metadata: {
        consultationId,
        panelType,
      },
    })

    await supabase
      .from('consultations')
      .update({
        stripe_session_id: session.id,
        lab_panel_type: panelType,
        lab_panel_price: panel.price,
      })
      .eq('id', consultationId)

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import bcrypt from 'bcryptjs'

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

    // Update consultation
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

    // Auto-create patient record with same ID
    const temporaryPassword = Math.random().toString(36).slice(-8) + 'A1!' // Simple temp password
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10)

    const { error: patientError } = await supabase
      .from('patients')
      .insert({
        id: consultation.id, // Same ID as consultation!
        email: consultation.email,
        full_name: `${consultation.first_name} ${consultation.last_name}`,
        name: `${consultation.first_name} ${consultation.last_name}`,
        date_of_birth: consultation.date_of_birth,
        password_hash: hashedPassword,
        created_at: new Date().toISOString()
      })

    // Ignore duplicate key errors (patient already exists)
    if (patientError && !patientError.message.includes('duplicate')) {
      console.error('Error creating patient:', patientError)
    } else {
      console.log('✅ Patient record created:', consultation.email)
    }

    const totalPrice = recommendedLabs.reduce((sum: any, lab: any) => sum + (lab.price || 0), 0)

    await resend.emails.send({
      from: 'ADONIS Health <noreply@getadonishealth.com>',
      to: consultation.email,
      subject: 'Your Health Optimization Plan is Ready',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FBBF24;">Your Personalized Health Plan is Ready!</h1>
          <p>Hi ${consultation.first_name},</p>
          <p>Great news! Our medical team has reviewed your consultation and created a personalized health optimization plan for you.</p>
          
          ${providerNotes ? `
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #111;">Provider Notes:</h3>
              <p style="white-space: pre-wrap; color: #333;">${providerNotes}</p>
            </div>
          ` : ''}
          
          <h3 style="color: #111;">Recommended Lab Panel${recommendedLabs.length > 1 ? 's' : ''}:</h3>
          ${recommendedLabs.map((lab: any) => `
            <div style="background: #f9fafb; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #FBBF24;">
              <h4 style="margin: 0 0 10px 0; color: #111; font-size: 18px;">${lab.name}</h4>
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">${lab.description}</p>
              <p style="margin: 0; color: #FBBF24; font-size: 24px; font-weight: bold;">$${lab.price}</p>
            </div>
          `).join('')}
          
          <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; color: #111;">Total Investment:</span>
              <span style="font-size: 28px; font-weight: bold; color: #FBBF24;">$${totalPrice}</span>
            </div>
          </div>
          
          <div style="background: #1F2937; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #FBBF24;">
            <h4 style="margin: 0 0 10px 0; color: #FBBF24;">Your Login Credentials</h4>
            <p style="margin: 5px 0; color: #E5E7EB;"><strong>Email:</strong> ${consultation.email}</p>
            <p style="margin: 5px 0; color: #E5E7EB;"><strong>Temporary Password:</strong> <code style="background: #374151; padding: 4px 8px; border-radius: 4px; color: #FBBF24;">${temporaryPassword}</code></p>
            <p style="margin: 10px 0 0 0; color: #9CA3AF; font-size: 12px;">You can change this password after logging in.</p>
          </div>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/patient/login" 
               style="background: #FBBF24; color: black; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
              Login to Your Portal
            </a>
          </div>
          
          <h3 style="color: #111;">What Happens Next:</h3>
          <ol style="color: #333; line-height: 1.8;">
            <li><strong>Login to Your Portal</strong> - Use the credentials above</li>
            <li><strong>Complete Payment</strong> - Secure checkout for your lab panel${recommendedLabs.length > 1 ? 's' : ''}</li>
            <li><strong>Receive Lab Requisition</strong> - Get your order form via email</li>
            <li><strong>Visit Quest Diagnostics</strong> - Any location, no appointment needed</li>
            <li><strong>Get Results</strong> - View comprehensive analysis in your portal</li>
          </ol>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Questions? Reply to this email or contact us at support@getadonishealth.com
          </p>
        </div>
      `
    })

    return NextResponse.json({ success: true, consultation })
  } catch (error: any) {
    console.error('Error approving consultation:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

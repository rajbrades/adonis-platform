import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  console.log('📨 Consultation submission received')
  
  try {
    const data = await request.json()
    console.log('📋 Data received:', {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      goals: data.optimizationGoals?.length || 0
    })

    // Check if Supabase credentials exist
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL')
      return NextResponse.json(
        { error: 'Server configuration error: Missing Supabase URL' },
        { status: 500 }
      )
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY')
      return NextResponse.json(
        { error: 'Server configuration error: Missing service key' },
        { status: 500 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    console.log('🔌 Supabase client created')

    // Insert consultation into database
    const { data: consultation, error } = await supabase
      .from('consultations')
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          date_of_birth: data.dateOfBirth,
          height: data.height || null,
          weight: data.weight || null,
          occupation: data.occupation || null,
          optimization_goals: data.optimizationGoals || [],
          medical_conditions: data.medicalConditions || [],
          symptoms: data.symptoms || [],
          current_medications: data.currentMedications || null,
          allergies: data.allergies || null,
          surgeries: data.surgeries || null,
          family_history: data.familyHistory || null,
          previous_hormone_therapy: data.previousHormoneTherapy || null,
          labs_recent: data.labsRecent || null,
          lifestyle: data.lifestyle || {},
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('✅ Consultation saved:', consultation.id)

    return NextResponse.json({ 
      success: true, 
      consultation 
    })

  } catch (error: any) {
    console.error('❌ API error:', error)
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    )
  }
}

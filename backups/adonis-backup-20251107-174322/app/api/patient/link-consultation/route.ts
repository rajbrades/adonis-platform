import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { consultationId } = await request.json()

    if (!consultationId) {
      return NextResponse.json(
        { error: 'Consultation ID required' },
        { status: 400 }
      )
    }

    // Update consultation with clerk_user_id
    const { data, error } = await supabase
      .from('consultations')
      .update({ clerk_user_id: userId })
      .eq('id', consultationId)
      .select()
      .single()

    if (error) {
      console.error('Link consultation error:', error)
      return NextResponse.json(
        { error: 'Failed to link consultation' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      consultation: data
    })

  } catch (error) {
    console.error('Link consultation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

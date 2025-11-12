import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Consultation ID required' }, { status: 400 })
    }

    const { data: consultation, error } = await supabase
      .from('consultations')
      .select('id, first_name, last_name, email, phone')
      .eq('id', id)
      .single()

    if (error || !consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    return NextResponse.json({ consultation })
  } catch (error) {
    console.error('Error fetching consultation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

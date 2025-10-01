import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('lab_panels')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch lab panels' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])

  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

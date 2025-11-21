import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('lab_panels')
      .select('*')
      .order('name')

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching lab panels:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

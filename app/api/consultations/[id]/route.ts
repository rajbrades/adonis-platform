import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { data: consultation, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', resolvedParams.id)
      .single()

    if (error) throw error

    return NextResponse.json(consultation)
  } catch (error: any) {
    console.error('Error fetching consultation:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

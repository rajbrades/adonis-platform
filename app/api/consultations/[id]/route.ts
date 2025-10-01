import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { id } = await params;
    
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching consultation:', error);
      return NextResponse.json({ error: 'Failed to fetch consultation' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
    }

    const formattedData = {
      id: data.id,
      patient_name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Unknown Patient',
      patient_email: data.email || '',
      chief_complaint: data.chief_complaint || '',
      created_at: data.created_at,
      status: data.status || 'pending',
      recommended_labs: data.recommended_labs,
      lab_results_ready: data.lab_results_ready || false,
      lab_results_count: data.lab_results_count || 0
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Failed to fetch consultation' }, { status: 500 });
  }
}

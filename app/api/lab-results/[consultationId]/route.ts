// app/api/lab-results/[consultationId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { 
  getLabResults, 
  updateLabResult, 
  deleteLabResult,
  markLabResultsViewed 
} from '@/lib/supabase-storage';

interface RouteParams {
  params: Promise<{ consultationId: string }>;
}

// GET lab results for a consultation
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { consultationId } = await params;
    const results = await getLabResults(consultationId);
    
    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error fetching lab results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lab results' },
      { status: 500 }
    );
  }
}

// Update lab result (status, notes, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { consultationId } = await params;
    const body = await request.json();
    const { labResultId, ...updates } = body;

    if (!labResultId) {
      return NextResponse.json(
        { error: 'Lab result ID is required' },
        { status: 400 }
      );
    }

    const success = await updateLabResult(labResultId, updates);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update lab result' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lab result updated successfully'
    });
  } catch (error) {
    console.error('Error updating lab result:', error);
    return NextResponse.json(
      { error: 'Failed to update lab result' },
      { status: 500 }
    );
  }
}

// Mark lab results as viewed
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { consultationId } = await params;
    const body = await request.json();
    const { viewedBy } = body;

    await markLabResultsViewed(consultationId, viewedBy || 'patient');

    return NextResponse.json({
      success: true,
      message: 'Lab results marked as viewed'
    });
  } catch (error) {
    console.error('Error marking lab results as viewed:', error);
    return NextResponse.json(
      { error: 'Failed to mark lab results as viewed' },
      { status: 500 }
    );
  }
}

// Delete a lab result
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { consultationId } = await params;
    const { searchParams } = new URL(request.url);
    const labResultId = searchParams.get('id');
    const filePath = searchParams.get('path');

    if (!labResultId || !filePath) {
      return NextResponse.json(
        { error: 'Lab result ID and file path are required' },
        { status: 400 }
      );
    }

    const success = await deleteLabResult(labResultId, filePath);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete lab result' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lab result deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting lab result:', error);
    return NextResponse.json(
      { error: 'Failed to delete lab result' },
      { status: 500 }
    );
  }
}


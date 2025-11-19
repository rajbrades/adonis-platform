import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { parseQuestPDF } from '@/lib/parsers/lab-pdf-parser'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ consultationId: string }> }
) {
  try {
    const resolvedParams = await params
    const consultationId = resolvedParams.consultationId

    console.log('📋 Parsing uploaded labs for consultation:', consultationId)

    const { data: consultation, error: consultationError } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', consultationId)
      .single()

    if (consultationError) {
      console.error('Consultation fetch error:', consultationError)
      return NextResponse.json({ error: `Database error: ${consultationError.message}` }, { status: 500 })
    }

    if (!consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    if (!consultation.lab_files || consultation.lab_files.length === 0) {
      return NextResponse.json({ error: 'No lab files uploaded' }, { status: 400 })
    }

    console.log(`📎 Found ${consultation.lab_files.length} uploaded file(s)`)

    const allBiomarkers: any[] = []
    let latestTestDate = ''

    for (let i = 0; i < consultation.lab_files.length; i++) {
      const fileUrl = consultation.lab_files[i]
      try {
        const response = await fetch(fileUrl)
        if (!response.ok) {
          console.error(`Failed to fetch PDF (${response.status}): ${fileUrl}`)
          continue
        }

        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        
        const parsed = await parseQuestPDF(buffer)
        
        allBiomarkers.push(...parsed.biomarkers)
        
        if (!latestTestDate || parsed.testDate > latestTestDate) {
          latestTestDate = parsed.testDate
        }

        console.log(`✅ Parsed ${parsed.biomarkers.length} biomarkers from file ${i + 1}`)
      } catch (error: any) {
        console.error(`Error parsing PDF ${i + 1}:`, error.message)
      }
    }

    if (allBiomarkers.length === 0) {
      return NextResponse.json({ 
        error: 'No biomarkers could be extracted from PDFs'
      }, { status: 400 })
    }

    console.log(`Creating lab_results record with ${allBiomarkers.length} biomarkers`)

    const { data: labResult, error: labError } = await supabase
      .from('lab_results')
      .insert({
        user_id: consultationId,
        patient_name: `${consultation.first_name} ${consultation.last_name}`,
        patient_dob: consultation.date_of_birth,
        panel_name: 'Quest Diagnostics - Patient Uploaded',
        test_date: latestTestDate || new Date().toISOString().split('T')[0],
        pdf_url: consultation.lab_files[0],
        biomarkers: allBiomarkers,
        uploaded_by: 'Provider Portal'
      })
      .select()
      .single()

    if (labError) {
      console.error('Error creating lab results:', labError)
      return NextResponse.json({ 
        error: `Failed to save lab results: ${labError.message}`
      }, { status: 500 })
    }

    console.log(`✅ Created lab_results record: ${labResult.id}`)

    return NextResponse.json({ 
      success: true,
      labResultId: labResult.id,
      biomarkerCount: allBiomarkers.length
    })

  } catch (error: any) {
    console.error('❌ Unexpected error:', error)
    return NextResponse.json({ 
      error: error.message
    }, { status: 500 })
  }
}

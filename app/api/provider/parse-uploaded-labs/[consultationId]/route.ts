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

    // Fetch consultation with lab_files
    const { data: consultation, error: consultationError } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', consultationId)
      .single()

    if (consultationError || !consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    if (!consultation.lab_files || consultation.lab_files.length === 0) {
      return NextResponse.json({ error: 'No lab files uploaded' }, { status: 400 })
    }

    console.log(`📎 Found ${consultation.lab_files.length} uploaded file(s)`)

    // Parse each PDF
    const allBiomarkers: any[] = []
    let latestTestDate = ''

    for (const fileUrl of consultation.lab_files) {
      try {
        // Fetch PDF from URL
        const response = await fetch(fileUrl)
        if (!response.ok) {
          console.error(`Failed to fetch PDF: ${fileUrl}`)
          continue
        }

        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Parse the PDF
        const parsed = await parseQuestPDF(buffer)
        
        allBiomarkers.push(...parsed.biomarkers)
        
        if (!latestTestDate || parsed.testDate > latestTestDate) {
          latestTestDate = parsed.testDate
        }

        console.log(`✅ Parsed ${parsed.biomarkers.length} biomarkers from file`)
      } catch (error) {
        console.error('Error parsing PDF:', error)
        // Continue with other files
      }
    }

    if (allBiomarkers.length === 0) {
      return NextResponse.json({ error: 'No biomarkers could be extracted from PDFs' }, { status: 400 })
    }

    // Create lab_results record
    const { data: labResult, error: labError } = await supabase
      .from('lab_results')
      .insert({
        patient_id: consultationId,
        patient_name: `${consultation.first_name} ${consultation.last_name}`,
        patient_dob: consultation.date_of_birth,
        test_date: latestTestDate || new Date().toISOString().split('T')[0],
        lab_name: 'Quest Diagnostics',
        pdf_url: consultation.lab_files[0],
        biomarkers: allBiomarkers,
        status: 'pending_review'
      })
      .select()
      .single()

    if (labError) {
      console.error('Error creating lab results:', labError)
      return NextResponse.json({ error: 'Failed to save lab results' }, { status: 500 })
    }

    console.log(`✅ Created lab_results record: ${labResult.id}`)

    return NextResponse.json({ 
      success: true,
      labResultId: labResult.id,
      biomarkerCount: allBiomarkers.length
    })

  } catch (error: any) {
    console.error('❌ Error parsing uploaded labs:', error)
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 })
  }
}

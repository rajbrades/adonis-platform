import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getFirestore } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { patientName, patientDOB, panelName, testDate, biomarkers } = body

    if (!patientName || !patientDOB) {
      return NextResponse.json({ 
        error: 'Patient name and date of birth are required' 
      }, { status: 400 })
    }

    const db = getFirestore()

    // Find patient by name and DOB
    const patientsRef = db.collection('users')
    const snapshot = await patientsRef
      .where('fullName', '==', patientName)
      .where('dateOfBirth', '==', patientDOB)
      .get()

    let patientId: string

    if (snapshot.empty) {
      // Patient doesn't exist, create a new one
      console.log('Creating new patient:', patientName, patientDOB)
      
      const newPatientRef = await db.collection('users').add({
        fullName: patientName,
        dateOfBirth: patientDOB,
        role: 'patient',
        createdAt: new Date().toISOString(),
        hasLabResults: true
      })
      
      patientId = newPatientRef.id
      console.log('Created patient with ID:', patientId)
    } else {
      // Patient exists, use their ID
      patientId = snapshot.docs[0].id
      console.log('Found existing patient:', patientId)
      
      // Update to mark they have lab results
      await db.collection('users').doc(patientId).update({
        hasLabResults: true
      })
    }

    // Create lab result
    const labResultRef = await db.collection('labResults').add({
      userId: patientId,
      patientName,
      patientDOB,
      panelName,
      testDate,
      uploadedAt: new Date().toISOString(),
      uploadedBy: userId,
      biomarkers: biomarkers.map((b: any) => ({
        biomarker: b.biomarker,
        value: parseFloat(b.value) || b.value,
        unit: b.unit,
        referenceRange: b.referenceRange,
        status: b.status
      }))
    })

    console.log('Created lab result:', labResultRef.id)

    return NextResponse.json({ 
      success: true,
      labResultId: labResultRef.id,
      patientId
    })

  } catch (error) {
    console.error('Error creating lab result:', error)
    return NextResponse.json({ 
      error: 'Failed to create lab result',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

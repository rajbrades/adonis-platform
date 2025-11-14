import PDFDocument from 'pdfkit'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface RequisitionData {
  patientName: string
  dateOfBirth: string
  email: string
  phone: string
  panelName: string
  orderDate: string
  orderId: string
  tests: string[]
}

export async function generateRequisitionPDF(data: RequisitionData): Promise<string> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'LETTER', margin: 50 })
    const chunks: Buffer[] = []

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(chunks)
      
      // Upload to Supabase Storage
      const fileName = `requisition-${data.orderId}.pdf`
      const { data: uploadData, error } = await supabase.storage
        .from('requisitions')
        .upload(fileName, pdfBuffer, {
          contentType: 'application/pdf',
          upsert: true
        })

      if (error) {
        reject(error)
        return
      }

      const { data: urlData } = supabase.storage
        .from('requisitions')
        .getPublicUrl(fileName)

      resolve(urlData.publicUrl)
    })

    // Header
    doc.fontSize(20).fillColor('#000000').text('QUEST DIAGNOSTICS', 50, 50)
    doc.fontSize(10).text('Laboratory Requisition Form', 50, 75)
    doc.moveDown()

    // Patient Information
    doc.fontSize(14).fillColor('#333333').text('PATIENT INFORMATION', 50, 110)
    doc.fontSize(10).fillColor('#000000')
    
    doc.text(`Name: ${data.patientName}`, 50, 135)
    doc.text(`Date of Birth: ${data.dateOfBirth}`, 50, 150)
    doc.text(`Email: ${data.email}`, 50, 165)
    doc.text(`Phone: ${data.phone}`, 50, 180)
    doc.text(`Order Date: ${data.orderDate}`, 50, 195)
    doc.text(`Order ID: ${data.orderId}`, 50, 210)

    // Ordering Provider
    doc.fontSize(14).fillColor('#333333').text('ORDERING PROVIDER', 50, 245)
    doc.fontSize(10).fillColor('#000000')
    doc.text('ADONIS Health', 50, 270)
    doc.text('Telemedicine Provider', 50, 285)
    doc.text('support@getadonishealth.com', 50, 300)

    // Test Panel
    doc.fontSize(14).fillColor('#333333').text('ORDERED TESTS', 50, 335)
    doc.fontSize(12).fillColor('#000000').text(data.panelName, 50, 360)
    
    doc.fontSize(10).fillColor('#666666')
    let yPos = 380
    data.tests.forEach((test, index) => {
      doc.text(`• ${test}`, 60, yPos)
      yPos += 15
    })

    // Instructions
    doc.fontSize(14).fillColor('#333333').text('PATIENT INSTRUCTIONS', 50, yPos + 30)
    doc.fontSize(10).fillColor('#000000')
    const instructions = [
      '1. Take this form to any Quest Diagnostics Patient Service Center',
      '2. No appointment necessary - walk-ins welcome',
      '3. Bring a valid photo ID',
      '4. Fasting is not required unless specified',
      '5. Results will be ready in 3-5 business days'
    ]
    
    yPos += 55
    instructions.forEach(instruction => {
      doc.text(instruction, 50, yPos)
      yPos += 20
    })

    // Footer
    doc.fontSize(8).fillColor('#999999')
    doc.text('Find a Quest location: www.questdiagnostics.com', 50, 720)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 50, 735)

    doc.end()
  })
}

import pdf from 'pdf-parse'

export async function parseQuestPDF(buffer: Buffer) {
  try {
    const data = await pdf(buffer)
    const text = data.text

    // Extract patient info
    const patientName = extractPatientName(text)
    const patientDOB = extractDOB(text)
    const testDate = extractTestDate(text)

    // Extract biomarkers
    const biomarkers = extractBiomarkers(text)

    return {
      patientName,
      patientDOB,
      testDate,
      panelName: 'Complete Panel',
      biomarkers
    }
  } catch (error: any) {
    throw new Error(`Failed to parse PDF: ${error.message}`)
  }
}

function extractPatientName(text: string): string {
  // Try multiple patterns
  const patterns = [
    /Patient:\s*([A-Z]+,\s*[A-Z]+)/i,
    /Name:\s*([A-Z]+,\s*[A-Z]+)/i,
    /([A-Z]+,\s*[A-Z]+)\s+DOB/i
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) return match[1].trim()
  }

  return 'Unknown Patient'
}

function extractDOB(text: string): string {
  const patterns = [
    /DOB[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    /Date of Birth[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    /(\d{2}\/\d{2}\/\d{4})\s+Sex/i
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) return match[1]
  }

  return '01/01/1980'
}

function extractTestDate(text: string): string {
  const patterns = [
    /Collected[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    /Specimen Collected[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    /Date Collected[:\s]+(\d{2}\/\d{2}\/\d{4})/i
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) return match[1]
  }

  return new Date().toLocaleDateString('en-US')
}

function extractBiomarkers(text: string): any[] {
  const biomarkers: any[] = []

  // Common biomarker patterns
  const biomarkerList = [
    { name: 'Testosterone, Total', unit: 'ng/dL', pattern: /Testosterone,?\s*Total[:\s]+(\d+\.?\d*)/i },
    { name: 'Testosterone, Free', unit: 'pg/mL', pattern: /Testosterone,?\s*Free[:\s]+(\d+\.?\d*)/i },
    { name: 'Estradiol', unit: 'pg/mL', pattern: /Estradiol[:\s]+(\d+\.?\d*)/i },
    { name: 'DHEA-S', unit: 'mcg/dL', pattern: /DHEA-?S[:\s]+(\d+\.?\d*)/i },
    { name: 'PSA, Total', unit: 'ng/mL', pattern: /PSA,?\s*Total[:\s]+(\d+\.?\d*)/i },
    { name: 'Vitamin D, 25-OH', unit: 'ng/mL', pattern: /Vitamin D.*?25-OH[:\s]+(\d+\.?\d*)/i },
    { name: 'TSH', unit: 'mIU/L', pattern: /TSH[:\s]+(\d+\.?\d*)/i },
    { name: 'Free T3', unit: 'pg/mL', pattern: /Free T3[:\s]+(\d+\.?\d*)/i },
    { name: 'Free T4', unit: 'ng/dL', pattern: /Free T4[:\s]+(\d+\.?\d*)/i },
    { name: 'Glucose', unit: 'mg/dL', pattern: /Glucose[:\s]+(\d+)/i },
    { name: 'HbA1c', unit: '%', pattern: /HbA1c[:\s]+(\d+\.?\d*)/i },
  ]

  for (const biomarker of biomarkerList) {
    const match = text.match(biomarker.pattern)
    if (match) {
      biomarkers.push({
        biomarker: biomarker.name,
        value: match[1],
        unit: biomarker.unit,
        referenceRange: 'See report',
        status: 'normal'
      })
    }
  }

  return biomarkers
}

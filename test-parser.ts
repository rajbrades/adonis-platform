import { parseQuestPDF } from './lib/parsers/lab-pdf-parser'
import fs from 'fs'

async function test() {
  const buffer = fs.readFileSync('./QuestLabReport.pdf')
  const result = await parseQuestPDF(buffer)
  
  console.log('Patient:', result.patientName)
  console.log('DOB:', result.patientDOB)
  console.log('Test Date:', result.testDate)
  console.log('\nBiomarkers:')
  
  // Check the specific ones you mentioned
  const check = ['FERRITIN', 'ALKALINE PHOSPHATASE', 'AST', 'PREGNENOLONE']
  
  result.biomarkers.forEach(b => {
    if (check.some(name => b.biomarker.includes(name))) {
      console.log(`${b.biomarker}: ${b.value} ${b.unit}`)
    }
  })
  
  console.log(`\nTotal biomarkers: ${result.biomarkers.length}`)
}

test()

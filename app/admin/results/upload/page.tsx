'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, Check, AlertCircle, FileText, X, Plus } from 'lucide-react'

interface ParsedBiomarker {
  biomarker: string
  value: string
  unit: string
  referenceRange: string
  status: 'normal' | 'high' | 'low' | 'critical'
}

export default function UploadResultsPage() {
  const { user } = useUser()
  const router = useRouter()
  const [step, setStep] = useState<'upload' | 'preview' | 'submitted'>('upload')
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  
  const [parsedData, setParsedData] = useState<{
    patientName?: string
    patientDOB?: string
    testDate?: string
    labName?: string
    biomarkers: ParsedBiomarker[]
  } | null>(null)

  const [formState, setFormState] = useState({
    patientName: '',
    patientDOB: '',
    patientEmail: '',
    panelName: '',
    testDate: new Date().toISOString().split('T')[0],
    providerNotes: ''
  })

  // Convert MM/DD/YYYY to YYYY-MM-DD
  const convertDateFormat = (date: string): string => {
    if (!date) return ''
    const parts = date.split('/')
    if (parts.length !== 3) return ''
    return `${parts[2]}-${parts[0]}-${parts[1]}`
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.type.includes('pdf')) {
      alert('Please upload a PDF file')
      return
    }

    setFile(selectedFile)
  }

  const handleParsePDF = async () => {
    if (!file) return

    console.log('🚀 Starting PDF upload...')
    
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/admin/parse-lab-pdf', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      console.log('📊 API Response:', data)

      if (data.success && data.parsed.biomarkers.length > 0) {
        setParsedData(data.parsed)
        
        // Auto-populate form with extracted data
        const convertedDate = data.parsed.testDate ? convertDateFormat(data.parsed.testDate) : formState.testDate
        console.log('Converting date:', data.parsed.testDate, 'to', convertedDate)
        
        setFormState({
          ...formState,
          patientName: data.parsed.patientName || '',
          patientDOB: data.parsed.patientDOB || '',
          testDate: convertedDate,
          panelName: data.parsed.labName ? `${data.parsed.labName} Panel` : 'Lab Panel'
        })
        
        setStep('preview')
      } else {
        alert(`Could not extract biomarkers automatically. You can enter them manually.`)
        handleSkipParsing()
      }
    } catch (error) {
      console.error('❌ Parse error:', error)
      alert('Error parsing PDF. You can enter results manually.')
      handleSkipParsing()
    } finally {
      setUploading(false)
    }
  }

  const handleSkipParsing = () => {
    setParsedData({
      biomarkers: [
        { biomarker: 'Testosterone Total', value: '', unit: 'ng/dL', referenceRange: '264-916', status: 'normal' }
      ]
    })
    setStep('preview')
  }

  const addBiomarker = () => {
    if (!parsedData) return
    setParsedData({
      ...parsedData,
      biomarkers: [...parsedData.biomarkers, {
        biomarker: '',
        value: '',
        unit: '',
        referenceRange: '',
        status: 'normal'
      }]
    })
  }

  const updateBiomarker = (index: number, field: keyof ParsedBiomarker, value: string) => {
    if (!parsedData) return
    const updated = [...parsedData.biomarkers]
    updated[index][field] = value as any
    setParsedData({ ...parsedData, biomarkers: updated })
  }

  const removeBiomarker = (index: number) => {
    if (!parsedData) return
    setParsedData({
      ...parsedData,
      biomarkers: parsedData.biomarkers.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async () => {
    setUploading(true)

    try {
      const response = await fetch('/api/admin/lab-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientEmail: formState.patientEmail,
          panelName: formState.panelName,
          testDate: formState.testDate,
          providerNotes: '',
          biomarkers: parsedData?.biomarkers.filter(b => b.biomarker && b.value) || []
        })
      })

      const data = await response.json()

      if (data.success) {
        setStep('submitted')
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Error submitting results')
    } finally {
      setUploading(false)
    }
  }

  const commonBiomarkers = [
    'Testosterone Total', 'Testosterone Free', 'Testosterone Bioavailable',
    'TSH', 'T4 Free', 'T3 Free',
    'Vitamin D',
    'Cholesterol Total', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides',
    'Non HDL Cholesterol', 'Apolipoprotein B', 'Lipoprotein (a)',
    'Glucose', 'Hemoglobin A1c', 'Insulin',
    'Creatinine', 'BUN', 'eGFR',
    'Sodium', 'Potassium', 'Chloride', 'Carbon Dioxide', 'Calcium',
    'ALT', 'AST', 'Alkaline Phosphatase', 'Bilirubin Total', 'GGT',
    'Protein Total', 'Albumin', 'Globulin',
    'WBC', 'RBC', 'Hemoglobin', 'Hematocrit',
    'MCV', 'MCH', 'MCHC', 'RDW',
    'Platelet Count', 'MPV',
    'Absolute Neutrophils', 'Absolute Lymphocytes', 'Absolute Monocytes', 
    'Absolute Eosinophils', 'Absolute Basophils',
    'Estradiol', 'PSA', 'SHBG', 'DHEA-S', 'Pregnenolone', 'IGF-1',
    'Iron Total', 'TIBC', 'Iron Saturation', 'Ferritin',
    'HS CRP', 'Homocysteine',
    'Cortisol', 'Prolactin', 'Vitamin B12'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ADONIS ADMIN
          </Link>
          <div className="text-sm text-white/60">{user?.firstName}</div>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/admin" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Admin
        </Link>

        <h1 className="text-4xl font-black mb-8">Upload Lab Results</h1>

        {step === 'upload' && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Upload PDF (Optional)</h2>
              <p className="text-white/60 mb-6">
                Upload a PDF lab report and we'll try to extract data automatically, or skip and enter manually.
              </p>

              <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  {file ? (
                    <div className="flex flex-col items-center">
                      <FileText className="w-16 h-16 text-yellow-400 mb-4" />
                      <div className="text-lg font-semibold mb-2">{file.name}</div>
                      <div className="text-sm text-white/40">{(file.size / 1024).toFixed(1)} KB</div>
                      <button
                        type="button"
                        className="mt-4 text-sm text-yellow-400 hover:text-yellow-300"
                      >
                        Choose different file
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-16 h-16 text-white/40 mb-4 mx-auto" />
                      <div className="text-lg font-semibold mb-2">Click to upload PDF</div>
                      <div className="text-sm text-white/40">or drag and drop</div>
                    </>
                  )}
                </label>
              </div>

              <div className="mt-6 flex gap-4">
                {file && (
                  <button
                    onClick={handleParsePDF}
                    disabled={uploading}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50"
                  >
                    {uploading ? 'Parsing PDF...' : 'Try Auto-Extract'}
                  </button>
                )}
                
                <button
                  onClick={handleSkipParsing}
                  className="flex-1 bg-white/10 border border-white/20 text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  Skip & Enter Manually
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'preview' && parsedData && (
          <div className="space-y-6">
            <div className="bg-blue-500/20 border border-blue-500/40 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-blue-400 mb-1">Review Lab Results</p>
                <p className="text-white/80">Please review all values before submitting. You can edit, add, or remove biomarkers.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Patient Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Patient Name</label>
                  <input
                    type="text"
                    value={formState.patientName}
                    onChange={(e) => setFormState({...formState, patientName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Date of Birth</label>
                  <input
                    type="text"
                    value={formState.patientDOB}
                    onChange={(e) => setFormState({...formState, patientDOB: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="MM/DD/YYYY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Patient Email *</label>
                  <input
                    type="email"
                    required
                    value={formState.patientEmail}
                    onChange={(e) => setFormState({...formState, patientEmail: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="patient@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Test Date *</label>
                  <input
                    type="date"
                    required
                    value={formState.testDate}
                    onChange={(e) => setFormState({...formState, testDate: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/60 mb-2">Panel Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.panelName}
                    onChange={(e) => setFormState({...formState, panelName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="e.g., Comprehensive Metabolic Panel"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Biomarkers ({parsedData.biomarkers.length})</h2>
                <button
                  onClick={addBiomarker}
                  className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Biomarker
                </button>
              </div>

              <div className="space-y-3">
                {parsedData.biomarkers.map((biomarker, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="grid md:grid-cols-5 gap-3 items-start">
                      <div>
                        <label className="block text-xs text-white/40 mb-1">Biomarker *</label>
                        <select
                          value={biomarker.biomarker}
                          onChange={(e) => updateBiomarker(index, 'biomarker', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                          <option value="">Select...</option>
                          {commonBiomarkers.map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-white/40 mb-1">Value *</label>
                        <input
                          type="text"
                          value={biomarker.value}
                          onChange={(e) => updateBiomarker(index, 'value', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="650"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-white/40 mb-1">Unit *</label>
                        <input
                          type="text"
                          value={biomarker.unit}
                          onChange={(e) => updateBiomarker(index, 'unit', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="ng/dL"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-white/40 mb-1">Reference Range</label>
                        <input
                          type="text"
                          value={biomarker.referenceRange}
                          onChange={(e) => updateBiomarker(index, 'referenceRange', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="264-916"
                        />
                      </div>

                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="block text-xs text-white/40 mb-1">Status</label>
                          <select
                            value={biomarker.status}
                            onChange={(e) => updateBiomarker(index, 'status', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          >
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="low">Low</option>
                            <option value="critical">Critical</option>
                          </select>
                        </div>
                        <button
                          onClick={() => removeBiomarker(index)}
                          className="p-2 text-white/40 hover:text-red-400 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={uploading || !formState.patientEmail}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50"
              >
                {uploading ? 'Submitting...' : (
                  <>
                    <Check className="w-5 h-5" />
                    Submit Results
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setStep('upload')
                  setFile(null)
                  setParsedData(null)
                }}
                className="px-8 py-4 text-white/60 hover:text-white transition"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {step === 'submitted' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Results Uploaded Successfully!</h2>
            <p className="text-white/60 mb-8">The patient has been notified and can now view their results.</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setStep('upload')
                  setFile(null)
                  setParsedData(null)
                  setFormState({
                    patientName: '',
                    patientDOB: '',
                    patientEmail: '',
                    panelName: '',
                    testDate: new Date().toISOString().split('T')[0],
                    providerNotes: ''
                  })
                }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
              >
                Upload Another
              </button>
              <Link href="/admin" className="px-8 py-3 text-white/60 hover:text-white transition">
                Back to Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'

interface Patient {
  id: string
  first_name: string
  last_name: string
  email: string
  date_of_birth: string
  status: string
  recommended_labs: any
  reviewed_at: string
  lab_upload_status: string | null
}

function UploadLabsContent() {
  const brand = getBrand()
  const router = useRouter()
  const searchParams = useSearchParams()
  const preSelectedPatientId = searchParams.get('patientId')

  const [step, setStep] = useState<'select' | 'confirm' | 'upload' | 'review'>(
    preSelectedPatientId ? 'confirm' : 'select'
  )
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [verificationConfirmed, setVerificationConfirmed] = useState(false)
  const [last4SSN, setLast4SSN] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<any>(null)
  const [uploading, setUploading] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [])

  useEffect(() => {
    if (preSelectedPatientId && patients.length > 0) {
      const patient = patients.find(p => p.id === preSelectedPatientId)
      if (patient) {
        setSelectedPatient(patient)
      }
    }
  }, [preSelectedPatientId, patients])

  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/consultations')
      const data = await res.json()
      const awaitingLabs = data.filter((p: Patient) => 
        p.status === 'approved' && 
        (!p.lab_upload_status || p.lab_upload_status === 'pending')
      )
      setPatients(awaitingLabs)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch patients:', error)
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(p => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      p.first_name.toLowerCase().includes(term) ||
      p.last_name.toLowerCase().includes(term) ||
      p.email.toLowerCase().includes(term) ||
      p.date_of_birth.includes(term)
    )
  })

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setStep('confirm')
  }

  const handleConfirmPatient = () => {
    if (!verificationConfirmed) {
      alert('Please confirm this is the correct patient')
      return
    }
    setStep('upload')
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }

    setPdfFile(file)
    setParsing(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/parse-lab-pdf', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.error) {
        alert(`Error parsing PDF: ${data.error}`)
        setPdfFile(null)
        setParsing(false)
        return
      }

      setParsedData(data)
      setParsing(false)
      setStep('review')
    } catch (error) {
      console.error('Failed to parse PDF:', error)
      alert('Failed to parse PDF. Please try again.')
      setPdfFile(null)
      setParsing(false)
    }
  }

  const handleSubmit = async () => {
    if (!selectedPatient || !parsedData) return

    setUploading(true)

    try {
      const response = await fetch('/api/admin/lab-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // patient_id removed - not used
          patient_name: `${selectedPatient.first_name} ${selectedPatient.last_name}`,
          patient_dob: selectedPatient.date_of_birth,
          test_date: parsedData.testDate,
          lab_name: parsedData.labName,
          biomarkers: parsedData.biomarkers,
        }),
      })

      const data = await response.json()

      if (data.error) {
        alert(`Error saving results: ${data.error}`)
        setUploading(false)
        return
      }

      await fetch('/api/consultations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedPatient.id,
          lab_upload_status: 'uploaded',
        }),
      })

      alert('Lab results uploaded successfully!')
      router.push('/admin')
    } catch (error) {
      console.error('Failed to save lab results:', error)
      alert('Failed to save lab results. Please try again.')
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20">
      {/* Breadcrumbs */}
      <div className="bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
              Admin
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Upload Lab Results</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: brand.colors.primary }}>
                Upload Lab Results
              </h1>
              <p className="text-sm text-gray-300">
                {step === 'select' && 'Step 1 of 4: Select Patient'}
                {step === 'confirm' && 'Step 2 of 4: Confirm Patient Identity'}
                {step === 'upload' && 'Step 3 of 4: Upload PDF'}
                {step === 'review' && 'Step 4 of 4: Review & Submit'}
              </p>
            </div>
            <Link 
              href="/admin"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm"
            >
              ← Cancel
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${step === 'select' ? 'font-semibold' : 'text-gray-500'}`} style={step === 'select' ? { color: brand.colors.primary } : {}}>Select</span>
            <span className={`text-sm ${step === 'confirm' ? 'font-semibold' : 'text-gray-500'}`} style={step === 'confirm' ? { color: brand.colors.primary } : {}}>Confirm</span>
            <span className={`text-sm ${step === 'upload' ? 'font-semibold' : 'text-gray-500'}`} style={step === 'upload' ? { color: brand.colors.primary } : {}}>Upload</span>
            <span className={`text-sm ${step === 'review' ? 'font-semibold' : 'text-gray-500'}`} style={step === 'review' ? { color: brand.colors.primary } : {}}>Review</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: step === 'select' ? '25%' : step === 'confirm' ? '50%' : step === 'upload' ? '75%' : '100%',
                backgroundColor: brand.colors.primary 
              }}
            />
          </div>
        </div>

        {step === 'select' && (
          <div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Search for Patient
              </label>
              <input
                type="text"
                placeholder="Search by name, email, or DOB..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              />
              <p className="mt-2 text-sm text-gray-400">
                Showing patients approved for lab work ({filteredPatients.length} patients)
              </p>
            </div>

            <div className="space-y-4">
              {filteredPatients.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-12 text-center">
                  <p className="text-gray-400">
                    {searchTerm ? 'No patients found matching your search' : 'No patients awaiting lab upload'}
                  </p>
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    onClick={() => handleSelectPatient(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {patient.first_name} {patient.last_name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                          <div>
                            <span className="text-gray-500">DOB:</span>{' '}
                            {new Date(patient.date_of_birth).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="text-gray-500">Email:</span>{' '}
                            {patient.email}
                          </div>
                          <div>
                            <span className="text-gray-500">Approved:</span>{' '}
                            {new Date(patient.reviewed_at).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="text-gray-500">Panel:</span>{' '}
                            {patient.recommended_labs?.panel_name || 'Male Hormone Panel'}
                          </div>
                        </div>
                      </div>
                      <div
                        className="px-6 py-3 rounded-lg font-semibold"
                        style={{ 
                          backgroundColor: brand.colors.primary,
                          color: brand.colors.primaryText 
                        }}
                      >
                        Select →
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {step === 'confirm' && selectedPatient && (
          <div>
            <div className="bg-white/5 backdrop-blur-lg border border-yellow-500/50 rounded-xl p-8 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-4xl">⚠️</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                    Verify Patient Identity
                  </h3>
                  <p className="text-gray-300">
                    Please carefully verify you are uploading labs for the correct patient. 
                    Uploading to the wrong patient is a serious HIPAA violation.
                  </p>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: brand.colors.primary }}>
                  Patient Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Full Name:</span>
                    <div className="text-xl font-semibold mt-1">
                      {selectedPatient.first_name} {selectedPatient.last_name}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Date of Birth:</span>
                    <div className="text-xl font-semibold mt-1">
                      {new Date(selectedPatient.date_of_birth).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <div className="text-lg mt-1">{selectedPatient.email}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Recommended Panel:</span>
                    <div className="text-lg mt-1">
                      {selectedPatient.recommended_labs?.panel_name || 'Male Hormone Panel'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Last 4 of SSN (Optional - Additional Verification)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="XXXX"
                    value={last4SSN}
                    onChange={(e) => setLast4SSN(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verificationConfirmed}
                    onChange={(e) => setVerificationConfirmed(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-300">
                    I confirm I have verified the patient's name and date of birth, 
                    and I am uploading the correct lab results for this patient.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setStep('select')
                  setSelectedPatient(null)
                  setVerificationConfirmed(false)
                  setLast4SSN('')
                }}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleConfirmPatient}
                disabled={!verificationConfirmed}
                className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: verificationConfirmed ? brand.colors.primary : '#333',
                  color: verificationConfirmed ? brand.colors.primaryText : '#666'
                }}
              >
                Confirm & Continue →
              </button>
            </div>
          </div>
        )}

        {step === 'upload' && selectedPatient && (
          <div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: brand.colors.primary }}>
                Uploading labs for: {selectedPatient.first_name} {selectedPatient.last_name}
              </h3>
              <p className="text-gray-400 mb-6">
                DOB: {new Date(selectedPatient.date_of_birth).toLocaleDateString()}
              </p>

              <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={parsing}
                  className="hidden"
                  id="pdf-upload"
                />
                <label 
                  htmlFor="pdf-upload"
                  className={`cursor-pointer ${parsing ? 'opacity-50' : ''}`}
                >
                  <div className="text-6xl mb-4" style={{ color: brand.colors.primary }}>
                    📄
                  </div>
                  {parsing ? (
                    <div>
                      <p className="text-xl font-semibold mb-2">Parsing PDF...</p>
                      <p className="text-gray-400">Please wait while we extract biomarker data</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl font-semibold mb-2">
                        Click to upload Quest Diagnostics PDF
                      </p>
                      <p className="text-gray-400">or drag and drop</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              onClick={() => setStep('confirm')}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold transition-all"
            >
              ← Back
            </button>
          </div>
        )}

        {step === 'review' && selectedPatient && parsedData && (
          <div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: brand.colors.primary }}>
                Review Parsed Lab Results
              </h3>

              <div className="bg-black/30 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Patient:</span>
                    <div className="font-semibold">{selectedPatient.first_name} {selectedPatient.last_name}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Test Date:</span>
                    <div className="font-semibold">{parsedData.testDate || 'Not found'}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Lab:</span>
                    <div className="font-semibold">{parsedData.labName || 'Quest Diagnostics'}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Biomarkers Found:</span>
                    <div className="font-semibold">{parsedData.biomarkers?.length || 0}</div>
                  </div>
                </div>
              </div>

              {parsedData.biomarkers && parsedData.biomarkers.length > 0 ? (
                <div>
                  <h4 className="font-semibold mb-3">Extracted Biomarkers:</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {parsedData.biomarkers.map((biomarker: any, index: number) => (
                      <div 
                        key={index}
                        className="bg-black/30 rounded p-3 text-sm"
                      >
                        <div className="font-semibold">{biomarker.biomarker}</div>
                        <div className="text-gray-400">
                          Value: {biomarker.value} {biomarker.unit} | 
                          Range: {biomarker.referenceRange} | 
                          Status: {biomarker.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-400">
                    Warning: No biomarkers were extracted. You may need to manually enter results.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setStep('upload')
                  setPdfFile(null)
                  setParsedData(null)
                }}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold transition-all"
                disabled={uploading}
              >
                ← Re-upload
              </button>
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                style={{ 
                  backgroundColor: brand.colors.primary,
                  color: brand.colors.primaryText 
                }}
              >
                {uploading ? 'Saving...' : 'Save Lab Results'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function UploadLabsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <UploadLabsContent />
    </Suspense>
  )
}

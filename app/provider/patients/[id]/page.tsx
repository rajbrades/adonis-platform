'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'

interface Consultation {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  height: string
  weight: string
  occupation: string
  optimization_goals: string[]
  symptoms: string[]
  current_medications: string
  allergies: string
  medical_conditions: string[]
  lifestyle: any
  status: string
  reviewed_at: string
  reviewed_by: string
  provider_notes: string
  recommended_labs: any
  lab_upload_status: string
  created_at: string
}

interface LabResult {
  id: string
  patient_id: string
  patient_name: string
  patient_dob: string
  test_date: string
  lab_name: string
  biomarkers: any[]
  created_at: string
}

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const brand = getBrand()
  const patientId = params.id as string

  const [patient, setPatient] = useState<Consultation | null>(null)
  const [labResults, setLabResults] = useState<LabResult[]>([])
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPatient()
    fetchLabResults()
  }, [patientId])

  const fetchPatient = async () => {
    try {
      const res = await fetch('/api/consultations')
      const data = await res.json()
      const foundPatient = data.find((p: Consultation) => p.id === patientId)
      setPatient(foundPatient)
      setNotes(foundPatient?.provider_notes || '')
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch patient:', error)
      setLoading(false)
    }
  }

  const fetchLabResults = async () => {
    try {
      const res = await fetch('/api/admin/lab-results')
      const data = await res.json()
      const patientLabs = data.filter((lab: LabResult) => lab.patient_id === patientId)
      setLabResults(patientLabs)
    } catch (error) {
      console.error('Failed to fetch lab results:', error)
    }
  }

  const handleApprove = async () => {
    if (!patient) return
    
    setSubmitting(true)
    try {
      const response = await fetch('/api/consultations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: patient.id,
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: 'Provider',
          provider_notes: notes,
          recommended_labs: {
            panel_name: 'Male Hormone Optimization Panel',
            tests: [
              'Testosterone Total & Free',
              'Estradiol',
              'DHEA-S',
              'Thyroid Panel (TSH, T3, T4)',
              'Vitamin D',
              'Complete Metabolic Panel'
            ]
          }
        })
      })

      if (response.ok) {
        alert('Patient approved! Lab recommendations sent.')
        fetchPatient()
      }
    } catch (error) {
      console.error('Error approving patient:', error)
      alert('Failed to approve patient')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading patient...</div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Patient Not Found</h1>
          <Link href="/provider/patients" className="text-blue-400 hover:underline">
            ← Back to Patients
          </Link>
        </div>
      </div>
    )
  }

  const needsLabUpload = patient.status === 'approved' && (!patient.lab_upload_status || patient.lab_upload_status === 'pending')

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20">
      {/* Breadcrumbs */}
      <div className="bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
              Provider
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/provider/patients" className="text-gray-400 hover:text-white transition-colors">
              Patients
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">{patient.first_name} {patient.last_name}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: brand.colors.primary }}>
                {patient.first_name} {patient.last_name}
              </h1>
              <p className="text-sm text-gray-400">
                Status: <span className={`font-semibold ${
                  patient.status === 'approved' ? 'text-green-400' :
                  patient.status === 'pending' ? 'text-yellow-400' :
                  'text-gray-400'
                }`}>{patient.status}</span>
              </p>
            </div>
            <Link 
              href="/provider/patients"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm"
            >
              ← Back to Patients
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lab Results Section */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: brand.colors.primary }}>
                  Lab Results ({labResults.length})
                </h2>
                {needsLabUpload && (
                  <Link
                    href={`/admin/upload-labs?patientId=${patient.id}`}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: brand.colors.primary,
                      color: brand.colors.primaryText
                    }}
                  >
                    Upload Labs
                  </Link>
                )}
              </div>

              {labResults.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-4xl mb-3">📋</div>
                  <p className="mb-2">No lab results uploaded yet</p>
                  {needsLabUpload && (
                    <p className="text-sm">Patient is approved and awaiting lab upload</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {labResults.map((lab) => (
                    <div key={lab.id} className="bg-black/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{lab.lab_name}</h3>
                          <p className="text-sm text-gray-400">
                            Test Date: {lab.test_date || 'N/A'} | Uploaded: {new Date(lab.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ 
                            backgroundColor: `${brand.colors.primary}20`,
                            color: brand.colors.primary 
                          }}
                        >
                          {lab.biomarkers?.length || 0} Biomarkers
                        </span>
                      </div>
                      
                      {/* Show first few biomarkers */}
                      {lab.biomarkers && lab.biomarkers.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {lab.biomarkers.slice(0, 3).map((biomarker: any, i: number) => (
                            <div key={i} className="flex items-center justify-between text-sm bg-white/5 p-2 rounded">
                              <span className="font-medium">{biomarker.biomarker}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">{biomarker.value} {biomarker.unit}</span>
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                  biomarker.status === 'Normal' ? 'bg-green-500/20 text-green-400' :
                                  biomarker.status === 'High' || biomarker.status === 'Low' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {biomarker.status}
                                </span>
                              </div>
                            </div>
                          ))}
                          {lab.biomarkers.length > 3 && (
                            <p className="text-sm text-gray-400 text-center">
                              + {lab.biomarkers.length - 3} more biomarkers
                            </p>
                          )}
                        </div>
                      )}
                      
                      <Link
                        href={`/admin/results/view/${lab.id}`}
                        className="block text-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-all"
                      >
                        View Full Results
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: brand.colors.primary }}>
                Basic Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <div className="text-white">{patient.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <div className="text-white">{patient.phone}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Date of Birth</label>
                  <div className="text-white">{new Date(patient.date_of_birth).toLocaleDateString()}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Occupation</label>
                  <div className="text-white">{patient.occupation}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Height</label>
                  <div className="text-white">{patient.height}"</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Weight</label>
                  <div className="text-white">{patient.weight} lbs</div>
                </div>
              </div>
            </div>

            {/* Health Goals */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: brand.colors.primary }}>
                Optimization Goals
              </h2>
              <div className="flex flex-wrap gap-2">
                {patient.optimization_goals.map((goal, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    {goal}
                  </span>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: brand.colors.primary }}>
                Current Symptoms
              </h2>
              <div className="flex flex-wrap gap-2">
                {patient.symptoms.map((symptom, i) => (
                  <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: brand.colors.primary }}>
                Medical History
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Medical Conditions</label>
                  <div className="text-white">{patient.medical_conditions.join(', ')}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Current Medications</label>
                  <div className="text-white">{patient.current_medications}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Allergies</label>
                  <div className="text-white">{patient.allergies}</div>
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            {patient.lifestyle && (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: brand.colors.primary }}>
                  Lifestyle
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Exercise</label>
                    <div className="text-white">{patient.lifestyle.exerciseFrequency}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Sleep</label>
                    <div className="text-white">{patient.lifestyle.sleepHours} hours</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Diet</label>
                    <div className="text-white">{patient.lifestyle.diet}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Stress Level</label>
                    <div className="text-white">{patient.lifestyle.stressLevel}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Consultation Status</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Submitted:</span>
                  <span className="text-white">{new Date(patient.created_at).toLocaleDateString()}</span>
                </div>
                {patient.reviewed_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reviewed:</span>
                    <span className="text-white">{new Date(patient.reviewed_at).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Lab Status:</span>
                  <span className={`font-semibold ${
                    patient.lab_upload_status === 'uploaded' ? 'text-green-400' :
                    'text-yellow-400'
                  }`}>
                    {patient.lab_upload_status === 'uploaded' ? 'Uploaded' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Provider Notes */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Provider Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this patient..."
                rows={6}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black resize-none"
              />
            </div>

            {/* Actions */}
            {patient.status === 'pending' && (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={handleApprove}
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: brand.colors.primary,
                      color: brand.colors.primaryText
                    }}
                  >
                    {submitting ? 'Approving...' : 'Approve & Send Lab Recommendations'}
                  </button>
                  <button
                    className="w-full px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-all"
                  >
                    Reject Consultation
                  </button>
                </div>
              </div>
            )}

            {patient.status === 'approved' && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h3 className="font-bold text-green-400 mb-2">✓ Approved</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Patient has been approved. Lab recommendations sent on {new Date(patient.reviewed_at).toLocaleDateString()}.
                </p>
                {needsLabUpload && (
                  <Link
                    href={`/admin/upload-labs?patientId=${patient.id}`}
                    className="block w-full text-center px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: brand.colors.primary,
                      color: brand.colors.primaryText
                    }}
                  >
                    Upload Lab Results
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, FileText, User } from 'lucide-react'
import { getBrand } from '@/lib/brand'
import AIAnalysis from '../../approve/[id]/AIAnalysis'

interface LabResult {
  id: string
  patient_id: string
  patient_name: string
  patient_dob: string
  test_date: string
  lab_name: string
  biomarkers: any[]
  provider_notes: string
  created_at: string
}

interface Consultation {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  age: number
  height: string
  weight: string
  occupation: string
  optimization_goals: string[]
  symptoms: string[]
  current_medications: string
  allergies: string
  medical_conditions: string[]
  lifestyle: any
}

export default function LabReviewPage() {
  const params = useParams()
  const brand = getBrand()
  const labResultId = params.id as string

  const [labResult, setLabResult] = useState<LabResult | null>(null)
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchLabResult()
  }, [labResultId])

  const fetchLabResult = async () => {
    try {
      // Fetch lab result
      const labRes = await fetch('/api/admin/lab-results')
      const allLabs = await labRes.json()
      const foundLab = allLabs.find((lab: LabResult) => lab.id === labResultId)
      
      if (foundLab) {
        setLabResult(foundLab)
        setNotes(foundLab.provider_notes || '')

        // Fetch consultation data using patient_id
        const consultRes = await fetch('/api/consultations')
        const allConsultations = await consultRes.json()
        const foundConsult = allConsultations.find((c: Consultation) => c.id === foundLab.patient_id)
        setConsultation(foundConsult)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch lab result:', error)
      setLoading(false)
    }
  }

  const handleSaveNotes = async () => {
    if (!labResult) return
    
    setSubmitting(true)
    try {
      const response = await fetch('/api/admin/lab-results', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: labResult.id,
          provider_notes: notes
        })
      })

      if (response.ok) {
        alert('Treatment recommendations saved successfully')
        fetchLabResult()
      }
    } catch (error) {
      console.error('Error saving notes:', error)
      alert('Failed to save notes')
    } finally {
      setSubmitting(false)
    }
  }

  const handleAnalysisComplete = (analysis: string) => {
    setNotes(prev => prev ? `${prev}\n\n=== AI ANALYSIS ===\n${analysis}` : `=== AI ANALYSIS ===\n${analysis}`)
  }

  const getBiomarkerStatus = (biomarker: any) => {
    const status = biomarker.status?.toLowerCase() || ''
    if (status === 'normal' || status === 'in range') return 'normal'
    if (status === 'high' || status.includes('high')) return 'high'
    if (status === 'low' || status.includes('low')) return 'low'
    return 'unknown'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading lab results...</div>
      </div>
    )
  }

  if (!labResult || !consultation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lab Results Not Found</h1>
          <Link href="/provider/labs" className="text-yellow-400 hover:underline">
            ← Back to Lab History
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20">
      {/* Breadcrumbs */}
      <div className="bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/provider" className="text-gray-400 hover:text-white transition-colors">
              Provider
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/provider/labs" className="text-gray-400 hover:text-white transition-colors">
              Lab History
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">{consultation.first_name} {consultation.last_name}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: brand.colors.primary }}>
                {consultation.first_name} {consultation.last_name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {labResult.lab_name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Test Date: {labResult.test_date || 'N/A'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Uploaded: {new Date(labResult.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Link 
              href="/provider/labs"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm"
            >
              ← Back to Lab History
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Lab Results & AI */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Analysis */}
            <AIAnalysis
              consultation={{
                name: `${consultation.first_name} ${consultation.last_name}`,
                age: consultation.age,
                occupation: consultation.occupation,
                symptoms: consultation.symptoms,
                goals: consultation.optimization_goals,
                conditions: consultation.medical_conditions,
                lifestyle: consultation.lifestyle
              }}
              labResults={labResult}
              onAnalysisComplete={handleAnalysisComplete}
            />

            {/* Biomarkers Grid */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: brand.colors.primary }}>
                Biomarkers ({labResult.biomarkers?.length || 0})
              </h2>
              
              {labResult.biomarkers && labResult.biomarkers.length > 0 ? (
                <div className="space-y-2">
                  {labResult.biomarkers.map((biomarker: any, i: number) => {
                    const status = getBiomarkerStatus(biomarker)
                    return (
                      <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg hover:bg-black/40 transition-all">
                        <span className="font-medium">{biomarker.biomarker}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400">{biomarker.value} {biomarker.unit}</span>
                          <span className="text-xs text-gray-500">{biomarker.referenceRange}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            status === 'normal' ? 'bg-green-500/20 text-green-400' :
                            status === 'high' ? 'bg-red-500/20 text-red-400' :
                            status === 'low' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {biomarker.status}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No biomarkers data</p>
              )}
            </div>

            {/* Patient Context */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: brand.colors.primary }}>
                Patient Context
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-gray-400">Age</label>
                  <div className="text-white">{consultation.age || 'N/A'}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Occupation</label>
                  <div className="text-white">{consultation.occupation}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-sm text-gray-400">Optimization Goals</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {consultation.optimization_goals?.map((goal, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-400">Current Symptoms</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {consultation.symptoms?.map((symptom, i) => (
                    <span key={i} className="px-3 py-1 bg-red-500/10 text-red-300 rounded-full text-sm">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Medical Conditions</label>
                <div className="text-white mt-1">{consultation.medical_conditions?.join(', ') || 'None'}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Treatment Recommendations */}
          <div className="space-y-6">
            {/* Lab Info Card */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Lab Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Patient:</span>
                  <span className="text-white">{labResult.patient_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">DOB:</span>
                  <span className="text-white">{labResult.patient_dob}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Test Date:</span>
                  <span className="text-white">{labResult.test_date || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uploaded:</span>
                  <span className="text-white">{new Date(labResult.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Treatment Recommendations */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Treatment Recommendations</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add treatment recommendations based on lab results..."
                rows={12}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black resize-none"
              />
              <button
                onClick={handleSaveNotes}
                disabled={submitting}
                className="w-full mt-3 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
                style={{
                  backgroundColor: brand.colors.primary,
                  color: brand.colors.primaryText
                }}
              >
                {submitting ? 'Saving...' : 'Save Recommendations'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

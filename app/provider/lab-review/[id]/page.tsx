'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, FileText, Sparkles, Loader2, Save } from 'lucide-react'
import { getBrand } from '@/lib/brand'
import { getOptimalRange, calculateFunctionalStatus } from '@/lib/functional-ranges'

interface LabResult {
  id: string
  user_id: string
  patient_name: string
  patient_dob: string
  test_date: string
  panel_name: string
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
  const [analyzing, setAnalyzing] = useState(false)

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

        // Fetch consultation data using user_id
        const consultRes = await fetch('/api/consultations')
        const allConsultations = await consultRes.json()
        const foundConsult = allConsultations.find((c: Consultation) => c.id === foundLab.user_id)
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

  const handleInterpret = async () => {
    if (!consultation || !labResult) return
    
    setAnalyzing(true)
    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptId: 'comprehensive',
          patientData: {
            name: `${consultation.first_name} ${consultation.last_name}`,
            age: consultation.age,
            occupation: consultation.occupation,
            symptoms: consultation.symptoms || [],
            goals: consultation.optimization_goals || [],
            conditions: consultation.medical_conditions || [],
            lifestyle: consultation.lifestyle || {}
          },
          labResults: labResult
        })
      })

      if (response.ok) {
        const data = await response.json()
        setNotes(prev => prev ? `${prev}\n\n=== AI INTERPRETATION ===\n${data.analysis}` : `=== AI INTERPRETATION ===\n${data.analysis}`)
      }
    } catch (error) {
      console.error('AI analysis error:', error)
      alert('Failed to generate interpretation')
    } finally {
      setAnalyzing(false)
    }
  }

  const parseReferenceRange = (range: string): { min: number, max: number } | null => {
    if (!range) return null
    const match = range.match(/([\d.]+)\s*-\s*([\d.]+)/)
    if (match) {
      return { min: parseFloat(match[1]), max: parseFloat(match[2]) }
    }
    return null
  }

  const getBiomarkerStatus = (biomarker: any) => {
    const value = parseFloat(biomarker.value)
    if (isNaN(value)) return { status: 'unknown', color: 'gray' }

    // Get optimal range
    const optimalRange = getOptimalRange(biomarker.biomarker)
    const labRange = parseReferenceRange(biomarker.referenceRange)

    if (optimalRange && labRange) {
      const functionalStatus = calculateFunctionalStatus(
        value,
        labRange.min,
        labRange.max,
        optimalRange.optimalMin,
        optimalRange.optimalMax
      )

      const statusMap = {
        'optimal': { status: 'Optimal', color: 'green' },
        'suboptimal-low': { status: 'Suboptimal ↓', color: 'yellow' },
        'suboptimal-high': { status: 'Suboptimal ↑', color: 'yellow' },
        'low': { status: 'Low', color: 'red' },
        'high': { status: 'High', color: 'red' }
      }

      return statusMap[functionalStatus]
    }

    // Fallback to original status
    const status = biomarker.status?.toLowerCase() || ''
    if (status === 'normal' || status === 'in range') return { status: 'Normal', color: 'green' }
    if (status === 'high' || status.includes('high')) return { status: 'High', color: 'red' }
    if (status === 'low' || status.includes('low')) return { status: 'Low', color: 'red' }
    return { status: biomarker.status || 'Unknown', color: 'gray' }
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
                  {labResult.panel_name}
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
          {/* Left Column - Treatment Notes (Main Focus) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Treatment Recommendations */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: brand.colors.primary }}>
                  Treatment Recommendations
                </h2>
                <button
                  onClick={handleInterpret}
                  disabled={analyzing}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
                  style={{
                    backgroundColor: analyzing ? 'rgba(234, 179, 8, 0.1)' : brand.colors.primary,
                    color: analyzing ? '#EAB308' : brand.colors.primaryText,
                    border: analyzing ? '1px solid rgba(234, 179, 8, 0.3)' : 'none'
                  }}
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Interpreting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Interpret
                    </>
                  )}
                </button>
              </div>
              
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add treatment recommendations based on lab results and patient context..."
                rows={20}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black resize-none text-sm leading-relaxed"
              />
              
              <button
                onClick={handleSaveNotes}
                disabled={submitting}
                className="w-full mt-4 px-4 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: brand.colors.primary,
                  color: brand.colors.primaryText
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Recommendations
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Patient Context & Labs */}
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

            {/* Patient Context */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Patient Context</h2>
              
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 text-xs">Age</label>
                    <div className="text-white">{consultation.age || 'N/A'}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs">Occupation</label>
                    <div className="text-white truncate">{consultation.occupation}</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-400 text-xs">Goals</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {consultation.optimization_goals?.map((goal, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded text-xs">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs">Symptoms</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {consultation.symptoms?.map((symptom, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-500/10 text-red-300 rounded text-xs">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs">Conditions</label>
                  <div className="text-white text-xs">{consultation.medical_conditions?.join(', ') || 'None'}</div>
                </div>
              </div>
            </div>

            {/* Biomarkers */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">
                Biomarkers ({labResult.biomarkers?.length || 0})
              </h2>
              
              {labResult.biomarkers && labResult.biomarkers.length > 0 ? (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {labResult.biomarkers.map((biomarker: any, i: number) => {
                    const { status, color } = getBiomarkerStatus(biomarker)
                    const optimalRange = getOptimalRange(biomarker.biomarker)
                    
                    return (
                      <div key={i} className="p-2 bg-black/30 rounded-lg text-xs">
                        <div className="font-medium mb-1">{biomarker.biomarker}</div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-400">{biomarker.value} {biomarker.unit}</span>
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${
                            color === 'green' ? 'bg-green-500/20 text-green-400' :
                            color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                            color === 'red' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {status}
                          </span>
                        </div>
                        <div className="text-gray-500 space-y-0.5">
                          <div>Lab: {biomarker.referenceRange}</div>
                          {optimalRange && (
                            <div>Optimal: {optimalRange.optimalMin}-{optimalRange.optimalMax}</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4 text-sm">No biomarkers data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

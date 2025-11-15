'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, FileText, Sparkles, Loader2, Save, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronRight, Pill, Activity, User, AlertCircle } from 'lucide-react'
import { getBrand } from '@/lib/brand'
import { getOptimalRange, calculateFunctionalStatus, FUNCTIONAL_RANGES } from '@/lib/functional-ranges'

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
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['context', 'medications', 'labs']))

  useEffect(() => {
    fetchLabResult()
  }, [labResultId])

  const fetchLabResult = async () => {
    try {
      const labRes = await fetch('/api/admin/lab-results')
      const allLabs = await labRes.json()
      const foundLab = allLabs.find((lab: LabResult) => lab.id === labResultId)
      
      if (foundLab) {
        setLabResult(foundLab)
        setNotes(foundLab.provider_notes || '')

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
        alert('Treatment plan saved successfully')
        fetchLabResult()
      }
    } catch (error) {
      console.error('Error saving notes:', error)
      alert('Failed to save treatment plan')
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
            lifestyle: consultation.lifestyle || {},
            medications: consultation.current_medications
          },
          labResults: labResult
        })
      })

      if (response.ok) {
        const data = await response.json()
        setNotes(prev => prev ? `${prev}\n\n=== AI CLINICAL INTERPRETATION ===\n${data.analysis}` : `=== AI CLINICAL INTERPRETATION ===\n${data.analysis}`)
      }
    } catch (error) {
      console.error('AI analysis error:', error)
      alert('Failed to generate interpretation')
    } finally {
      setAnalyzing(false)
    }
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
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
    if (isNaN(value)) return { status: 'unknown', color: 'gray', icon: Minus }

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
        'optimal': { status: 'Optimal', color: 'green', icon: Minus },
        'suboptimal-low': { status: 'Suboptimal', color: 'yellow', icon: TrendingDown },
        'suboptimal-high': { status: 'Suboptimal', color: 'yellow', icon: TrendingUp },
        'low': { status: 'Low', color: 'red', icon: TrendingDown },
        'high': { status: 'High', color: 'red', icon: TrendingUp }
      }

      return statusMap[functionalStatus]
    }

    return { status: 'Normal', color: 'gray', icon: Minus }
  }

  const getBiomarkersByCategory = () => {
    if (!labResult?.biomarkers) return {}
    
    const categorized: Record<string, any[]> = {}
    
    labResult.biomarkers.forEach(biomarker => {
      const optimalRange = getOptimalRange(biomarker.biomarker)
      const category = optimalRange?.category || 'Other'
      
      if (!categorized[category]) {
        categorized[category] = []
      }
      categorized[category].push(biomarker)
    })
    
    return categorized
  }

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = (height * 2.54) / 100
    const weightInKg = weight * 0.453592
    return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
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

  const categorizedBiomarkers = getBiomarkersByCategory()
  const categories = ['all', ...Object.keys(categorizedBiomarkers).sort()]
  const bmi = consultation.height && consultation.weight ? calculateBMI(parseFloat(consultation.weight), parseFloat(consultation.height)) : null

  const displayBiomarkers = activeCategory === 'all' 
    ? labResult.biomarkers 
    : categorizedBiomarkers[activeCategory] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/provider/labs" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Lab History
            </Link>
            <span className="text-xs text-gray-500">Last saved: {new Date(labResult.created_at).toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: brand.colors.primary }}>
                {consultation.first_name} {consultation.last_name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{consultation.age}yo • {consultation.occupation}</span>
                <span>BMI: {bmi || 'N/A'}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {labResult.test_date || 'N/A'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleInterpret}
                disabled={analyzing}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                style={{
                  backgroundColor: analyzing ? 'rgba(234, 179, 8, 0.1)' : brand.colors.primary,
                  color: analyzing ? '#EAB308' : brand.colors.primaryText,
                  border: analyzing ? '1px solid rgba(234, 179, 8, 0.3)' : 'none'
                }}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    AI Interpret
                  </>
                )}
              </button>
              
              <button
                onClick={handleSaveNotes}
                disabled={submitting}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all text-sm flex items-center gap-2"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Patient Context */}
          <div className="col-span-3 space-y-4">
            {/* Patient Overview */}
            <div className="bg-white/5 border border-white/10 rounded-lg">
              <button
                onClick={() => toggleSection('context')}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-400" />
                  <h3 className="font-bold">Patient Context</h3>
                </div>
                {expandedSections.has('context') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              
              {expandedSections.has('context') && (
                <div className="p-4 pt-0 space-y-3 text-sm">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Medical Conditions</div>
                    {consultation.medical_conditions && consultation.medical_conditions.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {consultation.medical_conditions.map((condition, i) => (
                          <span key={i} className="px-2 py-1 bg-red-500/10 text-red-300 rounded text-xs border border-red-500/20">
                            {condition}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-xs">None reported</div>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-1">Allergies</div>
                    <div className="text-white">{consultation.allergies || 'None'}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-1">Symptoms</div>
                    <div className="flex flex-wrap gap-1">
                      {consultation.symptoms?.map((symptom, i) => (
                        <span key={i} className="px-2 py-1 bg-orange-500/10 text-orange-300 rounded text-xs">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-1">Optimization Goals</div>
                    <div className="flex flex-wrap gap-1">
                      {consultation.optimization_goals?.map((goal, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Medications & Supplements */}
            <div className="bg-white/5 border border-white/10 rounded-lg">
              <button
                onClick={() => toggleSection('medications')}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-yellow-400" />
                  <h3 className="font-bold">Medications</h3>
                </div>
                {expandedSections.has('medications') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              
              {expandedSections.has('medications') && (
                <div className="p-4 pt-0 space-y-3 text-sm">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Current Medications</div>
                    <div className="text-white whitespace-pre-wrap">{consultation.current_medications || 'None reported'}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Supplements</div>
                    <div className="text-gray-500 text-xs italic">Not yet recorded</div>
                  </div>
                </div>
              )}
            </div>

            {/* Lifestyle */}
            {consultation.lifestyle && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-yellow-400" />
                  Lifestyle
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Exercise:</span>
                    <span className="text-white">{consultation.lifestyle.exerciseFrequency || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sleep:</span>
                    <span className="text-white">{consultation.lifestyle.sleepHours || 'N/A'} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Diet:</span>
                    <span className="text-white">{consultation.lifestyle.diet || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stress:</span>
                    <span className="text-white">{consultation.lifestyle.stressLevel || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Center - Lab Results */}
          <div className="col-span-6 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold" style={{ color: brand.colors.primary }}>
                    Laboratory Results
                  </h2>
                  <span className="text-sm text-gray-400">{labResult.panel_name}</span>
                </div>
                
                {/* Category Tabs */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                        activeCategory === cat
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat} {cat !== 'all' && `(${categorizedBiomarkers[cat]?.length || 0})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Biomarkers List */}
              <div className="divide-y divide-white/5 max-h-[calc(100vh-300px)] overflow-y-auto">
                {displayBiomarkers.map((biomarker: any, i: number) => {
                  const { status, color, icon: Icon } = getBiomarkerStatus(biomarker)
                  const optimalRange = getOptimalRange(biomarker.biomarker)
                  
                  return (
                    <div key={i} className="p-4 hover:bg-white/5 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-medium mb-1">{biomarker.biomarker}</div>
                          <div className="text-2xl font-bold mb-1">{biomarker.value} <span className="text-sm text-gray-400">{biomarker.unit}</span></div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${
                            color === 'green' ? 'text-green-400' :
                            color === 'yellow' ? 'text-yellow-400' :
                            color === 'red' ? 'text-red-400' :
                            'text-gray-400'
                          }`} />
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            color === 'green' ? 'bg-green-500/20 text-green-400' :
                            color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                            color === 'red' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex justify-between">
                          <span>Lab Reference:</span>
                          <span className="text-white">{biomarker.referenceRange}</span>
                        </div>
                        {optimalRange && (
                          <div className="flex justify-between">
                            <span>Optimal Range:</span>
                            <span className="text-yellow-400 font-medium">
                              {optimalRange.optimalMin}-{optimalRange.optimalMax} {optimalRange.unit}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right - Treatment Plan */}
          <div className="col-span-3 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg sticky top-24">
              <div className="p-4 border-b border-white/10">
                <h2 className="font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-400" />
                  Treatment Plan
                </h2>
              </div>
              
              <div className="p-4">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Clinical interpretation and treatment recommendations will appear here after clicking 'AI Interpret' or you can write your own..."
                  rows={25}
                  className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

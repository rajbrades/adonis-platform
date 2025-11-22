'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, FileText, Sparkles, Loader2, Save, Video, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronRight, Pill, Activity, User, AlertCircle, AlertTriangle, ExternalLink, Clock, X } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
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
  current_supplements: string
  lab_files: string[]
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
  const [activeSeverity, setActiveSeverity] = useState<number | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['context', 'medications']))
  const { userId } = useAuth()
  const [showNotesHistory, setShowNotesHistory] = useState(false)
  const [encounterNotes, setEncounterNotes] = useState<any[]>([])
  const [loadingNotes, setLoadingNotes] = useState(false)

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
    if (!labResult || !consultation || !userId) return
    
    setSubmitting(true)
    try {
      const response = await fetch('/api/provider/encounter-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: consultation.id,
          provider_id: userId,
          lab_result_id: labResult.id,
          note_content: notes,
          note_type: 'clinical_assessment',
          biomarkers_reviewed: labResult.biomarkers
        })
      })

      if (response.ok) {
        alert('Treatment plan saved!')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save')
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
        setNotes(data.analysis)
      }
    } catch (error) {
      console.error('AI error:', error)
      alert('Failed to analyze')
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
    if (isNaN(value)) return { status: 'unknown', color: 'gray', icon: Minus, severity: 0 }

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
        'optimal': { status: 'Optimal', color: 'green', icon: Minus, severity: 0 },
        'suboptimal-low': { status: 'Suboptimal', color: 'yellow', icon: TrendingDown, severity: 1 },
        'suboptimal-high': { status: 'Suboptimal', color: 'yellow', icon: TrendingUp, severity: 1 },
        'low': { status: 'Low', color: 'red', icon: TrendingDown, severity: 2 },
        'high': { status: 'High', color: 'red', icon: TrendingUp, severity: 2 }
      }

      return statusMap[functionalStatus]
    }

    return { status: 'Normal', color: 'gray', icon: Minus, severity: 0 }
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
          <Link href="/provider/labs" className="text-yellow-400 hover:underline">← Back</Link>
        </div>
      </div>
    )
  }

  const categorizedBiomarkers = getBiomarkersByCategory()
  const categories = ['all', ...Object.keys(categorizedBiomarkers).sort()]
  const bmi = consultation.height && consultation.weight ? calculateBMI(parseFloat(consultation.weight), parseFloat(consultation.height)) : null

  const biomarkerStats = labResult.biomarkers.reduce((acc, biomarker) => {
    const { severity } = getBiomarkerStatus(biomarker)
    if (severity === 2) acc.critical++
    else if (severity === 1) acc.suboptimal++
    else if (severity === 0) acc.optimal++
    return acc
  }, { critical: 0, suboptimal: 0, optimal: 0 })

  const categoryStats = Object.entries(categorizedBiomarkers).map(([cat, biomarkers]) => {
    const abnormal = biomarkers.filter(b => getBiomarkerStatus(b).severity > 0).length
    return { category: cat, total: biomarkers.length, abnormal }
  })

  let filteredBiomarkers = activeCategory === 'all' 
    ? [...labResult.biomarkers]
    : [...(categorizedBiomarkers[activeCategory] || [])]

  if (activeSeverity !== null) {
    filteredBiomarkers = filteredBiomarkers.filter(b => getBiomarkerStatus(b).severity === activeSeverity)
  }

  const sortedBiomarkers = filteredBiomarkers.sort((a, b) => getBiomarkerStatus(b).severity - getBiomarkerStatus(a).severity)

  const flaggedBiomarkers = labResult.biomarkers.filter(b => getBiomarkerStatus(b).severity > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Fixed Header */}
      <div className="fixed top-20 left-0 right-0 z-40 border-b border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="mx-auto px-8" style={{ maxWidth: '1800px' }}>
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Link href="/provider/labs" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div className="h-4 w-px bg-white/20"></div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: brand.colors.primary }}>
                  {consultation.first_name} {consultation.last_name}
                </h1>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                  <span>{consultation.age}yo</span>
                  <span>•</span>
                  <span>{consultation.occupation}</span>
                  <span>•</span>
                  <span>BMI: {bmi || 'N/A'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {labResult.test_date}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleInterpret} 
                disabled={analyzing} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm disabled:opacity-50"
                style={{
                  backgroundColor: analyzing ? 'rgba(234, 179, 8, 0.1)' : brand.colors.primary,
                  color: analyzing ? '#EAB308' : brand.colors.primaryText,
                  border: analyzing ? '1px solid rgba(234, 179, 8, 0.3)' : 'none'
                }}
              >
                {analyzing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Analyzing</>
                ) : (
                  <><Sparkles className="w-4 h-4" />AI Interpret</>
                )}
              </button>
              
              
              <a
                href={process.env.NEXT_PUBLIC_ZOOM_MEETING_URL || "https://10xhealthsystem.zoom.us/j/5359639689"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all text-sm flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Start Video Call
              </a>
              <button 
                onClick={handleSaveNotes} 
                disabled={submitting} 
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg font-semibold transition-all text-sm flex items-center gap-2"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </button>
            </div>
          </div>

          {/* Alert Summary */}
          {flaggedBiomarkers.length > 0 && (
            <div className="border-t border-white/10 py-3 bg-gradient-to-r from-red-500/5 via-yellow-500/5 to-red-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  
                  {biomarkerStats.critical > 0 && (
                    <button
                      onClick={() => setActiveSeverity(activeSeverity === 2 ? null : 2)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                        activeSeverity === 2 ? 'bg-red-500/20 ring-2 ring-red-500' : 'hover:bg-red-500/10'
                      }`}
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-red-400">{biomarkerStats.critical} Critical</span>
                    </button>
                  )}
                  
                  {biomarkerStats.suboptimal > 0 && (
                    <button
                      onClick={() => setActiveSeverity(activeSeverity === 1 ? null : 1)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                        activeSeverity === 1 ? 'bg-yellow-500/20 ring-2 ring-yellow-500' : 'hover:bg-yellow-500/10'
                      }`}
                    >
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-yellow-400">{biomarkerStats.suboptimal} Suboptimal</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => setActiveSeverity(activeSeverity === 0 ? null : 0)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                      activeSeverity === 0 ? 'bg-green-500/20 ring-2 ring-green-500' : 'hover:bg-green-500/10'
                    }`}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-400">{biomarkerStats.optimal} Optimal</span>
                  </button>
                </div>
                
                <div className="text-xs text-gray-400">
                  <span className="font-medium">Priority:</span> {flaggedBiomarkers.slice(0, 3).map(b => b.biomarker).join(', ')}
                  {flaggedBiomarkers.length > 3 && <span className="text-yellow-400 ml-1">+{flaggedBiomarkers.length - 3} more</span>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-56 pb-12">
        <div className="mx-auto px-8" style={{ maxWidth: '1800px' }}>
          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Left Sidebar */}
            <div className="col-span-2">
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <button onClick={() => toggleSection('context')} className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-yellow-400" />
                      <span className="font-bold text-sm">Context</span>
                    </div>
                    {expandedSections.has('context') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {expandedSections.has('context') && (
                    <div className="px-3 pb-3 space-y-3 text-xs">
                      <div>
                        <div className="text-gray-400 mb-1.5 font-medium">Conditions</div>
                        {consultation.medical_conditions?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {consultation.medical_conditions.map((c, i) => (
                              <span key={i} className="px-2 py-0.5 bg-red-500/10 text-red-300 rounded border border-red-500/20">{c}</span>
                            ))}
                          </div>
                        ) : <div className="text-gray-500">None</div>}
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1.5 font-medium">Symptoms</div>
                        <div className="flex flex-wrap gap-1">
                          {consultation.symptoms?.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-orange-500/10 text-orange-300 rounded">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1.5 font-medium">Goals</div>
                        <div className="flex flex-wrap gap-1">
                          {consultation.optimization_goals?.map((g, i) => (
                            <span key={i} className="px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded">{g}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <button onClick={() => toggleSection('medications')} className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-yellow-400" />
                      <span className="font-bold text-sm">Medications</span>
                    </div>
                    {expandedSections.has('medications') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {expandedSections.has('medications') && (
                    <div className="px-3 pb-3 text-xs text-white whitespace-pre-wrap">
                      {consultation.current_medications || 'None'}
                    </div>
                  )}
                </div>

                {/* Supplements */}
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <button onClick={() => toggleSection('supplements')} className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-green-400" />
                      <span className="font-bold text-sm">Supplements</span>
                    </div>
                    {expandedSections.has('supplements') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {expandedSections.has('supplements') && (
                    <div className="px-3 pb-3 text-xs text-white whitespace-pre-wrap">
                      {consultation.current_supplements || 'None'}
                    </div>
                  )}
                </div>

                {/* Lab Files */}
                {consultation.lab_files && consultation.lab_files.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    <button onClick={() => toggleSection('lab_files')} className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-red-400" />
                        <span className="font-bold text-sm">Lab Files</span>
                      </div>
                      {expandedSections.has('lab_files') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    {expandedSections.has('lab_files') && (
                      <div className="px-3 pb-3 space-y-2">
                        {consultation.lab_files.map((fileUrl, i) => (
                          <a
                          
                            key={i}
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors block"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Lab File {i + 1}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}


                {consultation.lifestyle && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <h3 className="font-bold mb-2.5 flex items-center gap-2 text-sm">
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
            </div>

            {/* Center - Labs (NARROWER, TIGHTER) */}
            <div className="col-span-5">
              <div className="bg-white/5 border border-white/10 rounded-lg">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold" style={{ color: brand.colors.primary }}>
                      Laboratory Results
                    </h2>
                    <span className="text-xs text-gray-400">{labResult.panel_name}</span>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      onClick={() => setActiveCategory('all')} 
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                        activeCategory === 'all' ? 'bg-yellow-400 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      All ({labResult.biomarkers.length})
                    </button>
                    {categoryStats.map(({ category, total, abnormal }) => (
                      <button 
                        key={category}
                        onClick={() => setActiveCategory(category)} 
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                          activeCategory === category ? 'bg-yellow-400 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {category} ({total})
                        {abnormal > 0 && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                            activeCategory === category ? 'bg-red-600 text-white' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {abnormal}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Biomarkers - TIGHT LAYOUT */}
                <div className="divide-y divide-white/5 max-h-[calc(100vh-420px)] overflow-y-auto">
                  {sortedBiomarkers.map((biomarker: any, i: number) => {
                    const { status, color, icon: Icon, severity } = getBiomarkerStatus(biomarker)
                    const optimalRange = getOptimalRange(biomarker.biomarker)
                    const isCritical = severity === 2
                    
                    return (
                      <div key={i} className={`p-4 hover:bg-white/5 transition-colors ${isCritical ? '' : ''}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-xs text-gray-300">{biomarker.biomarker}</span>
                              {isCritical && <AlertCircle className="w-3 h-3 text-red-500 animate-pulse" />}
                            </div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-3xl font-bold leading-none">{biomarker.value}</span>
                              <span className="text-sm text-gray-400">{biomarker.unit}</span>
                            </div>
                          </div>
                          
                          <span className={`ml-auto px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap ${
                            color === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            color === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                            <Icon className="w-3 h-3" />
                            {status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                          <div className="bg-white/5 rounded p-2">
                            <div className="text-gray-400 mb-0.5 text-[10px]">Lab Reference</div>
                            <div className="text-white font-medium text-xs">{biomarker.referenceRange}</div>
                          </div>
                          {optimalRange && (
                            <div className="bg-yellow-500/10 rounded p-2 border border-yellow-500/20">
                              <div className="text-yellow-400 mb-0.5 text-[10px] font-medium">Optimal Range</div>
                              <div className="text-yellow-300 font-semibold text-xs">
                                {optimalRange.optimalMin}-{optimalRange.optimalMax} {optimalRange.unit}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right - Treatment Plan (WIDER) */}
            <div className="col-span-5">
              <div className="bg-white/5 border border-white/10 rounded-lg">
                <div className="p-4 border-b border-white/10">
                  <h2 className="font-bold flex items-center gap-2 text-base">
                    <FileText className="w-4 h-4 text-yellow-400" />
                    Treatment Plan
                  </h2>
                </div>
                <div className="p-4">
                  <textarea 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                    placeholder="Click 'AI Interpret' for comprehensive clinical interpretation and treatment recommendations..." 
                    rows={32} 
                    className="w-full px-3 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

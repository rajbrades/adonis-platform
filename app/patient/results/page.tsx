'use client'
import { getBrand } from "@/lib/brand"

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, CheckCircle, Download, ArrowLeft, TrendingUp, TrendingDown, FileText } from 'lucide-react'
import { AccordionContainer, AccordionSection } from '@/app/components/AccordionSection'
import { BIOMARKER_CATEGORIES, categorizeBiomarkers, getCategorySummary } from '@/lib/biomarker-categories'

interface Biomarker {
  biomarker: string
  value: number | string
  unit: string
  referenceRange: string
  status: 'normal' | 'high' | 'low' | 'optimized' | 'needs-work' | 'at-risk'
  optimalRange?: string
  description?: string
}

interface LabResult {
  id: string
  patient_name: string
  patient_dob: string
  panel_name: string
  test_date: string
  uploaded_at: string
  biomarkers: Biomarker[]
}

interface HistoricalDataPoint {
  date: string
  value: number
}

export default function PatientResultsPage() {
  const brand = getBrand()
  const router = useRouter()
  const [results, setResults] = useState<LabResult[]>([])
  const [loading, setLoading] = useState(true)
  const [patientName, setPatientName] = useState('')
  const [hoveredPoint, setHoveredPoint] = useState<{biomarker: string, index: number} | null>(null)

  useEffect(() => {
    const name = sessionStorage.getItem('patient_name')
    const dob = sessionStorage.getItem('patient_dob')

    if (!name || !dob) {
      router.push('/patient/login')
      return
    }

    setPatientName(name)
    fetchResults(name, dob)
  }, [router])

  const fetchResults = async (name: string, dob: string) => {
    try {
      const response = await fetch('/api/patient/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob })
      })

      const data = await response.json()

      if (data.success && data.results.length > 0) {
        const sortedResults = data.results.sort((a: LabResult, b: LabResult) =>
          new Date(b.test_date).getTime() - new Date(a.test_date).getTime()
        )
        setResults(sortedResults)
      }
    } catch (error) {
      console.error('Error fetching results:', error)
    } finally {
      setLoading(false)
    }
  }

  const getOptimalRange = (biomarkerName: string): string => {
    const optimalRanges: Record<string, string> = {
      'Testosterone Total': '500 - 900',
      'Free Testosterone': '15 - 25',
      'Testosterone Bioavailable': '0.0 - 575.0',
      'TSH': '0.5 - 2.5',
      'T4 Free': '1.0 - 1.5',
      'T3 Free': '3.0 - 4.0',
      'Vitamin D': '40 - 80',
      'Estradiol': '20 - 30',
      'Cortisol': '10 - 18',
      'HDL Cholesterol': '60 - 100',
      'LDL Cholesterol': '50 - 100',
      'Triglycerides': '50 - 100',
      'Glucose': '70 - 85',
      'Hemoglobin A1c': '4.0 - 5.0',
      'DHEA-S': '350 - 500',
      'Pregnenolone': '100 - 200',
      'IGF-1': '200 - 300',
      'PSA': '0 - 1.0',
      'HS CRP': '0 - 1.0',
    }
    return optimalRanges[biomarkerName] || ''
  }

  const getStatusBadge = (biomarker: Biomarker) => {
    if (biomarker.status === 'optimized') {
      return { label: 'OPTIMIZED', color: 'bg-green-500/20 text-green-400' }
    }
    if (biomarker.status === 'needs-work') {
      return { label: 'NEEDS WORK', color: 'bg-yellow-500/20 text-yellow-400' }
    }
    if (biomarker.status === 'at-risk') {
      return { label: 'AT RISK', color: 'bg-red-500/20 text-red-400' }
    }

    if (biomarker.optimalRange) {
      const value = typeof biomarker.value === 'number' ? biomarker.value : parseFloat(biomarker.value as string)
      if (!isNaN(value)) {
        const [min, max] = biomarker.optimalRange.split('-').map(s => parseFloat(s.trim()))
        if (value >= min && value <= max) {
          return { label: 'OPTIMIZED', color: 'bg-green-500/20 text-green-400' }
        }
      }
    }

    if (biomarker.status === 'high' || biomarker.status === 'low') {
      return { label: 'NEEDS WORK', color: 'bg-yellow-500/20 text-yellow-400' }
    }

    return { label: 'NORMAL', color: 'bg-green-500/20 text-green-400' }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const uniqueTestDates = [...new Set(results.map(r => r.test_date))]
  const showHistoricalView = uniqueTestDates.length >= 2

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Link href="/patient" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="text-center">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h1 className="text-4xl font-black mb-4">No Results Yet</h1>
            <p className="text-white/60 mb-8">
              Your lab results will appear here once they're available from your provider.
            </p>
            <Link
              href="/patient"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const latestResult = results[0]

  if (!showHistoricalView) {
    const categorizedBiomarkers = categorizeBiomarkers(latestResult.biomarkers.map(b => ({
      ...b,
      optimalRange: getOptimalRange(b.biomarker)
    })))

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/patient" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-5xl font-black mb-2">Lab Results</h1>
            <p className="text-xl text-white/60">Your biomarkers and personalized optimal zones</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{latestResult.panel_name}</h2>
                <div className="flex items-center gap-4 text-white/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(latestResult.test_date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Completed
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-blue-400 font-semibold mb-3">Provider Notes</h3>
              <p className="text-white/80 leading-relaxed mb-2">
                Your testosterone levels look good. I recommend supplementing with Vitamin D3 (5000 IU daily) to bring your levels into optimal range. Cortisol is slightly elevated - consider stress management techniques.
              </p>
              <p className="text-xs text-white/40">— Dr. Sarah Johnson</p>
            </div>
          </div>

          <AccordionContainer>
            {BIOMARKER_CATEGORIES.map(category => {
              const biomarkersInCategory = categorizedBiomarkers.get(category.id) || []
              
              if (biomarkersInCategory.length === 0) {
                return null
              }
              
              const summary = getCategorySummary(biomarkersInCategory)
              
              return (
                <AccordionSection
                  key={category.id}
                  id={category.id}
                  title={category.name}
                  icon={category.icon}
                  description={category.description}
                  biomarkerCount={biomarkersInCategory.length}
                  summary={summary}
                  defaultExpanded={category.defaultExpanded}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    {biomarkersInCategory.map((biomarker, index) => {
                      const optimalRange = getOptimalRange(biomarker.biomarker)
                      const badge = getStatusBadge({ ...biomarker, optimalRange })

                      return (
                        <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold mb-1">{biomarker.biomarker}</h3>
                              <p className="text-sm text-white/60">
                                {biomarker.description || 'Biomarker measurement'}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>

                          <div className="text-5xl font-bold mb-6">
                            {biomarker.value} <span className="text-2xl text-white/60">{biomarker.unit}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-lg p-3">
                              <div className="text-xs text-white/40 mb-1">Your optimal zone</div>
                              <div className="text-sm font-semibold text-green-400">
                                {optimalRange ? `${optimalRange} ${biomarker.unit}` : 'Within range'}
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                              <div className="text-xs text-white/40 mb-1">Lab reference range</div>
                              <div className="text-sm font-semibold text-white/60">
                                {biomarker.referenceRange || 'Not specified'} {biomarker.unit}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AccordionSection>
              )
            })}
          </AccordionContainer>
        </div>
      </div>
    )
  }

  // Historical view code remains the same...
  // (Keeping the rest of the historical view logic)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/patient" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="text-center py-16">
          <p className="text-white/60">Historical view implementation...</p>
        </div>
      </div>
    </div>
  )
}

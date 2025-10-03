'use client'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface LabResult {
  id: string
  order_id: string
  consultation_id: string
  lab_panel_name: string
  results_data: {
    biomarker: string
    value: number
    unit: string
    reference_range: string
    status: 'normal' | 'high' | 'low' | 'critical'
  }[]
  status: string
  provider_notes?: string
  reviewed_by?: string
  sample_collected_at?: string
  results_received_at?: string
  reviewed_at?: string
  created_at: string
}

export default function ResultsPage() {
  const { user } = useUser()
  const [results, setResults] = useState<LabResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/lab-results')
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error fetching results:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />
      case 'reviewed':
        return <FileText className="w-5 h-5 text-blue-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-white/40" />
    }
  }

  const getBiomarkerStatusIcon = (status: string) => {
    switch (status) {
      case 'high':
        return <TrendingUp className="w-4 h-4 text-red-400" />
      case 'low':
        return <TrendingDown className="w-4 h-4 text-blue-400" />
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-green-400" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white/60">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-yellow-400">ADONIS</Link>
          <div className="flex items-center gap-4">
            <span className="text-white/80">Welcome, {user?.firstName}</span>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/patient" className="inline-flex items-center text-white/70 hover:text-yellow-400 transition-colors mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Lab Results</h1>
          <p className="text-white/60">View and track your biomarker results over time</p>
        </div>

        {results.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No Results Yet</h2>
            <p className="text-white/60 mb-6">Your lab results will appear here once they're available</p>
            <Link
              href="/patient"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              View Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{result.lab_panel_name}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {result.results_received_at 
                            ? new Date(result.results_received_at).toLocaleDateString()
                            : new Date(result.created_at).toLocaleDateString()
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        result.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        result.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {result.provider_notes && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-400 mb-1">Provider Notes</p>
                      <p className="text-sm text-white/90">{result.provider_notes}</p>
                      {result.reviewed_by && (
                        <p className="text-xs text-white/60 mt-2">— {result.reviewed_by}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h4 className="font-semibold mb-4">Biomarker Results</h4>
                  <div className="space-y-3">
                    {result.results_data.map((biomarker, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getBiomarkerStatusIcon(biomarker.status)}
                            <span className="font-semibold">{biomarker.biomarker}</span>
                          </div>
                          <span className={`text-lg font-bold ${
                            biomarker.status === 'high' || biomarker.status === 'critical' ? 'text-red-400' :
                            biomarker.status === 'low' ? 'text-blue-400' :
                            'text-green-400'
                          }`}>
                            {biomarker.value} {biomarker.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">Reference Range</span>
                          <span className="text-white/80">{biomarker.reference_range} {biomarker.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

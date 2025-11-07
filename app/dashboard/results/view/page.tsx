'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Search, Calendar, User, FileText } from 'lucide-react'

interface Biomarker {
  biomarker: string
  value: number | string
  unit: string
  referenceRange: string
  status: 'normal' | 'high' | 'low' | 'critical'
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

export default function ViewLabResultsPage() {
  const brand = getBrand()
  const { user } = useUser()
  const [results, setResults] = useState<LabResult[]>([])
  const [filteredResults, setFilteredResults] = useState<LabResult[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null)

  useEffect(() => {
    fetchAllResults()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = results.filter(result => 
        result.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.patient_dob.includes(searchTerm) ||
        result.panel_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredResults(filtered)
    } else {
      setFilteredResults(results)
    }
  }, [searchTerm, results])

  const fetchAllResults = async () => {
    try {
      const response = await fetch('/api/admin/lab-results/list')
      const data = await response.json()

      if (data.success) {
        setResults(data.results)
        setFilteredResults(data.results)
      }
    } catch (error) {
      console.error('Error fetching results:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400 bg-green-400/20'
      case 'high': return 'text-yellow-400 bg-yellow-400/20'
      case 'low': return 'text-blue-400 bg-blue-400/20'
      case 'critical': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading lab results...</p>
        </div>
      </div>
    )
  }

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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/admin" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Admin
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">Lab Results</h1>
            <p className="text-white/60">{filteredResults.length} results found</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient name, DOB, or panel name..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {selectedResult ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedResult.patient_name}</h2>
                <p className="text-white/60">DOB: {selectedResult.patient_dob}</p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-sm"
              >
                Back to List
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-xs text-white/40 mb-1">Panel Name</div>
                <div className="font-semibold">{selectedResult.panel_name}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-xs text-white/40 mb-1">Test Date</div>
                <div className="font-semibold">{formatDate(selectedResult.test_date)}</div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Biomarkers ({selectedResult.biomarkers.length})</h3>
            <div className="space-y-2">
              {selectedResult.biomarkers.map((biomarker, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold">{biomarker.biomarker}</div>
                      <div className="text-sm text-white/60 mt-1">
                        Reference Range: {biomarker.referenceRange || 'N/A'}
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <div className="text-2xl font-bold">{biomarker.value}</div>
                      <div className="text-sm text-white/60">{biomarker.unit}</div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(biomarker.status)}`}>
                        {biomarker.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
                <p className="text-white/60">
                  {searchTerm ? 'Try a different search term' : 'No lab results have been uploaded yet'}
                </p>
              </div>
            ) : (
              filteredResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => setSelectedResult(result)}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-yellow-400/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-xl font-bold">{result.patient_name}</h3>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-white/60">
                        <div>
                          <span className="text-white/40">DOB:</span> {result.patient_dob}
                        </div>
                        <div>
                          <span className="text-white/40">Panel:</span> {result.panel_name}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(result.test_date)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">{result.biomarkers.length}</div>
                      <div className="text-xs text-white/60">Biomarkers</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

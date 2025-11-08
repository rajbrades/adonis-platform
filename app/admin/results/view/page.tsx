'use client'

import { useEffect, useState } from 'react'
import { Search, Eye, Calendar, User } from 'lucide-react'
import Link from 'next/link'

export default function ViewLabResults() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/admin/lab-results/list')
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Error fetching results:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredResults = results.filter(result =>
    result.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
    result.patient_dob?.includes(search) ||
    result.panel_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          All Lab <span className="text-yellow-400">Results</span>
        </h1>
        <p className="text-white/60 mb-8">Browse and search all uploaded lab results</p>

        {/* Search Bar */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient name, DOB, or panel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-white/60 mt-4">Loading results...</p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-12 text-center">
            <Eye className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-xl text-white/60">No results found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <User className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-xl font-bold">{result.patient_name}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/60">
                      <div>
                        <span className="text-white/40">DOB:</span> {result.patient_dob}
                      </div>
                      <div>
                        <span className="text-white/40">Test Date:</span> {result.test_date}
                      </div>
                      <div>
                        <span className="text-white/40">Panel:</span> {result.panel_name || 'Complete Panel'}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {result.biomarkers?.length || 0} Biomarkers
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/patient/results?id=${result.id}`}
                    className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

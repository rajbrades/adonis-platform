'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'

interface LabResult {
  id: string
  patient_name: string
  patient_dob: string
  test_date: string
  lab_name: string
  biomarkers: any[]
  created_at: string
}

export default function ViewResultsPage() {
  const brand = getBrand()
  const [results, setResults] = useState<LabResult[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/admin/lab-results')
      const data = await res.json()
      setResults(data || [])
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch lab results:', error)
      setLoading(false)
    }
  }

  const filteredResults = results.filter(result => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      result.patient_name.toLowerCase().includes(term) ||
      result.patient_dob.includes(term) ||
      result.lab_name.toLowerCase().includes(term)
    )
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading results...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: brand.colors.primary }}>
                Lab Results
              </h1>
              <p className="text-sm text-gray-400">Browse and search all uploaded lab results</p>
            </div>
            <Link 
              href="/admin"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 mb-4">
          <input
            type="text"
            placeholder="Search by patient name, DOB, or panel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
          />
        </div>

        {filteredResults.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-12 text-center">
            <p className="text-gray-400">
              {searchTerm ? 'No results found matching your search' : 'No lab results uploaded yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-lg font-semibold flex items-center gap-2">
                        <span className="text-xl">👤</span>
                        {result.patient_name.toUpperCase()}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
                      <div>
                        <span className="text-gray-500">DOB:</span>{' '}
                        {new Date(result.patient_dob).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="text-gray-500">Test Date:</span>{' '}
                        {result.test_date || 'N/A'}
                      </div>
                      <div>
                        <span className="text-gray-500">Panel:</span>{' '}
                        {result.lab_name}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span 
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: `${brand.colors.primary}20`,
                          color: brand.colors.primary 
                        }}
                      >
                        {result.biomarkers?.length || 0} Biomarkers
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/admin/results/view/${result.id}`}
                    className="px-5 py-2.5 rounded-lg font-semibold transition-all hover:opacity-90 text-sm"
                    style={{ 
                      backgroundColor: brand.colors.primary,
                      color: brand.colors.primaryText 
                    }}
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

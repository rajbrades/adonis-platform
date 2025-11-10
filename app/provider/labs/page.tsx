'use client'

import { useState, useEffect } from 'react'
import { getBrand } from '@/lib/brand'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Loader2, Search } from 'lucide-react'

export default function ProviderLabsPage() {
  const brand = getBrand()
  const [reviewedLabs, setReviewedLabs] = useState<any[]>([])
  const [filteredLabs, setFilteredLabs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLabs()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = reviewedLabs.filter(c => 
        `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredLabs(filtered)
    } else {
      setFilteredLabs(reviewedLabs)
    }
  }, [searchTerm, reviewedLabs])

  const fetchLabs = async () => {
    try {
      const response = await fetch('/api/consultations')
      const data = await response.json()
      
      if (Array.isArray(data)) {
        // Show all approved consultations (labs were reviewed/recommended)
        const reviewed = data
          .filter(c => c.status === 'approved')
          .sort((a, b) => new Date(b.reviewed_at).getTime() - new Date(a.reviewed_at).getTime())
        
        setReviewedLabs(reviewed)
        setFilteredLabs(reviewed)
      }
    } catch (error) {
      console.error('Error fetching labs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/provider" className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black">
            <span style={{ color: brand.colors.primary }}>Lab</span> History
          </h1>
          <p className="text-white/60 mt-2">View all reviewed lab consultations</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by patient name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20"
            />
          </div>
        </div>

        {/* Reviewed Labs */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Reviewed Labs ({filteredLabs.length})
          </h2>

          {filteredLabs.length === 0 ? (
            <div className="text-center py-12 text-white/40 bg-white/5 rounded-2xl border border-white/10">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{searchTerm ? 'No labs match your search' : 'No reviewed labs yet'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLabs.map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-lg">
                        {consultation.first_name} {consultation.last_name}
                      </div>
                      <div className="text-sm text-white/60 truncate">
                        {consultation.email}
                      </div>
                      <div className="text-sm text-white/40 mt-1">
                        {consultation.recommended_labs?.panel_name || 'Custom Panel'} • 
                        Reviewed {new Date(consultation.reviewed_at).toLocaleDateString()}
                        {consultation.lab_upload_status === 'uploaded' && (
                          <span 
                            className="ml-2 px-2 py-0.5 rounded-full text-xs"
                            style={{
                              backgroundColor: `${brand.colors.primary}20`,
                              color: brand.colors.primary
                            }}
                          >
                            Labs Uploaded
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href={`/admin/patients/${consultation.id}`}
                    className="px-6 py-3 rounded-lg font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex-shrink-0"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { getBrand } from '@/lib/brand'
import Link from 'next/link'
import { Search, Filter, ArrowLeft, User, Loader2 } from 'lucide-react'

export default function ProviderPatientsPage() {
  const brand = getBrand()
  const [patients, setPatients] = useState<any[]>([])
  const [filteredPatients, setFilteredPatients] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [])

  useEffect(() => {
    let filtered = patients

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.isActive === (statusFilter === 'active'))
    }

    setFilteredPatients(filtered)
  }, [searchTerm, statusFilter, patients])

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/consultations')
      const data = await response.json()
      
      if (Array.isArray(data)) {
        // Determine active/inactive based on 12 months
        const now = new Date()
        const twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12))
        
        const patientsWithStatus = data.map(consultation => {
          const lastActivity = new Date(consultation.updated_at || consultation.created_at)
          const isActive = lastActivity >= twelveMonthsAgo && consultation.status !== 'rejected'
          
          return {
            ...consultation,
            isActive,
            lastActivity: lastActivity
          }
        })

        // Sort by most recent activity
        patientsWithStatus.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
        
        setPatients(patientsWithStatus)
        setFilteredPatients(patientsWithStatus)
      }
    } catch (error) {
      console.error('Error fetching patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatLastActivity = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/provider" className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black">
              <span style={{ color: brand.colors.primary }}>Patient</span> Database
            </h1>
            <p className="text-white/60 mt-2">View and manage all patients</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white focus:outline-none focus:border-white/30"
          >
            <option value="all">All Patients ({patients.length})</option>
            <option value="active">Active ({patients.filter(p => p.isActive).length})</option>
            <option value="inactive">Inactive ({patients.filter(p => !p.isActive).length})</option>
          </select>
        </div>

        {/* Patients Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              <User className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{searchTerm ? 'No patients match your search' : 'No patients found'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-semibold text-white/80">Patient</th>
                    <th className="text-left p-4 font-semibold text-white/80">Date of Birth</th>
                    <th className="text-left p-4 font-semibold text-white/80">Last Activity</th>
                    <th className="text-left p-4 font-semibold text-white/80">Status</th>
                    <th className="text-left p-4 font-semibold text-white/80">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${brand.colors.primary}20` }}
                          >
                            <User className="w-5 h-5" style={{ color: brand.colors.primary }} />
                          </div>
                          <div>
                            <div className="font-semibold">{patient.first_name} {patient.last_name}</div>
                            <div className="text-xs text-white/40">{patient.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-white/60">
                        {new Date(patient.date_of_birth).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-white/60">
                        {formatLastActivity(patient.lastActivity)}
                      </td>
                      <td className="p-4">
                        <span 
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            patient.isActive
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {patient.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/admin/patients/${patient.id}`}
                          className="px-4 py-2 rounded-lg font-semibold transition-all inline-block"
                          style={{
                            backgroundColor: brand.colors.primary,
                            color: brand.colors.primaryText
                          }}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

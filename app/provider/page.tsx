'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Clock, CheckCircle, AlertCircle, Calendar, Users, Activity } from 'lucide-react'

export default function ProviderDashboard() {
  const [loading, setLoading] = useState(true)
  const [pendingConsultations, setPendingConsultations] = useState<any[]>([])
  const [labReviews, setLabReviews] = useState<any[]>([])
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    labsToReview: 0,
    thisWeek: 0
  })

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      // Fetch consultations
      const consultResponse = await fetch('/api/consultations')
      const consultations = await consultResponse.json()
      
      // Fetch lab results
      const labResponse = await fetch('/api/admin/lab-results')
      const labResults = await labResponse.json()
      
      if (Array.isArray(consultations)) {
        // Pending = new consultations waiting for lab recommendations
        const pending = consultations.filter(c => c.status === 'pending')
        
        // Lab Reviews = patients who have uploaded labs
        const labsToReview = consultations.filter(c => {
          if (c.status !== 'approved') return false
          // Check if this patient has lab results (using user_id)
          return labResults.some((lab: any) => lab.user_id === c.id)
        })
        
        // This week's consultations
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        const thisWeek = consultations.filter(c => new Date(c.created_at) > oneWeekAgo)
        
        setPendingConsultations(pending)
        setLabReviews(labsToReview)
        setStats({
          pending: pending.length,
          approved: consultations.filter(c => c.status === 'approved').length,
          labsToReview: labsToReview.length,
          thisWeek: thisWeek.length
        })
      }
    } catch (error) {
      console.error('Error fetching consultations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-yellow-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-2">Provider Dashboard</h1>
          <p className="text-white/60 text-lg">Review consultations and manage patient care</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold text-yellow-400">{stats.pending}</span>
            </div>
            <div className="text-white/80 font-semibold">Pending Review</div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-green-500/10 to-green-600/5">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-green-400">{stats.approved}</span>
            </div>
            <div className="text-white/80 font-semibold">Approved</div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-blue-400">{stats.labsToReview}</span>
            </div>
            <div className="text-white/80 font-semibold">Labs to Review</div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-purple-400">{stats.thisWeek}</span>
            </div>
            <div className="text-white/80 font-semibold">This Week</div>
          </div>
        </div>

        {/* Pending Lab Recommendations */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Pending Lab Recommendations</h2>
            <Link 
              href="/provider/patients"
              className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold"
            >
              View All →
            </Link>
          </div>
          
          {pendingConsultations.length === 0 ? (
            <div className="p-12 rounded-2xl border border-white/10 bg-white/5 text-center text-white/60">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No pending consultations</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingConsultations.slice(0, 5).map((consultation) => (
                <Link
                  key={consultation.id}
                  href={`/provider/approve/${consultation.id}`}
                  className="block p-6 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        {consultation.first_name} {consultation.last_name}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                        <div>
                          <span className="font-semibold">Email:</span> {consultation.email}
                        </div>
                        <div>
                          <span className="font-semibold">DOB:</span> {new Date(consultation.date_of_birth).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-semibold">Goals:</span> {consultation.optimization_goals?.join(', ')}
                        </div>
                        <div>
                          <span className="font-semibold">Submitted:</span> {new Date(consultation.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div 
                      className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{ 
                        backgroundColor: 'rgba(234, 179, 8, 0.1)',
                        color: '#EAB308'
                      }}
                    >
                      Review
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Lab Reviews */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Lab Results to Review</h2>
            <Link 
              href="/provider/labs"
              className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold"
            >
              View All →
            </Link>
          </div>
          
          {labReviews.length === 0 ? (
            <div className="p-12 rounded-2xl border border-white/10 bg-white/5 text-center text-white/60">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No lab results to review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {labReviews.slice(0, 5).map((consultation) => (
                <Link
                  key={consultation.id}
                  href={`/provider/patients/${consultation.id}`}
                  className="block p-6 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        {consultation.first_name} {consultation.last_name}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                        <div>
                          <span className="font-semibold">Email:</span> {consultation.email}
                        </div>
                        <div>
                          <span className="font-semibold">Approved:</span> {new Date(consultation.reviewed_at).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-semibold">Panel:</span> {consultation.recommended_labs?.[0]?.name || 'Custom Panel'}
                        </div>
                        <div>
                          <span 
                            className="px-2 py-1 rounded-full text-xs inline-block"
                            style={{
                              backgroundColor: 'rgba(59, 130, 246, 0.2)',
                              color: '#60A5FA'
                            }}
                          >
                            Labs Uploaded
                          </span>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{ 
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        color: '#60A5FA'
                      }}
                    >
                      Review Labs
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/provider/patients"
            className="p-6 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Users className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">
              All Patients
            </h3>
            <p className="text-white/60 text-sm">View and manage all patients</p>
          </Link>

          <Link
            href="/provider/schedule"
            className="p-6 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Calendar className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">
              Schedule
            </h3>
            <p className="text-white/60 text-sm">Manage appointments</p>
          </Link>

          <Link
            href="/provider/labs"
            className="p-6 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
          >
            <FileText className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">
              Lab Results
            </h3>
            <p className="text-white/60 text-sm">Review patient lab results</p>
          </Link>
        </div>

      </div>
    </div>
  )
}

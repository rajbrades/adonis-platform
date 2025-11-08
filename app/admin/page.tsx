'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Upload, Eye, Bug, Users, FileText } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalResults: 0,
    totalPatients: 0,
    pendingConsultations: 0
  })

  useEffect(() => {
    // Fetch admin stats
    fetch('/api/admin/lab-results/list')
      .then(res => res.json())
      .then(data => {
        setStats({
          totalResults: data.results?.length || 0,
          totalPatients: new Set(data.results?.map((r: any) => r.patient_name)).size || 0,
          pendingConsultations: 0 // TODO: fetch from consultations API
        })
      })
      .catch(err => console.error('Error fetching stats:', err))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Admin <span className="text-yellow-400">Dashboard</span>
        </h1>
        <p className="text-white/60 mb-12">Manage lab results and patient data</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <FileText className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-3xl font-bold mb-1">{stats.totalResults}</div>
            <div className="text-white/60">Lab Results</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <Users className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-3xl font-bold mb-1">{stats.totalPatients}</div>
            <div className="text-white/60">Patients</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <FileText className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-3xl font-bold mb-1">{stats.pendingConsultations}</div>
            <div className="text-white/60">Pending Consultations</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            href="/admin/results/upload"
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all group"
          >
            <Upload className="w-12 h-12 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Upload Lab Results</h3>
            <p className="text-white/60">Upload and parse Quest Diagnostics PDFs</p>
          </Link>

          <Link 
            href="/admin/results/view"
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all group"
          >
            <Eye className="w-12 h-12 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">View All Results</h3>
            <p className="text-white/60">Browse and search all lab results</p>
          </Link>

          <Link 
            href="/admin/debug-pdf"
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all group"
          >
            <Bug className="w-12 h-12 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Debug PDF</h3>
            <p className="text-white/60">Test PDF parsing and troubleshoot issues</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

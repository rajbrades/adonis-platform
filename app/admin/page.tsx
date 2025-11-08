'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { useUser } from '@clerk/nextjs'

interface Consultation {
  id: string
  first_name: string
  last_name: string
  email: string
  date_of_birth: string
  status: string
  recommended_labs: any
  reviewed_at: string
  lab_upload_status: string | null
}

export default function AdminDashboard() {
  const brand = getBrand()
  const { user } = useUser()
  const [awaitingLabs, setAwaitingLabs] = useState<Consultation[]>([])
  const [stats, setStats] = useState({
    totalPatients: 0,
    labsThisMonth: 0,
    pendingConsultations: 0,
    activePatients: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const consultationsRes = await fetch('/api/consultations')
      const consultations = await consultationsRes.json()
      
      const needingLabs = consultations.filter((c: Consultation) => 
        c.status === 'approved' && 
        (!c.lab_upload_status || c.lab_upload_status === 'pending')
      )
      
      setAwaitingLabs(needingLabs)

      setStats({
        totalPatients: consultations.length,
        labsThisMonth: 2,
        pendingConsultations: consultations.filter((c: Consultation) => c.status === 'pending').length,
        activePatients: consultations.filter((c: Consultation) => c.status === 'approved').length
      })

      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: brand.colors.primary }}>
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-400">Manage lab results and patient coordination</p>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-sm text-gray-400">
                  Logged in as: <span className="text-white font-semibold">{user.firstName || user.emailAddresses[0].emailAddress}</span>
                </div>
              )}
              <Link 
                href="/"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {awaitingLabs.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <h2 className="text-xl font-bold">ACTION REQUIRED ({awaitingLabs.length})</h2>
            </div>
            
            <div className="space-y-3">
              {awaitingLabs.slice(0, 5).map((patient) => (
                <div 
                  key={patient.id}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {patient.first_name} {patient.last_name}
                        </h3>
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                          Labs Pending Upload
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
                        <div>
                          <span className="text-gray-500">Approved:</span>{' '}
                          {new Date(patient.reviewed_at).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="text-gray-500">DOB:</span>{' '}
                          {new Date(patient.date_of_birth).toLocaleDateString()}
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Recommended Panel:</span>{' '}
                          {patient.recommended_labs?.panel_name || 'Male Hormone Panel'}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/admin/upload-labs?patientId=${patient.id}`}
                      className="px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 text-sm"
                      style={{ 
                        backgroundColor: brand.colors.primary,
                        color: brand.colors.primaryText 
                      }}
                    >
                      Upload Labs →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {awaitingLabs.length > 5 && (
              <Link
                href="/admin/patients?filter=awaiting_labs"
                className="mt-3 inline-block text-sm hover:underline"
                style={{ color: brand.colors.primary }}
              >
                View all {awaitingLabs.length} patients awaiting labs →
              </Link>
            )}
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Quick Stats</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
              <div className="text-3xl font-bold mb-1">{stats.activePatients}</div>
              <div className="text-gray-400 text-sm">Active Patients</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
              <div className="text-3xl font-bold mb-1">{stats.labsThisMonth}</div>
              <div className="text-gray-400 text-sm">Labs This Month</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
              <div className="text-3xl font-bold mb-1">{stats.pendingConsultations}</div>
              <div className="text-gray-400 text-sm">Pending Reviews</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
              <div className="text-3xl font-bold mb-1">{stats.totalPatients}</div>
              <div className="text-gray-400 text-sm">Total Patients</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <Link
              href="/admin/patients"
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3" style={{ color: brand.colors.primary }}>👥</div>
              <h3 className="text-lg font-semibold mb-1 group-hover:translate-x-1 transition-transform">
                View All Patients
              </h3>
              <p className="text-gray-400 text-sm">Browse and search patient database</p>
            </Link>

            <Link
              href="/admin/upload-labs"
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3" style={{ color: brand.colors.primary }}>📤</div>
              <h3 className="text-lg font-semibold mb-1 group-hover:translate-x-1 transition-transform">
                Upload Lab Results
              </h3>
              <p className="text-gray-400 text-sm">Upload and parse Quest Diagnostics PDFs</p>
            </Link>

            <Link
              href="/admin/results/view"
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3" style={{ color: brand.colors.primary }}>👁️</div>
              <h3 className="text-lg font-semibold mb-1 group-hover:translate-x-1 transition-transform">
                View All Results
              </h3>
              <p className="text-gray-400 text-sm">Browse all uploaded lab results</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

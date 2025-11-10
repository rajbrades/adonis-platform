'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getBrand } from '@/lib/brand'
import { Users, FileText, Calendar, TrendingUp, Clock } from 'lucide-react'

export default function ProviderPortal() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const brand = getBrand()
  const [consultations, setConsultations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push('/sign-in')
      } else {
        fetchConsultations()
      }
    }
  }, [isLoaded, user])

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations')
      const data = await response.json()
      // API returns array directly, not { pending: [] }
      const pending = Array.isArray(data) ? data.filter(c => c.status === 'pending') : []
      setConsultations(pending)
    } catch (error) {
      console.error('Error fetching consultations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const stats = [
    { icon: Users, label: 'Active Patients', value: '247', change: '+12%' },
    { icon: FileText, label: 'Pending Reviews', value: String(consultations.length), change: '' },
    { icon: Calendar, label: 'Today\'s Appointments', value: '6', change: '' },
    { icon: TrendingUp, label: 'Patient Satisfaction', value: '98%', change: '+2%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-2">
            <span style={{ color: brand.colors.primary }}>Provider</span> Dashboard
          </h1>
          <p className="text-white/60 text-lg">Welcome back, Dr. {user.firstName || 'Provider'}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl border"
                style={{
                  background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primary}05)`,
                  borderColor: `${brand.colors.primary}20`
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-6 h-6" style={{ color: brand.colors.primary }} />
                  {stat.change && (
                    <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                  )}
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: brand.colors.primary }}>
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Pending Consultations */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Clock className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Pending Consultations
            </h2>
            <Link 
              href="/provider/patients"
              className="text-sm font-semibold hover:underline"
              style={{ color: brand.colors.primary }}
            >
              View All →
            </Link>
          </div>

          {consultations.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>No pending consultations</p>
            </div>
          ) : (
            <div className="space-y-4">
              {consultations.slice(0, 5).map((consultation) => (
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
                        backgroundColor: `${brand.colors.primary}20`,
                        color: brand.colors.primary
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/provider/patients"
            className="p-6 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Users className="w-8 h-8 mb-4" style={{ color: brand.colors.primary }} />
            <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
              View All Patients
            </h3>
            <p className="text-white/60 text-sm">
              Browse patient database and history
            </p>
          </Link>

          <Link
            href="/provider/schedule"
            className="p-6 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Calendar className="w-8 h-8 mb-4" style={{ color: brand.colors.primary }} />
            <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
              Schedule
            </h3>
            <p className="text-white/60 text-sm">
              Manage appointments and availability
            </p>
          </Link>

          <Link
            href="/provider/labs"
            className="p-6 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
          >
            <FileText className="w-8 h-8 mb-4" style={{ color: brand.colors.primary }} />
            <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
              Lab Results
            </h3>
            <p className="text-white/60 text-sm">
              Upload and review patient lab work
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

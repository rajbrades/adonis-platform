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
    if (isLoaded && user) {
      fetchConsultations()
    }
  }, [isLoaded, user])

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations')
      const data = await response.json()
      setConsultations(data.pending || [])
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
    router.push('/sign-in')
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
                  background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
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
              href="/provider/consultations"
              className="text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: brand.colors.primary }}
            >
              View All →
            </Link>
          </div>

          {consultations.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No pending consultations
            </div>
          ) : (
            <div className="space-y-4">
              {consultations.slice(0, 5).map((consultation) => (
                <div 
                  key={consultation.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${brand.colors.primary}20` }}
                    >
                      <Users className="w-6 h-6" style={{ color: brand.colors.primary }} />
                    </div>
                    <div>
                      <div className="font-semibold">{consultation.name}</div>
                      <div className="text-sm text-white/60">
                        Submitted {consultation.submitted || 'recently'}
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href={`/provider/approve/${consultation.id}`}
                    className="px-6 py-2 rounded-lg font-semibold transition-all"
                    style={{
                      background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                      color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                    }}
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/provider/patients"
            className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
          >
            <Users className="w-8 h-8 mb-4" style={{ color: brand.colors.primary }} />
            <h3 className="text-xl font-bold mb-2">Patient List</h3>
            <p className="text-white/60">View and manage all patients</p>
          </Link>

          <Link
            href="/provider/labs"
            className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
          >
            <FileText className="w-8 h-8 mb-4" style={{ color: brand.colors.primary }} />
            <h3 className="text-xl font-bold mb-2">Lab Results</h3>
            <p className="text-white/60">Review pending lab reports</p>
          </Link>

          <Link
            href="/provider/schedule"
            className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
          >
            <Calendar className="w-8 h-8 mb-4" style={{ color: brand.colors.primary }} />
            <h3 className="text-xl font-bold mb-2">Schedule</h3>
            <p className="text-white/60">Manage appointments</p>
          </Link>
        </div>

      </div>
    </div>
  )
}

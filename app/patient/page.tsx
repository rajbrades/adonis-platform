'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getBrand } from '@/lib/brand'
import { FileText, Calendar, ShoppingCart, Pill, User, LogOut, Loader2 } from 'lucide-react'

export default function PatientPortal() {
  const router = useRouter()
  const brand = getBrand()
  const [patientData, setPatientData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if patient is logged in
    const patientId = sessionStorage.getItem('patient_id')
    const patientName = sessionStorage.getItem('patient_name')
    
    if (!patientId || !patientName) {
      router.push('/patient/login')
      return
    }

    // For now, set basic patient info from session
    setPatientData({
      id: patientId,
      name: patientName
    })
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    sessionStorage.clear()
    router.push('/patient/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  const menuItems = [
    {
      icon: FileText,
      title: 'Lab Results',
      description: 'View your test results and health metrics',
      href: '/patient/results'
    },
    {
      icon: Calendar,
      title: 'Appointments',
      description: 'Schedule and manage consultations',
      href: '#',
      comingSoon: true
    },
    {
      icon: Pill,
      title: 'My Treatments',
      description: 'View current medications and protocols',
      href: '#',
      comingSoon: true
    },
    {
      icon: ShoppingCart,
      title: 'Shop',
      description: 'Browse and order supplements',
      href: '/patient/cart'
    },
    {
      icon: User,
      title: 'Profile',
      description: 'Update your information and preferences',
      href: '#',
      comingSoon: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Welcome back, <span style={{ color: brand.colors.primary }}>{patientData?.name?.split(',')[1]?.trim() || 'Patient'}</span>
            </h1>
            <p className="text-white/60 text-lg">Your ADONIS Health Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Exit Portal
          </button>
        </div>

        {/* Quick Stats - Coming Soon */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div 
            className="p-6 rounded-2xl border relative opacity-50"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primary}05)`,
              borderColor: `${brand.colors.primary}20`
            }}
          >
            <div className="absolute top-2 right-2 px-2 py-1 bg-white/10 rounded text-xs font-semibold text-white/60">
              Coming Soon
            </div>
            <div className="text-3xl font-bold mb-1" style={{ color: '#666' }}>—</div>
            <div className="text-white/60 text-sm">Active Treatments</div>
          </div>
          
          <div 
            className="p-6 rounded-2xl border relative opacity-50"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primary}05)`,
              borderColor: `${brand.colors.primary}20`
            }}
          >
            <div className="absolute top-2 right-2 px-2 py-1 bg-white/10 rounded text-xs font-semibold text-white/60">
              Coming Soon
            </div>
            <div className="text-3xl font-bold mb-1" style={{ color: '#666' }}>—</div>
            <div className="text-white/60 text-sm">Lab Reports</div>
          </div>
          
          <div 
            className="p-6 rounded-2xl border relative opacity-50"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primary}05)`,
              borderColor: `${brand.colors.primary}20`
            }}
          >
            <div className="absolute top-2 right-2 px-2 py-1 bg-white/10 rounded text-xs font-semibold text-white/60">
              Coming Soon
            </div>
            <div className="text-3xl font-bold mb-1" style={{ color: '#666' }}>—</div>
            <div className="text-white/60 text-sm">Upcoming Appointments</div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const isComingSoon = item.comingSoon
            
            const card = (
              <div
                className={`p-8 rounded-2xl border border-white/10 transition-all group relative ${
                  isComingSoon 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-white/5 hover:border-white/20 cursor-pointer'
                }`}
                style={{
                  background: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                }}
              >
                {isComingSoon && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-white/60">
                    Coming Soon
                  </div>
                )}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${brand.colors.primary}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: isComingSoon ? '#666' : brand.colors.primary }} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${!isComingSoon && 'group-hover:translate-x-1 transition-transform'}`}>
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
            )

            return isComingSoon ? (
              <div key={idx}>{card}</div>
            ) : (
              <Link key={idx} href={item.href}>
                {card}
              </Link>
            )
          })}
        </div>

        {/* Recent Activity - Coming Soon */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative opacity-50">
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-white/60">
            Coming Soon
          </div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#666' }}>Recent Activity</h2>
          <div className="text-center py-12 text-white/40">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Activity tracking will be available soon</p>
          </div>
        </div>

      </div>
    </div>
  )
}

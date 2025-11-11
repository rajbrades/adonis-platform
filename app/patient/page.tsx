'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { getBrand } from '@/lib/brand'
import { FileText, Calendar, ShoppingCart, Pill, User, LogOut, Loader2 } from 'lucide-react'

// Force this route to be dynamic (not pre-rendered)
export const dynamic = 'force-dynamic'

function PatientPortalContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const brand = getBrand()
  const [patientData, setPatientData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const consultationLink = searchParams.get('link')

  useEffect(() => {
    handleAuth()
  }, [consultationLink])

  const handleAuth = async () => {
    if (consultationLink) {
      sessionStorage.setItem('pending_consultation_link', consultationLink)
      router.push(`/patient/signup?consultation=${consultationLink}`)
      return
    }

    const patientId = sessionStorage.getItem('patient_id')
    const patientName = sessionStorage.getItem('patient_name')
    
    if (!patientId || !patientName) {
      router.push('/patient/login')
      return
    }

    const pendingLink = sessionStorage.getItem('pending_consultation_link')
    if (pendingLink) {
      await linkConsultation(pendingLink, patientId)
      sessionStorage.removeItem('pending_consultation_link')
    }

    setPatientData({
      id: patientId,
      name: patientName
    })
    setLoading(false)
  }

  const linkConsultation = async (consultationId: string, patientId: string) => {
    try {
      await fetch('/api/patient/link-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consultationId, patientId })
      })
    } catch (error) {
      console.error('Error linking consultation:', error)
    }
  }

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

export default function PatientPortal() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    }>
      <PatientPortalContent />
    </Suspense>
  )
}

'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { getBrand } from '@/lib/brand'
import { FileText, Calendar, ShoppingCart, Pill, User, LogOut, Loader2 } from 'lucide-react'

function PatientPortalContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const brand = getBrand()
  const [patientData, setPatientData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const consultationLink = searchParams.get('link')

  useEffect(() => {
    // If there's a consultation link, redirect to signup/login
    if (consultationLink) {
      // Store the link in session to retrieve after login
      sessionStorage.setItem('pending_consultation_link', consultationLink)
      router.push(`/patient/signup?consultation=${consultationLink}`)
      return
    }

    // Check if patient is logged in
    const patient = localStorage.getItem('patient')
    
    if (!patient) {
      router.push('/patient/login')
      return
    }

    try {
      // Parse patient data from localStorage
      const patientInfo = JSON.parse(patient)
      setPatientData(patientInfo)
    } catch (e) {
      console.error('Error parsing patient data:', e)
      router.push('/patient/login')
      return
    }
    
    setLoading(false)
  }, [router, consultationLink])

  const handleLogout = () => {
    localStorage.removeItem('patient')
    router.push('/patient/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Welcome back, <span style={{ color: brand.colors.primary }}>{patientData?.name || patientData?.full_name || 'Patient'}</span>
            </h1>
            <p className="text-white/60">Your ADONIS Health Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            Exit Portal
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">Coming Soon</span>
              <Pill className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold">Active Treatments</h3>
            <p className="text-white/60 text-sm">View and manage</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">Coming Soon</span>
              <FileText className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold">Lab Reports</h3>
            <p className="text-white/60 text-sm">Latest results</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">Coming Soon</span>
              <Calendar className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold">Upcoming Appointments</h3>
            <p className="text-white/60 text-sm">Schedule & manage</p>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Lab Results */}
          <Link
            href="/patient/results"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Lab Results</h3>
            <p className="text-white/60 text-sm">View your test results and health metrics</p>
          </Link>

          {/* Appointments */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-500/20 px-3 py-1 rounded-full text-xs font-semibold text-yellow-500">
              Coming Soon
            </div>
            <div className="w-12 h-12 bg-gray-500/10 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-400">Appointments</h3>
            <p className="text-white/40 text-sm">Schedule and manage consultations</p>
          </div>

          {/* My Treatments */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-500/20 px-3 py-1 rounded-full text-xs font-semibold text-yellow-500">
              Coming Soon
            </div>
            <div className="w-12 h-12 bg-gray-500/10 rounded-xl flex items-center justify-center mb-4">
              <Pill className="w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-400">My Treatments</h3>
            <p className="text-white/40 text-sm">View current medications and protocols</p>
          </div>

          {/* Shop */}
          <Link
            href="/patient/cart"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Shop</h3>
            <p className="text-white/60 text-sm">Browse and order supplements</p>
          </Link>

          {/* Profile */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden">
          {/* Profile */}
          <Link
            href="/patient/profile"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Profile</h3>
            <p className="text-white/60 text-sm">Update your information and preferences</p>
          </Link>

        {/* Recent Activity */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-xs font-semibold text-yellow-500">
              Coming Soon
            </span>
          </div>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">Activity tracking will be available soon</p>
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

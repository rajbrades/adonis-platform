export const dynamic = "force-dynamic"
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { Lock, Calendar, User, Eye, EyeOff, ShoppingBag, Loader2 } from 'lucide-react'

function LoginForm() {
  const brand = getBrand()
  const router = useRouter()
  const searchParams = useSearchParams()
  const consultationId = searchParams.get('consultation')
  const registered = searchParams.get('registered')
  
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    password: ''
  })

  useEffect(() => {
    if (consultationId) {
      sessionStorage.setItem('pending_consultation_link', consultationId)
    }
  }, [consultationId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/patient/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        sessionStorage.setItem('patient_id', data.patient.id)
        sessionStorage.setItem('patient_name', data.patient.full_name)
        sessionStorage.setItem('patient_dob', data.patient.date_of_birth)
        router.push('/patient')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-6 pt-32 pb-12">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: `${brand.colors.primary}20` }}
          >
            <ShoppingBag className="w-10 h-10" style={{ color: brand.colors.primary }} />
          </div>
          <h1 className="text-3xl font-black mb-2">Patient Login</h1>
          <p className="text-white/60">
            {consultationId 
              ? 'Sign in to view your personalized health plan'
              : 'Sign in to access your health dashboard'
            }
          </p>
        </div>

        {registered === 'true' && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/40 rounded-lg">
            <p className="text-green-400 text-sm">✓ Account created successfully! Please sign in.</p>
          </div>
        )}

        {consultationId && (
          <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/40 rounded-lg">
            <p className="text-yellow-400 text-sm">✓ Your consultation has been approved! Sign in to view your recommendations.</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="LASTNAME, FIRSTNAME"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-400/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password *</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{
              backgroundColor: brand.colors.primary,
              color: '#000000'
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          Don't have an account?{' '}
          <Link 
            href={consultationId ? `/patient/signup?consultation=${consultationId}` : '/patient/signup'}
            className="font-semibold hover:underline"
            style={{ color: brand.colors.primary }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function PatientLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

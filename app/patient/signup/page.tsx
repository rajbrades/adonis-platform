'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { Lock, Calendar, User, Mail, Phone, Eye, EyeOff, UserPlus } from 'lucide-react'

export default function PatientSignupPage() {
  const brand = getBrand()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual registration
    router.push('/patient')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-6 pt-32 pb-12">
      <div className="w-full max-w-md">
        
        {/* Icon */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: `${brand.colors.primary}20` }}
          >
            <UserPlus className="w-10 h-10" style={{ color: brand.colors.primary }} />
          </div>
          <h1 className="text-3xl font-black mb-2">Create Account</h1>
          <p className="text-white/60">Sign up to access your lab results</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="LASTNAME, FIRSTNAME"
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
              />
            </div>
            <p className="text-xs text-white/50 mt-1">Enter your name exactly as it appears on your lab report</p>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                placeholder="MM/DD/YYYY"
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email (Optional)</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2">Phone (Optional)</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(555) 123-4567"
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">Password *</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg pl-12 pr-12 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-white/50 mt-1">At least 8 characters</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password *</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="••••••••"
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg pl-12 pr-12 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-lg font-bold text-lg transition-all"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
              color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
            }}
          >
            Create Account
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <span className="text-white/60">Already have an account? </span>
            <Link href="/patient/login" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: brand.colors.primary }}>
              Sign In
            </Link>
          </div>

        </form>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}

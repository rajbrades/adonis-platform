'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Target, User, Calendar, Ruler, Weight, Briefcase, Phone, Mail } from 'lucide-react'

export default function ConsultationIntakePage() {
  const brand = getBrand()
  const router = useRouter()
  const brand = getBrand()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    occupation: '',
    optimizationGoals: [] as string[]
  })

  const goalOptions = [
    'Increase Energy & Vitality',
    'Build Muscle',
    'Weight Loss & Body Composition',
    'Enhanced Athletic Performance',
    'Improved Sleep Quality',
    'Better Mental Clarity & Focus',
    'Increased Libido & Sexual Performance',
    'Anti-Aging & Longevity',
    'Hair Loss Prevention',
    'Stress Management'
  ]

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      optimizationGoals: prev.optimizationGoals.includes(goal)
        ? prev.optimizationGoals.filter(g => g !== goal)
        : [...prev.optimizationGoals, goal]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.dateOfBirth) {
      alert('Please fill in all required fields')
      return
    }
    
    if (formData.optimizationGoals.length === 0) {
      alert('Please select at least one optimization goal')
      return
    }

    sessionStorage.setItem('consultationData', JSON.stringify(formData))
    router.push('/consultation/medical-history')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        <div className="mb-12">
          <Link href="/" className="inline-block mb-8 text-white/60 hover:text-white transition">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Start Your <span style={{ color: brand.colors.primary }}>Optimization</span> Journey
          </h1>
          <p className="text-xl text-white/60">Tell us about yourself and your health goals</p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold" style={{ color: brand.colors.primary }}>Step 1 of 3</span>
            <span className="text-sm text-white/50">Personal Information</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="h-2 rounded-full transition-all duration-300" style={{width: '33%', backgroundColor: brand.colors.primary}}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <User className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Personal Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/10 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Occupation
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Height (inches)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="70"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Weight className="w-4 h-4" />
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="180"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Target className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Your Optimization Goals
            </h2>
            <p className="text-white/60 mb-6">Select all that apply (at least one required)</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleGoalToggle(goal)}
                  className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.optimizationGoals.includes(goal)
                      ? ''
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                  style={formData.optimizationGoals.includes(goal) ? {
                    backgroundColor: `${brand.colors.primary}10`,
                    borderColor: brand.colors.primary,
                    color: brand.colors.primary
                  } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      formData.optimizationGoals.includes(goal) ? '' : 'border-white/30'
                    }`}
                    style={formData.optimizationGoals.includes(goal) ? {
                      backgroundColor: brand.colors.primary,
                      borderColor: brand.colors.primary
                    } : {}}>
                      {formData.optimizationGoals.includes(goal) && (
                        <svg className="w-3 h-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor"
                        style={{ color: brand.id === 'adonis' ? '#000000' : '#FFFFFF' }}>
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">{goal}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-8">
            <Link
              href="/"
              className="text-white/60 hover:text-white transition"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              className="px-8 py-4 rounded-lg font-bold transition-all duration-300 flex items-center gap-2"
              style={{
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Continue to Medical History
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

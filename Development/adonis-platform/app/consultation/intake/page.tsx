'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function IntakePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    occupation: '',
    primaryGoals: [] as string[]
  })

  const goals = [
    'Increase Energy & Vitality',
    'Optimize Testosterone Levels',
    'Improve Sleep Quality',
    'Weight Loss & Body Composition',
    'Enhanced Athletic Performance',
    'Better Cognitive Function',
    'Anti-Aging & Longevity',
    'Stress Management'
  ]

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : [...prev.primaryGoals, goal]
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.dateOfBirth && formData.primaryGoals.length > 0

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
          <div className="text-white/60">Step 2 of 4</div>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-4 text-yellow-400">
            Personal Information
          </h1>
          <p className="text-white/70">
            Help us understand your background and optimization goals
          </p>
        </div>

        <form className="space-y-8">
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none"
                  placeholder="e.g., CEO, Executive, Entrepreneur"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Optimization Goals</h2>
            <p className="text-white/70 mb-6">Select all that apply to your health and performance goals:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleGoalToggle(goal)}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    formData.primaryGoals.includes(goal)
                      ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400'
                      : 'bg-white/5 border-white/20 text-white/80 hover:border-yellow-400/50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded border-2 mr-3 ${
                      formData.primaryGoals.includes(goal)
                        ? 'bg-yellow-400 border-yellow-400'
                        : 'border-white/40'
                    }`}></div>
                    {goal}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-8">
            <Link
              href="/consultation"
              className="flex items-center text-white/70 hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Link>
            
            <Link
              href="/consultation/medical-history"
              className={`flex items-center px-8 py-3 rounded-lg font-bold transition-all ${
                isFormValid
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg'
                  : 'bg-white/10 text-white/50 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}


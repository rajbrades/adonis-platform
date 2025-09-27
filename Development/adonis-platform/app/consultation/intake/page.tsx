'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function IntakePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.dateOfBirth

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-black mb-8 text-yellow-400">
          Personal Information
        </h1>

        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                placeholder="Last name"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-8">
          <Link href="/consultation" className="text-white/70 hover:text-yellow-400">
            Back
          </Link>
          
          <Link
            href="/products"
            className={`px-8 py-3 rounded-lg font-bold ${
              isFormValid
                ? 'bg-yellow-400 text-black'
                : 'bg-white/10 text-white/50'
            }`}
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ConsultationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  occupation?: string
  optimizationGoals?: string[]
  [key: string]: unknown
}

export default function ReviewPage() {
  const router = useRouter()
  const [consultationData, setConsultationData] = useState<ConsultationData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Get consultation data from sessionStorage
    const data = sessionStorage.getItem('consultationData')
    if (data) {
      setConsultationData(JSON.parse(data))
    } else {
      // If no data, redirect back to start
      router.push('/consultation/intake')
    }
  }, [router])

  const handleSubmit = async () => {
    if (!consultationData) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/consultations/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit consultation')
      }

      // Store submission ID for confirmation page
      sessionStorage.setItem('submissionId', result.submissionId)

      // Clear consultation data
      sessionStorage.removeItem('consultationData')

      // Show success message
      alert('Consultation submitted successfully!')
      router.push('/')

    } catch (err) {
      console.error('Submission error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit consultation. Please try again.'
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!consultationData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
          <div className="text-white/60">Step 4 of 4</div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-6 text-yellow-400">
            Assessment Complete
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Thank you for completing your health assessment. Our medical team will review your information.
          </p>
        </div>

        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">What Happens Next</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Medical Review</h3>
                <p className="text-white/70">A licensed physician will review your assessment within 24-48 hours.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Lab Recommendations</h3>
                <p className="text-white/70">We will provide specific lab tests if appropriate for your case.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Treatment Plan</h3>
                <p className="text-white/70">Personalized optimization protocol based on your assessment and labs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">Consultation Fee: $199</h2>
          <p className="text-white/70 mb-6">
            Complete your consultation to receive personalized medical recommendations
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Complete Consultation - $199'}
          </button>
          
          <p className="text-white/60 text-sm">
            Fully refundable guarantee
          </p>
        </div>

        <div className="flex justify-between items-center">
          <Link
            href="/consultation/medical-history"
            className="flex items-center text-white/70 hover:text-yellow-400 transition-colors"
          >
            ← Back
          </Link>
          <Link href="/" className="text-white/70 hover:text-yellow-400 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

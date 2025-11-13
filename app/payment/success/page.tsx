'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check, Loader2, FileText } from 'lucide-react'
import Link from 'next/link'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [consultation, setConsultation] = useState<any>(null)

  useEffect(() => {
    if (!sessionId) {
      setError(true)
      setLoading(false)
      return
    }

    fetch('/api/stripe/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(true)
        } else {
          setConsultation(data.consultation)
        }
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Payment Error</h1>
          <p className="text-white/60 mb-8">There was an issue verifying your payment.</p>
          <Link href="/" className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-32">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-5xl font-black mb-4">Payment Successful!</h1>
          <p className="text-xl text-white/60">
            Thank you for your order, {consultation?.first_name}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-yellow-500" />
            What Happens Next
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-yellow-500 font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Lab Requisition Sent</h3>
                <p className="text-white/60 text-sm">
                  Check your email for your Quest Diagnostics requisition form. You can also download it from your patient portal.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-yellow-500 font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Visit Quest Diagnostics</h3>
                <p className="text-white/60 text-sm">
                  Take your requisition to any Quest location. No appointment needed. Find a location at QuestDiagnostics.com
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-yellow-500 font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Results in 3-5 Days</h3>
                <p className="text-white/60 text-sm">
                  Once your results are ready, we'll email you to create your patient portal account and view your comprehensive analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all"
          >
            Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}

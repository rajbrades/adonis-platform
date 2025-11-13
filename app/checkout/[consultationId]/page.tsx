'use client'

import { use, useEffect, useState } from 'react'
import { LAB_PANELS } from '@/lib/lab-panels'
import { Check, Loader2 } from 'lucide-react'

export default function CheckoutPage({ params }: { params: Promise<{ consultationId: string }> }) {
  const { consultationId } = use(params)
  const [loading, setLoading] = useState<string | null>(null)
  const [consultation, setConsultation] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/consultations/${consultationId}`)
      .then(res => res.json())
      .then(data => setConsultation(data))
  }, [consultationId])

  const handleCheckout = async (panelType: string) => {
    setLoading(panelType)
    
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultationId,
          panelType
        })
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(null)
    }
  }

  if (!consultation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4">
            Choose Your Lab Panel
          </h1>
          <p className="text-xl text-white/60">
            Hi {consultation.first_name}, select the panel that's right for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(LAB_PANELS).map(([key, panel]) => (
            <div
              key={key}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-yellow-500/50 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2">{panel.name}</h3>
              <div className="text-4xl font-black text-yellow-500 mb-4">
                ${(panel.price / 100).toFixed(0)}
              </div>
              <p className="text-white/60 mb-6">{panel.description}</p>
              
              <ul className="space-y-3 mb-8">
                {panel.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(key)}
                disabled={loading !== null}
                className="w-full py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading === key ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Select Panel'
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-white/40 text-sm mb-4">Secure payment powered by Stripe</p>
          <p className="text-white/60 text-sm">
            All panels include physician review • Results in 3-5 days • Quest Diagnostics certified
          </p>
        </div>

      </div>
    </div>
  )
}

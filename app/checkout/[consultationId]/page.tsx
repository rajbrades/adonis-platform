'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function CheckoutPage({ params }: { params: Promise<{ consultationId: string }> }) {
  const resolvedParams = use(params)
  const [consultation, setConsultation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConsultation()
  }, [])

  const fetchConsultation = async () => {
    try {
      const res = await fetch(`/api/consultations/${resolvedParams.consultationId}`)
      const data = await res.json()
      setConsultation(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectPanel = async (panel: any) => {
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultationId: resolvedParams.consultationId,
          panelType: panel.slug,
          panelName: panel.name,
          panelPrice: panel.price
        })
      })

      const data = await res.json()
      
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/60">Loading...</p>
      </div>
    )
  }

  if (!consultation || !consultation.recommended_labs || consultation.recommended_labs.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60">No lab panels recommended</p>
        </div>
      </div>
    )
  }

  const recommendedLabs = consultation.recommended_labs

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4 text-yellow-400">Choose Your Lab Panel</h1>
          <p className="text-xl text-white/80">
            Hi {consultation.first_name}, select the panel that's right for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recommendedLabs.map((panel: any, index: number) => (
            <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <h2 className="text-2xl font-bold mb-4">{panel.name}</h2>
              <div className="text-4xl font-black text-yellow-400 mb-6">${panel.price}</div>
              
              <p className="text-white/70 mb-6">{panel.description}</p>
              
              <div className="space-y-3 mb-8">
                {panel.features?.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSelectPanel(panel)}
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
              >
                Select Panel
              </button>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-white/60">
          <p className="mb-2">Secure payment powered by Stripe</p>
          <p>All panels include physician review • Results in 3-5 days • Quest Diagnostics certified</p>
        </div>
      </div>
    </div>
  )
}

'use client'

import { getTenantConfig } from '@/lib/tenant-config'
const tenant = getTenantConfig()

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, FileText } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function RecommendationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [consultation, setConsultation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConsultation()
  }, [])

  const fetchConsultation = async () => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()

      if (error) throw error
      setConsultation(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/60">Loading your recommendations...</p>
      </div>
    )
  }

  if (!consultation || consultation.status !== 'approved') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h1 className="text-2xl font-bold mb-2">Consultation Under Review</h1>
          <p className="text-white/60">Your consultation is being reviewed by our medical team.</p>
        </div>
      </div>
    )
  }

  const recommendedLabs = consultation.recommended_labs || []
  const totalPrice = recommendedLabs.reduce((sum: number, lab: any) => sum + (lab.price || 0), 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            {tenant.name}
          </Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-black mb-4 text-yellow-400">
            Your Personalized Health Plan is Ready
          </h1>
          <p className="text-xl text-white/80">
            Our medical team has reviewed your assessment and created a customized optimization plan
          </p>
        </div>

        {/* Provider Notes */}
        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-yellow-400">
            <FileText className="w-6 h-6 mr-3" />
            Provider Recommendations
          </h2>
          <div className="bg-white/5 p-6 rounded-lg">
            <p className="text-white/90 leading-relaxed">{consultation.provider_notes}</p>
          </div>
        </div>

        {/* Recommended Lab Panels */}
        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">Recommended Lab Testing</h2>
          <div className="space-y-4">
            {recommendedLabs.map((lab: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{lab.name}</h3>
                    <p className="text-white/70">{lab.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-3xl font-bold text-yellow-400">${lab.price}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-white/60">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Comprehensive biomarker analysis included
                </div>
              </div>
            ))}
          </div>

          {totalPrice > 0 && (
            <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Investment:</span>
                <span className="text-2xl font-bold text-yellow-400">${totalPrice}</span>
              </div>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Order Your Lab Tests</h3>
                <p className="text-white/70">Secure your lab panels below to get started</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Visit a Lab Location</h3>
                <p className="text-white/70">Get your blood drawn at any Quest or LabCorp location</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Review Results & Start Treatment</h3>
                <p className="text-white/70">We'll review your results and create your personalized protocol</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA - FIXED: Now wired to checkout */}
        <div className="text-center">
          <Link href={`/checkout/${resolvedParams.id}`}>
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all mb-4">
              Order Lab Tests - ${totalPrice}
            </button>
          </Link>
          <p className="text-white/60 text-sm">
            Questions? Contact our support team
          </p>
        </div>
      </div>
    </div>
  )
}

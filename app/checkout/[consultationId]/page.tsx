'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, Shield, Award, FileText, User } from 'lucide-react'

const DEFAULT_FEATURES: Record<string, string[]> = {
  'Essential Panel': [
    'Hormone Panel (Testosterone, Estradiol, DHEA)',
    'Thyroid Function (TSH, T3, T4)',
    'Metabolic Panel (Glucose, HbA1c, Lipids)',
    'Vitamin D',
    'Complete Blood Count'
  ],
  'Comprehensive Panel': [
    'Everything in Essential Panel',
    'Advanced Hormone Panel',
    'Liver & Kidney Function',
    'Inflammation Markers (CRP)',
    'Vitamins & Minerals',
    'PSA (Prostate Health)'
  ],
  'Complete Panel': [
    'Everything in Comprehensive Panel',
    'Advanced Cardiovascular Markers',
    'Insulin Resistance Testing',
    'Cortisol & Stress Hormones',
    'Growth Hormone Markers',
    'Nutrient Optimization Panel'
  ],
  'Elite Panel': [
    'Everything in Complete Panel',
    'Genetic Methylation Analysis',
    'Advanced Longevity Biomarkers',
    'Comprehensive Micronutrient Testing',
    'Oxidative Stress Markers',
    'Advanced Endocrine Panel'
  ]
}

export default function CheckoutPage({ params }: { params: Promise<{ consultationId: string }> }) {
  const resolvedParams = use(params)
  const [consultation, setConsultation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

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

  const handleCompleteOrder = async () => {
    setProcessing(true)
    const panel = consultation.recommended_labs[0]
    
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
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <p className="text-white/60">Loading your personalized plan...</p>
      </div>
    )
  }

  if (!consultation || !consultation.recommended_labs || consultation.recommended_labs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60">No lab panels recommended</p>
        </div>
      </div>
    )
  }

  const panel = consultation.recommended_labs[0]
  const providerName = consultation.reviewed_by || 'Your provider'
  const features = panel.features || DEFAULT_FEATURES[panel.name as string] || DEFAULT_FEATURES['Comprehensive Panel']

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <header className="bg-black/50 backdrop-blur-sm border-b border-yellow-500/20 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Provider Recommendation Header */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-8 mb-8">
          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                {providerName} Recommends This Panel For You
              </h2>
              <p className="text-white/70">
                Based on your consultation on {new Date(consultation.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          
          {consultation.provider_notes && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4">
              <div className="flex items-start space-x-3 mb-3">
                <FileText className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold">Provider Notes:</h3>
              </div>
              <p className="text-white/90 leading-relaxed whitespace-pre-wrap pl-8">
                {consultation.provider_notes}
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Panel Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-black mb-2">{panel.name}</h1>
                  <p className="text-white/70">{panel.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-black text-yellow-400">${panel.price}</div>
                  <p className="text-sm text-white/60 mt-1">One-time payment</p>
                </div>
              </div>

              {/* What's Included */}
              <div className="border-t border-white/10 pt-6 mb-6">
                <h3 className="text-xl font-bold mb-4">What's Included in Your Panel:</h3>
                <div className="space-y-3">
                  {features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="border-t border-white/10 pt-6 mb-6">
                <h3 className="text-xl font-bold mb-4">What You'll Discover:</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-yellow-400/10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-semibold">Your Hormone Balance</p>
                      <p className="text-sm text-white/60">Testosterone, estradiol, DHEA, and more</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-yellow-400/10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-semibold">Metabolic Health Status</p>
                      <p className="text-sm text-white/60">Blood sugar, cholesterol, thyroid function</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-yellow-400/10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-semibold">Performance Optimization Opportunities</p>
                      <p className="text-sm text-white/60">Personalized protocol based on YOUR data</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCompleteOrder}
                disabled={processing}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : `Complete My Order - $${panel.price}`}
              </button>

              <p className="text-center text-sm text-white/60 mt-4">
                🔒 Secure payment powered by Stripe • HSA/FSA eligible
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What Happens Next */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                What Happens Next
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Complete Payment</p>
                    <p className="text-xs text-white/60">Secure checkout in 2 minutes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Get Lab Requisition</p>
                    <p className="text-xs text-white/60">Email arrives instantly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Visit Quest Diagnostics</p>
                    <p className="text-xs text-white/60">Any location, no appointment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0 text-sm">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Results in 3-5 Days</p>
                    <p className="text-xs text-white/60">Comprehensive analysis + protocol</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Why ADONIS?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">HIPAA Compliant</p>
                    <p className="text-xs text-white/60">Your data is secure & private</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Quest Diagnostics</p>
                    <p className="text-xs text-white/60">America's most trusted lab</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Licensed Physicians</p>
                    <p className="text-xs text-white/60">Board-certified medical team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-6">
              <p className="text-sm text-white/90 italic mb-3">
                "Finally got answers after years of feeling off. My testosterone was 280 - now I know exactly what to fix."
              </p>
              <p className="text-xs text-white/60">
                - Michael R., Miami • Age 42
              </p>
            </div>

            {/* Money Back Guarantee */}
            <div className="bg-white/5 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="font-bold text-sm mb-2">100% Satisfaction Guarantee</p>
              <p className="text-xs text-white/60">
                If you're not satisfied with your results, we'll refund your money. No questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              HSA/FSA Eligible
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              CLIA Certified Lab
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Fast 3-5 Day Results
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              No Appointment Needed
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

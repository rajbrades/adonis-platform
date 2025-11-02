'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Zap, TrendingUp, Brain, Heart, Award, Shield, CheckCircle } from 'lucide-react'

export default function TestosteroneReplacementPage() {
  const brand = getBrand()

  const benefits = [
    { icon: Zap, title: "Increased Energy", description: "Sustained vitality throughout the day" },
    { icon: TrendingUp, title: "Muscle Growth", description: "Enhanced protein synthesis and recovery" },
    { icon: Brain, title: "Mental Clarity", description: "Improved focus and cognitive function" },
    { icon: Heart, title: "Better Libido", description: "Enhanced sexual performance and drive" },
    { icon: Award, title: "Athletic Performance", description: "Improved strength and endurance" },
    { icon: Shield, title: "Bone Density", description: "Stronger bones and reduced injury risk" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Testosterone <span style={{ color: brand.colors.primary }}>Replacement Therapy</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Physician-supervised TRT to restore optimal hormone levels and help you feel like yourself again.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            Benefits of <span style={{ color: brand.colors.primary }}>TRT</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div 
                    className="mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${brand.colors.primary}10` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: brand.colors.primary }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-white/60">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">What to Expect</h3>
            <div className="space-y-4">
              {[
                "Comprehensive lab testing to establish baseline hormone levels",
                "Physician consultation to review results and discuss treatment options",
                "Personalized TRT protocol with ongoing monitoring and adjustments",
                "Monthly medication delivery directly to your door",
                "Regular follow-ups to optimize dosing and ensure best results"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: brand.colors.primary }} />
                  <span className="text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm rounded-2xl p-12 text-center border"
            style={{ 
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
              borderColor: `${brand.colors.primary}20`
            }}>
            <h2 className="text-4xl font-black mb-6">
              Start Your <span style={{ color: brand.colors.primary }}>TRT Journey</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Get started with a comprehensive health assessment and personalized treatment plan.
            </p>
            
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300"
              style={{
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Begin Assessment
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

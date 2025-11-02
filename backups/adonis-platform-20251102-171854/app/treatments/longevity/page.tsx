'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Heart, Brain, Shield, Activity, Sparkles, Award } from 'lucide-react'

export default function LongevityPage() {
  const brand = getBrand()

  const pillars = [
    { icon: Heart, title: "Cardiovascular Health", description: "Optimize heart health and circulation" },
    { icon: Brain, title: "Cognitive Function", description: "Maintain mental sharpness and clarity" },
    { icon: Shield, title: "Immune System", description: "Strengthen natural defenses" },
    { icon: Activity, title: "Metabolic Health", description: "Optimize energy and metabolism" },
    { icon: Sparkles, title: "Cellular Health", description: "Support cellular regeneration" },
    { icon: Award, title: "Physical Performance", description: "Maintain strength and mobility" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Longevity <span style={{ color: brand.colors.primary }}>Optimization</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive protocols to enhance healthspan and maintain peak performance throughout life.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            The Six Pillars of <span style={{ color: brand.colors.primary }}>Longevity</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon
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
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-white/60">{pillar.description}</p>
                </div>
              )
            })}
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
              Invest in Your <span style={{ color: brand.colors.primary }}>Future</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Start your longevity optimization journey today.
            </p>
            
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300"
              style={{
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Begin Your Journey
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

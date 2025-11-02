'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Zap, Activity, Shield, CheckCircle } from 'lucide-react'

export default function TestosteroneBoostersPage() {
  const brand = getBrand()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Natural Testosterone <span style={{ color: brand.colors.primary }}>Boosters</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Optimize your body's natural testosterone production with evidence-based supplements and lifestyle interventions.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <Zap className="w-12 h-12 mb-4" style={{ color: brand.colors.primary }} />
              <h3 className="text-2xl font-bold mb-4">Natural Optimization</h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Support your body's natural hormone production through targeted nutrition, supplementation, and lifestyle optimization.
              </p>
              <div className="space-y-3">
                {["Enhanced energy levels", "Improved muscle growth", "Better recovery", "Increased vitality"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brand.colors.primary }}></div>
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <Shield className="w-12 h-12 mb-4" style={{ color: brand.colors.primary }} />
              <h3 className="text-2xl font-bold mb-4">Evidence-Based</h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Our protocols are built on clinical research and proven to support healthy testosterone levels naturally.
              </p>
              <div className="space-y-3">
                {["No side effects", "Sustainable results", "Physician-guided", "Regular monitoring"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brand.colors.primary }}></div>
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
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
              Optimize <span style={{ color: brand.colors.primary }}>Naturally</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Start your natural testosterone optimization journey today.
            </p>
            
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300"
              style={{
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Get Started
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

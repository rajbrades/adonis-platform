'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Sparkles, TrendingUp, Shield, CheckCircle } from 'lucide-react'

export default function HairLossPage() {
  const brand = getBrand()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Hair Loss <span style={{ color: brand.colors.primary }}>Prevention</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Evidence-based treatments to prevent hair loss and promote regrowth.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div 
                className="mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <Shield className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Prevent Loss</h3>
              <p className="text-white/60">Stop hair loss before it starts</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div 
                className="mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <TrendingUp className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Promote Growth</h3>
              <p className="text-white/60">Stimulate new hair growth</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div 
                className="mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <Sparkles className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Improve Quality</h3>
              <p className="text-white/60">Thicker, healthier hair</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Treatment Options</h3>
            <div className="space-y-4">
              {[
                "FDA-approved medications (Finasteride, Minoxidil)",
                "Topical treatments for targeted application",
                "Nutritional support for hair health",
                "Hormone optimization when appropriate",
                "Regular monitoring and protocol adjustments"
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
              Protect Your <span style={{ color: brand.colors.primary }}>Hair</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Start prevention early for the best results.
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

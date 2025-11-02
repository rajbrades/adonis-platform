'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Heart, Zap, Shield, CheckCircle } from 'lucide-react'

export default function SexualWellnessPage() {
  const brand = getBrand()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Sexual <span style={{ color: brand.colors.primary }}>Wellness</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Restore confidence and performance with physician-supervised treatments for optimal sexual health.
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
                <Heart className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Enhanced Libido</h3>
              <p className="text-white/60">Restore natural drive and desire</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div 
                className="mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <Zap className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Better Performance</h3>
              <p className="text-white/60">Improved function and stamina</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div 
                className="mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <Shield className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Physician-Guided</h3>
              <p className="text-white/60">Safe, effective treatment protocols</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Comprehensive Approach</h3>
            <div className="space-y-4">
              {[
                "Hormone optimization to restore natural function",
                "FDA-approved medications for immediate support",
                "Lifestyle and nutrition guidance",
                "Ongoing monitoring and adjustments",
                "Discreet, convenient treatment"
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
              Restore Your <span style={{ color: brand.colors.primary }}>Confidence</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Start with a confidential consultation with our medical team.
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

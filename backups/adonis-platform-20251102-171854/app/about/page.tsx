'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Shield, Award, Users, Heart, Target, Sparkles } from 'lucide-react'

export default function AboutPage() {
  const brand = getBrand()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            About <span style={{ color: brand.colors.primary }}>{brand.name}</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            {brand.about.mission}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div 
                className="mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <Shield className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Licensed Physicians</h3>
              <p className="text-white/60 leading-relaxed">
                All treatments overseen by board-certified physicians specializing in hormone optimization
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div 
                className="mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <Award className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Evidence-Based</h3>
              <p className="text-white/60 leading-relaxed">
                Protocols built on the latest research and clinical evidence for optimal results
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div 
                className="mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <Users className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Care</h3>
              <p className="text-white/60 leading-relaxed">
                Every protocol customized to your unique physiology, goals, and lifestyle
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-8 text-center">
            Our <span style={{ color: brand.colors.primary }}>Approach</span>
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${brand.colors.primary}10` }}
                >
                  <Target className="w-6 h-6" style={{ color: brand.colors.primary }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Comprehensive Assessment</h3>
                  <p className="text-white/60 leading-relaxed">
                    We start with an in-depth evaluation of your health history, symptoms, goals, and comprehensive lab work 
                    to understand your unique physiology and create a personalized optimization strategy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${brand.colors.primary}10` }}
                >
                  <Sparkles className="w-6 h-6" style={{ color: brand.colors.primary }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Precision Optimization</h3>
                  <p className="text-white/60 leading-relaxed">
                    Using advanced biomarkers and evidence-based protocols, we optimize your hormones, peptides, 
                    and metabolic function to help you achieve peak performance and vitality.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${brand.colors.primary}10` }}
                >
                  <Heart className="w-6 h-6" style={{ color: brand.colors.primary }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Ongoing Support</h3>
                  <p className="text-white/60 leading-relaxed">
                    Your journey doesn't end with your first prescription. We provide continuous monitoring, 
                    adjustments, and support to ensure you achieve and maintain optimal results.
                  </p>
                </div>
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
              Ready to Start Your <span style={{ color: brand.colors.primary }}>Journey?</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Join thousands who have transformed their health and performance with {brand.name}.
            </p>
            
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300"
              style={{
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Get Started Today
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

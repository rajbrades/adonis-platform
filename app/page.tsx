import Link from 'next/link'
import { ArrowRight, Star, Shield, Clock, Users, CheckCircle, TrendingUp, Award, Zap, Sparkles, Heart, Brain } from 'lucide-react'

import { getTenantConfig } from '@/lib/tenant-config'
export default function HomePage() {
  const tenant = getTenantConfig()
  return (
    <div className={`min-h-screen bg-gradient-to-br ${tenant.colors.background} text-white`}>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block style={{ backgroundColor: tenant.colors.primary }}/10 border style={{ borderColor: tenant.colors.primary }}/20 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
            <span className="font-semibold tracking-wide" style={{ color: tenant.colors.primary }}>HUMAN OPTIMIZATION MEDICINE</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            Unlock Your <span style={{ color: tenant.colors.primary }}>Peak</span><br />
            Human Performance
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced therapies and protocols to optimize your energy, performance, and longevity. 
            Feel stronger, sharper, and more vital than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/consultation"
              style={{ backgroundColor: tenant.colors.primary }}
              className="group inline-flex items-center text-black px-12 py-4 rounded-lg text-lg font-bold hover:opacity-90 hover:shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              START YOUR TRANSFORMATION
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link 
              href="/how-it-works"
              className="group inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 text-white px-12 py-4 rounded-lg text-lg font-bold hover:bg-white/10 transition-all duration-300"
            >
              SEE HOW IT WORKS
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Optimization Solutions */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Advanced <span style={{ color: tenant.colors.primary }}>Optimization</span> Solutions
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Comprehensive therapies designed to enhance your performance, recovery, and longevity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testosterone */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:style={{ borderColor: tenant.colors.primary }}/30 transition-all duration-300">
              <div className="style={{ backgroundColor: tenant.colors.primary }}/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 style={{ color: tenant.colors.primary }}" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:style={{ color: tenant.colors.primary }} transition-colors">
                Testosterone Replacement
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Optimize hormone levels for increased energy, muscle mass, and vitality.
              </p>
            </div>

            {/* Peptide Therapy */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:style={{ borderColor: tenant.colors.primary }}/30 transition-all duration-300">
              <div className="style={{ backgroundColor: tenant.colors.primary }}/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 style={{ color: tenant.colors.primary }}" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:style={{ color: tenant.colors.primary }} transition-colors">
                Peptide Therapy
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Advanced peptides for recovery, fat loss, muscle growth, and anti-aging.
              </p>
            </div>

            {/* NAD+ */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:style={{ borderColor: tenant.colors.primary }}/30 transition-all duration-300">
              <div className="style={{ backgroundColor: tenant.colors.primary }}/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-7 h-7 style={{ color: tenant.colors.primary }}" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:style={{ color: tenant.colors.primary }} transition-colors">
                NAD+ Therapy
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Boost cellular energy, mental clarity, and longevity at the molecular level.
              </p>
            </div>

            {/* Glutathione */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:style={{ borderColor: tenant.colors.primary }}/30 transition-all duration-300">
              <div className="style={{ backgroundColor: tenant.colors.primary }}/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 style={{ color: tenant.colors.primary }}" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:style={{ color: tenant.colors.primary }} transition-colors">
                Glutathione
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Powerful antioxidant for detoxification, immune support, and cellular health.
              </p>
            </div>

            {/* Enclomiphene */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:style={{ borderColor: tenant.colors.primary }}/30 transition-all duration-300">
              <div className="style={{ backgroundColor: tenant.colors.primary }}/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 style={{ color: tenant.colors.primary }}" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:style={{ color: tenant.colors.primary }} transition-colors">
                Enclomiphene Citrate
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Natural testosterone optimization while preserving fertility and testicular function.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/goals"
              className="inline-flex items-center font-semibold transition-colors" style={{ color: tenant.colors.primary }}
            >
              Explore All Optimization Goals
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Your Path to Peak Performance Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Your Path to <span style={{ color: tenant.colors.primary }}>Peak Performance</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              A systematic, science-backed approach to optimizing your health and vitality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="style={{ backgroundColor: tenant.colors.primary }}/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 style={{ color: tenant.colors.primary }}" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Complete Assessment</h3>
              <p className="text-white/60 leading-relaxed">
                Free health questionnaire analyzed by our medical team. Get lab recommendations within 24-48 hours.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="style={{ backgroundColor: tenant.colors.primary }}/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 style={{ color: tenant.colors.primary }}" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Get Tested & Reviewed</h3>
              <p className="text-white/60 leading-relaxed">
                Comprehensive bloodwork with physician consultation to create your personalized protocol.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="style={{ backgroundColor: tenant.colors.primary }}/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 style={{ color: tenant.colors.primary }}" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Optimize & Thrive</h3>
              <p className="text-white/60 leading-relaxed">
                Receive your treatments with ongoing monitoring and adjustments to maximize results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ADONIS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Why Choose <span style={{ color: tenant.colors.primary }}>{tenant.name}</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              The most advanced human optimization platform designed for high-performers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
              <Shield className="w-10 h-10 style={{ color: tenant.colors.primary }} mb-4" />
              <h3 className="text-lg font-bold mb-2">Licensed Physicians</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                All treatments prescribed by board-certified US physicians.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
              <Star className="w-10 h-10 style={{ color: tenant.colors.primary }} mb-4" />
              <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Pharmaceutical-grade medications from top US compounding pharmacies.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
              <Clock className="w-10 h-10 style={{ color: tenant.colors.primary }} mb-4" />
              <h3 className="text-lg font-bold mb-2">Fast Results</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Get your assessment reviewed and recommendations within 24-48 hours.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
              <Brain className="w-10 h-10 style={{ color: tenant.colors.primary }} mb-4" />
              <h3 className="text-lg font-bold mb-2">Personalized Care</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Custom protocols designed specifically for your goals and biomarkers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">Proven Results</h2>
              <p className="text-white/60 text-lg">
                Join thousands who have transformed their health through evidence-based optimization.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black mb-2" style={{ color: tenant.colors.primary }}>10K+</div>
                <div className="text-white/60 font-semibold text-sm uppercase tracking-wide">
                  Patients Optimized
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black mb-2" style={{ color: tenant.colors.primary }}>24-48h</div>
                <div className="text-white/60 font-semibold text-sm uppercase tracking-wide">
                  Assessment Review Time
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black mb-2" style={{ color: tenant.colors.primary }}>98%</div>
                <div className="text-white/60 font-semibold text-sm uppercase tracking-wide">
                  Patient Satisfaction
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black mb-2" style={{ color: tenant.colors.primary }}>100%</div>
                <div className="text-white/60 font-semibold text-sm uppercase tracking-wide">
                  Licensed US Physicians
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm border rounded-2xl p-12 text-center" style={{ borderColor: tenant.colors.primary, background: `linear-gradient(to right, ${tenant.colors.primary}10, ${tenant.colors.primary}10)` }}>
            <h2 className="text-4xl font-black mb-6">Ready to Optimize Your Life?</h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Take the first step toward peak performance, energy, and longevity with a free health assessment.
            </p>
            <Link 
              href="/consultation"
              className="group inline-flex items-center text-black px-12 py-4 rounded-lg text-lg font-bold hover:opacity-90 hover:shadow-2xl transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: tenant.colors.primary }}
            >
              Start Free Assessment
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <p className="text-sm text-white/50 mt-4">
              No credit card required • 100% confidential
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

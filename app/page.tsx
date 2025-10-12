import Link from 'next/link'
import { ArrowRight, Star, Shield, Clock, Users, CheckCircle, TrendingUp, Award, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
            <span className="text-yellow-400 font-semibold tracking-wide">PEAK PERFORMANCE MEDICINE</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            Achieve Your <span className="text-yellow-400">Peak</span><br />
            Testosterone Levels
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
            Data-driven hormone optimization for executives and high-performers. 
            Boost energy, build muscle mass, and feel like your younger self.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/consultation"
              className="group inline-flex items-center bg-yellow-400 text-black px-12 py-4 rounded-lg text-lg font-bold hover:bg-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
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

      {/* Your Path to Peak Performance Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Your Path to <span className="text-yellow-400">Peak Performance</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              A systematic, science-backed approach to optimizing your hormones and vitality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Get Tested</h3>
              <p className="text-white/60 leading-relaxed">
                Comprehensive blood work analyzed by our medical team. At-home test kits delivered to your door in 24 hours.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Physician Consult</h3>
              <p className="text-white/60 leading-relaxed">
                Meet with a licensed physician who specializes in hormone optimization and performance medicine.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Optimize & Monitor</h3>
              <p className="text-white/60 leading-relaxed">
                Receive your personalized protocol with ongoing monitoring and adjustments to maximize results.
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
              Why Choose <span className="text-yellow-400">ADONIS</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              The most advanced testosterone optimization platform designed for high-performers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
              <Shield className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Licensed Physicians</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                All treatments prescribed by board-certified US physicians.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
              <Star className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Premium Compounds</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Pharmaceutical-grade medications from top US compounding pharmacies.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
              <Clock className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">24hr Turnaround</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Get your lab results and physician consultation within 24 hours.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
              <CheckCircle className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Results Guarantee</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                See a 70% increase in testosterone or your medication is free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">Results That Speak for Themselves</h2>
              <p className="text-white/60 text-lg">
                Join thousands of men who have transformed their lives through hormone optimization.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black text-yellow-400 mb-2">95%</div>
                <div className="text-white/60 font-semibold text-sm uppercase tracking-wide">
                  Testosterone Decline Since 1980s
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black text-yellow-400 mb-2">2-3x</div>
                <div className="text-white/60 font-semibold text-sm uppercase tracking-wide">
                  Average T-Level Increase
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black text-yellow-400 mb-2">24hrs</div>
                <div className="text-white/60 font-semibold text-sm uppercase tracking-wide">
                  Lab Results & Consultation
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black text-yellow-400 mb-2">100%</div>
                <div className="text-white/60 font-semibold text-sm uppercase tracking-wide">
                  Licensed US Physicians
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Options */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">Advanced Hormone Therapies</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Personalized treatment protocols designed for executives, athletes, and high-performers who demand results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/treatments/testosterone-replacement" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-yellow-400/30 transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                Testosterone Optimization
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Clinical-grade testosterone replacement therapy with ongoing monitoring and optimization.
              </p>
              <span className="text-yellow-400 font-semibold inline-flex items-center">
                Learn More 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>

            <Link href="/treatments/peptide-therapy" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-yellow-400/30 transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                Peptide Therapy
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Advanced peptides for enhanced recovery, fat loss, and anti-aging benefits.
              </p>
              <span className="text-yellow-400 font-semibold inline-flex items-center">
                Learn More 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>

            <Link href="/treatments/longevity" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-yellow-400/30 transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                Longevity Protocol
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Comprehensive anti-aging and longevity optimization program.
              </p>
              <span className="text-yellow-400 font-semibold inline-flex items-center">
                Learn More 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">Ready to Optimize Your Performance?</h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Join thousands of high-performers who have transformed their energy, strength, and vitality.
            </p>
            <Link 
              href="/consultation"
              className="group inline-flex items-center bg-yellow-400 text-black px-12 py-4 rounded-lg text-lg font-bold hover:bg-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Assessment
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

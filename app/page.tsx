import Link from 'next/link'
import { ArrowRight, Star, Shield, Clock, Users, CheckCircle, TrendingUp, Award, Zap } from 'lucide-react'
import Navigation from './components/Navigation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-2 mb-8">
            <span className="text-yellow-400 font-medium">PEAK PERFORMANCE MEDICINE</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            Achieve Your <span className="text-yellow-400">Peak</span><br />
            Testosterone Levels
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Data-driven hormone optimization for executives and high-performers. 
            Boost energy, build muscle mass, and feel like your younger self.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/consultation"
              className="group inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:from-yellow-300 hover:to-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              START YOUR TRANSFORMATION
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link 
              href="/how-it-works"
              className="group inline-flex items-center border-2 border-yellow-400 text-yellow-400 px-12 py-4 rounded-lg text-xl font-bold hover:bg-yellow-400 hover:text-black hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105"
            >
              SEE HOW IT WORKS
              <ArrowRight className="ml-3 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Your Path to Peak Performance Section */}
      <section className="py-20 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Your Path to <span className="text-yellow-400">Peak Performance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="group bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-yellow-400 hover:bg-slate-800 hover:shadow-xl hover:shadow-yellow-400/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-black text-2xl font-black">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Advanced Lab Analysis
              </h3>
              <p className="text-slate-300 group-hover:text-white transition-colors">
                Comprehensive at-home testing covering 50+ biomarkers including testosterone, growth hormone, thyroid, and metabolic markers.
              </p>
            </div>

            <div className="group bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-yellow-400 hover:bg-slate-800 hover:shadow-xl hover:shadow-yellow-400/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-black text-2xl font-black">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Expert Physician Review
              </h3>
              <p className="text-slate-300 group-hover:text-white transition-colors">
                Real consultation with licensed physicians specializing in hormone optimization. Not a chatbot - actual medical expertise.
              </p>
            </div>

            <div className="group bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-yellow-400 hover:bg-slate-800 hover:shadow-xl hover:shadow-yellow-400/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-black text-2xl font-black">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Personalized Protocol
              </h3>
              <p className="text-slate-300 group-hover:text-white transition-colors">
                Data-driven treatment plan designed for your specific biomarkers, goals, and lifestyle demands.
              </p>
            </div>

            <div className="group bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-yellow-400 hover:bg-slate-800 hover:shadow-xl hover:shadow-yellow-400/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-black text-2xl font-black">4</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Continuous Optimization
              </h3>
              <p className="text-slate-300 group-hover:text-white transition-colors">
                Ongoing monitoring, lab tracking, and protocol adjustments to ensure peak results and safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-black">Results Guaranteed or Your Money Back</h2>
            <p className="text-xl text-black/80">
              See a 70% increase in Total Testosterone or your medication is free. Simple as that.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-black mb-2">95%</div>
              <div className="text-black font-bold">TESTOSTERONE DECLINE SINCE 1980S</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-black mb-2">2-3x</div>
              <div className="text-black font-bold">AVERAGE T-LEVEL INCREASE</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-black mb-2">24hrs</div>
              <div className="text-black font-bold">LAB RESULTS & CONSULTATION</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-black mb-2">100%</div>
              <div className="text-black font-bold">LICENSED US PHYSICIANS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Options */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-yellow-400">Advanced Hormone Therapies</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Personalized treatment protocols designed for executives, athletes, and high-performers who demand results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/treatments/testosterone-replacement" className="group bg-white/5 border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-400 hover:bg-white/10 hover:shadow-2xl hover:shadow-yellow-400/20 hover:-translate-y-2 transition-all duration-300">
              <Zap className="w-12 h-12 text-yellow-400 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Testosterone Optimization
              </h3>
              <p className="text-white/70 mb-6 group-hover:text-white transition-colors">
                Clinical-grade testosterone replacement therapy with ongoing monitoring and optimization.
              </p>
              <span className="text-yellow-400 group-hover:text-yellow-300 font-medium inline-flex items-center">
                Learn More 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>

            <Link href="/treatments/peptide-therapy" className="group bg-white/5 border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-400 hover:bg-white/10 hover:shadow-2xl hover:shadow-yellow-400/20 hover:-translate-y-2 transition-all duration-300">
              <TrendingUp className="w-12 h-12 text-yellow-400 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Peptide Therapy
              </h3>
              <p className="text-white/70 mb-6 group-hover:text-white transition-colors">
                Advanced peptides for enhanced recovery, fat loss, and anti-aging benefits.
              </p>
              <span className="text-yellow-400 group-hover:text-yellow-300 font-medium inline-flex items-center">
                Learn More 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>

            <Link href="/treatments/longevity" className="group bg-white/5 border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-400 hover:bg-white/10 hover:shadow-2xl hover:shadow-yellow-400/20 hover:-translate-y-2 transition-all duration-300">
              <Award className="w-12 h-12 text-yellow-400 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Longevity Protocol
              </h3>
              <p className="text-white/70 mb-6 group-hover:text-white transition-colors">
                Comprehensive anti-aging and longevity optimization program.
              </p>
              <span className="text-yellow-400 group-hover:text-yellow-300 font-medium inline-flex items-center">
                Learn More 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Optimize Your Performance?</h2>
          <p className="text-xl text-white/70 mb-8">
            Join thousands of high-performers who have transformed their energy, strength, and vitality.
          </p>
          <Link 
            href="/consultation"
            className="group inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:from-yellow-300 hover:to-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            Start Your Assessment
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  )
}

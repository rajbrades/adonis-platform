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
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg hover:shadow-yellow-500/25 transition-all transform hover:scale-105"
            >
              START YOUR TRANSFORMATION
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            <Link 
              href="/how-it-works"
              className="inline-flex items-center border-2 border-yellow-400 text-yellow-400 px-12 py-4 rounded-lg text-xl font-bold hover:bg-yellow-400 hover:text-black transition-all"
            >
              SEE HOW IT WORKS
            </Link>
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
            <div>
              <div className="text-5xl font-black text-black mb-2">95%</div>
              <div className="text-black font-bold">TESTOSTERONE DECLINE SINCE 1980S</div>
              <div className="text-black/70">24hrs</div>
              <div className="text-black/80">LAB RESULTS & CONSULTATION</div>
            </div>
            <div>
              <div className="text-5xl font-black text-black mb-2">2-3x</div>
              <div className="text-black font-bold">AVERAGE T-LEVEL INCREASE</div>
              <div className="text-black/70">100%</div>
              <div className="text-black/80">LICENSED US PHYSICIANS</div>
            </div>
            <div>
              <div className="text-5xl font-black text-black mb-2">24hrs</div>
              <div className="text-black font-bold">LAB RESULTS & CONSULTATION</div>
            </div>
            <div>
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
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-400/40 transition-all">
              <Zap className="w-12 h-12 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Testosterone Optimization</h3>
              <p className="text-white/70 mb-6">Clinical-grade testosterone replacement therapy with ongoing monitoring and optimization.</p>
              <Link href="/treatments/testosterone-replacement" className="text-yellow-400 hover:text-yellow-300 font-medium">
                Learn More →
              </Link>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-400/40 transition-all">
              <TrendingUp className="w-12 h-12 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Peptide Therapy</h3>
              <p className="text-white/70 mb-6">Advanced peptides for enhanced recovery, fat loss, and anti-aging benefits.</p>
              <Link href="/treatments/peptide-therapy" className="text-yellow-400 hover:text-yellow-300 font-medium">
                Learn More →
              </Link>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-400/40 transition-all">
              <Award className="w-12 h-12 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Longevity Protocol</h3>
              <p className="text-white/70 mb-6">Comprehensive anti-aging and longevity optimization program.</p>
              <Link href="/treatments/longevity" className="text-yellow-400 hover:text-yellow-300 font-medium">
                Learn More →
              </Link>
            </div>
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
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Start Your Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

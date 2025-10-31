'use client'
import { getTenantConfig } from "@/lib/tenant-config"

import Link from 'next/link'
import { 
  ArrowRight, Zap, CheckCircle, Shield, Clock, TrendingUp,
  Droplet, Syringe, Award, Users, AlertCircle, Heart
} from 'lucide-react'

export default function TestosteroneReplacementPage() {
  const tenant = getTenantConfig()
  const benefits = [
    'Increased energy and vitality',
    'Enhanced muscle mass and strength',
    'Improved libido and sexual performance',
    'Better mood and mental clarity',
    'Reduced body fat',
    'Stronger bones and cardiovascular health',
    'Faster recovery from exercise',
    'Improved sleep quality'
  ]

  const protocols = [
    {
      name: 'Testosterone Cypionate',
      description: 'Long-acting ester with steady release. Most popular choice for consistent levels.',
      halfLife: '8-10 days',
      frequency: 'Typically injected 1-2x per week'
    },
    {
      name: 'Testosterone Enanthate',
      description: 'Similar to Cypionate with slightly faster release profile. Excellent for stable levels.',
      halfLife: '7-9 days',
      frequency: 'Typically injected 1-2x per week'
    }
  ]

  const carrierOils = [
    {
      name: 'MCT Oil',
      description: 'Medium-chain triglyceride oil - thin consistency, easy injection, minimal PIP (post-injection pain)',
      features: ['Fast absorption', 'Smooth injections', 'Well-tolerated', 'Most popular choice']
    },
    {
      name: 'Grapeseed Oil',
      description: 'Light carrier oil with good absorption and minimal discomfort',
      features: ['Thin consistency', 'Cost-effective', 'Proven track record', 'Hypoallergenic']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center text-white/60 hover:text-white transition mb-8">
            ← Back to Home
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[oklch(90.5%_0.182_98.111/0.1)] border border-[oklch(90.5%_0.182_98.111)]/30 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 " style={{ color: tenant.colors.primary }} />
                <span className="text-sm font-semibold text-yellow-400">HORMONE OPTIMIZATION</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Injectable <span className="text-yellow-400">Testosterone</span> Replacement
              </h1>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Premium pharmaceutical-grade testosterone cypionate and enanthate. 
                Restore optimal hormone levels and unlock your peak performance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/consultation"
                  className="inline-flex items-center justify-center " style={{ backgroundColor: tenant.colors.primary }} className="text-black px-8 py-4 rounded-lg font-bold hover:opacity-90 hover:shadow-xl hover:shadow-[oklch(90.5%_0.182_98.111)]/50 transition-all duration-300"
                >
                  Start Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/lab-testing"
                  className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300"
                >
                  Order Lab Work
                </Link>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">What's Included</h3>
              <div className="space-y-4">
                {[
                  'Physician consultation & evaluation',
                  'Personalized dosing protocol',
                  'Injectable testosterone (Cypionate or Enanthate)',
                  'Choice of carrier oil (MCT or Grapeseed)',
                  'Injection supplies included',
                  'Ongoing monitoring & adjustments',
                  'Direct physician access',
                  '90-day supply delivered to your door'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Transform Your <span className="text-yellow-400">Performance</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Experience the life-changing benefits of optimized testosterone levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-[oklch(90.5%_0.182_98.111)]/30 transition-all duration-300"
              >
                <CheckCircle className="w-8 h-8 text-yellow-400 mb-4" />
                <p className="text-white/80 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Options */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Choose Your <span className="text-yellow-400">Protocol</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Both cypionate and enanthate provide excellent, stable testosterone levels. 
              Your physician will help determine the best option for your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {protocols.map((protocol, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-[oklch(90.5%_0.182_98.111)]/30 transition-all duration-300"
              >
                <div className="bg-[oklch(90.5%_0.182_98.111/0.1)] w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Syringe className="w-7 h-7 " style={{ color: tenant.colors.primary }} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{protocol.name}</h3>
                <p className="text-white/70 mb-6 leading-relaxed">{protocol.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 " style={{ color: tenant.colors.primary }} />
                    <span className="text-white/60">Half-life: <strong className="text-white">{protocol.halfLife}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <TrendingUp className="w-5 h-5 " style={{ color: tenant.colors.primary }} />
                    <span className="text-white/60">{protocol.frequency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carrier Oils */}
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-[oklch(90.5%_0.182_98.111)]/20 rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Droplet className="w-8 h-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Premium Carrier Oils</h3>
                <p className="text-white/70">
                  We offer pharmaceutical-grade carrier oil options for optimal comfort and absorption.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {carrierOils.map((oil, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-3 text-yellow-400">{oil.name}</h4>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed">{oil.description}</p>
                  <div className="space-y-2">
                    {oil.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              How It <span className="text-yellow-400">Works</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Simple, streamlined process to get you optimized
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 " style={{ backgroundColor: tenant.colors.primary }} className="rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Free Assessment</h3>
              <p className="text-white/60">
                Complete our health questionnaire. Takes 10 minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 " style={{ backgroundColor: tenant.colors.primary }} className="rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Get Lab Work</h3>
              <p className="text-white/60">
                Order bloodwork or use existing labs from the last 6 months.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 " style={{ backgroundColor: tenant.colors.primary }} className="rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Physician Review</h3>
              <p className="text-white/60">
                Licensed doctor reviews and creates your personalized protocol.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 " style={{ backgroundColor: tenant.colors.primary }} className="rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Start Treatment</h3>
              <p className="text-white/60">
                Medication ships to your door with all supplies included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black mb-6">
                Is TRT <span className="text-yellow-400">Right for You?</span>
              </h2>
              <p className="text-white/70 mb-8 text-lg leading-relaxed">
                Testosterone replacement therapy may be beneficial if you're experiencing symptoms of low testosterone 
                and want to optimize your health, performance, and quality of life.
              </p>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold mb-4">Common Signs of Low Testosterone:</h3>
                {[
                  'Persistent fatigue and low energy',
                  'Decreased muscle mass and strength',
                  'Low libido and sexual dysfunction',
                  'Difficulty concentrating (brain fog)',
                  'Mood changes and irritability',
                  'Increased body fat, especially around midsection',
                  'Poor sleep quality',
                  'Reduced motivation and drive'
                ].map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Shield className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Safe & Monitored</h3>
                <p className="text-white/70 leading-relaxed">
                  All protocols are overseen by licensed physicians with ongoing monitoring through regular lab work 
                  to ensure optimal and safe testosterone levels.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Users className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Personalized Protocol</h3>
                <p className="text-white/70 leading-relaxed">
                  Your dosing, injection frequency, and carrier oil are customized based on your labs, 
                  symptoms, goals, and response to treatment.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Heart className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Ongoing Support</h3>
                <p className="text-white/70 leading-relaxed">
                  Direct access to your physician for questions, adjustments, and optimization. 
                  We're with you every step of your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-[oklch(90.5%_0.182_98.111)]/20 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">
              Ready to Optimize Your Testosterone?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Start with a free health assessment. Our medical team will review your information 
              and provide personalized recommendations within 24-48 hours.
            </p>
            <Link 
              href="/consultation"
              className="inline-flex items-center " style={{ backgroundColor: tenant.colors.primary }} className="text-black px-12 py-4 rounded-lg text-lg font-bold hover:opacity-90 hover:shadow-xl hover:shadow-[oklch(90.5%_0.182_98.111)]/50 transition-all duration-300 transform hover:scale-105"
            >
              Start Free Assessment
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
            <p className="text-sm text-white/50 mt-4">
              No credit card required • 100% confidential • Licensed physicians
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

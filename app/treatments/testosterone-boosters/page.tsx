'use client'
import { getTenantConfig } from "@/lib/tenant-config"

import Link from 'next/link'
import { 
  ArrowRight, Zap, CheckCircle, Shield, Clock, TrendingUp,
  Heart, Pill, Award, Users, AlertCircle, Sparkles, Baby
} from 'lucide-react'

export default function TestosteroneBoostersPage() {
  const tenant = getTenantConfig()
  const benefits = [
    'Naturally boost testosterone production',
    'Preserve fertility and sperm production',
    'Maintain testicular function and size',
    'Avoid testosterone suppression',
    'Enhanced energy and libido',
    'Improved mood and mental clarity',
    'Better body composition',
    'Increased strength and vitality'
  ]

  const treatments = [
    {
      name: 'Enclomiphene Citrate',
      icon: Zap,
      description: 'Selective estrogen receptor modulator that signals the body to produce more testosterone naturally. The gold standard for natural optimization.',
      benefits: [
        'Increases natural testosterone production',
        'Preserves fertility',
        'Oral medication (no injections)',
        'Minimal side effects',
        'Maintains testicular function'
      ],
      dosing: 'Typically 12.5-25mg daily',
      ideal: 'Men wanting to optimize testosterone while maintaining fertility'
    },
    {
      name: 'HCG (Human Chorionic Gonadotropin)',
      icon: Heart,
      description: 'Mimics LH hormone to directly stimulate testosterone production in the testes. Excellent for fertility preservation and natural production.',
      benefits: [
        'Stimulates natural testosterone',
        'Preserves testicular size and function',
        'Maintains sperm production',
        'Can be used with TRT',
        'Supports fertility goals'
      ],
      dosing: 'Typically 500-1000 IU 2-3x per week (subcutaneous injection)',
      ideal: 'Men on TRT wanting fertility preservation or standalone optimization'
    },
    {
      name: 'Kisspeptin',
      icon: Sparkles,
      description: 'Advanced peptide that stimulates the body\'s natural hormone cascade, increasing GnRH, LH, and testosterone production.',
      benefits: [
        'Stimulates natural hormone production',
        'Enhances libido and sexual function',
        'Supports fertility',
        'Improves metabolic health',
        'Minimal side effects'
      ],
      dosing: 'Varies by protocol (subcutaneous injection)',
      ideal: 'Advanced optimization for libido and natural hormone support'
    },
    {
      name: 'Gonadorelin',
      icon: TrendingUp,
      description: 'Synthetic GnRH that signals the pituitary to release LH and FSH, promoting natural testosterone production.',
      benefits: [
        'Restores natural hormone axis',
        'Supports testosterone production',
        'Maintains fertility',
        'Prevents testicular atrophy',
        'Works synergistically with other treatments'
      ],
      dosing: 'Varies by protocol (subcutaneous injection)',
      ideal: 'Hormone axis restoration and fertility preservation'
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
                <span className="text-sm font-semibold text-yellow-400">NATURAL OPTIMIZATION</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Natural <span className="text-yellow-400">Testosterone</span> Boosters
              </h1>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Boost your body's natural testosterone production while preserving fertility. 
                Advanced therapies that work with your body's own hormone system.
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
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Why Choose Natural Boosters?</h3>
              <div className="space-y-4">
                {[
                  'Preserve natural testosterone production',
                  'Maintain fertility and sperm count',
                  'Avoid testicular suppression/atrophy',
                  'Can be combined with TRT if needed',
                  'Fewer long-term commitments',
                  'Physician-guided protocols',
                  'Regular monitoring and optimization',
                  'Delivered to your door'
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
              Why Natural <span className="text-yellow-400">Optimization?</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Boost your testosterone naturally while maintaining your body's own production and fertility
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

      {/* Treatment Options */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-yellow-400">Optimization</span> Options
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Choose from our advanced testosterone-boosting therapies, each designed to work with your body's natural systems
            </p>
          </div>

          <div className="space-y-8">
            {treatments.map((treatment, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-[oklch(90.5%_0.182_98.111)]/30 transition-all duration-300"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-[oklch(90.5%_0.182_98.111/0.1)] w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                        <treatment.icon className="w-7 h-7 " style={{ color: tenant.colors.primary }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{treatment.name}</h3>
                        <p className="text-white/70 leading-relaxed">{treatment.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Pill className="w-5 h-5 " style={{ color: tenant.colors.primary }} />
                          <span className="font-semibold text-sm text-white/80">Dosing Protocol</span>
                        </div>
                        <p className="text-sm text-white/60">{treatment.dosing}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-5 h-5 " style={{ color: tenant.colors.primary }} />
                          <span className="font-semibold text-sm text-white/80">Ideal For</span>
                        </div>
                        <p className="text-sm text-white/60">{treatment.ideal}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4 text-yellow-400">Key Benefits:</h4>
                    <div className="space-y-3">
                      {treatment.benefits.map((benefit, bidx) => (
                        <div key={bidx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/70">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Natural Boosters vs <span className="text-yellow-400">TRT</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Understanding the difference between natural optimization and testosterone replacement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="bg-[oklch(90.5%_0.182_98.111/0.1)] w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 " style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Natural Testosterone Boosters</h3>
              <div className="space-y-3 mb-6">
                {[
                  'Stimulates your body\'s own production',
                  'Preserves natural hormone pathways',
                  'Maintains fertility and sperm count',
                  'Keeps testicles functioning normally',
                  'Easier to discontinue if needed',
                  'May require higher doses over time'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/60 italic">
                Best for: Men who want to preserve fertility or optimize natural production first
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="bg-[oklch(90.5%_0.182_98.111/0.1)] w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 " style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Testosterone Replacement (TRT)</h3>
              <div className="space-y-3 mb-6">
                {[
                  'Direct testosterone supplementation',
                  'More predictable, stable levels',
                  'Stronger, faster results',
                  'Suppresses natural production',
                  'May affect fertility (reversible)',
                  'Requires ongoing commitment'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/60 italic">
                Best for: Men with very low testosterone or who have completed family planning
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-[oklch(90.5%_0.182_98.111)]/20 rounded-2xl p-8 text-center">
            <Baby className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Combination Therapy Available</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Many patients use HCG or Gonadorelin alongside TRT to maintain fertility and testicular function. 
              Your physician will help design the optimal protocol for your specific goals.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              How It <span className="text-yellow-400">Works</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Simple process to start your natural optimization journey
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 " style={{ backgroundColor: tenant.colors.primary }} className="rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Free Assessment</h3>
              <p className="text-white/60">
                Complete our health questionnaire about your symptoms and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 " style={{ backgroundColor: tenant.colors.primary }} className="rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Get Lab Work</h3>
              <p className="text-white/60">
                Comprehensive hormone panel to assess your baseline levels.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 " style={{ backgroundColor: tenant.colors.primary }} className="rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Physician Consultation</h3>
              <p className="text-white/60">
                Licensed doctor reviews and recommends the best protocol for you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 " style={{ backgroundColor: tenant.colors.primary }} className="rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Start Treatment</h3>
              <p className="text-white/60">
                Medication and supplies delivered to your door. Begin optimizing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black mb-6">
                Is Natural Optimization <span className="text-yellow-400">Right for You?</span>
              </h2>
              <p className="text-white/70 mb-8 text-lg leading-relaxed">
                Natural testosterone boosters are ideal for men who want to optimize their hormone levels 
                while maintaining their body's natural production and fertility.
              </p>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold mb-4">You May Be a Good Candidate If You:</h3>
                {[
                  'Want to preserve or improve fertility',
                  'Have mild to moderate low testosterone symptoms',
                  'Prefer to avoid lifelong TRT commitment',
                  'Want to maintain natural hormone production',
                  'Are planning to have children',
                  'Want to try natural optimization first',
                  'Need to maintain testicular function',
                  'Prefer fewer injections or oral medication'
                ].map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Shield className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Safe & Effective</h3>
                <p className="text-white/70 leading-relaxed">
                  All protocols are physician-supervised with regular monitoring to ensure optimal results 
                  and safety. We track your hormone levels and adjust as needed.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Baby className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Fertility Preservation</h3>
                <p className="text-white/70 leading-relaxed">
                  Unlike TRT, these treatments maintain or even enhance your natural fertility and sperm production, 
                  making them ideal for men planning to have children.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Users className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Personalized Protocols</h3>
                <p className="text-white/70 leading-relaxed">
                  Your treatment plan is customized based on your labs, symptoms, fertility goals, 
                  and lifestyle preferences. We can combine therapies for optimal results.
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
              Ready to Boost Your Testosterone Naturally?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Start with a free health assessment. Our medical team will review your information 
              and recommend the best natural optimization protocol for your goals.
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

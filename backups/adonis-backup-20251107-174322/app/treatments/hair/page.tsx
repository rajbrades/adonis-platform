'use client'
import { getBrand } from "@/lib/brand"

import Link from 'next/link'
import { 
  ArrowRight, Sparkles, CheckCircle, Shield, Clock, TrendingUp,
  Zap, Pill, Award, Users, AlertCircle, Droplet, FlaskConical, Layers
} from 'lucide-react'

export default function HairLossPage() {
  const brand = getBrand()
  const benefits = [
    'Prevent further hair loss',
    'Promote new hair growth',
    'Thicker, fuller hair',
    'Improved hair quality and texture',
    'Blocks DHT at the source',
    'Stimulates follicle activity',
    'Non-invasive treatments',
    'Physician-supervised protocols'
  ]

  const treatments = [
    {
      name: 'Dutasteride',
      icon: Shield,
      description: 'Powerful 5-alpha reductase inhibitor that blocks DHT production more effectively than finasteride. Prevents hair loss at the hormonal level.',
      benefits: [
        'Blocks 90%+ of DHT production',
        'More effective than finasteride',
        'Prevents further hair loss',
        'Promotes regrowth',
        'Once daily oral medication'
      ],
      dosing: 'Typically 0.5mg daily (oral capsule)',
      ideal: 'Men with androgenic alopecia wanting maximum DHT suppression',
      type: 'Oral'
    },
    {
      name: 'Minoxidil (Oral)',
      icon: Pill,
      description: 'Systemic minoxidil that stimulates hair follicles from within. More effective than topical with better absorption and results.',
      benefits: [
        'Superior absorption vs topical',
        'Stimulates hair growth cycle',
        'Increases blood flow to follicles',
        'Promotes thicker hair',
        'No scalp irritation'
      ],
      dosing: 'Typically 1.25-5mg daily, titrated based on response',
      ideal: 'Men seeking maximum growth stimulation',
      type: 'Oral'
    },
    {
      name: 'Minoxidil (Topical)',
      icon: Droplet,
      description: 'FDA-approved topical solution that stimulates hair follicles and increases blood flow to the scalp. Proven track record for hair regrowth.',
      benefits: [
        'FDA-approved for hair loss',
        'Direct follicle stimulation',
        'Minimal systemic effects',
        'Available in 5% concentration',
        'Can be combined with other treatments'
      ],
      dosing: 'Apply 1-2ml twice daily to affected areas',
      ideal: 'Men preferring topical application or starting treatment',
      type: 'Topical'
    },
    {
      name: 'GHK-Cu (Copper Peptide)',
      icon: Sparkles,
      description: 'Advanced peptide that stimulates hair growth, improves follicle size, and enhances scalp health. Promotes tissue repair and collagen production.',
      benefits: [
        'Stimulates hair follicle growth',
        'Increases follicle size',
        'Improves scalp health',
        'Enhances hair thickness',
        'Anti-inflammatory properties'
      ],
      dosing: 'Topical application (typically in combination formulas)',
      ideal: 'Men seeking peptide-based hair restoration',
      type: 'Topical'
    },
    {
      name: 'Zinc Thymulin',
      icon: FlaskConical,
      description: 'Zinc-thymulin complex that regulates hair follicle cycling and promotes the anagen (growth) phase. Essential for optimal hair growth.',
      benefits: [
        'Extends hair growth phase',
        'Reduces follicle miniaturization',
        'Improves hair density',
        'Supports healthy hair cycling',
        'Synergistic with other treatments'
      ],
      dosing: 'Topical application (typically in combination formulas)',
      ideal: 'Men wanting to optimize hair growth cycles',
      type: 'Topical'
    },
    {
      name: 'PTD-DBM (Growth Factor Peptide)',
      icon: Zap,
      description: 'Cutting-edge peptide technology that delivers growth factors directly to hair follicles, promoting regeneration and growth.',
      benefits: [
        'Advanced peptide delivery system',
        'Stimulates follicle regeneration',
        'Promotes new hair growth',
        'Enhances existing hair quality',
        'Complements other treatments'
      ],
      dosing: 'Topical application (typically in combination formulas)',
      ideal: 'Men seeking advanced peptide technology',
      type: 'Topical'
    },
    {
      name: 'Advanced Combination Topical',
      icon: Layers,
      description: 'Synergistic formula combining GHK-Cu, Zinc Thymulin, and PTD-DBM in one powerful topical spray. Maximum efficacy through multiple mechanisms of action.',
      benefits: [
        'Multi-mechanism approach',
        'Peptides + growth factors combined',
        'Enhanced absorption',
        'Convenient single application',
        'Synergistic effects'
      ],
      dosing: 'Apply to scalp once or twice daily as directed',
      ideal: 'Men wanting comprehensive topical therapy in one formula',
      type: 'Topical Combination'
    }
  ]

  const protocols = [
    {
      name: 'Aggressive Regrowth Protocol',
      treatments: ['Dutasteride (oral)', 'Minoxidil (oral)', 'Advanced Combination Topical'],
      description: 'Maximum approach combining systemic DHT blocking, growth stimulation, and peptide therapy'
    },
    {
      name: 'Balanced Growth Protocol',
      treatments: ['Dutasteride (oral)', 'Minoxidil (topical)', 'Advanced Combination Topical'],
      description: 'Comprehensive protocol with proven DHT blocker and dual topical growth stimulation'
    },
    {
      name: 'Topical-Only Protocol',
      treatments: ['Minoxidil (topical)', 'Advanced Combination Topical'],
      description: 'For men preferring topical-only approach or unable to take oral medications'
    },
    {
      name: 'Maintenance Protocol',
      treatments: ['Dutasteride (oral)', 'Minoxidil (topical)'],
      description: 'Classic combination for preventing loss and maintaining gains'
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
                <Sparkles className="w-4 h-4 " style={{ color: brand.colors.primary }} />
                <span className="text-sm font-semibold " style={{ color: brand.colors.primary }}>HAIR RESTORATION</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Prevent Hair Loss & <span className="" style={{ color: brand.colors.primary }}>Restore</span> Growth
              </h1>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Advanced medical treatments to stop hair loss and promote regrowth. 
                Physician-prescribed protocols combining proven medications and cutting-edge peptide therapy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/consultation"
                  className="inline-flex items-center justify-center  text-black px-8 py-4 rounded-lg font-bold hover:opacity-90 hover:shadow-xl hover:shadow-[oklch(90.5%_0.182_98.111)]/50 transition-all duration-300" style={{ backgroundColor: brand.colors.primary }}
                >
                  Start Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/lab-testing"
                  className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300"
                >
                  Check Hormone Levels
                </Link>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 " style={{ color: brand.colors.primary }}>What's Included</h3>
              <div className="space-y-4">
                {[
                  'Physician consultation & evaluation',
                  'Personalized treatment protocol',
                  'Prescription medications & compounds',
                  'Multiple treatment options available',
                  'Oral and topical formulations',
                  'Advanced peptide combinations',
                  'Ongoing monitoring & adjustments',
                  'Delivered to your door'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5  flex-shrink-0 mt-0.5" style={{ color: brand.colors.primary }} />
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
              Restore Your <span className="" style={{ color: brand.colors.primary }}>Confidence</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Comprehensive solutions to prevent hair loss and promote thick, healthy regrowth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-[oklch(90.5%_0.182_98.111)]/30 transition-all duration-300"
              >
                <CheckCircle className="w-8 h-8  mb-4" style={{ color: brand.colors.primary }} />
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
              <span className="" style={{ color: brand.colors.primary }}>Treatment</span> Options
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              From proven DHT blockers to advanced peptide combinations - customize your protocol
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
                        <treatment.icon className="w-7 h-7 " style={{ color: brand.colors.primary }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold">{treatment.name}</h3>
                          <span className="px-3 py-1 bg-[oklch(90.5%_0.182_98.111/0.1)] border border-[oklch(90.5%_0.182_98.111)]/30 rounded-full text-xs font-semibold " style={{ color: brand.colors.primary }}>
                            {treatment.type}
                          </span>
                        </div>
                        <p className="text-white/70 leading-relaxed">{treatment.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Pill className="w-5 h-5 " style={{ color: brand.colors.primary }} />
                          <span className="font-semibold text-sm text-white/80">Dosing</span>
                        </div>
                        <p className="text-sm text-white/60">{treatment.dosing}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-5 h-5 " style={{ color: brand.colors.primary }} />
                          <span className="font-semibold text-sm text-white/80">Ideal For</span>
                        </div>
                        <p className="text-sm text-white/60">{treatment.ideal}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4 " style={{ color: brand.colors.primary }}>Key Benefits:</h4>
                    <div className="space-y-3">
                      {treatment.benefits.map((benefit, bidx) => (
                        <div key={bidx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4  flex-shrink-0 mt-0.5" style={{ color: brand.colors.primary }} />
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

      {/* Recommended Protocols */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Recommended <span className="" style={{ color: brand.colors.primary }}>Protocols</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Proven combinations designed by our physicians for optimal results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {protocols.map((protocol, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-[oklch(90.5%_0.182_98.111)]/30 transition-all duration-300"
              >
                <div className="bg-[oklch(90.5%_0.182_98.111/0.1)] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Layers className="w-6 h-6 " style={{ color: brand.colors.primary }} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{protocol.name}</h3>
                <p className="text-white/60 mb-6 leading-relaxed">{protocol.description}</p>
                
                <div>
                  <h4 className="text-sm font-semibold text-white/80 mb-3">Includes:</h4>
                  <div className="space-y-2">
                    {protocol.treatments.map((treatment, tidx) => (
                      <div key={tidx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4  flex-shrink-0" style={{ color: brand.colors.primary }} />
                        <span className="text-sm text-white/70">{treatment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-[${brand.colors.primary}]/10 to-[${brand.colors.primaryDark}]/10 backdrop-blur-sm border border-[oklch(90.5%_0.182_98.111)]/20 rounded-2xl p-8 text-center">
            <Award className="w-12 h-12  mx-auto mb-4" style={{ color: brand.colors.primary }} />
            <h3 className="text-2xl font-bold mb-3">Custom Protocols Available</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Every patient is different. Your physician will create a personalized protocol based on your 
              specific hair loss pattern, goals, tolerance, and preferences. Protocols can be adjusted over time for optimal results.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              How It <span className="" style={{ color: brand.colors.primary }}>Works</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Start your hair restoration journey in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16  rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6" style={{ backgroundColor: brand.colors.primary }}>
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Free Assessment</h3>
              <p className="text-white/60">
                Complete our hair loss questionnaire and upload photos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16  rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6" style={{ backgroundColor: brand.colors.primary }}>
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Physician Review</h3>
              <p className="text-white/60">
                Doctor evaluates your pattern and recommends optimal protocol.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16  rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6" style={{ backgroundColor: brand.colors.primary }}>
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Start Treatment</h3>
              <p className="text-white/60">
                Medications ship to your door with complete instructions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16  rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6" style={{ backgroundColor: brand.colors.primary }}>
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Track Progress</h3>
              <p className="text-white/60">
                Monitor results with your physician and adjust as needed.
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
                Is This <span className="" style={{ color: brand.colors.primary }}>Right for You?</span>
              </h2>
              <p className="text-white/70 mb-8 text-lg leading-relaxed">
                Our hair loss treatments are ideal for men experiencing androgenic alopecia (male pattern baldness) 
                who want to prevent further loss and promote regrowth.
              </p>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold mb-4">You May Be a Good Candidate If You:</h3>
                {[
                  'Experiencing thinning or receding hairline',
                  'Notice increased hair shedding',
                  'Family history of hair loss',
                  'Want to prevent future hair loss',
                  'Seeking to regrow lost hair',
                  'Early to moderate hair loss (best results)',
                  'Want medical-grade treatments',
                  'Prefer physician-supervised protocols'
                ].map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5  flex-shrink-0 mt-0.5" style={{ color: brand.colors.primary }} />
                    <span className="text-white/70">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Shield className="w-12 h-12  mb-4" style={{ color: brand.colors.primary }} />
                <h3 className="text-2xl font-bold mb-4">Science-Backed</h3>
                <p className="text-white/70 leading-relaxed">
                  All treatments are backed by clinical studies and prescribed by licensed physicians. 
                  We use proven medications and cutting-edge peptide technology for optimal results.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Clock className="w-12 h-12  mb-4" style={{ color: brand.colors.primary }} />
                <h3 className="text-2xl font-bold mb-4">Results Take Time</h3>
                <p className="text-white/70 leading-relaxed">
                  Hair growth is a slow process. Most patients see initial results in 3-6 months, 
                  with continued improvement over 12+ months. Consistency is key for success.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Users className="w-12 h-12  mb-4" style={{ color: brand.colors.primary }} />
                <h3 className="text-2xl font-bold mb-4">Ongoing Support</h3>
                <p className="text-white/70 leading-relaxed">
                  Your physician monitors your progress and adjusts your protocol as needed. 
                  We're here to help you achieve and maintain your hair restoration goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[${brand.colors.primary}]/10 to-[${brand.colors.primaryDark}]/10 backdrop-blur-sm border border-[oklch(90.5%_0.182_98.111)]/20 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8  flex-shrink-0 mt-1" style={{ color: brand.colors.primary }} />
              <div>
                <h3 className="text-xl font-bold mb-3">Consider Hormone Optimization</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Low testosterone and hormonal imbalances can contribute to hair loss. Many patients combine 
                  hair loss treatment with hormone optimization for comprehensive results. We can evaluate your 
                  hormone levels and create an integrated treatment plan.
                </p>
                <Link 
                  href="/treatments/testosterone-replacement"
                  className="inline-flex items-center  font-semibold hover:text-yellow-300 transition" style={{ color: brand.colors.primary }}
                >
                  Learn About Hormone Optimization
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[${brand.colors.primary}]/10 to-[${brand.colors.primaryDark}]/10 backdrop-blur-sm border border-[oklch(90.5%_0.182_98.111)]/20 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">
              Ready to Restore Your Hair?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Start with a free hair loss assessment. Our physicians will evaluate your pattern 
              and create a personalized protocol to help you achieve your goals.
            </p>
            <Link 
              href="/consultation"
              className="inline-flex items-center  text-black px-12 py-4 rounded-lg text-lg font-bold hover:opacity-90 hover:shadow-xl hover:shadow-[oklch(90.5%_0.182_98.111)]/50 transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: brand.colors.primary }}
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

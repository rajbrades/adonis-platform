'use client'

import Link from 'next/link'
import { 
  ArrowRight, Heart, CheckCircle, Shield, Clock, TrendingUp,
  Zap, Pill, Award, Users, AlertCircle, Sparkles, Timer, Flame
} from 'lucide-react'

export default function SexualWellnessPage() {
  const benefits = [
    'Enhanced erectile function',
    'Improved libido and desire',
    'Increased sexual confidence',
    'Better performance and stamina',
    'Spontaneity with daily dosing options',
    'Minimal side effects',
    'Physician-supervised treatment',
    'Discreet home delivery'
  ]

  const treatments = [
    {
      name: 'Tadalafil (Generic Cialis®)',
      icon: Heart,
      description: 'Long-acting PDE5 inhibitor that improves blood flow for strong, reliable erections. The "weekend pill" with effects lasting up to 36 hours.',
      benefits: [
        'Lasts up to 36 hours',
        'Daily or on-demand dosing',
        'Quick onset (30-60 minutes)',
        'Enables spontaneity',
        'Well-tolerated'
      ],
      dosing: 'On-demand: 5-20mg as needed | Daily: 2.5mg daily to accompany TRT or general vascular health',
      ideal: 'Men wanting long-lasting effects and spontaneity',
      duration: 'Up to 36 hours'
    },
    {
      name: 'Tadalafil + Oxytocin',
      icon: Sparkles,
      description: 'Combines the physical benefits of Tadalafil with Oxytocin\'s enhancement of emotional connection, bonding, and pleasure.',
      benefits: [
        'Enhanced erectile function',
        'Increased emotional connection',
        'Heightened pleasure and sensation',
        'Improved orgasm quality',
        'Synergistic effects'
      ],
      dosing: 'Customized compounded formulation (troches or nasal spray)',
      ideal: 'Men seeking enhanced intimacy and emotional connection',
      duration: 'Up to 36 hours (Tadalafil component)'
    },
    {
      name: 'Sildenafil (Generic Viagra®)',
      icon: Zap,
      description: 'The original PDE5 inhibitor with proven efficacy. Fast-acting with 4-6 hour duration, perfect for planned intimacy.',
      benefits: [
        'Fast-acting (30-60 minutes)',
        'Highly effective',
        'Proven track record',
        'Predictable duration',
        'Well-studied safety profile'
      ],
      dosing: '25-100mg as needed, 30-60 minutes before activity',
      ideal: 'Men wanting fast, predictable results',
      duration: '4-6 hours'
    },
    {
      name: 'Tadalafil + Apomorphine',
      icon: TrendingUp,
      description: 'Advanced combination therapy pairing Tadalafil\'s physical benefits with Apomorphine\'s central nervous system effects for enhanced desire and arousal.',
      benefits: [
        'Dual mechanism of action',
        'Enhanced libido and desire',
        'Improved erectile function',
        'Faster onset',
        'Stronger effects'
      ],
      dosing: 'Customized compounded formulation (sublingual troches)',
      ideal: 'Men with both physical and desire/arousal concerns',
      duration: 'Up to 36 hours'
    },
    {
      name: 'PT-141 (Bremelanotide)',
      icon: Flame,
      description: 'Revolutionary peptide that works on the brain to increase sexual desire and arousal. Unlike PDE5 inhibitors, PT-141 enhances libido at the neurological level.',
      benefits: [
        'Increases sexual desire naturally',
        'Works on brain chemistry',
        'Effective for low libido',
        'Helps both men and women',
        'Non-vascular mechanism'
      ],
      dosing: 'Customized dosing protocol',
      ideal: 'Men with low libido or desire-related concerns',
      duration: 'Effects last several hours'
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
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-2 mb-6">
                <Heart className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">SEXUAL WELLNESS</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Optimize Your <span className="text-yellow-400">Sexual</span> Performance
              </h1>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Advanced treatments for erectile function, libido, and sexual confidence. 
                Physician-prescribed solutions delivered discreetly to your door.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/consultation"
                  className="inline-flex items-center justify-center bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300"
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
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">What's Included</h3>
              <div className="space-y-4">
                {[
                  'Confidential physician consultation',
                  'Personalized treatment plan',
                  'Prescription medication',
                  'Multiple dosing options available',
                  'Discreet home delivery',
                  'Ongoing support and adjustments',
                  '100% online - no office visits',
                  'Cancel anytime'
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
              Reclaim Your <span className="text-yellow-400">Confidence</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Comprehensive solutions for erectile dysfunction, low libido, and sexual performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-yellow-400/30 transition-all duration-300"
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
              <span className="text-yellow-400">Treatment</span> Options
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Choose from proven medications and advanced combination therapies tailored to your needs
            </p>
          </div>

          <div className="space-y-8">
            {treatments.map((treatment, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-yellow-400/30 transition-all duration-300"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-yellow-400/10 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                        <treatment.icon className="w-7 h-7 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{treatment.name}</h3>
                        <p className="text-white/70 leading-relaxed">{treatment.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Pill className="w-5 h-5 text-yellow-400" />
                          <span className="font-semibold text-sm text-white/80">Dosing</span>
                        </div>
                        <p className="text-sm text-white/60">{treatment.dosing}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Timer className="w-5 h-5 text-yellow-400" />
                          <span className="font-semibold text-sm text-white/80">Duration</span>
                        </div>
                        <p className="text-sm text-white/60">{treatment.duration}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-yellow-400" />
                        <span className="font-semibold text-sm text-white/80">Ideal For</span>
                      </div>
                      <p className="text-sm text-white/60">{treatment.ideal}</p>
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
              Quick <span className="text-yellow-400">Comparison</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Find the right treatment for your needs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-white/80 font-bold">Treatment</th>
                  <th className="text-left py-4 px-6 text-white/80 font-bold">Onset Time</th>
                  <th className="text-left py-4 px-6 text-white/80 font-bold">Duration</th>
                  <th className="text-left py-4 px-6 text-white/80 font-bold">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-4 px-6 text-yellow-400 font-semibold">Tadalafil</td>
                  <td className="py-4 px-6 text-white/70">30-60 min</td>
                  <td className="py-4 px-6 text-white/70">Up to 36 hours</td>
                  <td className="py-4 px-6 text-white/70">Spontaneity</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-4 px-6 text-yellow-400 font-semibold">Tadalafil + Oxytocin</td>
                  <td className="py-4 px-6 text-white/70">30-60 min</td>
                  <td className="py-4 px-6 text-white/70">Up to 36 hours</td>
                  <td className="py-4 px-6 text-white/70">Enhanced intimacy</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-4 px-6 text-yellow-400 font-semibold">Sildenafil</td>
                  <td className="py-4 px-6 text-white/70">30-60 min</td>
                  <td className="py-4 px-6 text-white/70">4-6 hours</td>
                  <td className="py-4 px-6 text-white/70">Planned intimacy</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-4 px-6 text-yellow-400 font-semibold">Tadalafil + Apomorphine</td>
                  <td className="py-4 px-6 text-white/70">15-30 min</td>
                  <td className="py-4 px-6 text-white/70">Up to 36 hours</td>
                  <td className="py-4 px-6 text-white/70">ED + low desire</td>
                </tr>
                <tr className="hover:bg-white/5 transition">
                  <td className="py-4 px-6 text-yellow-400 font-semibold">PT-141</td>
                  <td className="py-4 px-6 text-white/70">45-90 min</td>
                  <td className="py-4 px-6 text-white/70">Several hours</td>
                  <td className="py-4 px-6 text-white/70">Low libido</td>
                </tr>
              </tbody>
            </table>
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
              Get treatment in 4 simple steps - 100% online and confidential
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Free Consultation</h3>
              <p className="text-white/60">
                Complete our confidential health questionnaire online.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Physician Review</h3>
              <p className="text-white/60">
                Licensed doctor reviews your info and creates your prescription.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Discreet Delivery</h3>
              <p className="text-white/60">
                Medication ships directly to your door in unmarked packaging.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Ongoing Support</h3>
              <p className="text-white/60">
                Adjust dosing as needed with continued physician access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/Who It's For */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black mb-6">
                Is This <span className="text-yellow-400">Right for You?</span>
              </h2>
              <p className="text-white/70 mb-8 text-lg leading-relaxed">
                Sexual wellness treatments can help men experiencing erectile dysfunction, 
                low libido, or performance concerns regain confidence and intimacy.
              </p>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold mb-4">Common Reasons Men Seek Treatment:</h3>
                {[
                  'Difficulty achieving or maintaining erections',
                  'Reduced sexual desire or libido',
                  'Performance anxiety',
                  'Age-related changes in sexual function',
                  'Stress or relationship factors',
                  'Side effects from other medications',
                  'Desire for enhanced sexual experience',
                  'Low testosterone affecting sexual health'
                ].map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Shield className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Safe & Effective</h3>
                <p className="text-white/70 leading-relaxed">
                  All medications are FDA-approved (or use FDA-approved compounds) and prescribed 
                  by licensed US physicians. We monitor your treatment for safety and efficacy.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Heart className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">100% Confidential</h3>
                <p className="text-white/70 leading-relaxed">
                  Your privacy is our priority. Discreet shipping, confidential consultations, 
                  and secure medical records protected by HIPAA compliance.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <Users className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Personalized Care</h3>
                <p className="text-white/70 leading-relaxed">
                  Your treatment is customized to your needs, lifestyle, and preferences. 
                  We can adjust medications and dosing to optimize your results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3">Consider Hormone Testing</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Low testosterone is a common underlying cause of erectile dysfunction and low libido. 
                  We recommend checking your hormone levels as part of a comprehensive approach to sexual wellness.
                </p>
                <Link 
                  href="/lab-testing"
                  className="inline-flex items-center text-yellow-400 font-semibold hover:text-yellow-300 transition"
                >
                  Learn About Hormone Testing
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
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">
              Ready to Reclaim Your Confidence?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Start with a free, confidential consultation. Our physicians will review your needs 
              and recommend the best treatment option for you.
            </p>
            <Link 
              href="/consultation"
              className="inline-flex items-center bg-yellow-400 text-black px-12 py-4 rounded-lg text-lg font-bold hover:bg-yellow-500 hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Start Free Consultation
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
            <p className="text-sm text-white/50 mt-4">
              100% confidential • No office visits • Discreet shipping
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

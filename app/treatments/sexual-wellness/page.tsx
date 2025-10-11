import Link from 'next/link'
import { ArrowRight, Heart, Zap, TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react'

export default function SexualWellnessPage() {
  const benefits = [
    "Enhanced libido and sexual desire",
    "Improved erectile function",
    "Increased sexual stamina and performance",
    "Better orgasm intensity and satisfaction",
    "Restored confidence in intimate relationships",
    "Improved partner satisfaction",
    "Enhanced overall relationship quality",
    "Reduced performance anxiety"
  ]

  const treatments = [
    {
      name: "Testosterone Optimization",
      description: "Address low testosterone, the primary cause of reduced male sexual function",
      mechanism: "Restores natural hormone levels that drive libido and performance",
      effectiveness: "85-90% success rate"
    },
    {
      name: "PDE5 Inhibitors",
      description: "Prescription medications for erectile dysfunction (Sildenafil, Tadalafil)",
      mechanism: "Improves blood flow to enhance erectile function",
      effectiveness: "75-85% success rate"
    },
    {
      name: "PT-141 (Bremelanotide)",
      description: "Peptide therapy that targets sexual desire at the brain level",
      mechanism: "Activates melanocortin receptors to increase arousal and desire",
      effectiveness: "70-80% success rate"
    },
    {
      name: "GAINSWave Therapy",
      description: "Low-intensity shock wave therapy to improve blood flow",
      mechanism: "Stimulates new blood vessel growth and tissue regeneration",
      effectiveness: "65-75% success rate"
    }
  ]

  const causes = [
    {
      factor: "Hormonal Decline",
      description: "Low testosterone is the leading cause of reduced sexual function in men over 30",
      prevalence: "40% of men over 40"
    },
    {
      factor: "Vascular Issues",
      description: "Poor blood flow affects erectile function and overall sexual performance",
      prevalence: "50% of men over 50"
    },
    {
      factor: "Stress & Lifestyle",
      description: "High stress, poor sleep, and sedentary lifestyle impact sexual health",
      prevalence: "60% of working men"
    },
    {
      factor: "Medications",
      description: "Many common medications can negatively impact sexual function",
      prevalence: "25% of men on prescriptions"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">
            Sexual Wellness & Performance
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Restore your confidence and performance with comprehensive sexual wellness treatments. 
            Address the root causes of sexual dysfunction and reclaim your intimate relationships.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-yellow-400">The Sexual Health Crisis</h2>
              <p className="text-white/80 text-lg">
                Sexual dysfunction affects the majority of men as they age, but it's not inevitable.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">52%</div>
                <div className="text-white/80">Men experience ED by age 40</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">85%</div>
                <div className="text-white/80">Success rate with treatment</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">30%</div>
                <div className="text-white/80">Have low libido issues</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">90%</div>
                <div className="text-white/80">Don't seek treatment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Root Causes */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Understanding the Root Causes</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Sexual dysfunction rarely has a single cause. Our comprehensive approach addresses all contributing factors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {causes.map((cause, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400">{cause.factor}</h3>
                  <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                    {cause.prevalence}
                  </span>
                </div>
                <p className="text-white/70">{cause.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Options */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Comprehensive Treatment Options</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our multi-modal approach combines the most effective treatments for optimal results.
            </p>
          </div>

          <div className="space-y-8">
            {treatments.map((treatment, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-yellow-400">{treatment.name}</h3>
                    <p className="text-white/80">{treatment.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-bold mb-2">How it Works:</h4>
                    <p className="text-white/70 text-sm">{treatment.mechanism}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-lg p-4">
                      <div className="text-yellow-400 font-bold">{treatment.effectiveness}</div>
                      <div className="text-white/70 text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 text-yellow-400">Reclaim Your Confidence</h2>
              <p className="text-white/80 mb-8 text-lg">
                Sexual wellness affects every aspect of your life - confidence, relationships, and overall happiness. 
                Our comprehensive approach addresses both physical and psychological factors for lasting results.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                    <span className="text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Treatment Timeline</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">1</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Week 1-2</h4>
                    <p className="text-white/70">Comprehensive assessment and lab work</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">2</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Week 2-4</h4>
                    <p className="text-white/70">Treatment initiation and initial improvements</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">3</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Month 2-3</h4>
                    <p className="text-white/70">Significant improvement in function and confidence</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">4</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">3-6 Months</h4>
                    <p className="text-white/70">Optimal results and restored sexual wellness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Discretion */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Complete Privacy & Discretion</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We understand the sensitive nature of sexual health. All consultations and treatments are completely confidential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">HIPAA Compliant</h3>
              <p className="text-white/70">All medical information is protected by strict privacy laws</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Discreet Delivery</h3>
              <p className="text-white/70">Medications delivered in unmarked, secure packaging</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Private Consultations</h3>
              <p className="text-white/70">Virtual appointments in the privacy of your home</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Restore Your Sexual Wellness?</h2>
          <p className="text-xl text-white/70 mb-8">
            Take the first step towards renewed confidence and performance with our confidential assessment.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Start Confidential Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Clock, CheckCircle, Zap } from 'lucide-react'

export default function HairTreatmentPage() {
  const causes = [
    {
      name: "Androgenetic Alopecia",
      description: "DHT sensitivity causing male pattern baldness",
      prevalence: "95% of male hair loss",
      treatable: true
    },
    {
      name: "Hormonal Imbalance",
      description: "Low testosterone and high DHT levels",
      prevalence: "Common in men 30+",
      treatable: true
    },
    {
      name: "Nutrient Deficiencies",
      description: "Lack of key vitamins and minerals for hair growth",
      prevalence: "60% of men",
      treatable: true
    },
    {
      name: "Stress & Lifestyle",
      description: "Chronic stress affecting hair growth cycles",
      prevalence: "80% of professionals",
      treatable: true
    }
  ]

  const treatments = [
    {
      name: "Finasteride",
      type: "DHT Blocker",
      effectiveness: "80-90%",
      description: "Prescription medication that blocks DHT production to prevent further hair loss",
      benefits: ["Stops hair loss progression", "Promotes regrowth", "Clinically proven", "FDA approved"],
      timeframe: "3-6 months for results"
    },
    {
      name: "Minoxidil",
      type: "Growth Stimulant", 
      effectiveness: "60-70%",
      description: "Topical treatment that increases blood flow to hair follicles",
      benefits: ["Stimulates new growth", "Available OTC", "Minimal side effects", "Works well with finasteride"],
      timeframe: "2-4 months for results"
    },
    {
      name: "Hair Growth Peptides",
      type: "Advanced Therapy",
      effectiveness: "70-80%",
      description: "Cutting-edge peptide therapy to stimulate follicle regeneration",
      benefits: ["Natural growth stimulation", "Minimal side effects", "Supports overall hair health", "Synergistic with other treatments"],
      timeframe: "3-5 months for results"
    },
    {
      name: "Comprehensive Hormone Optimization",
      type: "Root Cause Treatment",
      effectiveness: "85-95%",
      description: "Address underlying hormonal imbalances affecting hair growth",
      benefits: ["Treats root cause", "Improves overall health", "Sustainable results", "Multiple benefits"],
      timeframe: "4-6 months for results"
    }
  ]

  const timeline = [
    {
      phase: "Month 1-2",
      title: "Initial Stabilization",
      description: "Treatment begins, hair loss slows or stops"
    },
    {
      phase: "Month 3-4", 
      title: "Early Regrowth",
      description: "Fine new hairs begin to appear in thinning areas"
    },
    {
      phase: "Month 6-8",
      title: "Visible Improvement",
      description: "Noticeable increase in hair density and thickness"
    },
    {
      phase: "Month 9-12",
      title: "Optimal Results",
      description: "Maximum hair restoration and continued maintenance"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">
            Hair Loss Prevention & Restoration
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Stop hair loss in its tracks and restore your hairline with proven medical treatments. 
            Address the root causes of male pattern baldness with our comprehensive approach.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-yellow-400">Hair Loss Facts</h2>
              <p className="text-white/80 text-lg">
                Hair loss affects the majority of men, but early intervention can make all the difference.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">85%</div>
                <div className="text-white/80">Men experience hair loss by age 50</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">25%</div>
                <div className="text-white/80">Start losing hair by age 21</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">90%</div>
                <div className="text-white/80">Success rate with early treatment</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">50%</div>
                <div className="text-white/80">Hair loss before it becomes visible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Hair Loss */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Understanding Male Hair Loss</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Hair loss is primarily caused by genetics and hormones, specifically sensitivity to DHT (dihydrotestosterone). 
              The good news? It's highly treatable when caught early.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {causes.map((cause, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400">{cause.name}</h3>
                  <div className="flex items-center">
                    {cause.treatable ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                        Treatable
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold">
                        Difficult
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-white/70 mb-3">{cause.description}</p>
                <div className="text-yellow-400 text-sm font-bold">Affects: {cause.prevalence}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Options */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Proven Hair Loss Treatments</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our multi-modal approach combines the most effective FDA-approved treatments with cutting-edge therapies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {treatments.map((treatment, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-400">{treatment.name}</h3>
                    <p className="text-yellow-400/80">{treatment.type}</p>
                  </div>
                  <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-lg p-3 text-center">
                    <div className="text-yellow-400 font-bold">{treatment.effectiveness}</div>
                    <div className="text-white/70 text-xs">Effective</div>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6">{treatment.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3">Key Benefits:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {treatment.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-white/80 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                  <span className="text-yellow-400 font-bold text-sm">Results Timeline: </span>
                  <span className="text-white/80 text-sm">{treatment.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Timeline */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">What to Expect</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Hair restoration is a gradual process. Here's the typical timeline for our comprehensive treatment approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((phase, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
                <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold mb-2 text-yellow-400">{phase.phase}</h3>
                <h4 className="text-white font-bold mb-3">{phase.title}</h4>
                <p className="text-white/70 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Early Treatment Matters */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-8 mb-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 text-orange-400">Early Treatment is Critical</h3>
              <p className="text-white/80 mb-6">
                The earlier you start treatment, the better your results will be. Hair follicles that are completely dormant 
                cannot be revived, but follicles that are shrinking can often be restored to full function.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">Early Stage</div>
                  <div className="text-green-400">90-95% Success</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">Moderate Stage</div>
                  <div className="text-yellow-400">70-80% Success</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400 mb-2">Advanced Stage</div>
                  <div className="text-red-400">40-50% Success</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">FDA Approved</h3>
              <p className="text-white/70">All our treatments are FDA-approved and clinically proven</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Physician Supervised</h3>
              <p className="text-white/70">All treatments are overseen by licensed medical professionals</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Convenient Delivery</h3>
              <p className="text-white/70">Medications delivered directly to your door each month</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Stop Hair Loss?</h2>
          <p className="text-xl text-white/70 mb-8">
            The sooner you start treatment, the better your results will be. Get a personalized hair loss assessment today.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Get Hair Loss Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

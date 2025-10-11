import Link from 'next/link'
import { ArrowRight, Zap, TrendingUp, Shield, Clock, CheckCircle, Award, Heart, Brain } from 'lucide-react'

export default function LongevityPage() {
  const longevityPillars = [
    {
      name: "Hormone Optimization",
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      description: "Maintain youthful hormone levels to slow aging at the cellular level",
      interventions: ["Testosterone replacement", "Growth hormone optimization", "Thyroid optimization", "Insulin sensitivity"],
      impact: "10-15 years biological age reduction"
    },
    {
      name: "Cellular Health",
      icon: <Heart className="w-8 h-8 text-yellow-400" />,
      description: "Support mitochondrial function and cellular repair mechanisms",
      interventions: ["NAD+ precursors", "Mitochondrial support", "Antioxidant protocols", "Cellular detoxification"],
      impact: "Enhanced cellular energy and repair"
    },
    {
      name: "Metabolic Optimization", 
      icon: <TrendingUp className="w-8 h-8 text-yellow-400" />,
      description: "Optimize metabolic pathways for longevity and disease prevention",
      interventions: ["Glucose control", "Lipid optimization", "Inflammation reduction", "Autophagy enhancement"],
      impact: "Reduced disease risk, improved healthspan"
    },
    {
      name: "Cognitive Protection",
      icon: <Brain className="w-8 h-8 text-yellow-400" />,
      description: "Preserve and enhance cognitive function throughout aging",
      interventions: ["Neuroprotective compounds", "Brain training", "Stress management", "Sleep optimization"],
      impact: "Maintained mental sharpness"
    }
  ]

  const biomarkers = [
    {
      category: "Biological Age Markers",
      tests: ["Telomere length", "DNA methylation patterns", "Inflammatory markers", "Oxidative stress levels"],
      frequency: "Every 6-12 months"
    },
    {
      category: "Metabolic Health",
      tests: ["HbA1c", "Insulin sensitivity", "Lipid profiles", "Liver function"],
      frequency: "Every 3-6 months"
    },
    {
      category: "Hormonal Status",
      tests: ["Complete hormone panel", "Thyroid function", "Cortisol patterns", "Growth factors"],
      frequency: "Every 3-6 months"
    },
    {
      category: "Cardiovascular Risk",
      tests: ["Advanced lipids", "Coronary calcium score", "Blood pressure variability", "Endothelial function"],
      frequency: "Every 6-12 months"
    }
  ]

  const interventions = [
    {
      name: "NAD+ Enhancement",
      type: "Cellular Energy",
      description: "Boost cellular energy production and DNA repair mechanisms",
      methods: ["NMN supplementation", "NAD+ IV therapy", "Sirtuin activation", "Lifestyle modifications"],
      evidence: "Strong clinical research"
    },
    {
      name: "Rapamycin Protocols",
      type: "mTOR Inhibition", 
      description: "Intermittent mTOR inhibition to promote autophagy and longevity",
      methods: ["Physician-supervised protocols", "Biomarker monitoring", "Personalized dosing"],
      evidence: "Extensive animal studies, emerging human data"
    },
    {
      name: "Metformin Therapy",
      type: "Metabolic Optimization",
      description: "Anti-aging effects beyond diabetes prevention",
      methods: ["Extended-release formulation", "Glucose monitoring", "B12 supplementation"],
      evidence: "Large population studies"
    },
    {
      name: "Senolytic Protocols",
      type: "Cellular Cleanup",
      description: "Remove senescent cells to restore tissue function",
      methods: ["Fisetin protocols", "Quercetin combinations", "Monitoring programs"],
      evidence: "Promising early research"
    }
  ]

  const lifestyleFactors = [
    {
      factor: "Nutrition",
      impact: "High",
      recommendations: ["Mediterranean-style diet", "Intermittent fasting", "Caloric restriction mimetics", "Micronutrient optimization"],
      evidence: "Blue zones research, clinical trials"
    },
    {
      factor: "Exercise",
      impact: "High", 
      recommendations: ["Resistance training", "HIIT protocols", "Zone 2 cardio", "Flexibility work"],
      evidence: "Extensive longevity research"
    },
    {
      factor: "Sleep",
      impact: "Critical",
      recommendations: ["7-9 hours nightly", "Sleep hygiene", "Circadian optimization", "Recovery monitoring"],
      evidence: "Strong biological evidence"
    },
    {
      factor: "Stress Management",
      impact: "High",
      recommendations: ["Meditation practices", "Stress biomarker monitoring", "Adaptogenic support", "Work-life balance"],
      evidence: "Telomere and cortisol research"
    }
  ]

  const timeline = [
    {
      phase: "Months 1-3",
      title: "Foundation Building",
      focus: "Comprehensive assessment, hormone optimization, lifestyle modifications",
      markers: "Initial biomarker improvements"
    },
    {
      phase: "Months 4-6",
      title: "Protocol Implementation", 
      focus: "Advanced interventions, cellular optimization, metabolic enhancement",
      markers: "Measurable biological age changes"
    },
    {
      phase: "Months 7-12",
      title: "Optimization & Refinement",
      focus: "Fine-tuning protocols, advanced therapies, sustained improvements",
      markers: "Significant healthspan extension"
    },
    {
      phase: "Year 2+",
      title: "Maintenance & Monitoring",
      focus: "Long-term sustainability, emerging therapies, continuous optimization",
      markers: "Sustained biological age reversal"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">
            Longevity & Anti-Aging Protocol
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Extend your healthspan and lifespan with cutting-edge longevity science. 
            Turn back your biological clock and optimize for decades of peak performance.
          </p>
        </div>
      </section>

      {/* The Science */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-black mb-6 text-yellow-400">The Longevity Revolution</h2>
              <p className="text-white/80 mb-6 text-lg">
                Aging is no longer inevitable. Cutting-edge research has identified the key mechanisms 
                of aging and developed interventions to slow, stop, and even reverse the aging process.
              </p>
              <p className="text-white/80 mb-6 text-lg">
                We now know that biological age can be different from chronological age. 
                Some 60-year-olds have the biology of 40-year-olds, while others have aged 
                rapidly due to poor lifestyle and hormonal decline.
              </p>
              <p className="text-white/80 text-lg">
                Our comprehensive longevity protocol targets the root causes of aging at the 
                cellular level, helping you maintain the energy, health, and vitality of someone decades younger.
              </p>
            </div>
            
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Key Aging Statistics</h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">25%</div>
                  <div className="text-white/80">of aging is genetic</div>
                  <div className="text-white/60 text-sm">75% is modifiable</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">10-15</div>
                  <div className="text-white/80">years biological age reduction possible</div>
                  <div className="text-white/60 text-sm">with comprehensive intervention</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">90+</div>
                  <div className="text-white/80">healthy years achievable</div>
                  <div className="text-white/60 text-sm">with optimal protocols</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Four Pillars of Longevity</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our comprehensive approach targets the fundamental mechanisms of aging across multiple systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {longevityPillars.map((pillar, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  {pillar.icon}
                  <h3 className="text-2xl font-bold ml-4 text-yellow-400">{pillar.name}</h3>
                </div>
                
                <p className="text-white/80 mb-6">{pillar.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3">Key Interventions:</h4>
                  <div className="space-y-2">
                    {pillar.interventions.map((intervention, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-white/80 text-sm">{intervention}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                  <span className="text-yellow-400 font-bold text-sm">Impact: </span>
                  <span className="text-white/80 text-sm">{pillar.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Interventions */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Advanced Anti-Aging Interventions</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Cutting-edge therapies based on the latest longevity research and clinical evidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {interventions.map((intervention, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400">{intervention.name}</h3>
                  <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                    {intervention.type}
                  </span>
                </div>
                
                <p className="text-white/80 mb-6">{intervention.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3">Methods:</h4>
                  <div className="space-y-2">
                    {intervention.methods.map((method, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        <span className="text-white/80 text-sm">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <span className="text-green-400 font-bold text-sm">Evidence: </span>
                  <span className="text-white/80 text-sm">{intervention.evidence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biomarker Monitoring */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Comprehensive Biomarker Monitoring</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Track your biological age and optimization progress with advanced testing protocols.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {biomarkers.map((category, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-yellow-400">{category.category}</h3>
                  <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                    {category.frequency}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {category.tests.map((test, idx) => (
                    <div key={idx} className="flex items-center">
                      <Shield className="w-4 h-4 text-yellow-400 mr-3" />
                      <span className="text-white/80">{test}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Optimization */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Lifestyle Longevity Factors</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The foundation of longevity lies in optimized daily habits and lifestyle choices.
            </p>
          </div>

          <div className="space-y-6">
            {lifestyleFactors.map((factor, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="grid lg:grid-cols-4 gap-6 items-center">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-yellow-400">{factor.factor}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        factor.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                        factor.impact === 'High' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {factor.impact} Impact
                      </span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <h4 className="text-white font-bold mb-3">Recommendations:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {factor.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                          <span className="text-white/80 text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-400 font-bold text-sm mb-2">Evidence:</h4>
                    <p className="text-white/80 text-sm">{factor.evidence}</p>
                  </div>
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
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Longevity Protocol Timeline</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our systematic approach to biological age reversal and healthspan extension.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((phase, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
                <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold mb-2 text-yellow-400">{phase.phase}</h3>
                <h4 className="text-white font-bold mb-3">{phase.title}</h4>
                <p className="text-white/70 text-sm mb-4">{phase.focus}</p>
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-2">
                  <span className="text-yellow-400 font-bold text-xs">{phase.markers}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment & Commitment */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">Investment in Your Future Self</h3>
              <p className="text-white/80 text-lg">
                Longevity optimization is a long-term commitment with compound returns on your health and lifespan.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">Time Commitment</div>
                <div className="text-white/80">2-3 hours per month</div>
                <div className="text-white/60 text-sm">Consultations + monitoring</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">Investment Range</div>
                <div className="text-white/80">$500-2000/month</div>
                <div className="text-white/60 text-sm">Varies by protocol complexity</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">ROI Timeline</div>
                <div className="text-white/80">6-12 months</div>
                <div className="text-white/60 text-sm">Measurable age reversal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Turn Back Your Biological Clock?</h2>
          <p className="text-xl text-white/70 mb-8">
            Start your longevity journey with comprehensive biological age assessment and personalized optimization protocols.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Begin Longevity Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

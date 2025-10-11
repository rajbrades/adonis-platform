import Link from 'next/link'
import { ArrowRight, Zap, TrendingUp, Shield, Clock, CheckCircle, Award } from 'lucide-react'

export default function PeptideTherapyPage() {
  const peptides = [
    {
      name: "Sermorelin",
      category: "Growth Hormone Releasing Hormone",
      primaryBenefits: ["Increased natural GH production", "Improved sleep quality", "Enhanced muscle growth", "Better recovery"],
      description: "Stimulates the pituitary gland to produce more growth hormone naturally, promoting anti-aging and performance benefits.",
      mechanism: "GHRH analog that triggers natural growth hormone release",
      dosing: "Subcutaneous injection before bed",
      timeframe: "4-6 weeks for initial effects"
    },
    {
      name: "Tesamorelin",
      category: "Growth Hormone Releasing Hormone",
      primaryBenefits: ["Reduces visceral fat", "Improves body composition", "Enhances cognitive function", "Boosts energy"],
      description: "FDA-approved GHRH analog particularly effective for reducing abdominal fat and improving metabolic health.",
      mechanism: "Stimulates GH release with focus on fat reduction",
      dosing: "Daily subcutaneous injection",
      timeframe: "8-12 weeks for body composition changes"
    },
    {
      name: "SLU-PP-332",
      category: "Novel Research Peptide",
      primaryBenefits: ["Potential longevity effects", "Metabolic enhancement", "Cellular repair", "Anti-aging properties"],
      description: "Cutting-edge research peptide showing promise for longevity and metabolic optimization (research stage).",
      mechanism: "Targets specific longevity pathways at cellular level",
      dosing: "Research protocols vary",
      timeframe: "Long-term studies ongoing"
    },
    {
      name: "Pentadeca Arginate",
      category: "Immune & Recovery Support",
      primaryBenefits: ["Enhanced immune function", "Faster wound healing", "Improved recovery", "Anti-inflammatory effects"],
      description: "Multi-peptide compound supporting immune system function and accelerated recovery from training and illness.",
      mechanism: "Modulates immune response and tissue repair",
      dosing: "Injectable or oral protocols",
      timeframe: "2-4 weeks for immune benefits"
    },
    {
      name: "IGF-1 LR3",
      category: "Insulin-like Growth Factor",
      primaryBenefits: ["Accelerated muscle growth", "Enhanced recovery", "Improved protein synthesis", "Fat loss support"],
      description: "Long-acting form of IGF-1 that promotes muscle growth and recovery with extended half-life.",
      mechanism: "Stimulates muscle cell growth and repair",
      dosing: "Post-workout injection protocols",
      timeframe: "3-4 weeks for muscle effects"
    }
  ]

  const benefits = [
    {
      category: "Performance Enhancement",
      benefits: ["Increased muscle mass and strength", "Enhanced athletic performance", "Faster recovery between workouts", "Improved endurance and stamina"]
    },
    {
      category: "Anti-Aging & Longevity",
      benefits: ["Reduced signs of aging", "Improved skin quality and elasticity", "Enhanced cognitive function", "Better sleep quality"]
    },
    {
      category: "Body Composition",
      benefits: ["Accelerated fat loss", "Lean muscle preservation", "Improved metabolic rate", "Better insulin sensitivity"]
    },
    {
      category: "Recovery & Healing",
      benefits: ["Faster injury recovery", "Reduced inflammation", "Enhanced immune function", "Better tissue repair"]
    }
  ]

  const safetyInfo = [
    {
      aspect: "Medical Supervision",
      description: "All peptide protocols require physician oversight and monitoring"
    },
    {
      aspect: "Quality Assurance", 
      description: "Pharmaceutical-grade peptides from licensed compounding pharmacies"
    },
    {
      aspect: "Regular Monitoring",
      description: "Blood work and health assessments to ensure safety and efficacy"
    },
    {
      aspect: "Personalized Protocols",
      description: "Dosing and combinations tailored to individual goals and response"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">
            Advanced Peptide Therapy
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Unlock your body's potential with cutting-edge peptide treatments. 
            Target specific pathways for enhanced performance, recovery, and longevity.
          </p>
        </div>
      </section>

      {/* What Are Peptides */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 text-yellow-400">What Are Peptides?</h2>
              <p className="text-white/80 mb-6 text-lg">
                Peptides are short chains of amino acids that act as signaling molecules in your body. 
                They tell your cells what to do - whether that's producing more growth hormone, 
                burning fat, building muscle, or repairing tissue.
              </p>
              <p className="text-white/80 mb-6 text-lg">
                Unlike synthetic hormones, peptides work by optimizing your body's natural processes. 
                This makes them safer and more sustainable for long-term use while delivering 
                powerful results for performance and longevity.
              </p>
              <p className="text-white/80 text-lg">
                Our physician-supervised peptide protocols are customized to your specific goals, 
                whether that's building muscle, losing fat, improving recovery, or enhancing longevity.
              </p>
            </div>
            
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Why Peptides Work</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Targeted Action</h4>
                    <p className="text-white/70 text-sm">Work on specific receptors and pathways</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Natural Process</h4>
                    <p className="text-white/70 text-sm">Enhance your body's existing functions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Fewer Side Effects</h4>
                    <p className="text-white/70 text-sm">Generally well-tolerated with proper supervision</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Stackable</h4>
                    <p className="text-white/70 text-sm">Can be combined for synergistic effects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Peptides */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Our Peptide Arsenal</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We offer a comprehensive range of research-backed peptides, each targeting specific aspects of performance and health optimization.
            </p>
          </div>

          <div className="space-y-8">
            {peptides.map((peptide, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-yellow-400">{peptide.name}</h3>
                    </div>
                    <p className="text-yellow-400/80 mb-4">{peptide.category}</p>
                    <p className="text-white/80 mb-6">{peptide.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div><span className="text-yellow-400 font-bold">Mechanism:</span> <span className="text-white/70">{peptide.mechanism}</span></div>
                      <div><span className="text-yellow-400 font-bold">Protocol:</span> <span className="text-white/70">{peptide.dosing}</span></div>
                      <div><span className="text-yellow-400 font-bold">Timeline:</span> <span className="text-white/70">{peptide.timeframe}</span></div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <h4 className="text-white font-bold mb-4">Primary Benefits:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {peptide.primaryBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-yellow-400 mr-3" />
                          <span className="text-white/80 text-sm">{benefit}</span>
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

      {/* Benefits by Category */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Comprehensive Benefits</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Peptide therapy can address multiple aspects of health and performance simultaneously.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((category, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-yellow-400">{category.category}</h3>
                <div className="space-y-3">
                  {category.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mr-3" />
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Our Treatment Process</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Every peptide protocol is customized based on your goals, health status, and response to treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-black font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-yellow-400">Assessment</h3>
              <p className="text-white/70 text-sm">Comprehensive health evaluation and goal setting</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-black font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-yellow-400">Protocol Design</h3>
              <p className="text-white/70 text-sm">Custom peptide selection and dosing protocol</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-black font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-yellow-400">Monitoring</h3>
              <p className="text-white/70 text-sm">Regular check-ins and lab work tracking</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-black font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-yellow-400">Optimization</h3>
              <p className="text-white/70 text-sm">Adjust protocols based on response and goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Quality */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Safety & Quality Standards</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              All peptide therapy is conducted under strict medical supervision with the highest quality standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {safetyInfo.map((info, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 flex items-start">
                <Shield className="w-8 h-8 text-yellow-400 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-3 text-yellow-400">{info.aspect}</h3>
                  <p className="text-white/70">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Important Medical Disclaimer</h3>
              <p className="text-white/80 mb-4">
                Some peptides mentioned are research compounds with limited clinical data in humans. 
                All treatments require physician consultation and are prescribed based on individual medical assessment.
              </p>
              <p className="text-white/70 text-sm">
                Results may vary. Not all peptides are suitable for every individual. 
                Medical supervision is required throughout treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Explore Peptide Therapy?</h2>
          <p className="text-xl text-white/70 mb-8">
            Discover how advanced peptide protocols can optimize your performance, recovery, and longevity.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Get Peptide Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

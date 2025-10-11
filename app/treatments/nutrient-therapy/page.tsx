import Link from 'next/link'
import { ArrowRight, Zap, TrendingUp, Shield, Clock, CheckCircle, Award, Heart } from 'lucide-react'

export default function NutrientTherapyPage() {
  const keyNutrients = [
    {
      name: "Vitamin D3",
      dosage: "5,000-10,000 IU daily",
      importance: "Critical",
      functions: ["Testosterone production", "Immune function", "Bone health", "Mood regulation"],
      deficiencyRate: "80% of adults",
      optimalRange: "50-80 ng/mL"
    },
    {
      name: "Magnesium",
      dosage: "400-800 mg daily", 
      importance: "Essential",
      functions: ["Sleep quality", "Muscle function", "Testosterone support", "Stress reduction"],
      deficiencyRate: "70% of adults",
      optimalRange: "2.5-3.5 mg/dL"
    },
    {
      name: "Zinc",
      dosage: "15-30 mg daily",
      importance: "Critical",
      functions: ["Testosterone synthesis", "Immune function", "Wound healing", "Protein synthesis"],
      deficiencyRate: "40% of adults",
      optimalRange: "90-150 mcg/dL"
    },
    {
      name: "B-Complex Vitamins",
      dosage: "High-potency complex",
      importance: "Essential",
      functions: ["Energy production", "Nervous system", "Hormone synthesis", "Methylation"],
      deficiencyRate: "60% of adults",
      optimalRange: "Varies by B vitamin"
    },
    {
      name: "Omega-3 Fatty Acids",
      dosage: "2-4 grams daily",
      importance: "Important",
      functions: ["Anti-inflammation", "Brain health", "Hormone production", "Cardiovascular health"],
      deficiencyRate: "90% inadequate intake",
      optimalRange: "8-12% of total fatty acids"
    },
    {
      name: "Vitamin B12",
      dosage: "1,000-5,000 mcg daily",
      importance: "Critical",
      functions: ["Energy production", "Nervous system", "Red blood cell formation", "DNA synthesis"],
      deficiencyRate: "40% over age 40",
      optimalRange: "500-1,500 pg/mL"
    }
  ]

  const deficiencySymptoms = [
    {
      category: "Energy & Performance",
      symptoms: ["Chronic fatigue", "Poor workout recovery", "Brain fog", "Decreased motivation", "Afternoon energy crashes"]
    },
    {
      category: "Hormonal Issues", 
      symptoms: ["Low testosterone", "Poor sleep quality", "Decreased libido", "Mood swings", "Increased stress response"]
    },
    {
      category: "Physical Health",
      symptoms: ["Frequent illness", "Slow healing", "Muscle cramps", "Joint pain", "Digestive issues"]
    },
    {
      category: "Mental Health",
      symptoms: ["Depression", "Anxiety", "Poor concentration", "Memory issues", "Irritability"]
    }
  ]

  const protocols = [
    {
      name: "Foundation Protocol",
      description: "Essential nutrients that most men are deficient in",
      nutrients: ["Vitamin D3", "Magnesium", "Zinc", "B12", "Omega-3"],
      cost: "$80-120/month",
      results: "2-4 weeks"
    },
    {
      name: "Performance Protocol",
      description: "Advanced nutrients for athletic performance and recovery",
      nutrients: ["All foundation nutrients", "CoQ10", "Creatine", "Adaptogenic herbs", "Amino acids"],
      cost: "$150-250/month",
      results: "4-6 weeks"
    },
    {
      name: "Optimization Protocol",
      description: "Comprehensive nutrient support for peak health and longevity",
      nutrients: ["All performance nutrients", "NAD+ precursors", "Antioxidant complex", "Mitochondrial support"],
      cost: "$250-400/month", 
      results: "6-8 weeks"
    }
  ]

  const testingApproach = [
    {
      test: "Comprehensive Micronutrient Panel",
      what: "Measures 31+ vitamins, minerals, and antioxidants",
      why: "Identifies specific deficiencies and optimal ranges"
    },
    {
      test: "Omega-3 Index",
      what: "Measures EPA and DHA levels in red blood cells", 
      why: "Determines anti-inflammatory status and brain health"
    },
    {
      test: "Methylation Panel",
      what: "B12, folate, and homocysteine levels",
      why: "Assesses cellular energy production and detoxification"
    },
    {
      test: "Antioxidant Status",
      what: "Measures cellular protection against oxidative stress",
      why: "Determines aging rate and disease risk"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">
            Advanced Nutrient Therapy
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Address nutrient deficiencies that are sabotaging your energy, performance, and hormones. 
            Optimize your cellular function with precision nutrient protocols.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-red-400">The Modern Nutrient Crisis</h2>
              <p className="text-white/80 text-lg">
                Despite abundant food, nutrient deficiencies are epidemic among high-performers. 
                Modern farming, processed foods, and stressful lifestyles have created a perfect storm.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-black text-red-400 mb-2">80%</div>
                <div className="text-white/80">Are deficient in Vitamin D</div>
              </div>
              <div>
                <div className="text-4xl font-black text-red-400 mb-2">70%</div>
                <div className="text-white/80">Don't get enough Magnesium</div>
              </div>
              <div>
                <div className="text-4xl font-black text-red-400 mb-2">90%</div>
                <div className="text-white/80">Have inadequate Omega-3 levels</div>
              </div>
              <div>
                <div className="text-4xl font-black text-red-400 mb-2">40%</div>
                <div className="text-white/80">Are B12 deficient after age 40</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deficiency Symptoms */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Are You Nutrient Deficient?</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Most men assume they're getting adequate nutrition, but deficiency symptoms are often mistaken for "normal aging."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {deficiencySymptoms.map((category, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-yellow-400">{category.category}</h3>
                <div className="space-y-3">
                  {category.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      <span className="text-white/80">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Nutrients */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Essential Nutrients for Men</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              These nutrients are crucial for testosterone production, energy, performance, and overall health.
            </p>
          </div>

          <div className="space-y-6">
            {keyNutrients.map((nutrient, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="grid lg:grid-cols-4 gap-6 items-center">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-yellow-400">{nutrient.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        nutrient.importance === 'Critical' ? 'bg-red-500/20 text-red-400' :
                        nutrient.importance === 'Essential' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {nutrient.importance}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">Dosage: {nutrient.dosage}</p>
                    <p className="text-white/60 text-xs">Deficient: {nutrient.deficiencyRate}</p>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <h4 className="text-white font-bold mb-3">Key Functions:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {nutrient.functions.map((func, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                          <span className="text-white/80 text-sm">{func}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                    <h4 className="text-yellow-400 font-bold text-sm mb-2">Optimal Range:</h4>
                    <p className="text-white/80 text-sm">{nutrient.optimalRange}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Approach */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Precision Testing Approach</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We don't guess - we test. Our comprehensive nutrient testing identifies exactly what you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testingApproach.map((test, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{test.test}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-bold mb-2">What it measures:</h4>
                    <p className="text-white/70">{test.what}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Why it matters:</h4>
                    <p className="text-white/70">{test.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Protocols */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Personalized Protocols</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Based on your lab results and goals, we create a targeted nutrient protocol for optimal results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {protocols.map((protocol, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">{protocol.name}</h3>
                <p className="text-white/70 mb-6">{protocol.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3">Includes:</h4>
                  <div className="space-y-2">
                    {protocol.nutrients.map((nutrient, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-white/80 text-sm">{nutrient}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-yellow-500/20 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Investment:</span>
                    <span className="text-yellow-400 font-bold">{protocol.cost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Results:</span>
                    <span className="text-yellow-400 font-bold">{protocol.results}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Pharmaceutical-Grade Quality</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Not all supplements are created equal. We use only the highest quality, most bioavailable forms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Third-Party Tested</h3>
              <p className="text-white/70">All supplements are tested for purity and potency by independent labs</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Bioavailable Forms</h3>
              <p className="text-white/70">We use the most absorbable forms of each nutrient for maximum effectiveness</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">No Fillers</h3>
              <p className="text-white/70">Clean formulations without unnecessary additives, fillers, or artificial ingredients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Optimize Your Nutrition?</h2>
          <p className="text-xl text-white/70 mb-8">
            Stop guessing about your nutritional needs. Get comprehensive testing and personalized protocols.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Get Nutrient Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

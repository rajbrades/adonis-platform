import Link from 'next/link'
import { getBrand } from "@/lib/brand"
import { ArrowRight, Beaker, CheckCircle, Target, Brain, Shield, Zap, Heart, FlaskConical, Activity, Clock, Sparkles } from 'lucide-react'

export default function NutrientTherapyPage() {
  const brand = getBrand()
  
  const nutrients = [
    {
      category: 'Activated B Vitamins',
      items: [
        { name: 'Methylfolate (5-MTHF)', benefit: 'Active folate for methylation & DNA synthesis' },
        { name: 'Methylcobalamin (B12)', benefit: 'Neurological function & energy production' },
        { name: 'P-5-P (Active B6)', benefit: 'Neurotransmitter synthesis & hormone regulation' },
        { name: 'Benfotiamine (B1)', benefit: 'Glucose metabolism & nerve health' },
        { name: 'R-5-P (Active B2)', benefit: 'Mitochondrial energy production' }
      ]
    },
    {
      category: 'Chelated Minerals',
      items: [
        { name: 'Magnesium Glycinate', benefit: 'Muscle function, sleep, and 300+ enzymes' },
        { name: 'Zinc Picolinate', benefit: 'Immune function & testosterone support' },
        { name: 'Iron Bisglycinate', benefit: 'Oxygen transport without GI distress' },
        { name: 'Selenium Methionine', benefit: 'Thyroid function & antioxidant defense' },
        { name: 'Chromium Picolinate', benefit: 'Insulin sensitivity & glucose control' }
      ]
    },
    {
      category: 'Mitochondrial Support',
      items: [
        { name: 'CoQ10 (Ubiquinol)', benefit: 'Cellular energy & cardiovascular health' },
        { name: 'PQQ', benefit: 'Mitochondrial biogenesis & cognitive function' },
        { name: 'Alpha Lipoic Acid', benefit: 'Antioxidant & glucose metabolism' },
        { name: 'NAD+ Precursors', benefit: 'Cellular repair & energy production' },
        { name: 'L-Carnitine', benefit: 'Fatty acid metabolism & energy' }
      ]
    },
    {
      category: 'Targeted Nutrients',
      items: [
        { name: 'Vitamin D3 + K2', benefit: 'Bone health, immunity & calcium regulation' },
        { name: 'Omega-3 (EPA/DHA)', benefit: 'Inflammation control & brain health' },
        { name: 'Curcumin (Liposomal)', benefit: 'Systemic inflammation reduction' },
        { name: 'Glutathione Precursors', benefit: 'Master antioxidant support' },
        { name: 'Phosphatidylserine', benefit: 'Cognitive function & cortisol regulation' }
      ]
    }
  ]

  const diagnostics = [
    {
      test: 'Comprehensive Metabolic Panel',
      markers: ['Glucose', 'Kidney function', 'Liver enzymes', 'Electrolytes'],
      insights: 'Baseline metabolic health and organ function'
    },
    {
      test: 'Advanced Nutrient Analysis',
      markers: ['RBC Magnesium', 'Active B12', 'Vitamin D', 'Ferritin', 'Zinc/Copper ratio'],
      insights: 'Cellular nutrient status beyond serum levels'
    },
    {
      test: 'Methylation Panel',
      markers: ['Homocysteine', 'MTHFR genetics', 'SAMe/SAH ratio', 'Folate metabolism'],
      insights: 'Genetic and functional methylation capacity'
    },
    {
      test: 'Oxidative Stress Markers',
      markers: ['8-OHdG', 'Lipid peroxides', 'Glutathione', 'SOD activity'],
      insights: 'Cellular damage and antioxidant status'
    },
    {
      test: 'Inflammatory Markers',
      markers: ['hs-CRP', 'IL-6', 'TNF-alpha', 'Omega-3 index'],
      insights: 'Systemic inflammation and fatty acid balance'
    }
  ]

  const protocols = [
    {
      name: 'Executive Performance',
      focus: 'Cognitive function & stress resilience',
      includes: ['Activated B-complex', 'Magnesium glycinate', 'Lion\'s Mane', 'Phosphatidylserine', 'CoQ10']
    },
    {
      name: 'Athletic Optimization',
      focus: 'Recovery, endurance & strength',
      includes: ['Chelated minerals', 'D3/K2', 'Omega-3', 'Creatine', 'Beta-alanine']
    },
    {
      name: 'Metabolic Support',
      focus: 'Blood sugar & weight management',
      includes: ['Chromium picolinate', 'Alpha lipoic acid', 'Berberine', 'Green tea extract', 'Fiber complex']
    },
    {
      name: 'Immune Fortification',
      focus: 'Immune resilience & recovery',
      includes: ['Zinc picolinate', 'Vitamin C complex', 'Vitamin D3', 'Quercetin', 'Beta-glucans']
    }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
                <FlaskConical className="w-4 h-4" style={{ color: brand.colors.primary }} />
                <span className="text-sm font-semibold" style={{ color: brand.colors.primary }}>PRECISION NUTRITION</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Targeted <span style={{ color: brand.colors.primary }}>Nutrient</span> Optimization
              </h1>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Science-based supplementation with activated vitamins and chelated minerals. 
                Personalized protocols based on comprehensive lab diagnostics, symptoms, and health history.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center justify-center gap-2 text-black px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
                  style={{ backgroundColor: brand.colors.primary }}
                >
                  Start Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-lg bg-white/10 hover:bg-white/20 transition-all text-white"
                >
                  View Lab Panels
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: brand.colors.primary }}>What's Included</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: brand.colors.primary }} />
                    <div>
                      <div className="font-semibold mb-1">Comprehensive Lab Analysis</div>
                      <div className="text-sm text-white/60">Advanced nutrient testing beyond standard panels</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: brand.colors.primary }} />
                    <div>
                      <div className="font-semibold mb-1">Personalized Protocol</div>
                      <div className="text-sm text-white/60">Custom supplement plan based on your unique needs</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: brand.colors.primary }} />
                    <div>
                      <div className="font-semibold mb-1">Premium Supplements</div>
                      <div className="text-sm text-white/60">Pharmaceutical-grade activated vitamins & chelated minerals</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: brand.colors.primary }} />
                    <div>
                      <div className="font-semibold mb-1">Ongoing Monitoring</div>
                      <div className="text-sm text-white/60">Regular testing to optimize and adjust protocols</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Testing Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">
              Data-Driven <span style={{ color: brand.colors.primary }}>Diagnostics</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We go beyond basic blood work to identify cellular nutrient deficiencies and metabolic imbalances
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnostics.map((test, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                <Beaker className="w-8 h-8 mb-4" style={{ color: brand.colors.primary }} />
                <h3 className="text-xl font-bold mb-3">{test.test}</h3>
                <div className="space-y-2 mb-4">
                  {test.markers.map((marker, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brand.colors.primary }} />
                      <span className="text-sm text-white/70">{marker}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/60 italic">{test.insights}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrient Categories */}
      <section className="py-24 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">
              Premium <span style={{ color: brand.colors.primary }}>Nutrients</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Bioavailable forms that your body can actually use - no synthetic fillers or poorly absorbed compounds
            </p>
          </div>

          <div className="space-y-12">
            {nutrients.map((category, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: brand.colors.primary }}>
                  {category.category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
                      <div className="font-semibold mb-2">{item.name}</div>
                      <div className="text-sm text-white/60">{item.benefit}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">
              Targeted <span style={{ color: brand.colors.primary }}>Protocols</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Evidence-based supplement stacks designed for specific health goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {protocols.map((protocol, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <Target className="w-10 h-10 mb-4" style={{ color: brand.colors.primary }} />
                <h3 className="text-2xl font-bold mb-2">{protocol.name}</h3>
                <p className="text-white/70 mb-4">{protocol.focus}</p>
                <div className="space-y-2">
                  {protocol.includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: brand.colors.primary }} />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">
              Optimize Your <span style={{ color: brand.colors.primary }}>Cellular Health</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="font-bold mb-2">Enhanced Energy</h3>
              <p className="text-sm text-white/60">Support mitochondrial function for sustained energy</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="font-bold mb-2">Mental Clarity</h3>
              <p className="text-sm text-white/60">Optimize neurotransmitters and brain health</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="font-bold mb-2">Immune Support</h3>
              <p className="text-sm text-white/60">Strengthen your body's natural defenses</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="font-bold mb-2">Cardiovascular Health</h3>
              <p className="text-sm text-white/60">Support heart health and circulation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: brand.colors.primary }} />
            
            <h2 className="text-4xl font-black mb-4">
              Start Your <span style={{ color: brand.colors.primary }}>Optimization Journey</span>
            </h2>
            
            <p className="text-xl text-white/70 mb-8">
              Get personalized nutrient recommendations based on comprehensive testing and analysis
            </p>
            
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 text-black px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: brand.colors.primary }}
            >
              Get Started - Free Assessment <ArrowRight className="w-5 h-5" />
            </Link>
            
            <p className="text-sm text-white/50 mt-6">
              No credit card required • 100% confidential • Results in 48 hours
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

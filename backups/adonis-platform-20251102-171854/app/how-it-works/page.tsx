import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Users, FlaskConical, FileText, Calendar, Phone, Shield } from 'lucide-react'

export default function HowItWorksPage() {
  const brand = getBrand()
  const steps = [
    {
      number: "01",
      icon: <FileText className="w-8 h-8" style={{ color: brand.colors.primary }} />,
      title: "Complete Assessment",
      description: "Fill out our comprehensive health questionnaire covering your goals, medical history, and lifestyle factors.",
      duration: "10-15 minutes",
      details: ["Personal health history", "Current symptoms", "Optimization goals", "Lifestyle assessment"]
    },
    {
      number: "02",
      icon: <Users className="w-8 h-8" style={{ color: brand.colors.primary }} />,
      title: "Physician Review",
      description: "A licensed physician reviews your assessment and determines if you're a candidate for treatment.",
      duration: "24-48 hours",
      details: ["Medical history review", "Candidacy assessment", "Treatment recommendations", "Lab test orders"]
    },
    {
      number: "03",
      icon: <FlaskConical className="w-8 h-8" style={{ color: brand.colors.primary }} />,
      title: "Lab Testing",
      description: "Get comprehensive lab work done at a location convenient to you, covered by most insurance plans.",
      duration: "Same day results",
      details: ["Hormone panel", "Metabolic markers", "Nutritional status", "Health indicators"]
    },
    {
      number: "04",
      icon: <Phone className="w-8 h-8" style={{ color: brand.colors.primary }} />,
      title: "Results Consultation",
      description: "Review your results with your physician and create a personalized treatment plan.",
      duration: "30-45 minutes",
      details: ["Lab results review", "Treatment plan creation", "Goal setting", "Medication selection"]
    },
    {
      number: "05",
      icon: <Calendar className="w-8 h-8" style={{ color: brand.colors.primary }} />,
      title: "Treatment Delivery",
      description: "Receive your personalized medications delivered directly to your door with ongoing support.",
      duration: "Ongoing",
      details: ["Monthly deliveries", "Progress monitoring", "Dose adjustments", "24/7 support"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            How It <span style={{ color: brand.colors.primary }}>Works</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process makes hormone optimization simple and convenient. 
            From assessment to treatment, we handle everything for you.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center gap-12">
                <div className={`lg:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl mr-4"
                        style={{ 
                          backgroundColor: brand.colors.primary,
                          color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                        }}
                      >
                        {step.number}
                      </div>
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${brand.colors.primary}10` }}
                      >
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                    <p className="text-white/60 mb-6 text-lg leading-relaxed">{step.description}</p>
                    
                    <div 
                      className="rounded-xl p-4 mb-6 border"
                      style={{ 
                        backgroundColor: `${brand.colors.primary}10`,
                        borderColor: `${brand.colors.primary}20`
                      }}
                    >
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" style={{ color: brand.colors.primary }} />
                        <span className="font-semibold" style={{ color: brand.colors.primary }}>
                          Timeline: {step.duration}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-white/60">
                          <div 
                            className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                            style={{ backgroundColor: brand.colors.primary }}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`lg:w-1/2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="text-center lg:text-left">
                    <div className="text-8xl font-black text-white/5 mb-4">
                      {step.number}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h4>
                    <p className="text-white/60 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">
              Why Choose Our <span style={{ color: brand.colors.primary }}>Approach</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              We've designed our process to be convenient, comprehensive, and clinically effective.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <Shield className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-4">Licensed Physicians</h3>
              <p className="text-white/60 leading-relaxed">All treatments are overseen by board-certified physicians specializing in hormone optimization.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <FlaskConical className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-4">Comprehensive Testing</h3>
              <p className="text-white/60 leading-relaxed">Advanced lab panels that go beyond basic testing to optimize your entire hormonal profile.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${brand.colors.primary}10` }}
              >
                <Calendar className="w-8 h-8" style={{ color: brand.colors.primary }} />
              </div>
              <h3 className="text-xl font-bold mb-4">Ongoing Support</h3>
              <p className="text-white/60 leading-relaxed">Monthly check-ins, dose adjustments, and 24/7 support to ensure optimal results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">
              Ready to Get <span style={{ color: brand.colors.primary }}>Started?</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Begin your optimization journey today with our comprehensive assessment.
            </p>
            <Link 
              href="/consultation"
              className="inline-flex items-center px-12 py-4 rounded-lg text-lg font-bold hover:opacity-90 transition-all duration-300"
              style={{ 
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Start Your Assessment
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

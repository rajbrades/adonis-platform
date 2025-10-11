import Link from 'next/link'
import { ArrowRight, Users, FlaskConical, FileText, Calendar, Phone, Shield } from 'lucide-react'

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      icon: <FileText className="w-8 h-8 text-yellow-400" />,
      title: "Complete Assessment",
      description: "Fill out our comprehensive health questionnaire covering your goals, medical history, and lifestyle factors.",
      duration: "10-15 minutes",
      details: ["Personal health history", "Current symptoms", "Optimization goals", "Lifestyle assessment"]
    },
    {
      number: "02",
      icon: <Users className="w-8 h-8 text-yellow-400" />,
      title: "Physician Review",
      description: "A licensed physician reviews your assessment and determines if you're a candidate for treatment.",
      duration: "24-48 hours",
      details: ["Medical history review", "Candidacy assessment", "Treatment recommendations", "Lab test orders"]
    },
    {
      number: "03",
      icon: <FlaskConical className="w-8 h-8 text-yellow-400" />,
      title: "Lab Testing",
      description: "Get comprehensive lab work done at a location convenient to you, covered by most insurance plans.",
      duration: "Same day results",
      details: ["Hormone panel", "Metabolic markers", "Nutritional status", "Health indicators"]
    },
    {
      number: "04",
      icon: <Phone className="w-8 h-8 text-yellow-400" />,
      title: "Results Consultation",
      description: "Review your results with your physician and create a personalized treatment plan.",
      duration: "30-45 minutes",
      details: ["Lab results review", "Treatment plan creation", "Goal setting", "Medication selection"]
    },
    {
      number: "05",
      icon: <Calendar className="w-8 h-8 text-yellow-400" />,
      title: "Treatment Delivery",
      description: "Receive your personalized medications delivered directly to your door with ongoing support.",
      duration: "Ongoing",
      details: ["Monthly deliveries", "Progress monitoring", "Dose adjustments", "24/7 support"]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">
            How It Works
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Our streamlined process makes hormone optimization simple and convenient. 
            From assessment to treatment, we handle everything for you.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center gap-12">
                <div className={`lg:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                    <div className="flex items-center mb-6">
                      <div className="bg-yellow-400 text-black w-12 h-12 rounded-full flex items-center justify-center font-black text-xl mr-4">
                        {step.number}
                      </div>
                      {step.icon}
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 text-yellow-400">{step.title}</h3>
                    <p className="text-white/80 mb-6 text-lg">{step.description}</p>
                    
                    <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-yellow-400 font-bold">Timeline: {step.duration}</span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-white/80">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`lg:w-1/2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="text-center lg:text-left">
                    <div className="text-6xl font-black text-yellow-400/20 mb-4">
                      {step.number}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h4>
                    <p className="text-white/60 text-lg">
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
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Why Choose Our Approach</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We've designed our process to be convenient, comprehensive, and clinically effective.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Licensed Physicians</h3>
              <p className="text-white/70">All treatments are overseen by board-certified physicians specializing in hormone optimization.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FlaskConical className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Comprehensive Testing</h3>
              <p className="text-white/70">Advanced lab panels that go beyond basic testing to optimize your entire hormonal profile.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Ongoing Support</h3>
              <p className="text-white/70">Monthly check-ins, dose adjustments, and 24/7 support to ensure optimal results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Get Started?</h2>
          <p className="text-xl text-white/70 mb-8">
            Begin your optimization journey today with our comprehensive assessment.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Start Your Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

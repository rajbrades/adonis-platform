import Link from 'next/link'
import { ArrowRight, Shield, Users, Zap, Award, Star, Clock, CheckCircle, TrendingUp, Activity, Brain, Heart } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="relative z-50 bg-black/90 backdrop-blur-sm border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ADONIS
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-white/80 hover:text-yellow-400 transition-colors">
              Treatments
            </Link>
            <Link href="/about" className="text-white/80 hover:text-yellow-400 transition-colors">
              How It Works
            </Link>
            <Link href="/science" className="text-white/80 hover:text-yellow-400 transition-colors">
              Science
            </Link>
            <Link href="/login" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent leading-tight">
            PEAK<br />PERFORMANCE<br />UNLOCKED
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Precision medicine for elite executives. Data-driven hormone optimization, 
            peptide therapy, and longevity treatments. Consultation with real doctors.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/products" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all transform hover:scale-105">
              Start Consultation
              <ArrowRight className="inline ml-2 w-6 h-6" />
            </Link>
            <Link href="/products" className="border-2 border-yellow-400 text-yellow-400 px-12 py-4 rounded-lg text-xl font-bold hover:bg-yellow-400 hover:text-black transition-all">
              View Treatments
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">98%</div>
              <div className="text-white/70">Patient Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">24-48h</div>
              <div className="text-white/70">Lab Review</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">FDA</div>
              <div className="text-white/70">Approved Medications</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">Licensed</div>
              <div className="text-white/70">Medical Providers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ELITE TREATMENTS
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Testosterone Optimization",
                description: "Enclomiphene Citrate therapy for natural hormone balance",
                price: "$199/month",
                icon: <TrendingUp className="w-8 h-8" />,
                features: ["Lab analysis included", "Real doctor consultation", "Monthly monitoring"]
              },
              {
                name: "NAD+ Longevity",
                description: "Cellular energy restoration and anti-aging support",
                price: "$249/month",
                icon: <Activity className="w-8 h-8" />,
                features: ["Weekly injections", "Energy optimization", "Cognitive enhancement"]
              },
              {
                name: "GLP-1 Weight Management",
                description: "Advanced metabolic optimization for executives",
                price: "$399/month",
                icon: <Heart className="w-8 h-8" />,
                features: ["Rapid results", "Appetite regulation", "Metabolic reset"]
              }
            ].map((treatment, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8 hover:bg-white/10 transition-all transform hover:scale-105">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-black">
                  {treatment.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">{treatment.name}</h3>
                <p className="text-white/70 mb-6">{treatment.description}</p>
                <div className="text-3xl font-bold mb-6 text-white">{treatment.price}</div>
                <ul className="space-y-3 mb-8">
                  {treatment.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-white/80">
                      <Star className="w-4 h-4 text-yellow-400 mr-3 fill-current" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            HOW IT WORKS
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                icon: <Users className="w-12 h-12" />,
                title: "Consult Real Doctors",
                description: "Licensed physicians review your health goals and medical history in detail"
              },
              {
                step: "02",
                icon: <Shield className="w-12 h-12" />,
                title: "Comprehensive Labs",
                description: "Advanced biomarker testing to identify optimization opportunities"
              },
              {
                step: "03",
                icon: <Zap className="w-12 h-12" />,
                title: "Precision Treatment",
                description: "Personalized protocols delivered to your door with ongoing monitoring"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="text-6xl font-black text-yellow-400/20 mb-4">{step.step}</div>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-black -mt-16 relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-white/70 text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            PROVEN RESULTS
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { metric: "+47%", label: "Average Energy Increase" },
              { metric: "+156%", label: "Testosterone Optimization" },
              { metric: "-23 lbs", label: "Average Weight Loss" },
              { metric: "87%", label: "Improved Sleep Quality" }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="text-4xl font-black text-yellow-400 mb-2">{stat.metric}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            EXECUTIVE TESTIMONIALS
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "My energy levels are through the roof. I'm performing at levels I haven't experienced since my 20s.",
                name: "Michael Chen",
                title: "CEO, TechCorp"
              },
              {
                quote: "The hormone optimization has completely transformed my focus and drive. Game changer for any executive.",
                name: "Sarah Williams", 
                title: "Managing Director, Goldman Sachs"
              },
              {
                quote: "Finally found a medical team that understands the demands of executive life. Results speak for themselves.",
                name: "David Rodriguez",
                title: "Founder, StartupX"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-yellow-400">{testimonial.name}</div>
                  <div className="text-white/60 text-sm">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-black text-black mb-8">
            READY TO OPTIMIZE?
          </h2>
          <p className="text-xl text-black/80 mb-12">
            Join thousands of executives already performing at their peak
          </p>
          <Link href="/products" className="bg-black text-yellow-400 px-12 py-4 rounded-lg text-xl font-bold hover:bg-gray-900 transition-all inline-flex items-center">
            Start Your Journey
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                ADONIS
              </div>
              <p className="text-white/70">
                Peak performance medicine for elite executives
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Treatments</h4>
              <div className="space-y-2 text-white/70">
                <div>Hormone Optimization</div>
                <div>Peptide Therapy</div>
                <div>Weight Management</div>
                <div>Longevity Protocols</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <div className="space-y-2 text-white/70">
                <div>How It Works</div>
                <div>Science</div>
                <div>Safety</div>
                <div>About</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <div className="space-y-2 text-white/70">
                <div>Contact</div>
                <div>FAQ</div>
                <div>Privacy</div>
                <div>Terms</div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-yellow-500/20 text-center text-white/50">
            © 2024 Adonis Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

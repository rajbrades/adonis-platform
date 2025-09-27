import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-yellow-500/20 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-3xl font-black text-yellow-400">
            ADONIS
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-white/80 hover:text-yellow-400 transition-colors">
              Treatments
            </Link>
            <Link href="/consultation" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative">
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
            peptide therapy, and longevity treatments with licensed physicians.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              href="/consultation" 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all transform hover:scale-105 inline-flex items-center"
            >
              Start Consultation
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link 
              href="/products" 
              className="border-2 border-yellow-400 text-yellow-400 px-12 py-4 rounded-lg text-xl font-bold hover:bg-yellow-400 hover:text-black transition-all"
            >
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

      {/* Value Propositions */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 text-yellow-400">
            WHY ELITE EXECUTIVES CHOOSE ADONIS
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-black font-black text-2xl">
                01
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Real Medical Doctors</h3>
              <p className="text-white/70 text-lg">Licensed physicians review every case personally. No algorithms, no shortcuts.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-black font-black text-2xl">
                02
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Executive-Focused</h3>
              <p className="text-white/70 text-lg">Designed for high-performers who demand results and value their time.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-black font-black text-2xl">
                03
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Data-Driven Results</h3>
              <p className="text-white/70 text-lg">Advanced biomarker testing and continuous monitoring for measurable outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 text-yellow-400">
            PREMIUM TREATMENT OPTIONS
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Hormone Optimization', price: 'From $199/mo' },
              { name: 'Peptide Therapy', price: 'From $249/mo' },
              { name: 'Weight Management', price: 'From $399/mo' },
              { name: 'Longevity Protocols', price: 'From $299/mo' }
            ].map((treatment, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center hover:bg-white/10 transition-all">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{treatment.name}</h3>
                <div className="text-2xl font-bold text-white mb-4">{treatment.price}</div>
                <Link 
                  href="/products" 
                  className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-black text-black mb-8">
            READY TO OPTIMIZE YOUR PERFORMANCE?
          </h2>
          <p className="text-xl text-black/80 mb-12">
            Join thousands of executives already performing at their peak with personalized medical optimization
          </p>
          <Link 
            href="/consultation" 
            className="bg-black text-yellow-400 px-12 py-4 rounded-lg text-xl font-bold hover:bg-gray-900 transition-all inline-flex items-center"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
          <p className="text-black/60 mt-4">
            $199 consultation fee • Fully refundable guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 p

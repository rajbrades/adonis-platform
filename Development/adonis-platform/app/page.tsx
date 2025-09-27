import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-3xl font-black text-yellow-400">
            ADONIS
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-white/80 hover:text-yellow-400 transition-colors">
              Treatments
            </Link>
            <Link href="/consultation" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-lg font-bold">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent leading-tight">
            PEAK<br />PERFORMANCE<br />UNLOCKED
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            Precision medicine for elite executives. Data-driven hormone optimization with licensed physicians.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              href="/consultation" 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all inline-flex items-center"
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

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 text-yellow-400">
            PREMIUM TREATMENT OPTIONS
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Hormone Optimization</h3>
              <div className="text-2xl font-bold text-white mb-4">From $199/mo</div>
            </div>
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Peptide Therapy</h3>
              <div className="text-2xl font-bold text-white mb-4">From $249/mo</div>
            </div>
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Weight Management</h3>
              <div className="text-2xl font-bold text-white mb-4">From $399/mo</div>
            </div>
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Longevity Protocols</h3>
              <div className="text-2xl font-bold text-white mb-4">From $299/mo</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-black text-black mb-8">
            READY TO OPTIMIZE?
          </h2>
          <p className="text-xl text-black/80 mb-12">
            Join thousands of executives already performing at their peak
          </p>
          <Link 
            href="/consultation" 
            className="bg-black text-yellow-400 px-12 py-4 rounded-lg text-xl font-bold inline-flex items-center"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>

      <footer className="bg-black border-t border-yellow-500/20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-black text-yellow-400 mb-4">
            ADONIS
          </div>
          <p className="text-white/70">
            Peak performance medicine for elite executives
          </p>
        </div>
      </footer>
    </div>
  )
}

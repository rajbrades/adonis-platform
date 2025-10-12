import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Clock, CheckCircle, Zap } from 'lucide-react'

export default function HairTreatmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Hair <span className="text-yellow-400">Restoration</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive hair loss treatment combining proven medications and advanced therapies.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">Restore Your <span className="text-yellow-400">Hair</span></h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Science-backed treatments to prevent hair loss and promote regrowth.
            </p>
            <Link 
              href="/consultation"
              className="inline-flex items-center bg-yellow-400 text-black px-12 py-4 rounded-lg text-lg font-bold hover:bg-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
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

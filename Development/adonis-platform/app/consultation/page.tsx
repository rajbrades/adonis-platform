import Link from 'next/link'
import { ArrowRight, Clock, Shield, Users } from 'lucide-react'

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl font-black mb-8 text-yellow-400">
          START YOUR OPTIMIZATION
        </h1>
        
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Complete a comprehensive health assessment with our licensed medical team.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Medical Assessment</h3>
            <p className="text-white/70">Comprehensive health questionnaire</p>
          </div>
          
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Doctor Review</h3>
            <p className="text-white/70">Licensed physician analysis</p>
          </div>
          
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Treatment Plan</h3>
            <p className="text-white/70">Personalized protocol</p>
          </div>
        </div>

        <Link 
          href="/consultation/intake"
          className="inline-flex items-center bg-yellow-400 text-black px-12 py-4 rounded-lg text-xl font-bold"
        >
          Begin Assessment
          <ArrowRight className="ml-3 w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}

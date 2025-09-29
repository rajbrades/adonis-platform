import Link from 'next/link'
import { ArrowRight, Clock, Shield, Users, CheckCircle } from 'lucide-react'

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
          <div className="text-white/60">Step 1 of 4</div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-6 text-yellow-400">
            START YOUR OPTIMIZATION
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Complete a comprehensive health assessment with our licensed medical team. 
            Get personalized treatment recommendations in 24-48 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
            <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Medical Assessment</h3>
            <p className="text-white/70">Comprehensive health questionnaire and goals evaluation</p>
          </div>
          
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
            <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Doctor Review</h3>
            <p className="text-white/70">Licensed physician analyzes your profile and lab recommendations</p>
          </div>
          
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
            <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Treatment Plan</h3>
            <p className="text-white/70">Personalized protocol delivered with ongoing monitoring</p>
          </div>
        </div>

        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">Your Consultation Includes:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Comprehensive health assessment',
              'Hormone optimization evaluation',
              'Peptide therapy screening',
              'Weight management analysis',
              'Lab test recommendations',
              'Licensed doctor review',
              'Personalized treatment plan',
              'Ongoing monitoring support'
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-8 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">$199 Consultation Fee</h2>
          <p className="text-white/70 mb-6">
            Fully refundable if we cannot help you achieve your optimization goals
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-white/60">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Licensed Providers
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              24-48h Response
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/consultation/intake"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg hover:shadow-yellow-500/25 transition-all transform hover:scale-105"
          >
            Begin Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
          <p className="text-white/60 mt-4 text-sm">
            Takes 10-15 minutes to complete • Secure & confidential
          </p>
        </div>
      </div>
    </div>
  )
}

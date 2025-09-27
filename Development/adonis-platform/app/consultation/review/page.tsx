import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, Shield } from 'lucide-react'

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
          <div className="text-white/60">Step 4 of 4</div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-6 text-yellow-400">
            Assessment Complete
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Thank you for completing your comprehensive health assessment. Our medical team will review your information and provide personalized recommendations.
          </p>
        </div>

        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">What Happens Next</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Medical Review (24-48 hours)</h3>
                <p className="text-white/70">A licensed physician will review your assessment and determine if you are a candidate for optimization therapy.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Lab Recommendations</h3>
                <p className="text-white/70">If appropriate, we will provide specific lab tests to order from your local lab or through our partner network.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Treatment Plan</h3>
                <p className="text-white/70">Based on your labs and assessment, we will create a personalized optimization protocol tailored to your goals.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Ongoing Monitoring</h3>
                <p className="text-white/70">Regular check-ins and lab monitoring to ensure optimal results and adjust protocols as needed.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">Consultation Fee: $199</h2>
          <p className="text-white/70 mb-6">
            Complete your consultation to receive personalized medical recommendations
          </p>
          
          <div className="flex justify-center items-center space-x-6 text-sm text-white/60 mb-8">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Licensed Physicians
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              24-48h Response
            </div>
          </div>

          <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all mb-4">
            Complete Consultation - $199
          </button>
          
          <p className="text-white/60 text-sm">
            Fully refundable if we cannot help you achieve your optimization goals
          </p>
        </div>

        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Your Privacy & Security</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-yellow-400" />
              All data encrypted and HIPAA compliant
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-yellow-400" />
              Reviewed only by licensed physicians
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-yellow-400" />
              Never shared with third parties
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-yellow-400" />
              Secure medical-grade platform
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            href="/consultation/medical-history"
            className="flex items-center text-white/70 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5

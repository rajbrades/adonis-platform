'use client'

import Link from 'next/link'
import { CheckCircle, Clock, Beaker, FileText, ArrowLeft, Home } from 'lucide-react'

export default function ConsultationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-yellow-400">
            Assessment Complete
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Thank you for completing your health assessment. Our medical team will review your information.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-8 text-yellow-400">What Happens Next</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  Medical Review
                </h3>
                <p className="text-white/70">
                  A licensed physician will review your assessment within 24-48 hours.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-yellow-400" />
                  Lab Recommendations
                </h3>
                <p className="text-white/70">
                  We will provide specific lab tests if appropriate for your case.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-yellow-400" />
                  Treatment Plan
                </h3>
                <p className="text-white/70">
                  Personalized optimization protocol based on your assessment and labs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <Link
            href="/consultation/intake"
            className="flex items-center gap-2 text-white/60 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          
          <Link
            href="/"
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </div>

      </div>
    </div>
  )
}

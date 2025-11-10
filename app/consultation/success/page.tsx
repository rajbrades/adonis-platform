'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { CheckCircle, Clock, Beaker, FileText, ArrowLeft, Home } from 'lucide-react'

export default function ConsultationSuccessPage() {
  const brand = getBrand()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-12">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 border-2"
            style={{ 
              backgroundColor: `${brand.colors.primary}20`,
              borderColor: brand.colors.primary
            }}>
            <CheckCircle className="w-10 h-10" style={{ color: brand.colors.primary }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: brand.colors.primary }}>
            Assessment Complete
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Thank you for completing your health assessment. Our medical team will review your information.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: brand.colors.primary }}>What Happens Next</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ 
                  backgroundColor: brand.colors.primary,
                  color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                }}>
                1
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" style={{ color: brand.colors.primary }} />
                  Medical Review
                </h3>
                <p className="text-white/70">
                  A licensed physician will review your assessment within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ 
                  backgroundColor: brand.colors.primary,
                  color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                }}>
                2
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Beaker className="w-5 h-5" style={{ color: brand.colors.primary }} />
                  Lab Recommendations
                </h3>
                <p className="text-white/70">
                  We will provide specific lab tests if appropriate for your case.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ 
                  backgroundColor: brand.colors.primary,
                  color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                }}>
                3
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" style={{ color: brand.colors.primary }} />
                  Treatment Plan
                </h3>
                <p className="text-white/70">
                  Personalized optimization protocol based on your assessment and labs.
                </p>
              </div>
            </div>
          </div>
        </div>

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
            className="px-8 py-4 rounded-lg font-bold transition-all duration-300 flex items-center gap-2"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
              color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
            }}
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </div>

      </div>
    </div>
  )
}

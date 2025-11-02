import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Clock, Shield, Users, CheckCircle } from 'lucide-react'

export default function ConsultationPage() {
  const brand = getBrand()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12 pt-20">
          <h1 className="text-5xl font-black mb-6">
            Start Your <span style={{ color: brand.colors.primary }}>Optimization</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Complete a comprehensive health assessment with our licensed medical team. 
            Get personalized treatment recommendations in 24-48 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] transition-all duration-300">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${brand.colors.primary}10` }}
            >
              <Users className="w-7 h-7" style={{ color: brand.colors.primary }} />
            </div>
            <h3 className="text-xl font-bold mb-2">Medical Assessment</h3>
            <p className="text-white/60 text-sm leading-relaxed">Comprehensive health questionnaire and goals evaluation</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] transition-all duration-300">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${brand.colors.primary}10` }}
            >
              <Shield className="w-7 h-7" style={{ color: brand.colors.primary }} />
            </div>
            <h3 className="text-xl font-bold mb-2">Doctor Review</h3>
            <p className="text-white/60 text-sm leading-relaxed">Licensed physician analyzes your profile and lab recommendations</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] transition-all duration-300">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${brand.colors.primary}10` }}
            >
              <Clock className="w-7 h-7" style={{ color: brand.colors.primary }} />
            </div>
            <h3 className="text-xl font-bold mb-2">Treatment Plan</h3>
            <p className="text-white/60 text-sm leading-relaxed">Personalized protocol delivered with ongoing monitoring</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: brand.colors.primary }}>
            Your Consultation Includes:
          </h2>
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
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: brand.colors.primary }} />
                <span className="text-white/60">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="backdrop-blur-sm rounded-2xl p-8 mb-12 text-center border"
          style={{ 
            background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
            borderColor: `${brand.colors.primary}20`
          }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: brand.colors.primary }}>
            Free Health Assessment
          </h2>
          <p className="text-white/70 mb-6 text-lg">
            Get personalized recommendations from our licensed medical team at no cost
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-white/60">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" style={{ color: brand.colors.primary }} />
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" style={{ color: brand.colors.primary }} />
              Licensed Providers
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" style={{ color: brand.colors.primary }} />
              24-48h Response
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/consultation/intake"
            className="inline-flex items-center px-12 py-4 rounded-lg text-xl font-bold hover:opacity-90 transition-all transform hover:scale-105"
            style={{ 
              background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
              color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
            }}
          >
            Begin Free Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
          <p className="text-white/50 mt-4 text-sm">
            Takes 10-15 minutes • No credit card required • 100% confidential
          </p>
        </div>
      </div>
    </div>
  )
}

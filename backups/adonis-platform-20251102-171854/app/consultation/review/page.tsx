'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { 
  ArrowLeft, CheckCircle, User, Target, Heart, Activity,
  Pill, Dumbbell, Send, Loader2
} from 'lucide-react'

export default function ReviewPage() {
  const router = useRouter()
  const brand = getBrand()
  const [consultationData, setConsultationData] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const data = sessionStorage.getItem('consultationData')
    if (!data) {
      router.push('/consultation/intake')
      return
    }
    setConsultationData(JSON.parse(data))
  }, [router])

  const handleSubmit = async () => {
    if (!consultationData) return
    
    setSubmitting(true)
    
    try {
      const response = await fetch('/api/consultations/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultationData)
      })
      
      if (response.ok) {
        sessionStorage.removeItem('consultationData')
        router.push('/consultation/success')
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting consultation:', error)
      alert('Failed to submit consultation. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!consultationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: brand.colors.primary, borderTopColor: 'transparent' }}></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        <div className="mb-12">
          <Link href="/consultation/medical-history" className="inline-flex items-center gap-2 mb-8 text-white/60 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Medical History
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Review Your <span style={{ color: brand.colors.primary }}>Information</span>
          </h1>
          <p className="text-xl text-white/60">Please review your details before submitting</p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold" style={{ color: brand.colors.primary }}>Step 3 of 3</span>
            <span className="text-sm text-white/50">Review & Submit</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="h-2 rounded-full transition-all duration-300" style={{width: '100%', backgroundColor: brand.colors.primary}}></div>
          </div>
        </div>

        <div className="space-y-8">
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <User className="w-6 h-6" style={{ color: brand.colors.primary }} />
                Personal Information
              </h2>
              <Link
                href="/consultation/intake"
                className="text-sm font-semibold transition"
                style={{ color: brand.colors.primary }}
              >
                Edit
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-white/50 mb-1">Name</div>
                <div className="text-white font-medium">{consultationData.firstName} {consultationData.lastName}</div>
              </div>
              <div>
                <div className="text-white/50 mb-1">Email</div>
                <div className="text-white font-medium">{consultationData.email}</div>
              </div>
              {consultationData.phone && (
                <div>
                  <div className="text-white/50 mb-1">Phone</div>
                  <div className="text-white font-medium">{consultationData.phone}</div>
                </div>
              )}
              <div>
                <div className="text-white/50 mb-1">Date of Birth</div>
                <div className="text-white font-medium">{new Date(consultationData.dateOfBirth).toLocaleDateString()}</div>
              </div>
              {consultationData.height && (
                <div>
                  <div className="text-white/50 mb-1">Height</div>
                  <div className="text-white font-medium">{consultationData.height} inches</div>
                </div>
              )}
              {consultationData.weight && (
                <div>
                  <div className="text-white/50 mb-1">Weight</div>
                  <div className="text-white font-medium">{consultationData.weight} lbs</div>
                </div>
              )}
              {consultationData.occupation && (
                <div>
                  <div className="text-white/50 mb-1">Occupation</div>
                  <div className="text-white font-medium">{consultationData.occupation}</div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Target className="w-6 h-6" style={{ color: brand.colors.primary }} />
                Optimization Goals
              </h2>
              <Link
                href="/consultation/intake"
                className="text-sm font-semibold transition"
                style={{ color: brand.colors.primary }}
              >
                Edit
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {consultationData.optimizationGoals.map((goal: string, idx: number) => (
                <span 
                  key={idx}
                  className="px-4 py-2 rounded-lg font-medium border"
                  style={{ 
                    backgroundColor: `${brand.colors.primary}10`,
                    borderColor: `${brand.colors.primary}30`,
                    color: brand.colors.primary
                  }}
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>

          {consultationData.medicalConditions && consultationData.medicalConditions.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Heart className="w-6 h-6" style={{ color: brand.colors.primary }} />
                  Medical Conditions
                </h2>
                <Link
                  href="/consultation/medical-history"
                  className="text-sm font-semibold transition"
                  style={{ color: brand.colors.primary }}
                >
                  Edit
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {consultationData.medicalConditions.map((condition: string, idx: number) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          )}

          {consultationData.symptoms && consultationData.symptoms.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Activity className="w-6 h-6" style={{ color: brand.colors.primary }} />
                  Current Symptoms
                </h2>
                <Link
                  href="/consultation/medical-history"
                  className="text-sm font-semibold transition"
                  style={{ color: brand.colors.primary }}
                >
                  Edit
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {consultationData.symptoms.map((symptom: string, idx: number) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(consultationData.currentMedications || consultationData.allergies) && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Pill className="w-6 h-6" style={{ color: brand.colors.primary }} />
                  Medications & Allergies
                </h2>
                <Link
                  href="/consultation/medical-history"
                  className="text-sm font-semibold transition"
                  style={{ color: brand.colors.primary }}
                >
                  Edit
                </Link>
              </div>
              
              <div className="space-y-4 text-sm">
                {consultationData.currentMedications && (
                  <div>
                    <div className="text-white/50 mb-2">Current Medications:</div>
                    <div className="text-white/80 bg-white/5 rounded-lg p-4">{consultationData.currentMedications}</div>
                  </div>
                )}
                {consultationData.allergies && (
                  <div>
                    <div className="text-white/50 mb-2">Allergies:</div>
                    <div className="text-white/80 bg-white/5 rounded-lg p-4">{consultationData.allergies}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {consultationData.lifestyle && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Dumbbell className="w-6 h-6" style={{ color: brand.colors.primary }} />
                  Lifestyle
                </h2>
                <Link
                  href="/consultation/medical-history"
                  className="text-sm font-semibold transition"
                  style={{ color: brand.colors.primary }}
                >
                  Edit
                </Link>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                {consultationData.lifestyle.exerciseFrequency && (
                  <div>
                    <div className="text-white/50 mb-1">Exercise</div>
                    <div className="text-white font-medium">{consultationData.lifestyle.exerciseFrequency}</div>
                  </div>
                )}
                {consultationData.lifestyle.sleepHours && (
                  <div>
                    <div className="text-white/50 mb-1">Sleep</div>
                    <div className="text-white font-medium">{consultationData.lifestyle.sleepHours} hours</div>
                  </div>
                )}
                {consultationData.lifestyle.stressLevel && (
                  <div>
                    <div className="text-white/50 mb-1">Stress Level</div>
                    <div className="text-white font-medium capitalize">{consultationData.lifestyle.stressLevel}</div>
                  </div>
                )}
                {consultationData.lifestyle.alcohol && (
                  <div>
                    <div className="text-white/50 mb-1">Alcohol</div>
                    <div className="text-white font-medium capitalize">{consultationData.lifestyle.alcohol}</div>
                  </div>
                )}
                {consultationData.lifestyle.smoking && (
                  <div>
                    <div className="text-white/50 mb-1">Smoking</div>
                    <div className="text-white font-medium capitalize">{consultationData.lifestyle.smoking}</div>
                  </div>
                )}
                {consultationData.lifestyle.diet && (
                  <div>
                    <div className="text-white/50 mb-1">Diet</div>
                    <div className="text-white font-medium capitalize">{consultationData.lifestyle.diet}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="backdrop-blur-sm rounded-2xl p-8 border"
            style={{ 
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
              borderColor: `${brand.colors.primary}20`
            }}>
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: brand.colors.primary }} />
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: brand.colors.primary }}>Ready to Submit?</h3>
                <p className="text-white/80 text-lg mb-4">
                  By submitting this assessment, you confirm that the information provided is accurate and complete.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Our medical team will review your submission within 24-48 hours and provide personalized recommendations. 
                  You'll receive a confirmation email at <strong style={{ color: brand.colors.primary }}>{consultationData.email}</strong>
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <Link
                href="/consultation/medical-history"
                className="flex items-center gap-2 text-white/60 hover:text-white transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
              
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-4 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                  color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Assessment
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

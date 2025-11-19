'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getBrand } from '@/lib/brand'
import { ArrowRight, ArrowLeft, Loader2, CheckCircle, User, Mail, Phone, Calendar, MapPin, Heart, Pill, Activity, Dumbbell } from 'lucide-react'

export default function ReviewPage() {
  const brand = getBrand()
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const data = sessionStorage.getItem('consultationData')
    if (!data) {
      router.push('/consultation/intake')
    } else {
      setFormData(JSON.parse(data))
    }
  }, [router])

  const handleSubmit = async () => {
    setSubmitting(true)
    
    try {
      // Send data as-is in camelCase - the submit endpoint expects camelCase
      const response = await fetch('/api/consultations/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        sessionStorage.removeItem('consultationData')
        router.push('/consultation/success')
      } else {
        const errorData = await response.json()
        console.error('Submission error:', errorData)
        alert('Failed to submit consultation: ' + (errorData.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit consultation')
    } finally {
      setSubmitting(false)
    }
  }

  const handleBack = () => {
    router.push('/consultation/medical-history')
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-12">
        
        <div className="mb-12">
          <button onClick={handleBack} className="inline-flex items-center gap-2 mb-8 text-white/60 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Medical History
          </button>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Review Your <span style={{ color: brand.colors.primary }}>Information</span>
          </h1>
          <p className="text-xl text-white/60">Please verify all details are correct</p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold" style={{ color: brand.colors.primary }}>Step 3 of 3</span>
            <span className="text-sm text-white/50">Final Review</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="h-2 rounded-full transition-all duration-300" style={{width: '100%', backgroundColor: brand.colors.primary}}></div>
          </div>
        </div>

        <div className="space-y-6">
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <User className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-white/50 mb-1">Full Name</p>
                <p className="text-lg">{formData.firstName} {formData.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Email</p>
                <p className="text-lg">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Phone</p>
                <p className="text-lg">{formData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Date of Birth</p>
                <p className="text-lg">{formData.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Address</p>
                <p className="text-lg">{formData.address}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">City, State ZIP</p>
                <p className="text-lg">{formData.city}, {formData.state} {formData.zipCode}</p>
              </div>
            </div>
          </div>

          {formData.medicalConditions && formData.medicalConditions.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6" style={{ color: brand.colors.primary }} />
                Medical Conditions
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.medicalConditions.map((condition: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-white/10 rounded-lg text-sm">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          )}

          {formData.symptoms && formData.symptoms.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6" style={{ color: brand.colors.primary }} />
                Current Symptoms
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.symptoms.map((symptom: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-white/10 rounded-lg text-sm">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Pill className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Medications & Supplements
            </h2>
            <div className="space-y-4">
              {formData.currentMedications && (
                <div>
                  <p className="text-sm text-white/50 mb-2">Current Medications</p>
                  <p className="text-white/80 whitespace-pre-wrap">{formData.currentMedications || 'None'}</p>
                </div>
              )}
              {formData.currentSupplements && (
                <div>
                  <p className="text-sm text-white/50 mb-2">Current Supplements</p>
                  <p className="text-white/80 whitespace-pre-wrap">{formData.currentSupplements || 'None'}</p>
                </div>
              )}
              {formData.allergies && (
                <div>
                  <p className="text-sm text-white/50 mb-2">Allergies</p>
                  <p className="text-white/80 whitespace-pre-wrap">{formData.allergies || 'None'}</p>
                </div>
              )}
            </div>
          </div>

          {formData.lab_files && formData.lab_files.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6" style={{ color: brand.colors.primary }} />
                Uploaded Lab Results
              </h2>
              <div className="space-y-2">
                {formData.lab_files.map((url: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Lab file {idx + 1} uploaded successfully</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Dumbbell className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Lifestyle
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-white/50 mb-1">Exercise Frequency</p>
                <p className="text-lg">{formData.lifestyle?.exerciseFrequency || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Sleep Hours</p>
                <p className="text-lg">{formData.lifestyle?.sleepHours || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Stress Level</p>
                <p className="text-lg">{formData.lifestyle?.stressLevel || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Alcohol Consumption</p>
                <p className="text-lg">{formData.lifestyle?.alcohol || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Smoking Status</p>
                <p className="text-lg">{formData.lifestyle?.smoking || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Diet Type</p>
                <p className="text-lg">{formData.lifestyle?.diet || 'Not specified'}</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-between items-center pt-8">
          <button
            type="button"
            onClick={handleBack}
            disabled={submitting}
            className="flex items-center gap-2 text-white/60 hover:text-white transition disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-8 py-4 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
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
                Submit Consultation
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}

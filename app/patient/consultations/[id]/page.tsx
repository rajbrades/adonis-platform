'use client'

import { use, useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, FileText, AlertCircle, User, Calendar, Activity, Pill, Loader2 } from 'lucide-react'

interface Consultation {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  age: number
  height: string
  weight: string
  occupation: string
  status: string
  optimization_goals: string[]
  primary_concerns: string
  current_medications: string
  allergies: string
  medical_conditions: string[]
  surgeries: string
  family_history: string
  previous_hormone_therapy: string
  labs_recent: string
  exercise_frequency: string
  sleep_hours: string
  stress_level: string
  alcohol_consumption: string
  smoking: string
  diet: string
  symptoms: string[]
  created_at: string
  reviewed_at?: string
  provider_notes?: string
  recommended_labs?: Array<{
    id: string
    name: string
    description: string
    price: number
  }>
  reviewed_by?: string
}

export default function ConsultationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { user, isLoaded } = useUser()
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isLoaded && user) {
      fetchConsultation()
    }
  }, [isLoaded, user, resolvedParams.id])

  const fetchConsultation = async () => {
    try {
      const response = await fetch('/api/patient/consultations')
      const data = await response.json()
      
      const found = data.find((c: Consultation) => c.id === resolvedParams.id)
      
      if (found) {
        setConsultation(found)
      } else {
        setError('Consultation not found')
      }
    } catch (err) {
      console.error('Error fetching consultation:', err)
      setError('Failed to load consultation')
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    )
  }

  if (error || !consultation) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="bg-black border-b border-yellow-500/20">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-black text-yellow-400">ADONIS</Link>
            <UserButton afterSignOutUrl="/" />
          </nav>
        </header>
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">{error || 'Consultation not found'}</h1>
          <Link href="/patient" className="text-yellow-400 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const totalLabCost = consultation.recommended_labs?.reduce((sum, lab) => sum + lab.price, 0) || 0

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-yellow-400">ADONIS</Link>
          <div className="flex items-center gap-4">
            <span className="text-white/80">Welcome, {user?.firstName}</span>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link href="/patient" className="inline-flex items-center text-white/70 hover:text-yellow-400 transition-colors mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Consultation Details</h1>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              consultation.status === 'pending' 
                ? 'bg-yellow-500/20 text-yellow-400' 
                : 'bg-green-500/20 text-green-400'
            }`}>
              {consultation.status.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Submitted: {new Date(consultation.created_at).toLocaleDateString()}
            </div>
            {consultation.reviewed_at && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Reviewed: {new Date(consultation.reviewed_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Status Alert */}
        {consultation.status === 'pending' && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-400">Review in Progress</p>
                <p className="text-sm text-white/70 mt-1">
                  Our medical team is reviewing your consultation. You'll receive an email with personalized recommendations soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Provider Notes & Recommended Labs */}
        {consultation.status === 'approved' && consultation.recommended_labs && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Provider Notes */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-yellow-400" />
                Provider Recommendations
              </h2>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/90 whitespace-pre-wrap">{consultation.provider_notes}</p>
              </div>
              {consultation.reviewed_by && (
                <p className="text-sm text-white/60 mt-3">— {consultation.reviewed_by}</p>
              )}
            </div>

            {/* Recommended Labs Summary */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-yellow-400" />
                Recommended Lab Panels
              </h2>
              <div className="space-y-3 mb-4">
                {consultation.recommended_labs.map((lab) => (
                  <div key={lab.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{lab.name}</h3>
                      <span className="text-yellow-400 font-bold">${lab.price}</span>
                    </div>
                    <p className="text-sm text-white/70">{lab.description}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total Investment:</span>
                  <span className="text-2xl font-bold text-yellow-400">${totalLabCost}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                  Order Lab Panels
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-yellow-400" />
            Personal Information
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Name</p>
              <p className="font-semibold">{consultation.first_name} {consultation.last_name}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Age</p>
              <p className="font-semibold">{consultation.age} years</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Occupation</p>
              <p className="font-semibold">{consultation.occupation}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Height</p>
              <p className="font-semibold">{consultation.height}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Weight</p>
              <p className="font-semibold">{consultation.weight}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Phone</p>
              <p className="font-semibold">{consultation.phone}</p>
            </div>
          </div>
        </div>

        {/* Health Goals */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-yellow-400" />
            Optimization Goals
          </h2>
          <div className="flex flex-wrap gap-2">
            {consultation.optimization_goals.map((goal, index) => (
              <span key={index} className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-sm font-medium">
                {goal}
              </span>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        {consultation.symptoms && consultation.symptoms.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
              Current Symptoms
            </h2>
            <div className="flex flex-wrap gap-2">
              {consultation.symptoms.map((symptom, index) => (
                <span key={index} className="px-4 py-2 bg-red-400/10 border border-red-400/20 rounded-full text-sm">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Medical History */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Pill className="w-5 h-5 mr-2 text-blue-400" />
            Medical History
          </h2>
          <div className="space-y-4">
            {consultation.medical_conditions && consultation.medical_conditions.length > 0 && (
              <div>
                <p className="text-white/60 text-sm mb-2">Medical Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {consultation.medical_conditions.map((condition, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-400/10 border border-blue-400/20 rounded-full text-sm">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {consultation.current_medications && (
              <div>
                <p className="text-white/60 text-sm mb-1">Current Medications</p>
                <p className="text-white/90">{consultation.current_medications}</p>
              </div>
            )}
            {consultation.allergies && (
              <div>
                <p className="text-white/60 text-sm mb-1">Allergies</p>
                <p className="text-white/90">{consultation.allergies}</p>
              </div>
            )}
            {consultation.surgeries && (
              <div>
                <p className="text-white/60 text-sm mb-1">Past Surgeries</p>
                <p className="text-white/90">{consultation.surgeries}</p>
              </div>
            )}
            {consultation.family_history && (
              <div>
                <p className="text-white/60 text-sm mb-1">Family History</p>
                <p className="text-white/90">{consultation.family_history}</p>
              </div>
            )}
          </div>
        </div>

        {/* Lifestyle Factors */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-400" />
            Lifestyle Factors
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Exercise Frequency</p>
              <p className="font-semibold">{consultation.exercise_frequency}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Sleep Hours</p>
              <p className="font-semibold">{consultation.sleep_hours}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Stress Level</p>
              <p className="font-semibold">{consultation.stress_level}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Alcohol Consumption</p>
              <p className="font-semibold">{consultation.alcohol_consumption}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Smoking Status</p>
              <p className="font-semibold">{consultation.smoking}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Diet</p>
              <p className="font-semibold">{consultation.diet}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'

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
  optimization_goals: string[]
  symptoms: string[]
  medical_conditions: string[]
  current_medications: string
  allergies: string
  surgeries: string
  family_history: string
  exercise_frequency: string
  sleep_hours: string
  stress_level: string
  alcohol_consumption: string
  smoking: string
  diet: string
  status: string
  created_at: string
}

interface LabPanel {
  id: string
  name: string
  description: string
  price: number
  biomarker_count: number
  category: string
  slug: string
}

export default function ApproveConsultationPage() {
  const params = useParams()
  const router = useRouter()
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [labPanels, setLabPanels] = useState<LabPanel[]>([])
  const [selectedLabs, setSelectedLabs] = useState<string[]>([])
  const [providerNotes, setProviderNotes] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchConsultation()
    fetchLabPanels()
  }, [params.id])

  const fetchConsultation = async () => {
    try {
      const response = await fetch(`/api/consultations/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setConsultation(data)
      }
    } catch (error) {
      console.error('Error fetching consultation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLabPanels = async () => {
    try {
      const response = await fetch('/api/lab-panels')
      if (response.ok) {
        const data = await response.json()
        setLabPanels(data)
      }
    } catch (error) {
      console.error('Error fetching lab panels:', error)
    }
  }

  const toggleLab = (labId: string) => {
    setSelectedLabs(prev =>
      prev.includes(labId)
        ? prev.filter(id => id !== labId)
        : [...prev, labId]
    )
  }

  const handleApprove = async () => {
    if (selectedLabs.length === 0) {
      alert('Please select at least one lab panel')
      return
    }

    setIsSubmitting(true)

    try {
      const selectedLabDetails = labPanels.filter(lab => selectedLabs.includes(lab.id))

      const response = await fetch(`/api/consultations/${params.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'approved',
          provider_notes: providerNotes,
          recommended_labs: selectedLabDetails,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to approve consultation')
      }

      alert('✅ Consultation approved and patient notified via email!')
      router.push('/provider')
    } catch (error: any) {
      console.error('Approval error:', error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    )
  }

  if (!consultation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
        <p>Consultation not found</p>
      </div>
    )
  }

  const totalCost = labPanels
    .filter(lab => selectedLabs.includes(lab.id))
    .reduce((sum, lab) => sum + lab.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link
          href="/provider"
          className="inline-flex items-center text-white/60 hover:text-yellow-500 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">
            <span className="text-yellow-500">Review</span> Consultation
          </h1>
          <p className="text-white/60">Patient: {consultation.first_name} {consultation.last_name}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Patient Info */}
          <div>
            {/* Patient Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Patient Information</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-white/60 mb-1">Name:</div>
                  <div className="font-semibold">{consultation.first_name} {consultation.last_name}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Email:</div>
                  <div className="font-semibold">{consultation.email}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Phone:</div>
                  <div className="font-semibold">{consultation.phone}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Date of Birth:</div>
                  <div className="font-semibold">{consultation.date_of_birth}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Height:</div>
                  <div className="font-semibold">{consultation.height} inches</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Weight:</div>
                  <div className="font-semibold">{consultation.weight} lbs</div>
                </div>
              </div>
            </div>

            {/* Health Goals & Symptoms */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Health Goals & Symptoms</h2>
              
              <div className="mb-4">
                <div className="text-sm text-white/60 mb-2">Optimization Goals:</div>
                <div className="flex flex-wrap gap-2">
                  {consultation.optimization_goals.map((goal, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-white/60 mb-2">Symptoms:</div>
                <div className="flex flex-wrap gap-2">
                  {consultation.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Lab Selection & Approval */}
          <div>
            {/* Recommended Lab Panels */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Recommended Lab Panels</h2>
              
              {labPanels.length === 0 ? (
                <p className="text-white/60">Loading lab panels...</p>
              ) : (
                <div className="space-y-3 mb-6">
                  {labPanels.map((panel) => (
                    <label
                      key={panel.id}
                      className="flex items-start gap-3 p-4 rounded-lg border border-white/10 hover:border-yellow-500/50 cursor-pointer transition-all bg-white/5"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLabs.includes(panel.id)}
                        onChange={() => toggleLab(panel.id)}
                        className="mt-1 w-4 h-4 accent-yellow-500"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-white">{panel.name}</div>
                        <div className="text-xs text-white/60 mt-1">{panel.description}</div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-yellow-500 font-bold">${panel.price}</span>
                          <span className="text-xs text-white/50">• {panel.biomarker_count} biomarkers</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {selectedLabs.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Total Cost:</span>
                    <span className="text-2xl font-bold text-yellow-500">${totalCost}</span>
                  </div>
                  <div className="text-xs text-white/60 mt-1">
                    {selectedLabs.length} panel{selectedLabs.length !== 1 ? 's' : ''} selected
                  </div>
                </div>
              )}

              {/* Provider Notes */}
              <div className="mt-6">
                <label className="block text-sm font-semibold mb-2">Provider Notes</label>
                <textarea
                  value={providerNotes}
                  onChange={(e) => setProviderNotes(e.target.value)}
                  placeholder="Add any notes or recommendations..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleApprove}
                disabled={isSubmitting || selectedLabs.length === 0}
                className="w-full px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Approve & Send Labs
                  </>
                )}
              </button>

              <button
                onClick={() => router.push('/provider')}
                className="w-full px-6 py-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-lg transition-all border border-red-500/30"
              >
                Reject Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

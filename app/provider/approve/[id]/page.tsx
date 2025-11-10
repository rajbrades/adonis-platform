'use client'

import { getTenantConfig } from '@/lib/tenant-config'
const tenant = getTenantConfig()

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import AIAnalysis from './AIAnalysis'

interface LabPanel {
  id: string
  name: string
  slug: string
  description: string
  price: number
  biomarker_count: number
}

export default function ApprovalPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [consultation, setConsultation] = useState<any>(null)
  const [labPanels, setLabPanels] = useState<LabPanel[]>([])
  const [selectedLabs, setSelectedLabs] = useState<string[]>([])
  const [providerNotes, setProviderNotes] = useState('')
  const [labResults, setLabResults] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch consultation - API returns array directly
      const consultationRes = await fetch('/api/consultations')
      const consultationData = await consultationRes.json()
      const foundConsultation = Array.isArray(consultationData) 
        ? consultationData.find((c: any) => c.id === resolvedParams.id)
        : null
      
      if (!foundConsultation) {
        console.error('Consultation not found:', resolvedParams.id)
      }
      setConsultation(foundConsultation)

      // Fetch lab panels
      const response = await fetch('/api/lab-panels')
      const panels = await response.json()
      setLabPanels(Array.isArray(panels) ? panels : [])

      // Try to fetch lab results (may not exist yet)
      try {
        const labsRes = await fetch(`/api/patients/${resolvedParams.id}/labs`)
        if (labsRes.ok) {
          const labs = await labsRes.json()
          setLabResults(labs)
        }
      } catch {
        console.log('No lab results found - patient can still use initial assessment')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
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
      const selectedPanels = labPanels.filter(panel => selectedLabs.includes(panel.id))
      
      const response = await fetch('/api/consultations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: resolvedParams.id,
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: 'Provider',
          provider_notes: providerNotes,
          recommended_labs: {
            tests: selectedPanels.map(p => p.name),
            panel_name: selectedPanels.length === 1 ? selectedPanels[0].name : 'Custom Panel'
          }
        })
      })

      if (!response.ok) throw new Error('Failed to approve consultation')

      // TODO: Send email notification to patient
      
      alert('Consultation approved! Patient will receive an email with lab recommendations.')
      router.push('/provider')
    } catch (error) {
      console.error('Error approving consultation:', error)
      alert('Failed to approve consultation. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!confirm('Are you sure you want to reject this consultation?')) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/consultations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: resolvedParams.id,
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: 'Provider',
          provider_notes: providerNotes
        })
      })

      if (!response.ok) throw new Error('Failed to reject consultation')

      alert('Consultation rejected.')
      router.push('/provider')
    } catch (error) {
      console.error('Error rejecting consultation:', error)
      alert('Failed to reject consultation. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  if (!consultation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Consultation not found</p>
          <Link href="/provider" className="text-yellow-500 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link 
          href="/provider"
          className="inline-flex items-center text-white/60 hover:text-yellow-500 transition mb-8"
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Patient Information</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Name:</span>
                  <p className="font-semibold">{consultation.first_name} {consultation.last_name}</p>
                </div>
                <div>
                  <span className="text-white/60">Email:</span>
                  <p className="font-semibold">{consultation.email}</p>
                </div>
                <div>
                  <span className="text-white/60">Phone:</span>
                  <p className="font-semibold">{consultation.phone}</p>
                </div>
                <div>
                  <span className="text-white/60">Date of Birth:</span>
                  <p className="font-semibold">{new Date(consultation.date_of_birth).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-white/60">Height:</span>
                  <p className="font-semibold">{consultation.height} inches</p>
                </div>
                <div>
                  <span className="text-white/60">Weight:</span>
                  <p className="font-semibold">{consultation.weight} lbs</p>
                </div>
              </div>
            </div>

            {/* Health Goals & Symptoms */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Health Goals & Symptoms</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-white/60">Optimization Goals:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {consultation.optimization_goals?.map((goal: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-white/60">Symptoms:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {consultation.symptoms?.map((symptom: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Medical History</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-white/60">Current Medications:</span>
                  <p className="mt-1">{consultation.current_medications || 'None'}</p>
                </div>
                <div>
                  <span className="text-white/60">Allergies:</span>
                  <p className="mt-1">{consultation.allergies || 'None'}</p>
                </div>
                <div>
                  <span className="text-white/60">Medical Conditions:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {consultation.medical_conditions?.map((condition: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-white/60">Previous Surgeries:</span>
                  <p className="mt-1">{consultation.surgeries || 'None'}</p>
                </div>
                <div>
                  <span className="text-white/60">Family History:</span>
                  <p className="mt-1">{consultation.family_history || 'None'}</p>
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            {consultation.lifestyle && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Lifestyle</h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Exercise:</span>
                    <p className="mt-1 capitalize">{consultation.lifestyle.exerciseFrequency}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Sleep:</span>
                    <p className="mt-1">{consultation.lifestyle.sleepHours} hours</p>
                  </div>
                  <div>
                    <span className="text-white/60">Diet:</span>
                    <p className="mt-1 capitalize">{consultation.lifestyle.diet}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Stress Level:</span>
                    <p className="mt-1 capitalize">{consultation.lifestyle.stressLevel}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Alcohol:</span>
                    <p className="mt-1 capitalize">{consultation.lifestyle.alcohol}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Smoking:</span>
                    <p className="mt-1 capitalize">{consultation.lifestyle.smoking}</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Analysis */}
            {labResults && (
              <AIAnalysis 
                consultation={consultation}
                labResults={labResults}
              />
            )}
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Lab Panel Selection */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Recommended Lab Panels</h2>
              
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {labPanels.map((panel) => (
                  <label
                    key={panel.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-white/10 hover:border-yellow-500/50 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLabs.includes(panel.id)}
                      onChange={() => toggleLab(panel.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{panel.name}</div>
                      <div className="text-xs text-white/60 mt-1">{panel.description}</div>
                      <div className="text-xs text-yellow-500 mt-2">
                        ${panel.price} • {panel.biomarker_count} biomarkers
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Provider Notes */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Provider Notes</label>
                <textarea
                  value={providerNotes}
                  onChange={(e) => setProviderNotes(e.target.value)}
                  placeholder="Add any notes or recommendations..."
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleApprove}
                  disabled={isSubmitting || selectedLabs.length === 0}
                  className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  onClick={handleReject}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

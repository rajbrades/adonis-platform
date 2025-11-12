'use client'
import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'

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
  const [selectedPanels, setSelectedPanels] = useState<string[]>([])
  const [providerNotes, setProviderNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [resolvedParams.id])

  const fetchData = async () => {
    try {
      setLoading(true)
      const consultationRes = await fetch(`/api/consultations`)
      const allConsultations = await consultationRes.json()
      const foundConsultation = allConsultations.find((c: any) => c.id === resolvedParams.id)
      setConsultation(foundConsultation)

      // Fetch available lab panels
      const response = await fetch('/api/lab-panels')
      const panels = await response.json()
      setLabPanels(panels)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePanelSelection = (panelId: string) => {
    setSelectedPanels(prev =>
      prev.includes(panelId)
        ? prev.filter(id => id !== panelId)
        : [...prev, panelId]
    )
  }

  const handleApprove = async () => {
    if (selectedPanels.length === 0) {
      alert('Please select at least one lab panel to recommend')
      return
    }

    try {
      setSubmitting(true)

      // Get full panel details for selected panels
      const recommendedPanels = labPanels
        .filter(panel => selectedPanels.includes(panel.id))
        .map(panel => ({
          id: panel.id,
          name: panel.name,
          slug: panel.slug,
          price: panel.price
        }))

      // Calculate total price
      const totalPrice = recommendedPanels.reduce((sum, panel) => sum + panel.price, 0)

      const response = await fetch(`/api/consultations/${resolvedParams.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider_notes: providerNotes,
          recommended_lab_panels: recommendedPanels,
          total_price: totalPrice
        })
      })

      if (response.ok) {
        router.push('/provider')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error approving consultation:', error)
      alert('Failed to approve consultation')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </div>
    )
  }

  if (!consultation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Consultation Not Found</h1>
          <Link href="/provider" className="text-yellow-400 hover:text-yellow-300">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const selectedPanelsDetails = labPanels.filter(panel => selectedPanels.includes(panel.id))
  const totalPrice = selectedPanelsDetails.reduce((sum, panel) => sum + panel.price, 0)
  const totalBiomarkers = selectedPanelsDetails.reduce((sum, panel) => sum + panel.biomarker_count, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/provider"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">Review Consultation</h1>
          <p className="text-gray-400">Assess patient information and recommend lab panels</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Patient Information */}
          <div className="space-y-6">
            {/* Patient Details */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Patient Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Name</label>
                  <p className="text-lg">{consultation.first_name} {consultation.last_name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Date of Birth</label>
                  <p className="text-lg">{consultation.date_of_birth}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-lg">{consultation.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <p className="text-lg">{consultation.phone || 'Not provided'}</p>
                </div>
                {consultation.height && consultation.weight && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400">Height</label>
                      <p className="text-lg">{consultation.height}"</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Weight</label>
                      <p className="text-lg">{consultation.weight} lbs</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Health Goals */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Optimization Goals</h2>
              <div className="space-y-4">
                {consultation.optimization_goals?.map((goal: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            {consultation.symptoms && consultation.symptoms.length > 0 && (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">Current Symptoms</h2>
                <div className="space-y-4">
                  {consultation.symptoms.map((symptom: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medical History */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Medical History</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Medical Conditions</label>
                  <p>{consultation.medical_conditions?.join(', ') || 'None reported'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Current Medications</label>
                  <p>{consultation.current_medications || 'None reported'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Allergies</label>
                  <p>{consultation.allergies || 'None reported'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Lab Panel Selection & Notes */}
          <div className="space-y-6">
            {/* Lab Panel Selection */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Recommend Lab Panels</h2>
              
              {labPanels.length === 0 ? (
                <p className="text-gray-400">No lab panels available</p>
              ) : (
                <div className="space-y-3">
                  {labPanels.map((panel) => (
                    <label
                      key={panel.id}
                      className="flex items-start p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPanels.includes(panel.id)}
                        onChange={() => togglePanelSelection(panel.id)}
                        className="mt-1 mr-3 w-5 h-5 rounded border-white/20 bg-white/10 text-yellow-400 focus:ring-yellow-400"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{panel.name}</div>
                        <p className="text-sm text-gray-400 mt-1">{panel.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-yellow-400 font-semibold">${panel.price}</span>
                          <span className="text-gray-400">{panel.biomarker_count} biomarkers</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Selection Summary */}
              {selectedPanels.length > 0 && (
                <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                  <h3 className="font-semibold text-yellow-400 mb-2">Selected Panels Summary</h3>
                  <div className="flex justify-between text-sm">
                    <span>{selectedPanels.length} panel(s) selected</span>
                    <span>{totalBiomarkers} total biomarkers</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-yellow-400/20 flex justify-between font-bold">
                    <span>Total Price:</span>
                    <span className="text-yellow-400">${totalPrice}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Provider Notes */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Provider Notes</h2>
              <textarea
                value={providerNotes}
                onChange={(e) => setProviderNotes(e.target.value)}
                placeholder="Add clinical notes, recommendations, or special instructions..."
                className="w-full h-40 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 resize-none"
              />
            </div>

            {/* Approve Button */}
            <button
              onClick={handleApprove}
              disabled={submitting || selectedPanels.length === 0}
              className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Approving...
                </>
              ) : (
                'Approve & Send Lab Recommendations'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'
import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, Loader2, User, Calendar, Ruler, Weight, AlertTriangle, Pill, Activity, FileText, ExternalLink } from 'lucide-react'

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

      const recommendedLabs = labPanels
        .filter(panel => selectedPanels.includes(panel.id))
        .map(panel => ({
          id: panel.id,
          name: panel.name,
          slug: panel.slug,
          description: panel.description,
          price: panel.price
        }))

      const response = await fetch(`/api/consultations/${resolvedParams.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recommendedLabs,
          providerNotes,
          providerName: 'Dr. Provider'
        })
      })

      if (response.ok) {
        router.push('/provider')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error || 'Failed to approve consultation'}`)
      }
    } catch (error) {
      console.error('Error approving consultation:', error)
      alert('Failed to approve consultation')
    } finally {
      setSubmitting(false)
    }
  }

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = (height * 2.54) / 100
    const weightInKg = weight * 0.453592
    return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1)
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

  const age = consultation.date_of_birth ? calculateAge(consultation.date_of_birth) : null
  const bmi = consultation.height && consultation.weight ? calculateBMI(consultation.weight, consultation.height) : null

  const redFlagConditions = ['Heart Disease', 'Liver Disease', 'Kidney Disease']
  const hasRedFlags = consultation.medical_conditions?.some((condition: string) => 
    redFlagConditions.includes(condition)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/provider"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{consultation.first_name} {consultation.last_name}</h1>
              <p className="text-gray-400 mt-1">Review consultation and recommend lab panels</p>
            </div>
            <div className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <span className="text-yellow-400 font-semibold uppercase text-sm">Pending Review</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Age</div>
                <div className="text-xl font-bold">{age || 'N/A'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">BMI</div>
                <div className="text-xl font-bold">{bmi || 'N/A'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Ruler className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Height</div>
                <div className="text-xl font-bold">{consultation.height ? `${consultation.height}"` : 'N/A'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Weight className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Weight</div>
                <div className="text-xl font-bold">{consultation.weight ? `${consultation.weight} lbs` : 'N/A'}</div>
              </div>
            </div>
          </div>

          {hasRedFlags && (
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Clinical Alert: Review medical conditions carefully</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white">{consultation.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="text-white">{consultation.phone || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Date of Birth</div>
                  <div className="text-white">{consultation.date_of_birth}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Occupation</div>
                  <div className="text-white">{consultation.occupation || 'Not provided'}</div>
                </div>
              </div>
            </div>

            {consultation.lab_files && consultation.lab_files.length > 0 && (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Patient Uploaded Lab Results
                </h2>
                <div className="space-y-3">
                  {consultation.lab_files.map((fileUrl: string, index: number) => (
                    
                      key={index}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-yellow-400/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <div className="font-medium">Lab Results {index + 1}</div>
                          <div className="text-xs text-gray-400">PDF Document</div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Optimization Goals</h2>
              <div className="flex flex-wrap gap-2">
                {consultation.optimization_goals?.map((goal: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-lg text-sm font-medium"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>

            {consultation.symptoms && consultation.symptoms.length > 0 && (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 text-yellow-400">Current Symptoms</h2>
                <div className="flex flex-wrap gap-2">
                  {consultation.symptoms.map((symptom: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-red-500/10 text-red-300 border border-red-500/20 rounded-lg text-sm font-medium"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Medical History</h2>
              
              {consultation.medical_conditions && consultation.medical_conditions.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Medical Conditions</div>
                  <div className="flex flex-wrap gap-2">
                    {consultation.medical_conditions.map((condition: string, index: number) => {
                      const isRedFlag = redFlagConditions.includes(condition)
                      return (
                        <span
                          key={index}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                            isRedFlag
                              ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                              : 'bg-orange-500/10 text-orange-300 border border-orange-500/20'
                          }`}
                        >
                          {isRedFlag && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                          {condition}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-4 border-t border-white/10">
                {consultation.current_medications && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Current Medications
                    </div>
                    <div className="text-white pl-6">{consultation.current_medications}</div>
                  </div>
                )}

                {consultation.current_supplements && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Current Supplements
                    </div>
                    <div className="text-white pl-6">{consultation.current_supplements}</div>
                  </div>
                )}
                
                {consultation.allergies && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      Allergies
                    </div>
                    <div className="text-white pl-6">{consultation.allergies}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Recommend Lab Panels</h2>
              
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
                        <div className="font-semibold">{panel.name}</div>
                        <p className="text-xs text-gray-400 mt-1">{panel.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="text-yellow-400 font-semibold">${panel.price}</span>
                          <span className="text-gray-400">{panel.biomarker_count} biomarkers</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {selectedPanels.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{selectedPanels.length} panel(s)</span>
                    <span>{totalBiomarkers} biomarkers</span>
                  </div>
                  <div className="pt-2 border-t border-yellow-400/20 flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-yellow-400">${totalPrice}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Provider Notes</h2>
              <textarea
                value={providerNotes}
                onChange={(e) => setProviderNotes(e.target.value)}
                placeholder="Clinical notes, recommendations, or special instructions..."
                className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 resize-none"
              />
            </div>

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
                'Approve & Send Recommendations'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

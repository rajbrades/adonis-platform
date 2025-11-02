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
      // Fetch consultation
      const consultationRes = await fetch(`/api/consultations`)
      const consultationData = await consultationRes.json()
      const foundConsultation = [...consultationData.pending, ...consultationData.reviewed]
        .find((c: any) => c.id === resolvedParams.id)
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

    if (!providerNotes.trim()) {
      alert('Please add provider notes')
      return
    }

    setIsSubmitting(true)

    try {
      const recommendedLabs = labPanels
        .filter(lab => selectedLabs.includes(lab.id))
        .map(lab => ({
          id: lab.id,
          name: lab.name,
          description: lab.description,
          price: lab.price
        }))

      const response = await fetch(`/api/consultations/${resolvedParams.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recommendedLabs,
          providerNotes,
          providerName: 'Dr. Smith'
        })
      })

      if (!response.ok) throw new Error('Failed to approve consultation')

      alert('Consultation approved and patient notified!')
      router.push('/provider')
    } catch (error) {
      console.error('Approval error:', error)
      alert('Failed to approve consultation')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    )
  }

  if (!consultation) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/60">Consultation not found</p>
      </div>
    )
  }

  const totalPrice = labPanels
    .filter(lab => selectedLabs.includes(lab.id))
    .reduce((sum, lab) => sum + lab.price, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/provider" className="text-2xl font-black text-yellow-400">
            {tenant.name}
          </Link>
          <div className="text-white/60">Provider Portal</div>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href="/provider"
          className="inline-flex items-center text-white/70 hover:text-yellow-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Approve Consultation</h1>
          <p className="text-white/60">Review and recommend lab panels for {consultation.name}</p>
        </div>

        {/* Patient Summary */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">Patient Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-white/60 text-sm mb-1">Name</p>
              <p className="font-semibold">{consultation.name}</p>
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
              <p className="text-white/60 text-sm mb-1">Primary Goals</p>
              <p className="font-semibold">{consultation.goals.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* AI Clinical Analysis */}
        <AIAnalysis 
          consultation={consultation}
          labResults={labResults}
          onAnalysisComplete={(analysis) => {
            setProviderNotes(prev => 
              prev ? `${prev}\n\n## AI Clinical Analysis\n\n${analysis}` : `## AI Clinical Analysis\n\n${analysis}`
            )
          }}
        />

        {/* Lab Panels Selection */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">Select Recommended Lab Panels</h2>
          <div className="space-y-4">
            {labPanels.map((lab) => (
              <div
                key={lab.id}
                onClick={() => toggleLab(lab.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedLabs.includes(lab.id)
                    ? 'bg-yellow-400/10 border-yellow-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        selectedLabs.includes(lab.id)
                          ? 'bg-yellow-400 border-yellow-400'
                          : 'border-white/40'
                      }`}>
                        {selectedLabs.includes(lab.id) && (
                          <CheckCircle className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <h3 className="font-bold text-lg">{lab.name}</h3>
                    </div>
                    <p className="text-white/70 text-sm ml-8 mb-2">{lab.description}</p>
                    <div className="flex items-center ml-8 space-x-4 text-sm text-white/60">
                      <span>{lab.biomarker_count} biomarkers</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-yellow-400">${lab.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedLabs.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Investment:</span>
                <span className="text-2xl font-bold text-yellow-400">${totalPrice}</span>
              </div>
            </div>
          )}
        </div>

        {/* Provider Notes */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">Provider Notes</h2>
          <textarea
            value={providerNotes}
            onChange={(e) => setProviderNotes(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none h-32"
            placeholder="Enter your recommendations and treatment plan for this patient..."
            required
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            onClick={handleApprove}
            disabled={isSubmitting || selectedLabs.length === 0 || !providerNotes.trim()}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Approving...
              </>
            ) : (
              'Approve & Send to Patient'
            )}
          </button>
          <Link
            href="/provider"
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-bold hover:bg-white/10 transition-all text-center"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}

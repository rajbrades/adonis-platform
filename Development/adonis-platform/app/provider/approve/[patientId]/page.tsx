'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, CheckCircle, AlertTriangle, FileText, Mail, Phone, Calendar } from 'lucide-react'

interface LabTest {
  id: string
  name: string
  category: string
  description: string
  fasting: boolean
  cost: number
  turnaround: string
  recommended: boolean
}

export default function ApprovalPage({ params }: { params: { patientId: string } }) {
  const [selectedLabs, setSelectedLabs] = useState<string[]>([])
  const [treatmentPlan, setTreatmentPlan] = useState('')
  const [notes, setNotes] = useState('')
  const [followUpWeeks, setFollowUpWeeks] = useState('4')

  // Mock patient data - in real app would fetch by patientId
  const patient = {
    id: params.patientId,
    name: 'Michael Chen',
    age: 42,
    occupation: 'CEO, TechCorp',
    email: 'michael.chen@techcorp.com',
    phone: '(555) 123-4567',
    goals: ['Increase Energy', 'Optimize Testosterone', 'Better Sleep'],
    symptoms: ['Low Energy', 'Poor Sleep', 'Brain Fog'],
    riskFactors: ['High stress', 'Poor sleep', 'High blood pressure']
  }

  const labTests: LabTest[] = [
    {
      id: 'hormone-panel',
      name: 'Comprehensive Male Hormone Panel',
      category: 'Hormones',
      description: 'Total & Free Testosterone, SHBG, LH, FSH, Estradiol',
      fasting: true,
      cost: 250,
      turnaround: '3-5 days',
      recommended: true
    },
    {
      id: 'thyroid-panel',
      name: 'Complete Thyroid Panel',
      category: 'Hormones',
      description: 'TSH, T3, T4, Reverse T3, Anti-TPO',
      fasting: false,
      cost: 180,
      turnaround: '2-3 days',
      recommended: true
    },
    {
      id: 'metabolic-panel',
      name: 'Comprehensive Metabolic Panel',
      category: 'Metabolic',
      description: 'Glucose, Insulin, HbA1c, Lipid Panel',
      fasting: true,
      cost: 120,
      turnaround: '1-2 days',
      recommended: true
    },
    {
      id: 'vitamin-panel',
      name: 'Essential Vitamin Panel',
      category: 'Nutritional',
      description: 'Vitamin D, B12, Folate, B6',
      fasting: false,
      cost: 150,
      turnaround: '2-3 days',
      recommended: false
    },
    {
      id: 'inflammation',
      name: 'Inflammation Markers',
      category: 'Inflammatory',
      description: 'CRP, ESR, Homocysteine',
      fasting: true,
      cost: 90,
      turnaround: '1-2 days',
      recommended: false
    },
    {
      id: 'cortisol-stress',
      name: '4-Point Cortisol (Saliva)',
      category: 'Stress Response',
      description: 'Morning, noon, evening, night cortisol levels',
      fasting: false,
      cost: 200,
      turnaround: '5-7 days',
      recommended: true
    }
  ]

  const handleLabToggle = (labId: string) => {
    setSelectedLabs(prev => 
      prev.includes(labId) 
        ? prev.filter(id => id !== labId)
        : [...prev, labId]
    )
  }

  const recommendedLabs = labTests.filter(lab => lab.recommended)
  const totalCost = labTests
    .filter(lab => selectedLabs.includes(lab.id))
    .reduce((sum, lab) => sum + lab.cost, 0)

  const handleApprove = () => {
    // In real app, would submit to backend
    alert('Patient approved and lab orders sent!')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-black text-yellow-400">
              ADONIS
            </Link>
            <div className="text-white/60">Provider Portal</div>
          </div>
          <Link
            href="/provider"
            className="flex items-center text-white/70 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Patient Header */}
        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{patient.name}</h1>
              <div className="text-white/70 mb-4">{patient.occupation} • Age {patient.age}</div>
              <div className="flex items-center space-x-6 text-sm text-white/60">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {patient.email}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {patient.phone}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg font-bold">
                APPROVED FOR OPTIMIZATION
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Primary Goals</h3>
            <div className="space-y-2">
              {patient.goals.map((goal, index) => (
                <div key={index} className="text-white/80">{goal}</div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Key Symptoms</h3>
            <div className="space-y-2">
              {patient.symptoms.map((symptom, index) => (
                <div key={index} className="text-white/80">{symptom}</div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Risk Factors</h3>
            <div className="space-y-2">
              {patient.riskFactors.map((factor, index) => (
                <div key={index} className="flex items-center text-white/80">
                  <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
                  {factor}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lab Recommendations */}
        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Recommended Laboratory Tests</h2>
          
          {/* Auto-select recommended labs */}
          <div className="mb-6">
            <button
              onClick={() => setSelectedLabs(recommendedLabs.map(lab => lab.id))}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg font-bold mr-4"
            >
              Select All Recommended
            </button>
            <button
              onClick={() => setSelectedLabs([])}
              className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Lab Tests Grid */}
          <div className="grid gap-4">
            {labTests.map((lab) => (
              <div
                key={lab.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedLabs.includes(lab.id)
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-white/20 bg-white/5 hover:border-yellow-400/50'
                } ${lab.recommended ? 'ring-2 ring-green-400/30' : ''}`}
                onClick={() => handleLabToggle(lab.id)}
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
                          <CheckCircle className="w-3 h-3 text-black" />
                        )}
                      </div>
                      <h3 className="font-bold text-white">{lab.name}</h3>
                      {lab.recommended && (
                        <span className="ml-2 bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-white/70 mb-2">{lab.description}</div>
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span>Category: {lab.category}</span>
                      <span>Turnaround: {lab.turnaround}</span>
                      {lab.fasting && (
                        <span className="text-yellow-400">Fasting Required</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">${lab.cost}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cost Summary */}
          {selectedLabs.length > 0 && (
            <div className="mt-6 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-yellow-400">Selected Tests: {selectedLabs.length}</div>
                  <div className="text-white/70">Patient will receive lab orders and instructions</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">Total: ${totalCost}</div>
                  <div className="text-white/60 text-sm">Patient responsibility*</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Treatment Plan */}
        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Initial Treatment Recommendations</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white mb-2 font-medium">Treatment Plan Notes</label>
              <textarea
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none h-32"
                placeholder="Based on assessment, recommend starting with comprehensive lab evaluation. Pending results, likely candidates for testosterone optimization therapy and sleep/stress management protocols..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Follow-up Timeline</label>
                <select
                  value={followUpWeeks}
                  onChange={(e) => setFollowUpWeeks(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="2">2 weeks (urgent)</option>
                  <option value="4">4 weeks (standard)</option>
                  <option value="6">6 weeks (routine)</option>
                  <option value="8">8 weeks (maintenance)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2 font-medium">Provider Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none"
                  placeholder="Additional notes for patient record..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">What Happens Next</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                <div>
                  <div className="font-bold text-white">Lab Orders Sent</div>
                  <div className="text-white/70">Patient receives lab requisitions and instructions via email</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                <div>
                  <div className="font-bold text-white">Patient Completes Labs</div>
                  <div className="text-white/70">Results automatically uploaded to patient portal</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                <div>
                  <div className="font-bold text-white">Results Review</div>
                  <div className="text-white/70">Provider analyzes results and creates treatment protocol</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-sm">4</div>
                <div>
                  <div className="font-bold text-white">Treatment Initiation</div>
                  <div className="text-white/70">Medications prescribed and monitoring schedule established</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Link
            href="/provider"
            className="flex items-center text-white/70 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Patient List
          </Link>
          
          <div className="flex space-x-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              Decline Patient
            </button>
            <button
              onClick={handleApprove}
              disabled={selectedLabs.length === 0}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${
                selectedLabs.length > 0
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              Approve & Send Lab Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

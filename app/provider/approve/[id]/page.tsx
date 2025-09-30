'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, Check, AlertCircle, FileText, TestTube, Package, Calendar } from 'lucide-react'

export default function ApprovePatient({ params }: { params: { id: string } }) {
  const [selectedLabs, setSelectedLabs] = useState<string[]>([])
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([])
  const [notes, setNotes] = useState('')

  // Mock patient data (in real app, this would fetch based on params.id)
  const patient = {
    id: params.id,
    name: 'Michael Chen',
    age: 42,
    goals: ['Increase Energy', 'Optimize Testosterone', 'Better Sleep'],
    symptoms: ['Low Energy', 'Poor Sleep', 'Brain Fog']
  }

  const labTests = [
    { id: 'testosterone', name: 'Total Testosterone', category: 'Hormones', price: 49 },
    { id: 'free-testosterone', name: 'Free Testosterone', category: 'Hormones', price: 59 },
    { id: 'estradiol', name: 'Estradiol (E2)', category: 'Hormones', price: 45 },
    { id: 'thyroid', name: 'Thyroid Panel (TSH, T3, T4)', category: 'Thyroid', price: 79 },
    { id: 'vitamin-d', name: 'Vitamin D', category: 'Vitamins', price: 39 },
    { id: 'b12', name: 'Vitamin B12', category: 'Vitamins', price: 35 },
    { id: 'cortisol', name: 'Cortisol', category: 'Stress', price: 55 },
    { id: 'dhea', name: 'DHEA-S', category: 'Hormones', price: 65 },
    { id: 'lipid', name: 'Lipid Panel', category: 'Cardiovascular', price: 45 },
    { id: 'metabolic', name: 'Comprehensive Metabolic Panel', category: 'General', price: 69 },
    { id: 'psa', name: 'PSA (Prostate)', category: 'General', price: 49 },
    { id: 'cbc', name: 'Complete Blood Count', category: 'General', price: 39 }
  ]

  const treatments = [
    { 
      id: 'trt-basic', 
      name: 'Testosterone Replacement Therapy - Basic', 
      description: 'Weekly injections with monthly monitoring',
      price: 199 
    },
    { 
      id: 'trt-premium', 
      name: 'Testosterone Replacement Therapy - Premium', 
      description: 'Includes HCG and AI, bi-weekly monitoring',
      price: 299 
    },
    { 
      id: 'peptide-bpc', 
      name: 'BPC-157 Peptide Therapy', 
      description: 'For recovery and gut health',
      price: 249 
    },
    { 
      id: 'peptide-thymosin', 
      name: 'Thymosin Beta-4', 
      description: 'Immune support and recovery',
      price: 279 
    },
    { 
      id: 'nad', 
      name: 'NAD+ IV Therapy', 
      description: 'Cellular energy and anti-aging',
      price: 399 
    },
    { 
      id: 'vitamin-iv', 
      name: 'Executive Vitamin IV', 
      description: 'Energy and immune support',
      price: 199 
    }
  ]

  const toggleLab = (labId: string) => {
    setSelectedLabs(prev =>
      prev.includes(labId) ? prev.filter(id => id !== labId) : [...prev, labId]
    )
  }

  const toggleTreatment = (treatmentId: string) => {
    setSelectedTreatments(prev =>
      prev.includes(treatmentId) ? prev.filter(id => id !== treatmentId) : [...prev, treatmentId]
    )
  }

  const calculateTotal = () => {
    const labTotal = labTests
      .filter(lab => selectedLabs.includes(lab.id))
      .reduce((sum, lab) => sum + lab.price, 0)
    const treatmentTotal = treatments
      .filter(treatment => selectedTreatments.includes(treatment.id))
      .reduce((sum, treatment) => sum + treatment.price, 0)
    return labTotal + treatmentTotal
  }

  const handleApprove = () => {
    // In real app, this would submit to backend
    alert('Patient approved! Labs and treatment recommendations sent.')
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
          <div className="flex items-center space-x-4">
            <div className="text-white/80">Dr. Smith</div>
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
              DS
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link href="/provider" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Dashboard
        </Link>

        {/* Patient Info */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">{patient.name}</h1>
          <p className="text-white/60 mb-4">{patient.age} years old</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">Goals:</h3>
              <ul className="space-y-1">
                {patient.goals.map((goal, index) => (
                  <li key={index} className="text-white/80 flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-1 text-green-400 flex-shrink-0" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-red-400">Symptoms:</h3>
              <ul className="space-y-1">
                {patient.symptoms.map((symptom, index) => (
                  <li key={index} className="text-white/80 flex items-start">
                    <AlertCircle className="w-4 h-4 mr-2 mt-1 text-red-400 flex-shrink-0" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lab Tests Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <TestTube className="w-6 h-6 mr-2 text-yellow-400" />
                Recommended Lab Tests
              </h2>
              <p className="text-white/60 mb-6">Select the labs you want to order for this patient</p>

              <div className="space-y-3">
                {labTests.map((lab) => (
                  <div
                    key={lab.id}
                    onClick={() => toggleLab(lab.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedLabs.includes(lab.id)
                        ? 'bg-yellow-400/10 border-yellow-400'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                              selectedLabs.includes(lab.id)
                                ? 'bg-yellow-400 border-yellow-400'
                                : 'border-white/30'
                            }`}
                          >
                            {selectedLabs.includes(lab.id) && (
                              <Check className="w-3 h-3 text-black" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{lab.name}</h3>
                            <p className="text-sm text-white/60">{lab.category}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold">${lab.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Recommendations */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Package className="w-6 h-6 mr-2 text-yellow-400" />
                Treatment Recommendations
              </h2>
              <p className="text-white/60 mb-6">Select recommended treatments based on anticipated results</p>

              <div className="space-y-3">
                {treatments.map((treatment) => (
                  <div
                    key={treatment.id}
                    onClick={() => toggleTreatment(treatment.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedTreatments.includes(treatment.id)
                        ? 'bg-yellow-400/10 border-yellow-400'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start">
                          <div
                            className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center mt-1 ${
                              selectedTreatments.includes(treatment.id)
                                ? 'bg-yellow-400 border-yellow-400'
                                : 'border-white/30'
                            }`}
                          >
                            {selectedTreatments.includes(treatment.id) && (
                              <Check className="w-3 h-3 text-black" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{treatment.name}</h3>
                            <p className="text-sm text-white/60">{treatment.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold ml-4">${treatment.price}/mo</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Notes */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-yellow-400" />
                Clinical Notes
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any clinical notes or special instructions for the patient..."
                className="w-full h-32 bg-black border border-white/20 rounded-lg p-4 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Selected Labs */}
              {selectedLabs.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-yellow-400 mb-2">Lab Tests ({selectedLabs.length})</h3>
                  <div className="space-y-2">
                    {labTests
                      .filter(lab => selectedLabs.includes(lab.id))
                      .map(lab => (
                        <div key={lab.id} className="flex justify-between text-sm">
                          <span className="text-white/80">{lab.name}</span>
                          <span className="font-semibold">${lab.price}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Selected Treatments */}
              {selectedTreatments.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-yellow-400 mb-2">Treatments ({selectedTreatments.length})</h3>
                  <div className="space-y-2">
                    {treatments
                      .filter(treatment => selectedTreatments.includes(treatment.id))
                      .map(treatment => (
                        <div key={treatment.id} className="flex justify-between text-sm">
                          <span className="text-white/80">{treatment.name}</span>
                          <span className="font-semibold">${treatment.price}/mo</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-white/20 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Initial Total</span>
                  <span className="text-2xl font-bold text-yellow-400">${calculateTotal()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleApprove}
                  disabled={selectedLabs.length === 0}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    selectedLabs.length > 0
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  Approve & Send to Patient
                </button>
                <Link
                  href="/provider"
                  className="block w-full py-3 bg-white/5 border border-white/10 rounded-lg font-bold hover:bg-white/10 transition-all text-center"
                >
                  Cancel
                </Link>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-white/80">
                    Patient will receive lab orders and treatment recommendations via email and patient portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

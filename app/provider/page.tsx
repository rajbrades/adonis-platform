'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { Search, Filter, Clock, User, AlertCircle, CheckCircle, FileText, Calendar } from 'lucide-react'

type TabType = 'pending' | 'reviewed'

interface Patient {
  id: string
  name: string
  age?: number
  occupation?: string
  submitted?: string
  reviewed?: string
  priority?: string
  status: string
  treatment?: string
  goals: string[]
  symptoms: string[]
  conditions: string[]
  lifestyle: {
    exercise: string
    sleep: string
    stress: string
  }
}

export default function ProviderDashboard() {
  const { user } = useUser()
  const [selectedTab, setSelectedTab] = useState<TabType>('pending')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patients, setPatients] = useState<{ pending: Patient[], reviewed: Patient[] }>({
    pending: [],
    reviewed: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/consultations')
      const data = await response.json()
      
      if (data.pending && data.reviewed) {
        setPatients(data)
      }
    } catch (error) {
      console.error('Error fetching patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalPatients = patients.pending.length + patients.reviewed.length
  const highPriority = patients.pending.filter(p => p.priority === 'high').length

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
            <div className="text-white/80">{user?.fullName || 'Provider'}</div>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
          <p className="text-white/60">Review and manage patient consultations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold">{patients.pending.length}</span>
            </div>
            <div className="text-white/60 text-sm">Pending Review</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-2xl font-bold">{patients.reviewed.length}</span>
            </div>
            <div className="text-white/60 text-sm">Reviewed Today</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <User className="w-5 h-5 text-blue-400" />
              <span className="text-2xl font-bold">{totalPatients}</span>
            </div>
            <div className="text-white/60 text-sm">Total Patients</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-2xl font-bold">{highPriority}</span>
            </div>
            <div className="text-white/60 text-sm">High Priority</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white/60 py-12">Loading patients...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Patient List */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedTab('pending')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedTab === 'pending'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    Pending ({patients.pending.length})
                  </button>
                  <button
                    onClick={() => setSelectedTab('reviewed')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedTab === 'reviewed'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    Reviewed ({patients.reviewed.length})
                  </button>
                </div>
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {patients[selectedTab].map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPatient?.id === patient.id
                        ? 'bg-yellow-400/10 border-yellow-400'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{patient.name}</h3>
                        <p className="text-white/60 text-sm">{patient.age ? `${patient.age} years • ` : ''}{patient.occupation || 'esae'}</p>
                      </div>
                      {patient.priority && (
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            patient.priority === 'high'
                              ? 'bg-red-500/20 text-red-400'
                              : patient.priority === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {patient.priority.toUpperCase()}
                        </span>
                      )}
                      {patient.status && (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          patient.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {patient.status.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-white/60">
                      <Clock className="w-4 h-4 mr-1" />
                      {patient.submitted || patient.reviewed}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Detail */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              {selectedPatient ? (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{selectedPatient.name}</h2>
                    <p className="text-white/60">{selectedPatient.age ? `${selectedPatient.age} years • ` : ''}{selectedPatient.occupation || 'esae'}</p>
                  </div>

                  <div className="space-y-6">
                    {/* Goals */}
                    <div>
                      <h3 className="font-bold mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-yellow-400" />
                        Health Goals
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.goals.length > 0 ? selectedPatient.goals.map((goal, index) => (
                          <span key={index} className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-sm">
                            {goal}
                          </span>
                        )) : <span className="text-white/40">No goals specified</span>}
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div>
                      <h3 className="font-bold mb-3 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                        Current Symptoms
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.symptoms.length > 0 ? selectedPatient.symptoms.map((symptom, index) => (
                          <span key={index} className="px-3 py-1 bg-red-400/10 border border-red-400/20 rounded-full text-sm">
                            {symptom}
                          </span>
                        )) : <span className="text-white/40">No symptoms reported</span>}
                      </div>
                    </div>

                    {/* Medical Conditions */}
                    <div>
                      <h3 className="font-bold mb-3 flex items-center">
                        <User className="w-5 h-5 mr-2 text-blue-400" />
                        Medical Conditions
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.conditions.length > 0 ? selectedPatient.conditions.map((condition, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-400/10 border border-blue-400/20 rounded-full text-sm">
                            {condition}
                          </span>
                        )) : <span className="text-white/40">No conditions reported</span>}
                      </div>
                    </div>

                    {/* Lifestyle */}
                    <div>
                      <h3 className="font-bold mb-3 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-green-400" />
                        Lifestyle Factors
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white/60">Exercise</span>
                          <span className="font-semibold">{selectedPatient.lifestyle.exercise}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white/60">Sleep</span>
                          <span className="font-semibold">{selectedPatient.lifestyle.sleep}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white/60">Stress Level</span>
                          <span className="font-semibold">{selectedPatient.lifestyle.stress}</span>
                        </div>
                      </div>
                    </div>

                    {/* Treatment (for reviewed patients) */}
                    {selectedPatient.treatment && (
                      <div>
                        <h3 className="font-bold mb-3 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                          Recommended Treatment
                        </h3>
                        <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
                          <p className="font-semibold">{selectedPatient.treatment}</p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    {selectedTab === 'pending' && (
                      <div className="flex space-x-4 pt-4">
                        <Link 
                          href={`/provider/approve/${selectedPatient.id}`}
                          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all text-center"
                        >
                          Approve & Recommend Labs
                        </Link>
                        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-bold hover:bg-white/10 transition-all">
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-white/60">
                  <div className="text-center">
                    <User className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>Select a patient to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

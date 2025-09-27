'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Search, Filter, Clock, User, AlertCircle, CheckCircle, FileText, Calendar } from 'lucide-react'

type TabType = 'pending' | 'reviewed'

interface Patient {
  id: number
  name: string
  age: number
  occupation: string
  submitted?: string
  reviewed?: string
  priority?: string
  status?: string
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
  const [selectedTab, setSelectedTab] = useState<TabType>('pending')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  // Mock patient data
  const patients: Record<TabType, Patient[]> = {
    pending: [
      {
        id: 1,
        name: 'Michael Chen',
        age: 42,
        occupation: 'CEO, TechCorp',
        submitted: '2 hours ago',
        priority: 'high',
        goals: ['Increase Energy', 'Optimize Testosterone', 'Better Sleep'],
        symptoms: ['Low Energy', 'Poor Sleep', 'Brain Fog'],
        conditions: ['High Blood Pressure'],
        lifestyle: { exercise: 'Moderate', sleep: '5-6 hours', stress: 'High' }
      },
      {
        id: 2,
        name: 'Sarah Williams',
        age: 38,
        occupation: 'Managing Director',
        submitted: '4 hours ago',
        priority: 'medium',
        goals: ['Weight Management', 'Enhanced Performance'],
        symptoms: ['Weight Gain', 'Low Energy'],
        conditions: ['None'],
        lifestyle: { exercise: 'Frequent', sleep: '6-7 hours', stress: 'Moderate' }
      },
      {
        id: 3,
        name: 'David Rodriguez',
        age: 45,
        occupation: 'Founder, StartupX',
        submitted: '6 hours ago',
        priority: 'low',
        goals: ['Anti-Aging', 'Cognitive Function'],
        symptoms: ['Brain Fog', 'Joint Pain'],
        conditions: ['None'],
        lifestyle: { exercise: 'Occasional', sleep: '7-8 hours', stress: 'High' }
      }
    ],
    reviewed: [
      {
        id: 4,
        name: 'James Thompson',
        age: 39,
        occupation: 'VP Operations',
        reviewed: '1 day ago',
        status: 'approved',
        treatment: 'Testosterone Optimization Protocol',
        goals: ['Energy Optimization'],
        symptoms: ['Low Energy'],
        conditions: ['None'],
        lifestyle: { exercise: 'Regular', sleep: '7-8 hours', stress: 'Moderate' }
      }
    ]
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
            <div className="text-white/80">Dr. Amanda Chen, MD</div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
              AC
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-400">3</div>
                <div className="text-white/70">Pending Reviews</div>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">12</div>
                <div className="text-white/70">Approved Today</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-400">45</div>
                <div className="text-white/70">Active Patients</div>
              </div>
              <User className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">24m</div>
                <div className="text-white/70">Avg Review Time</div>
              </div>
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl">
              {/* Tabs */}
              <div className="border-b border-yellow-500/20">
                <div className="flex">
                  <button
                    onClick={() => setSelectedTab('pending')}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                      selectedTab === 'pending'
                        ? 'text-yellow-400 border-b-2 border-yellow-400'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Pending ({patients.pending.length})
                  </button>
                  <button
                    onClick={() => setSelectedTab('reviewed')}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                      selectedTab === 'reviewed'
                        ? 'text-yellow-400 border-b-2 border-yellow-400'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Reviewed
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="p-4 border-b border-yellow-500/20">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <button className="bg-white/10 border border-white/20 rounded-lg p-2 hover:bg-white/20 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Patient List */}
              <div className="max-h-96 overflow-y-auto">
                {patients[selectedTab].map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${
                      selectedPatient?.id === patient.id ? 'bg-yellow-400/10 border-l-4 border-l-yellow-400' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-white">{patient.name}</div>
                        <div className="text-sm text-white/60">{patient.occupation}</div>
                        <div className="text-sm text-white/60">Age {patient.age}</div>
                      </div>
                      {patient.priority && (
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          patient.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          patient.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {patient.priority}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-white/50">
                      {patient.submitted || patient.reviewed}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedPatient.name}</h2>
                    <div className="text-white/70">{selectedPatient.occupation} • Age {selectedPatient.age}</div>
                  </div>
                  {selectedTab === 'pending' && (
                    <div className="flex space-x-3">
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Decline
                      </button>
                      <Link 
                        href={`/provider/approve/${selectedPatient.id}`}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
                      >
                        Approve & Recommend Labs
                      </Link>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Primary Goals */}
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-3">Primary Goals</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.goals.map((goal, index) => (
                        <span key={index} className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Current Symptoms */}
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-3">Current Symptoms</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.symptoms.map((symptom, index) => (
                        <span key={index} className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lifestyle Factors */}
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-3">Lifestyle Assessment</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-white/60 text-sm">Exercise</div>
                        <div className="text-white font-medium">{selectedPatient.lifestyle.exercise}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-white/60 text-sm">Sleep</div>
                        <div className="text-white font-medium">{selectedPatient.lifestyle.sleep}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-white/60 text-sm">Stress Level</div>
                        <div className="text-white font-medium">{selectedPatient.lifestyle.stress}</div>
                      </div>
                    </div>
                  </div>

                  {selectedTab === 'pending' && (
                    <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-yellow-400 mb-3">Recommended Next Steps</h3>
                      <div className="space-y-2 text-white/80">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          Comprehensive Male Hormone Panel
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          Metabolic Health Assessment
                        </div>
                        <div className="flex items-center">
                          <AlertCircle className="w-4 h-4 text-yellow-400 mr-2" />
                          Sleep Study Recommendation
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTab === 'reviewed' && selectedPatient.status && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-medium">Approved for Treatment</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-yellow-400 mb-2">Recommended Treatment</h3>
                        <div className="text-white">{selectedPatient.treatment}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-12 text-center">
                <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <div className="text-white/70">Select a patient to review their consultation</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

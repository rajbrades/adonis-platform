'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getBrand } from '@/lib/brand'

interface Consultation {
  id: string
  first_name: string
  last_name: string
  email: string
  date_of_birth: string
  status: string
  recommended_labs: any
  reviewed_at: string
  reviewed_by: string
  lab_upload_status: string | null
  created_at: string
}

function PatientsContent() {
  const brand = getBrand()
  const searchParams = useSearchParams()
  const filterParam = searchParams.get('filter')

  const [patients, setPatients] = useState<Consultation[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Consultation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState(filterParam || 'all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [])

  useEffect(() => {
    filterPatients()
  }, [patients, searchTerm, statusFilter])

  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/consultations')
      const data = await res.json()
      setPatients(data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch patients:', error)
      setLoading(false)
    }
  }

  const filterPatients = () => {
    let filtered = patients

    if (statusFilter === 'awaiting_labs') {
      filtered = filtered.filter(p => 
        p.status === 'approved' && 
        (!p.lab_upload_status || p.lab_upload_status === 'pending')
      )
    } else if (statusFilter === 'approved') {
      filtered = filtered.filter(p => p.status === 'approved')
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter(p => p.status === 'pending')
    } else if (statusFilter === 'labs_uploaded') {
      filtered = filtered.filter(p => p.lab_upload_status === 'uploaded')
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(p => 
        p.first_name.toLowerCase().includes(term) ||
        p.last_name.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term) ||
        p.date_of_birth.includes(term)
      )
    }

    setFilteredPatients(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading patients...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: brand.colors.primary }}>
                Patient Database
              </h1>
              <p className="text-sm text-gray-300">Search and manage all patients</p>
            </div>
            <Link 
              href="/admin"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Search Patients
              </label>
              <input
                type="text"
                placeholder="Search by name, email, or DOB..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              >
                <option value="all">All Patients ({patients.length})</option>
                <option value="awaiting_labs">Awaiting Labs ({patients.filter(p => p.status === 'approved' && (!p.lab_upload_status || p.lab_upload_status === 'pending')).length})</option>
                <option value="approved">Approved ({patients.filter(p => p.status === 'approved').length})</option>
                <option value="pending">Pending Review ({patients.filter(p => p.status === 'pending').length})</option>
                <option value="labs_uploaded">Labs Uploaded ({patients.filter(p => p.lab_upload_status === 'uploaded').length})</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">DOB</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Reviewed</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No patients found matching your search criteria
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => {
                  const needsLabUpload = patient.status === 'approved' && (!patient.lab_upload_status || patient.lab_upload_status === 'pending')
                  
                  return (
                    <tr key={patient.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold">
                          {patient.first_name} {patient.last_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(patient.date_of_birth).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {patient.email}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs inline-block ${
                            patient.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                            patient.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {patient.status}
                          </span>
                          {needsLabUpload && (
                            <span className="px-2 py-1 rounded-full text-xs inline-block bg-red-500/20 text-red-400">
                              Labs Pending
                            </span>
                          )}
                          {patient.lab_upload_status === 'uploaded' && (
                            <span className="px-2 py-1 rounded-full text-xs inline-block bg-blue-500/20 text-blue-400">
                              Labs Uploaded
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {patient.reviewed_at ? new Date(patient.reviewed_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {needsLabUpload && (
                            <Link
                              href={`/admin/upload-labs?patientId=${patient.id}`}
                              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                              style={{ 
                                backgroundColor: brand.colors.primary,
                                color: brand.colors.primaryText 
                              }}
                            >
                              Upload Labs
                            </Link>
                          )}
                          <Link
                            href={`/admin/patients/${patient.id}`}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-all"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function PatientsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <PatientsContent />
    </Suspense>
  )
}

'use client'

import { getBrand } from '@/lib/brand'
import Link from 'next/link'
import { Search, Filter, ArrowLeft, User, Calendar, Activity } from 'lucide-react'

export default function ProviderPatientsPage() {
  const brand = getBrand()

  const patients = [
    { id: '1', name: 'John Smith', dob: '03/15/1985', lastVisit: '2 weeks ago', status: 'Active' },
    { id: '2', name: 'Sarah Johnson', dob: '07/22/1990', lastVisit: '1 month ago', status: 'Active' },
    { id: '3', name: 'Michael Brown', dob: '11/08/1978', lastVisit: '3 days ago', status: 'Active' },
    { id: '4', name: 'Emily Davis', dob: '05/30/1988', lastVisit: '1 week ago', status: 'Active' },
    { id: '5', name: 'David Wilson', dob: '09/12/1982', lastVisit: '2 months ago', status: 'Inactive' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/provider" className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black">
              <span style={{ color: brand.colors.primary }}>Patient</span> List
            </h1>
            <p className="text-white/60 mt-2">Manage and view all patients</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Patients Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-semibold text-white/80">Patient</th>
                  <th className="text-left p-4 font-semibold text-white/80">Date of Birth</th>
                  <th className="text-left p-4 font-semibold text-white/80">Last Visit</th>
                  <th className="text-left p-4 font-semibold text-white/80">Status</th>
                  <th className="text-left p-4 font-semibold text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${brand.colors.primary}20` }}
                        >
                          <User className="w-5 h-5" style={{ color: brand.colors.primary }} />
                        </div>
                        <span className="font-semibold">{patient.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/60">{patient.dob}</td>
                    <td className="p-4 text-white/60">{patient.lastVisit}</td>
                    <td className="p-4">
                      <span 
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          patient.status === 'Active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/provider/patients/${patient.id}`}
                        className="px-4 py-2 rounded-lg font-semibold transition-all"
                        style={{
                          background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                          color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                        }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

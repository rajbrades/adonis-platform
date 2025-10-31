'use client'

import { getTenantConfig } from '@/lib/tenant-config'
import Link from 'next/link'
import { useState } from 'react'
import { Search, Filter, Clock, User, AlertCircle, CheckCircle, FileText, Calendar } from 'lucide-react'

const tenant = getTenantConfig()

type TabType = 'pending' | 'reviewed'

interface Patient {
  id: string
  name: string
  date: string
  status: string
  type: string
}

export default function ProviderDashboard() {
  const [selectedTab, setSelectedTab] = useState<TabType>('pending')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  // Mock patient data
  const patients: Patient[] = [
    { id: '1', name: 'John Doe', date: '2024-01-15', status: 'pending', type: 'Initial Consultation' },
    { id: '2', name: 'Jane Smith', date: '2024-01-14', status: 'reviewed', type: 'Follow-up' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Provider Dashboard</h1>
        <p>Welcome to {tenant.name} Provider Portal</p>
        {/* Rest of your component */}
      </div>
    </div>
  )
}

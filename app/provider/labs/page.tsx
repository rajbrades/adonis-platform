'use client'

import { getBrand } from '@/lib/brand'
import Link from 'next/link'
import { ArrowLeft, FileText, Clock, CheckCircle } from 'lucide-react'

export default function ProviderLabsPage() {
  const brand = getBrand()

  const pendingLabs = [
    { id: '1', patient: 'John Smith', type: 'Hormone Panel', date: '2 hours ago', status: 'pending' },
    { id: '2', patient: 'Sarah Johnson', type: 'Thyroid Panel', date: '5 hours ago', status: 'pending' },
    { id: '3', patient: 'Michael Brown', type: 'Metabolic Panel', date: '1 day ago', status: 'pending' }
  ]

  const recentlyReviewed = [
    { id: '4', patient: 'Emily Davis', type: 'Hormone Panel', date: '2 days ago', status: 'reviewed' },
    { id: '5', patient: 'David Wilson', type: 'Lipid Panel', date: '3 days ago', status: 'reviewed' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/provider" className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black">
            <span style={{ color: brand.colors.primary }}>Lab</span> Results
          </h1>
          <p className="text-white/60 mt-2">Review and analyze patient lab reports</p>
        </div>

        {/* Pending Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6" style={{ color: brand.colors.primary }} />
            Pending Reviews ({pendingLabs.length})
          </h2>

          <div className="space-y-4">
            {pendingLabs.map((lab) => (
              <div key={lab.id} className="flex items-center justify-between p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${brand.colors.primary}20` }}
                  >
                    <FileText className="w-6 h-6" style={{ color: brand.colors.primary }} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{lab.patient}</div>
                    <div className="text-white/60">{lab.type} • Submitted {lab.date}</div>
                  </div>
                </div>
                
                <Link
                  href={`/provider/labs/${lab.id}`}
                  className="px-6 py-3 rounded-lg font-semibold transition-all"
                  style={{
                    background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                    color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                  }}
                >
                  Review
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Reviewed */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Recently Reviewed
          </h2>

          <div className="space-y-4">
            {recentlyReviewed.map((lab) => (
              <div key={lab.id} className="flex items-center justify-between p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{lab.patient}</div>
                    <div className="text-white/60">{lab.type} • Reviewed {lab.date}</div>
                  </div>
                </div>
                
                <Link
                  href={`/provider/labs/${lab.id}`}
                  className="px-6 py-3 rounded-lg font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

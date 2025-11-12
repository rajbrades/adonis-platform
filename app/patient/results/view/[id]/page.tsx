'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getBrand } from '@/lib/brand'

interface LabResult {
  id: string
  patient_name: string
  panel_name: string
  test_date: string
  uploaded_at: string
  biomarkers: Biomarker[]
}

interface Biomarker {
  biomarker: string
  value: string
  unit: string
  referenceRange: string
  status: string
}

export default function ViewLabResultsPage() {
  const params = useParams()
  const router = useRouter()
  const brand = getBrand()
  const labId = params.id as string

  const [labResult, setLabResult] = useState<LabResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLabResult()
  }, [labId])

  const fetchLabResult = async () => {
    try {
      const res = await fetch('/api/admin/lab-results')
      const data = await res.json()
      const result = data.find((lab: LabResult) => lab.id === labId)
      setLabResult(result)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch lab result:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!labResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lab Result Not Found</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: brand.colors.primary }}>
              Lab Results - {labResult.panel_name}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {labResult.patient_name} • Test Date: {new Date(labResult.test_date).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-all"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Biomarkers Table */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Biomarker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Reference Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {labResult.biomarkers.map((biomarker, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {biomarker.biomarker}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {biomarker.value} {biomarker.unit}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {biomarker.referenceRange}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          biomarker.status.toLowerCase() === 'normal'
                            ? 'bg-green-500/20 text-green-400'
                            : biomarker.status.toLowerCase() === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : biomarker.status.toLowerCase() === 'low'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {biomarker.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Total Biomarkers: {labResult.biomarkers.length} • 
          Uploaded: {new Date(labResult.uploaded_at).toLocaleString()}
        </div>
      </div>
    </div>
  )
}

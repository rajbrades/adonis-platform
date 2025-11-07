'use client'

import { getBrand } from "@/lib/brand"
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'

export default function DebugPDFPage() {
  const brand = getBrand()
  const { user } = useUser()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError('')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setUploading(true)
    setError('')
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse PDF')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-2">PDF Debug Tool</h1>
          <p className="text-white/60 mb-8">Upload a Quest Diagnostics PDF to test parsing</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select PDF File</label>
              <div className="flex gap-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                />
                <button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="px-6 py-3 rounded-lg font-semibold text-black transition-all disabled:opacity-50"
                  style={{ backgroundColor: brand.colors.primary }}
                >
                  {uploading ? 'Parsing...' : 'Upload & Parse'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-400 font-semibold">✓ PDF parsed successfully!</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Parsed Results</h3>
                  <pre className="text-sm text-white/80 overflow-auto max-h-96">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

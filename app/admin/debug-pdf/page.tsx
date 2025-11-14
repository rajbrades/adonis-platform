'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'
import { getBrand } from '@/lib/brand'

export default function DebugPDFPage() {
  const brand = getBrand()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('pdf', file)

    try {
      const response = await fetch('/api/admin/debug-pdf', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 px-8 pb-16">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-yellow-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </Link>

        <h1 className="text-3xl font-bold mb-8" style={{ color: brand.colors.primary }}>
          Debug PDF Parser
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-6">
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            id="pdf-upload"
            className="hidden"
          />
          <label 
            htmlFor="pdf-upload"
            className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-yellow-400/50 transition"
          >
            <Upload className="w-12 h-12 text-yellow-400 mb-4" />
            <p className="text-lg font-semibold mb-2">Click to upload Quest PDF</p>
            <p className="text-sm text-white/60">This will show raw extracted text for debugging</p>
          </label>
          {loading && <p className="text-center mt-4 text-yellow-400">Parsing PDF...</p>}
        </div>

        {result && (
          <>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">File Info</h2>
              <div className="text-sm space-y-2">
                <p><span className="text-white/60">File:</span> {result.fileName}</p>
                <p><span className="text-white/60">Size:</span> {(result.fileSize / 1024).toFixed(2)} KB</p>
                <p><span className="text-white/60">Pages:</span> {result.pageCount}</p>
              </div>
            </div>

            {result.preview && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Preview (First 1000 chars)</h2>
                <pre className="text-xs overflow-auto max-h-96 bg-black/30 p-4 rounded whitespace-pre-wrap font-mono">
                  {result.preview}
                </pre>
              </div>
            )}

            {result.rawText && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Full Raw Text</h2>
                <pre className="text-xs overflow-auto max-h-96 bg-black/30 p-4 rounded whitespace-pre-wrap font-mono">
                  {result.rawText}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

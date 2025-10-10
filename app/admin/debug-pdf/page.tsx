'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'

export default function DebugPDFPage() {
  const { user } = useUser()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) setFile(selectedFile)
  }

  const handleDebug = async () => {
    if (!file) return
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/debug-pdf', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ADONIS ADMIN
          </Link>
          <div className="text-sm text-white/60">{user?.firstName}</div>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/admin" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Admin
        </Link>

        <h1 className="text-4xl font-black mb-8">Debug PDF Parser</h1>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-white/40 mb-4 mx-auto" />
              <div className="text-lg font-semibold mb-2">
                {file ? file.name : 'Click to upload PDF'}
              </div>
            </label>
          </div>

          {file && (
            <button
              onClick={handleDebug}
              disabled={uploading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {uploading ? 'Extracting...' : 'Extract Text'}
            </button>
          )}
        </div>

        {result && (
          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Extracted Text</h2>
            <div className="mb-4 text-sm text-white/60">
              Total length: {result.textLength} characters
            </div>
            <pre className="bg-black/40 p-4 rounded-lg text-xs overflow-auto max-h-96 whitespace-pre-wrap font-mono">
              {result.text}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

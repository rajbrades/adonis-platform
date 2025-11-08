'use client'

import { useState } from 'react'
import { Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react'

export default function DebugPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [parsing, setParsing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError('')
      setResult(null)
    }
  }

  const handleDebug = async () => {
    if (!file) return

    setParsing(true)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('pdf', file)

    try {
      const response = await fetch('/api/admin/debug-pdf', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse PDF')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Failed to parse PDF')
    } finally {
      setParsing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Debug <span className="text-yellow-400">PDF Parser</span>
        </h1>
        <p className="text-white/60 mb-8">Test PDF parsing and view extracted data</p>

        {/* Upload Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-6">
          <label className="block mb-4">
            <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-lg hover:border-yellow-400/50 transition-colors cursor-pointer">
              {file ? (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <p className="text-lg font-semibold">{file.name}</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 text-white/40 mx-auto mb-3" />
                  <p>Drop PDF here or click to upload</p>
                </div>
              )}
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </label>

          {file && (
            <button
              onClick={handleDebug}
              disabled={parsing}
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              {parsing ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin w-5 h-5 mr-2" />
                  Parsing...
                </span>
              ) : (
                'Debug Parse PDF'
              )}
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5" />
            <div className="text-red-200">{error}</div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Parsed Data</h2>
            <pre className="bg-black/50 p-6 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

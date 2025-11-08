'use client'

import { useState } from 'react'
import { Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react'

export default function UploadLabResults() {
  const [file, setFile] = useState<File | null>(null)
  const [parsing, setParsing] = useState(false)
  const [parsedData, setParsedData] = useState<any>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError('')
      setParsedData(null)
      setSuccess(false)
    }
  }

  const handleParsePDF = async () => {
    if (!file) return

    setParsing(true)
    setError('')

    const formData = new FormData()
    formData.append('pdf', file)

    try {
      const response = await fetch('/api/admin/parse-lab-pdf', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse PDF')
      }

      setParsedData(data)
    } catch (err: any) {
      setError(err.message || 'Failed to parse PDF')
    } finally {
      setParsing(false)
    }
  }

  const handleSubmit = async () => {
    if (!parsedData) return

    try {
      const response = await fetch('/api/admin/lab-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save results')
      }

      setSuccess(true)
      setFile(null)
      setParsedData(null)
    } catch (err: any) {
      setError(err.message || 'Failed to save results')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Upload <span className="text-yellow-400">Lab Results</span>
        </h1>
        <p className="text-white/60 mb-8">Upload Quest Diagnostics PDF for automatic parsing</p>

        {/* Upload Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-6">
          <label className="block mb-4">
            <div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-lg hover:border-yellow-400/50 transition-colors cursor-pointer">
              {file ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold">{file.name}</p>
                  <p className="text-white/60 text-sm mt-2">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-lg">Drop PDF here or click to upload</p>
                  <p className="text-white/60 text-sm mt-2">Quest Diagnostics lab results</p>
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

          {file && !parsedData && (
            <button
              onClick={handleParsePDF}
              disabled={parsing}
              className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {parsing ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin w-5 h-5 mr-2" />
                  Parsing PDF...
                </span>
              ) : (
                'Parse PDF'
              )}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-red-200">{error}</div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6 flex items-start">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-green-200">Lab results saved successfully!</div>
          </div>
        )}

        {/* Parsed Data Preview */}
        {parsedData && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6">Parsed Data Preview</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-white/60 text-sm">Patient Name</label>
                <div className="text-lg font-semibold">{parsedData.patientName}</div>
              </div>
              
              <div>
                <label className="text-white/60 text-sm">Date of Birth</label>
                <div className="text-lg font-semibold">{parsedData.patientDOB}</div>
              </div>
              
              <div>
                <label className="text-white/60 text-sm">Test Date</label>
                <div className="text-lg font-semibold">{parsedData.testDate}</div>
              </div>
              
              <div>
                <label className="text-white/60 text-sm">Biomarkers Found</label>
                <div className="text-lg font-semibold">{parsedData.biomarkers?.length || 0}</div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Save to Database
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

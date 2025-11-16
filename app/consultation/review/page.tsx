'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getBrand } from '@/lib/brand'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'

// Helper function to convert camelCase to snake_case
const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

const transformKeysToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformKeysToSnakeCase)
  }
  
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const snakeKey = toSnakeCase(key)
      result[snakeKey] = transformKeysToSnakeCase(obj[key])
      return result
    }, {} as any)
  }
  
  return obj
}

export default function ReviewPage() {
  const brand = getBrand()
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState(false)

  useEffect(() => {
    const data = sessionStorage.getItem('consultationData')
    if (!data) {
      router.push('/consultation/intake')
    } else {
      setFormData(JSON.parse(data))
    }
  }, [router])

  const handleSubmit = async () => {
    setSubmitting(true)
    
    try {
      let labFileUrls: string[] = []
      
      // Upload files if any
      if (formData.uploadedLabFiles && formData.uploadedLabFiles.length > 0) {
        setUploadingFiles(true)
        
        const uploadFormData = new FormData()
        formData.uploadedLabFiles.forEach((file: File) => {
          uploadFormData.append('files', file)
        })

        const uploadResponse = await fetch('/api/upload-lab-files', {
          method: 'POST',
          body: uploadFormData
        })

        if (uploadResponse.ok) {
          const { urls } = await uploadResponse.json()
          labFileUrls = urls
        }
        
        setUploadingFiles(false)
      }

      // Remove temporary file objects
      const cleanedData = { ...formData }
      delete cleanedData.uploadedLabFiles

      // Transform to snake_case and add lab_files
      const consultationData = transformKeysToSnakeCase({
        ...cleanedData,
        lab_files: labFileUrls,
        status: 'pending'
      })

      // Submit to database
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultationData)
      })

      if (response.ok) {
        sessionStorage.removeItem('consultationData')
        router.push('/consultation/success')
      } else {
        const errorData = await response.json()
        console.error('Submission error:', errorData)
        alert('Failed to submit consultation: ' + (errorData.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit consultation')
    } finally {
      setSubmitting(false)
      setUploadingFiles(false)
    }
  }

  const handleBack = () => {
    router.push('/consultation/medical-history')
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-12">
        
        <div className="mb-12">
          <button onClick={handleBack} className="inline-flex items-center gap-2 mb-8 text-white/60 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Medical History
          </button>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Review Your <span style={{ color: brand.colors.primary }}>Information</span>
          </h1>
          <p className="text-xl text-white/60">Please verify all details are correct</p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold" style={{ color: brand.colors.primary }}>Step 3 of 3</span>
            <span className="text-sm text-white/50">Final Review</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="h-2 rounded-full transition-all duration-300" style={{width: '100%', backgroundColor: brand.colors.primary}}></div>
          </div>
        </div>

        <div className="space-y-6 mb-12">
          {/* Personal Information */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: brand.colors.primary }}>Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/60">Name:</span>
                <span className="ml-2 text-white font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div>
                <span className="text-white/60">Email:</span>
                <span className="ml-2 text-white font-medium">{formData.email}</span>
              </div>
              <div>
                <span className="text-white/60">Phone:</span>
                <span className="ml-2 text-white font-medium">{formData.phone}</span>
              </div>
              <div>
                <span className="text-white/60">Date of Birth:</span>
                <span className="ml-2 text-white font-medium">{formData.dateOfBirth}</span>
              </div>
            </div>
          </div>

          {/* Goals */}
          {formData.optimizationGoals && formData.optimizationGoals.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: brand.colors.primary }}>Optimization Goals</h2>
              <div className="flex flex-wrap gap-2">
                {formData.optimizationGoals.map((goal: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Medical History */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: brand.colors.primary }}>Medical History</h2>
            <div className="space-y-4 text-sm">
              {formData.currentMedications && (
                <div>
                  <span className="text-white/60 font-semibold">Current Medications:</span>
                  <p className="text-white mt-1">{formData.currentMedications}</p>
                </div>
              )}
              {formData.currentSupplements && (
                <div>
                  <span className="text-white/60 font-semibold">Current Supplements:</span>
                  <p className="text-white mt-1">{formData.currentSupplements}</p>
                </div>
              )}
              {formData.allergies && (
                <div>
                  <span className="text-white/60 font-semibold">Allergies:</span>
                  <p className="text-white mt-1">{formData.allergies}</p>
                </div>
              )}
              {formData.uploadedLabFiles && formData.uploadedLabFiles.length > 0 && (
                <div>
                  <span className="text-white/60 font-semibold">Uploaded Lab Files:</span>
                  <div className="mt-2 space-y-1">
                    {formData.uploadedLabFiles.map((file: File, i: number) => (
                      <div key={i} className="text-white text-xs">
                        • {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-8">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition"
            disabled={submitting || uploadingFiles}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={submitting || uploadingFiles}
            className="px-8 py-4 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
              color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
            }}
          >
            {uploadingFiles ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading Files...
              </>
            ) : submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Consultation
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}

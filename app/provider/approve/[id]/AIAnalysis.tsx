'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Copy, Save, AlertCircle } from 'lucide-react'

interface AIAnalysisProps {
  consultation: any
  labResults: any | null
  onAnalysisComplete?: (analysis: string) => void
}

const QUICK_PROMPTS = [
  { 
    id: 'initialAssessment', 
    title: 'Initial Assessment', 
    requiresLabs: false,
    description: 'Analyze symptoms & recommend labs'
  },
  { 
    id: 'comprehensive', 
    title: 'Systems Analysis', 
    requiresLabs: true,
    description: 'Full physiological review'
  }
]

export default function AIAnalysis({ consultation, labResults, onAnalysisComplete }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [error, setError] = useState('')
  
  const hasLabs = !!labResults

  const runAnalysis = async (promptId: string) => {
    setIsAnalyzing(true)
    setError('')
    setSelectedPrompt(promptId)

    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptId,
          patientData: {
            name: consultation.name,
            age: consultation.age,
            occupation: consultation.occupation,
            symptoms: consultation.symptoms || [],
            goals: consultation.goals || [],
            conditions: consultation.conditions || [],
            lifestyle: consultation.lifestyle || {}
          },
          labResults: labResults
        })
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json()
      setAnalysis(data.analysis)
      onAnalysisComplete?.(data.analysis)
    } catch (err) {
      setError('Failed to generate analysis. Please try again.')
      console.error('AI Analysis Error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(analysis)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Clinical Analysis
          </h2>
          <p className="text-white/60 text-sm mt-1">
            {hasLabs 
              ? 'Generate AI-powered clinical insights with lab data' 
              : 'Analyze symptoms and recommend lab panels'}
          </p>
        </div>
      </div>

      {/* Quick Analysis Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {QUICK_PROMPTS.map((prompt) => {
          const isDisabled = prompt.requiresLabs && !hasLabs
          
          return (
            <button
              key={prompt.id}
              onClick={() => runAnalysis(prompt.id)}
              disabled={isAnalyzing || isDisabled}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedPrompt === prompt.id && isAnalyzing
                  ? 'bg-yellow-400/20 border-yellow-400'
                  : isDisabled
                  ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-yellow-400/50'
              }`}
            >
              <div className="font-semibold text-sm mb-1">{prompt.title}</div>
              <div className="text-xs text-white/60">{prompt.description}</div>
              {isDisabled && (
                <div className="text-xs text-yellow-400 mt-2">Requires labs</div>
              )}
            </button>
          )
        })}
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-white/80">Analyzing patient data with AI...</p>
          <p className="text-white/60 text-sm mt-2">This may take 10-30 seconds</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-red-400">Analysis Error</div>
            <div className="text-white/70 text-sm mt-1">{error}</div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && !isAnalyzing && (
        <div className="space-y-4">
          <div className="bg-white/10 border border-white/20 rounded-lg p-6">
            <div className="whitespace-pre-wrap text-white/90 leading-relaxed">
              {analysis}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={() => onAnalysisComplete?.(analysis)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-lg hover:bg-yellow-400/20 transition-all"
            >
              <Save className="w-4 h-4" />
              Add to Notes
            </button>
          </div>
        </div>
      )}

      {/* No Labs Notice */}
      {!hasLabs && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-blue-400">Lab Results Not Uploaded</div>
              <div className="text-white/70 text-sm mt-1">
                Use "Initial Assessment" to analyze symptoms. Full analysis available after labs are uploaded.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

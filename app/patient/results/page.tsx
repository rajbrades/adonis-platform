'use client'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock, AlertCircle, Download, Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface BiomarkerData {
  biomarker: string
  value: number
  unit: string
  reference_range: string
  status: 'normal' | 'high' | 'low' | 'critical'
  optimal_range?: string
}

interface LabResult {
  id: string
  order_id: string
  consultation_id: string
  lab_panel_name: string
  results_data: BiomarkerData[]
  status: string
  provider_notes?: string
  reviewed_by?: string
  test_date?: string
  sample_collected_at?: string
  results_received_at?: string
  reviewed_at?: string
  created_at: string
}

interface BiomarkerRange {
  biomarker_name: string
  unit: string
  ref_min: number
  ref_max: number
  optimal_min: number
  optimal_max: number
  critical_low: number
  critical_high: number
  description: string
}

export default function ResultsPage() {
  const { user } = useUser()
  const [results, setResults] = useState<LabResult[]>([])
  const [biomarkerRanges, setBiomarkerRanges] = useState<Record<string, BiomarkerRange>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [resultsRes, rangesRes] = await Promise.all([
        fetch('/api/lab-results'),
        fetch('/api/biomarker-ranges')
      ])
      
      const resultsData = await resultsRes.json()
      const rangesData = await rangesRes.json()
      
      const rangesMap: Record<string, BiomarkerRange> = {}
      rangesData.forEach((range: BiomarkerRange) => {
        rangesMap[range.biomarker_name] = range
      })
      
      setResults(resultsData)
      setBiomarkerRanges(rangesMap)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToPDF = (result: LabResult) => {
    const doc = new jsPDF()
    
    doc.setFillColor(254, 215, 0)
    doc.rect(0, 0, 210, 40, 'F')
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('ADONIS', 20, 25)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text(`Patient: ${user?.firstName} ${user?.lastName}`, 20, 35)
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text(`${result.lab_panel_name} - Lab Results`, 20, 55)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const testDate = result.test_date || result.results_received_at || result.created_at
    doc.text(`Test Date: ${new Date(testDate).toLocaleDateString()}`, 20, 65)
    doc.text(`Status: ${result.status.toUpperCase()}`, 20, 72)
    
    const tableData = result.results_data.map((biomarker) => {
      const rangeData = biomarkerRanges[biomarker.biomarker]
      return [
        biomarker.biomarker,
        `${biomarker.value} ${biomarker.unit}`,
        biomarker.reference_range,
        rangeData ? `${rangeData.optimal_min}-${rangeData.optimal_max}` : '-',
        biomarker.status.toUpperCase()
      ]
    })
    
    autoTable(doc, {
      head: [['Biomarker', 'Value', 'Lab Range', 'Optimal Range', 'Status']],
      body: tableData,
      startY: 80,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [254, 215, 0],
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 9,
        cellPadding: 5
      },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 30 },
        2: { cellWidth: 35 },
        3: { cellWidth: 35 },
        4: { cellWidth: 25, halign: 'center' }
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 4) {
          const status = data.cell.text[0].toLowerCase()
          if (status.includes('high') || status.includes('critical')) {
            data.cell.styles.textColor = [255, 0, 0]
            data.cell.styles.fontStyle = 'bold'
          } else if (status.includes('low')) {
            data.cell.styles.textColor = [0, 100, 255]
            data.cell.styles.fontStyle = 'bold'
          } else {
            data.cell.styles.textColor = [0, 150, 0]
            data.cell.styles.fontStyle = 'bold'
          }
        }
      }
    })
    
    if (result.provider_notes) {
      const finalY = (doc as any).lastAutoTable.finalY || 80
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Provider Notes', 20, finalY + 15)
      
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      const splitNotes = doc.splitTextToSize(result.provider_notes, 170)
      doc.text(splitNotes, 20, finalY + 25)
      
      if (result.reviewed_by) {
        const notesHeight = splitNotes.length * 5
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        doc.text(`— ${result.reviewed_by}`, 20, finalY + 25 + notesHeight + 5)
      }
    }
    
    const pageHeight = doc.internal.pageSize.height
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text('ADONIS Health Optimization Platform', 20, pageHeight - 20)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, pageHeight - 15)
    doc.text('For questions about your results, contact your healthcare provider.', 20, pageHeight - 10)
    
    const fileName = `Adonis_Lab_Results_${result.lab_panel_name.replace(/\s+/g, '_')}_${new Date(testDate).toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />
      case 'reviewed':
        return <FileText className="w-5 h-5 text-blue-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-white/40" />
    }
  }

  const parseRange = (rangeStr: string): { min: number, max: number } => {
    const parts = rangeStr.split('-')
    return {
      min: parseFloat(parts[0]),
      max: parseFloat(parts[1])
    }
  }

  const getHistoricalData = (biomarkerName: string): { date: string, value: number }[] => {
    return results
      .map(result => {
        const biomarker = result.results_data.find(b => b.biomarker === biomarkerName)
        if (!biomarker) return null
        return {
          date: result.test_date || result.created_at,
          value: biomarker.value
        }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(a!.date).getTime() - new Date(b!.date).getTime()) as { date: string, value: number }[]
  }

  const BiomarkerCard = ({ biomarker, rangeData }: { biomarker: BiomarkerData, rangeData?: BiomarkerRange }) => {
    const refRange = parseRange(biomarker.reference_range)
    const value = biomarker.value
    
    const optimalMin = rangeData?.optimal_min ?? refRange.min
    const optimalMax = rangeData?.optimal_max ?? refRange.max
    
    const isOptimal = value >= optimalMin && value <= optimalMax
    const isAcceptable = value >= refRange.min && value <= refRange.max
    
    const historicalData = getHistoricalData(biomarker.biomarker)
    const hasHistory = historicalData.length > 1
    
    // Calculate trend
    let trend: 'up' | 'down' | 'stable' = 'stable'
    if (hasHistory) {
      const previous = historicalData[historicalData.length - 2].value
      const current = value
      const change = ((current - previous) / previous) * 100
      if (Math.abs(change) > 5) {
        trend = change > 0 ? 'up' : 'down'
      }
    }

    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h4 className="text-lg font-bold mb-1">{biomarker.biomarker}</h4>
            {rangeData?.description && (
              <p className="text-sm text-white/40">{rangeData.description}</p>
            )}
          </div>
          
          {/* Status Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            isOptimal ? 'bg-green-500/20 text-green-400' :
            isAcceptable ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {isOptimal ? 'OPTIMIZED' : isAcceptable ? 'NEEDS WORK' : 'AT RISK'}
          </div>
        </div>

        {/* Value and Trend */}
        <div className="flex items-end gap-4 mb-6">
          <div className="text-5xl font-black text-white">
            {value}
            <span className="text-xl text-white/40 ml-2">{biomarker.unit}</span>
          </div>
          
          {hasHistory && trend !== 'stable' && (
            <div className={`flex items-center gap-1 mb-2 ${
              trend === 'up' ? 'text-blue-400' : 'text-orange-400'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="text-sm font-semibold">
                {trend === 'up' ? 'Increasing' : 'Decreasing'}
              </span>
            </div>
          )}
        </div>

        {/* Ranges - Clean Text-Based */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-xs text-white/50 mb-1">Your optimal zone</div>
            <div className="text-sm font-bold text-green-400">
              {optimalMin} - {optimalMax} {biomarker.unit}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-xs text-white/50 mb-1">Lab reference range</div>
            <div className="text-sm font-bold text-white/60">
              {refRange.min} - {refRange.max} {biomarker.unit}
            </div>
          </div>
        </div>

        {/* Timeline Chart - Minimal */}
        {hasHistory && (
          <div className="pt-6 border-t border-white/10">
            <div className="text-xs text-white/50 mb-4 uppercase tracking-wider font-semibold">Historical Trend</div>
            
            <div className="h-32 relative">
              {/* Y-axis grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-t border-white/5" />
                <div className="border-t border-white/10" />
                <div className="border-t border-white/5" />
              </div>

              {/* Chart */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`gradient-${biomarker.biomarker}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area under curve */}
                <polygon
                  points={[
                    ...historicalData.map((point, idx) => {
                      const x = (idx / (historicalData.length - 1)) * 100
                      const minVal = Math.min(...historicalData.map(p => p.value)) * 0.95
                      const maxVal = Math.max(...historicalData.map(p => p.value)) * 1.05
                      const range = maxVal - minVal || 1
                      const y = 100 - ((point.value - minVal) / range) * 100
                      return `${x},${y}`
                    }),
                    '100,100',
                    '0,100'
                  ].join(' ')}
                  fill={`url(#gradient-${biomarker.biomarker})`}
                  opacity="0.5"
                />
                
                {/* Line */}
                <polyline
                  points={historicalData.map((point, idx) => {
                    const x = (idx / (historicalData.length - 1)) * 100
                    const minVal = Math.min(...historicalData.map(p => p.value)) * 0.95
                    const maxVal = Math.max(...historicalData.map(p => p.value)) * 1.05
                    const range = maxVal - minVal || 1
                    const y = 100 - ((point.value - minVal) / range) * 100
                    return `${x},${y}`
                  }).join(' ')}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Data points */}
              <div className="absolute inset-0 flex items-stretch">
                {historicalData.map((point, idx) => {
                  const minVal = Math.min(...historicalData.map(p => p.value)) * 0.95
                  const maxVal = Math.max(...historicalData.map(p => p.value)) * 1.05
                  const range = maxVal - minVal || 1
                  const yPos = 100 - ((point.value - minVal) / range) * 100
                  
                  const pointIsOptimal = point.value >= optimalMin && point.value <= optimalMax

                  return (
                    <div key={idx} className="flex-1 relative group">
                      {/* Point */}
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
                        style={{ top: `${yPos}%` }}
                      >
                        <div className={`w-2 h-2 rounded-full transition-all group-hover:w-3 group-hover:h-3 ${
                          pointIsOptimal ? 'bg-green-400' : 'bg-blue-400'
                        }`} />
                        
                        {/* Hover tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap font-semibold border border-white/20">
                            {point.value} {biomarker.unit}
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-white/40 whitespace-nowrap">
                        {new Date(point.date).toLocaleDateString('en-US', { 
                          month: 'short',
                          year: historicalData.length > 3 ? undefined : '2-digit'
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-yellow-400 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-white/60 font-medium">Loading your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            ADONIS
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/patient" className="text-white/70 hover:text-yellow-400 transition text-sm font-medium">
              Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold">{user?.firstName}</div>
                <div className="text-xs text-white/60">Lab Results</div>
              </div>
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{ 
                  elements: { 
                    avatarBox: "w-10 h-10 ring-2 ring-yellow-400/50 hover:ring-yellow-400 transition" 
                  } 
                }} 
              />
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <Link 
          href="/patient" 
          className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">Lab Results</h1>
          <p className="text-white/60 text-lg">Your biomarkers and personalized optimal zones</p>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white/40" />
              </div>
              <h2 className="text-2xl font-bold mb-3">No Results Yet</h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Your lab results will appear here once processed by Labcorp.
              </p>
              <Link
                href="/patient"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {results.map((result) => (
              <div key={result.id} className="space-y-6">
                {/* Result header */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{result.lab_panel_name}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(result.test_date || result.created_at).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(result.status)}
                          <span className="capitalize">{result.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => exportToPDF(result)}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all border border-white/20"
                    >
                      <Download className="w-4 h-4" />
                      Export PDF
                    </button>
                  </div>

                  {/* Provider notes */}
                  {result.provider_notes && (
                    <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                      <div className="text-sm font-bold text-blue-400 mb-2">Provider Notes</div>
                      <p className="text-sm text-white/80 leading-relaxed">{result.provider_notes}</p>
                      {result.reviewed_by && (
                        <p className="text-xs text-white/40 mt-2">— {result.reviewed_by}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Biomarker Cards */}
                <div className="grid gap-6 md:grid-cols-2">
                  {result.results_data.map((biomarker, index) => (
                    <BiomarkerCard 
                      key={index}
                      biomarker={biomarker} 
                      rangeData={biomarkerRanges[biomarker.biomarker]}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, TrendingDown, Download, Activity, Sparkles, Info, Target, BarChart3 } from 'lucide-react'
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

  const calculatePosition = (value: number, min: number, max: number): number => {
    const position = ((value - min) / (max - min)) * 100
    return Math.max(0, Math.min(100, position))
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

  const BiomarkerVisual = ({ biomarker, rangeData }: { biomarker: BiomarkerData, rangeData?: BiomarkerRange }) => {
    const refRange = parseRange(biomarker.reference_range)
    const value = biomarker.value
    
    const optimalMin = rangeData?.optimal_min ?? refRange.min
    const optimalMax = rangeData?.optimal_max ?? refRange.max
    
    const rangeMin = Math.min(refRange.min, optimalMin, value * 0.8)
    const rangeMax = Math.max(refRange.max, optimalMax, value * 1.2)
    
    const calculatePos = (val: number) => calculatePosition(val, rangeMin, rangeMax)
    
    const positions = {
      rangeMin: calculatePos(rangeMin),
      refMin: calculatePos(refRange.min),
      optMin: calculatePos(optimalMin),
      value: calculatePos(value),
      optMax: calculatePos(optimalMax),
      refMax: calculatePos(refRange.max),
      rangeMax: calculatePos(rangeMax)
    }

    const isOptimal = value >= optimalMin && value <= optimalMax
    const isAcceptable = value >= refRange.min && value <= refRange.max
    const isOutOfRange = !isAcceptable

    return (
      <div className="space-y-6">
        {/* Header with value */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold mb-1">{biomarker.biomarker}</h4>
            {rangeData?.description && (
              <p className="text-sm text-white/50">{rangeData.description}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-white mb-2">
              {value}
              <span className="text-lg text-white/40 ml-1">{biomarker.unit}</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${
              isOptimal ? 'bg-green-500/20 text-green-400' :
              isAcceptable ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {isOptimal ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  OPTIMAL
                </>
              ) : isAcceptable ? (
                <>
                  <Info className="w-3.5 h-3.5" />
                  ACCEPTABLE
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5" />
                  {biomarker.status === 'high' ? 'HIGH' : biomarker.status === 'low' ? 'LOW' : 'OUT OF RANGE'}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Visual range indicator */}
        <div className="relative pt-8">
          <div className="relative h-16 rounded-full overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10">
            {/* Red zone - Low */}
            <div 
              className="absolute h-full bg-gradient-to-r from-red-500/50 via-red-500/30 to-transparent"
              style={{
                left: '0%',
                width: `${positions.refMin}%`
              }}
            />

            {/* Yellow zone - Left side */}
            {optimalMin > refRange.min && (
              <div 
                className="absolute h-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
                style={{
                  left: `${positions.refMin}%`,
                  width: `${positions.optMin - positions.refMin}%`
                }}
              />
            )}

            {/* Green zone - Optimal */}
            <div 
              className="absolute h-full bg-gradient-to-r from-green-400/40 via-green-400/50 to-green-400/40"
              style={{
                left: `${positions.optMin}%`,
                width: `${positions.optMax - positions.optMin}%`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-400/60" />
              </div>
            </div>

            {/* Yellow zone - Right side */}
            {optimalMax < refRange.max && (
              <div 
                className="absolute h-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
                style={{
                  left: `${positions.optMax}%`,
                  width: `${positions.refMax - positions.optMax}%`
                }}
              />
            )}

            {/* Red zone - High */}
            <div 
              className="absolute h-full bg-gradient-to-r from-transparent via-red-500/30 to-red-500/50"
              style={{
                left: `${positions.refMax}%`,
                width: `${100 - positions.refMax}%`
              }}
            />

            {/* Value marker */}
            <div 
              className="absolute top-0 h-full w-1 bg-white shadow-2xl z-10 transition-all duration-500"
              style={{ left: `${positions.value}%` }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
            </div>

            {/* Value label above marker */}
            <div 
              className="absolute -top-7 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold shadow-lg"
              style={{ left: `${positions.value}%`, transform: 'translateX(-50%)' }}
            >
              {value}
            </div>

            {/* Range labels */}
            <div 
              className="absolute -bottom-6 text-xs text-white/40 font-medium"
              style={{ left: `${positions.refMin}%`, transform: 'translateX(-50%)' }}
            >
              {refRange.min}
            </div>
            <div 
              className="absolute -bottom-6 text-xs text-white/40 font-medium"
              style={{ left: `${positions.refMax}%`, transform: 'translateX(-50%)' }}
            >
              {refRange.max}
            </div>
          </div>
        </div>

        {/* Range legend */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20 hover:border-green-500/40 transition">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-xs font-bold text-green-400">OPTIMAL RANGE</span>
            </div>
            <p className="text-lg font-bold text-white">{optimalMin} - {optimalMax}</p>
            <p className="text-xs text-white/40 mt-1">Target zone</p>
          </div>

          <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20 hover:border-yellow-500/40 transition">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-xs font-bold text-yellow-400">ACCEPTABLE</span>
            </div>
            <p className="text-lg font-bold text-white">{refRange.min} - {refRange.max}</p>
            <p className="text-xs text-white/40 mt-1">Lab reference</p>
          </div>
          
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20 hover:border-red-500/40 transition">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-xs font-bold text-red-400">OUT OF RANGE</span>
            </div>
            <p className="text-lg font-bold text-white">
              {'<'}{refRange.min} or {'>'}{refRange.max}
            </p>
            <p className="text-xs text-white/40 mt-1">Needs attention</p>
          </div>
        </div>

        {/* Historical trend */}
        {getHistoricalData(biomarker.biomarker).length > 1 && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h5 className="font-bold">Historical Trend</h5>
            </div>
            <div className="flex items-end justify-between gap-2 h-32">
              {getHistoricalData(biomarker.biomarker).map((point, idx) => {
                const historical = getHistoricalData(biomarker.biomarker)
                const maxVal = Math.max(...historical.map(p => p.value))
                const height = (point.value / maxVal) * 100
                
                const pointIsOptimal = point.value >= optimalMin && point.value <= optimalMax
                const pointIsInRange = point.value >= refRange.min && point.value <= refRange.max
                const barColor = pointIsOptimal ? 'bg-green-400' : 
                                pointIsInRange ? 'bg-yellow-400' : 
                                'bg-red-400'
                
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      className={`w-full ${barColor} rounded-t-lg transition-all cursor-pointer hover:opacity-80 relative`}
                      style={{ height: `${height}%` }}
                      title={`${point.value} ${biomarker.unit}`}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {point.value} {biomarker.unit}
                      </div>
                    </div>
                    <div className="text-xs text-white/50 font-medium text-center">
                      {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                )
              })}
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
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black">Lab Results</h1>
              <p className="text-white/60 mt-2">Track your biomarkers and optimize your health</p>
            </div>
          </div>
        </div>

        {/* Results or empty state */}
        {results.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center hover:bg-white/[0.07] transition">
              <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-white/40" />
              </div>
              <h2 className="text-3xl font-bold mb-3">No Results Yet</h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
                Your lab results will appear here once they are processed by Labcorp. 
                This typically takes 3-5 business days after your sample is collected.
              </p>
              <Link
                href="/patient"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all hover:scale-105"
              >
                View Dashboard
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {results.map((result) => (
              <div 
                key={result.id} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all"
              >
                {/* Result header */}
                <div className="p-8 border-b border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-3xl font-black mb-3">{result.lab_panel_name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">
                            {result.test_date 
                              ? new Date(result.test_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                              : result.results_received_at 
                              ? new Date(result.results_received_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                              : new Date(result.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(result.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            result.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            result.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {result.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => exportToPDF(result)}
                      className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-400/30 transition-all hover:scale-105"
                    >
                      <Download className="w-5 h-5" />
                      Export PDF
                    </button>
                  </div>

                  {/* Provider notes */}
                  {result.provider_notes && (
                    <div className="mt-6 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-5 hover:bg-blue-500/[0.12] transition">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Info className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-blue-400 mb-2">Provider Notes</p>
                          <p className="text-sm text-white/90 leading-relaxed">{result.provider_notes}</p>
                          {result.reviewed_by && (
                            <p className="text-xs text-white/50 mt-3 font-medium">— {result.reviewed_by}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Biomarkers */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <h4 className="text-xl font-bold">Biomarker Analysis</h4>
                  </div>
                  
                  <div className="space-y-8">
                    {result.results_data.map((biomarker, index) => (
                      <div 
                        key={index} 
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all"
                      >
                        <BiomarkerVisual 
                          biomarker={biomarker} 
                          rangeData={biomarkerRanges[biomarker.biomarker]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

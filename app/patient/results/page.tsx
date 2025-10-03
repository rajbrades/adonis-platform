'use client'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, TrendingDown, Minus, Info, Download } from 'lucide-react'
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
    
    // Header
    doc.setFillColor(254, 215, 0) // Yellow
    doc.rect(0, 0, 210, 40, 'F')
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('ADONIS', 20, 25)
    
    // Patient Info
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text(`Patient: ${user?.firstName} ${user?.lastName}`, 20, 35)
    
    // Reset text color
    doc.setTextColor(0, 0, 0)
    
    // Report Title
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text(`${result.lab_panel_name} - Lab Results`, 20, 55)
    
    // Test Date
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const testDate = result.test_date || result.results_received_at || result.created_at
    doc.text(`Test Date: ${new Date(testDate).toLocaleDateString()}`, 20, 65)
    doc.text(`Status: ${result.status.toUpperCase()}`, 20, 72)
    
    // Biomarkers Table
    const tableData = result.results_data.map((biomarker) => {
      const rangeData = biomarkerRanges[biomarker.biomarker]
      const statusColor = 
        biomarker.status === 'high' || biomarker.status === 'critical' ? [255, 100, 100] :
        biomarker.status === 'low' ? [100, 150, 255] :
        [100, 255, 150]
      
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
    
    // Provider Notes
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
    
    // Footer
    const pageHeight = doc.internal.pageSize.height
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text('ADONIS Health Optimization Platform', 20, pageHeight - 20)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, pageHeight - 15)
    doc.text('For questions about your results, contact your healthcare provider.', 20, pageHeight - 10)
    
    // Save PDF
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

  const getBiomarkerStatusIcon = (status: string) => {
    switch (status) {
      case 'high':
        return <TrendingUp className="w-4 h-4 text-red-400" />
      case 'low':
        return <TrendingDown className="w-4 h-4 text-blue-400" />
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-green-400" />
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
    
    const refStart = calculatePosition(refRange.min, rangeMin, rangeMax)
    const refEnd = calculatePosition(refRange.max, rangeMin, rangeMax)
    const optStart = calculatePosition(optimalMin, rangeMin, rangeMax)
    const optEnd = calculatePosition(optimalMax, rangeMin, rangeMax)
    const valuePos = calculatePosition(value, rangeMin, rangeMax)

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getBiomarkerStatusIcon(biomarker.status)}
            <div>
              <h4 className="font-bold text-lg">{biomarker.biomarker}</h4>
              <p className="text-sm text-white/60">{rangeData?.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${
              biomarker.status === 'high' || biomarker.status === 'critical' ? 'text-red-400' :
              biomarker.status === 'low' ? 'text-blue-400' :
              'text-green-400'
            }`}>
              {value} <span className="text-lg text-white/60">{biomarker.unit}</span>
            </div>
            <div className={`text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1 ${
              biomarker.status === 'high' || biomarker.status === 'critical' ? 'bg-red-500/20 text-red-400' :
              biomarker.status === 'low' ? 'bg-blue-500/20 text-blue-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {biomarker.status === 'normal' ? 'In Range' : biomarker.status.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="relative h-16 bg-white/5 rounded-lg overflow-hidden">
          <div 
            className="absolute h-full bg-white/10"
            style={{
              left: `${refStart}%`,
              width: `${refEnd - refStart}%`
            }}
          >
            <div className="absolute -top-6 left-0 text-xs text-white/40">
              Lab Range
            </div>
          </div>

          <div 
            className="absolute h-full bg-green-500/20"
            style={{
              left: `${optStart}%`,
              width: `${optEnd - optStart}%`
            }}
          >
            <div className="absolute -top-6 left-0 text-xs text-green-400 font-semibold">
              Optimal
            </div>
          </div>

          <div 
            className="absolute top-0 h-full w-1 bg-yellow-400 shadow-lg"
            style={{ left: `${valuePos}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
          </div>

          <div className="absolute bottom-1 left-2 text-xs text-white/60">
            {rangeMin.toFixed(0)}
          </div>
          <div className="absolute bottom-1 right-2 text-xs text-white/60">
            {rangeMax.toFixed(0)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/5 rounded p-2">
            <div className="text-white/60 text-xs mb-1">Lab Reference Range</div>
            <div className="font-semibold">{refRange.min} - {refRange.max} {biomarker.unit}</div>
          </div>
          <div className="bg-green-500/10 rounded p-2">
            <div className="text-green-400 text-xs mb-1">Adonis Optimal Range</div>
            <div className="font-semibold">{optimalMin} - {optimalMax} {biomarker.unit}</div>
          </div>
        </div>

        {getHistoricalData(biomarker.biomarker).length > 1 && (
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h5 className="font-semibold text-sm">Historical Trend</h5>
            </div>
            <div className="flex items-end justify-between gap-2 h-20">
              {getHistoricalData(biomarker.biomarker).map((point, idx) => {
                const historical = getHistoricalData(biomarker.biomarker)
                const maxVal = Math.max(...historical.map(p => p.value))
                const height = (point.value / maxVal) * 100
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-blue-400 rounded-t transition-all hover:bg-blue-300"
                      style={{ height: `${height}%` }}
                      title={`${point.value} ${biomarker.unit}`}
                    ></div>
                    <div className="text-xs text-white/60">
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white/60">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-yellow-400">ADONIS</Link>
          <div className="flex items-center gap-4">
            <span className="text-white/80">Welcome, {user?.firstName}</span>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/patient" className="inline-flex items-center text-white/70 hover:text-yellow-400 transition-colors mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Lab Results</h1>
          <p className="text-white/60">Track your biomarkers and optimize your health</p>
        </div>

        {results.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No Results Yet</h2>
            <p className="text-white/60 mb-6">Your lab results will appear here once they're available</p>
            <Link
              href="/patient"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              View Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{result.lab_panel_name}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {result.test_date 
                            ? new Date(result.test_date).toLocaleDateString()
                            : result.results_received_at 
                            ? new Date(result.results_received_at).toLocaleDateString()
                            : new Date(result.created_at).toLocaleDateString()
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => exportToPDF(result)}
                        className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
                      >
                        <Download className="w-4 h-4" />
                        Export PDF
                      </button>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          result.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          result.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {result.provider_notes && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-400 mb-1">Provider Notes</p>
                      <p className="text-sm text-white/90">{result.provider_notes}</p>
                      {result.reviewed_by && (
                        <p className="text-xs text-white/60 mt-2">— {result.reviewed_by}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h4 className="font-semibold mb-6 flex items-center gap-2">
                    <Info className="w-4 h-4 text-yellow-400" />
                    Biomarker Results
                  </h4>
                  <div className="space-y-8">
                    {result.results_data.map((biomarker, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-6">
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

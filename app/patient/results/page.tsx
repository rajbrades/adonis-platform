'use client'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, TrendingDown, Minus, Info, Download, Activity, Sparkles } from 'lucide-react'
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

'use client'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, TrendingDown, Minus, Info, Download, Activity, Sparkles } from 'lucide-react'
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
            <div className={`p-2 rounded-lg ${
              biomarker.status === 'high' || biomarker.status === 'critical' ? 'bg-red-500/20' :
              biomarker.status === 'low' ? 'bg-blue-500/20' :
              'bg-green-500/20'
            }`}>
              {getBiomarkerStatusIcon(biomarker.status)}
            </div>
            <div>
              <h4 className="font-bold text-lg">{biomarker.biomarker}</h4>
              <p className="text-sm text-white/60">{rangeData?.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-black ${
              biomarker.status === 'high' || biomarker.status === 'critical' ? 'text-red-400' :
              biomarker.status === 'low' ? 'text-blue-400' :
              'text-green-400'
            }`}>
              {value} <span className="text-lg text-white/60">{biomarker.unit}</span>
            </div>
            <div className={`text-xs font-bold px-3 py-1 rounded-full inline-block mt-2 ${
              biomarker.status === 'high' || biomarker.status === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
              biomarker.status === 'low' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              'bg-green-500/20 text-green-400 border border-green-500/30'
            }`}>
              {biomarker.status === 'normal' ? 'OPTIMAL' : biomarker.status.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/50 font-medium">Range Visualization</span>
            <span className="text-xs text-white/50 font-medium">{biomarker.unit}</span>
          </div>

          <div className="relative h-16 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl overflow-hidden border border-white/10">
            <div 
              className="absolute h-full bg-white/5 border-l border-r border-white/20"
              style={{
                left: `${refStart}%`,
                width: `${refEnd - refStart}%`
              }}
            />

            <div 
              className="absolute h-full bg-gradient-to-r from-yellow-500/20 via-yellow-400/30 to-yellow-500/20 border-l-2 border-r-2 border-yellow-400/50"
              style={{
                left: `${optStart}%`,
                width: `${optEnd - optStart}%`
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Sparkles className="w-4 h-4 text-yellow-400 opacity-50" />
              </div>
            </div>

            <div 
              className="absolute top-0 h-full w-1 bg-gradient-to-b from-white via-yellow-400 to-white shadow-lg z-10"
              style={{ left: `${valuePos}%` }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 ring-2 ring-white/20"></div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 ring-2 ring-white/20"></div>
            </div>

            <div className="absolute bottom-1 left-2 text-xs text-white/40 font-medium">
              {rangeMin.toFixed(0)}
            </div>
            <div className="absolute bottom-1 right-2 text-xs text-white/40 font-medium">
              {rangeMax.toFixed(0)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-white/20 rounded border border-white/30"></div>
              <div className="text-white/60 text-xs font-medium">Lab Range</div>
            </div>
            <div className="font-bold text-sm">{refRange.min} - {refRange.max}</div>
          </div>
          
          <div className="bg-yellow-500/10 backdrop-blur-sm rounded-xl p-3 border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <div className="text-yellow-400 text-xs font-bold">Optimal</div>
            </div>
            <div className="font-bold text-sm text-yellow-400">{optimalMin} - {optimalMax}</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-gradient-to-b from-white to-yellow-400 rounded"></div>
              <div className="text-white/60 text-xs font-medium">Your Value</div>
            </div>
            <div className="font-bold text-sm">{value}</div>
          </div>
        </div>

        {getHistoricalData(biomarker.biomarker).length > 1 && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h5 className="font-bold text-sm">Historical Trend</h5>
            </div>
            <div className="flex items-end justify-between gap-2 h-24">
              {getHistoricalData(biomarker.biomarker).map((point, idx) => {
                const historical = getHistoricalData(biomarker.biomarker)
                const maxVal = Math.max(...historical.map(p => p.value))
                const height = (point.value / maxVal) * 100
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t transition-all hover:from-blue-300 hover:to-blue-500 cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${point.value} ${biomarker.unit}`}
                    ></div>
                    <div className="text-xs text-white/60 font-medium">
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
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white/60 font-medium">Loading your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <header className="bg-black/40 backdrop-blur-xl border-b border-yellow-500/20 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ADONIS
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/patient" className="text-white/70 hover:text-yellow-400 transition text-sm font-medium">
              Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold">{user?.firstName}</div>
                <div className="text-xs text-white/60">Lab Results</div>
              </div>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10 ring-2 ring-yellow-400/50" } }} />
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/patient" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black">Lab Results</h1>
              <p className="text-white/60 mt-1">Track your biomarkers and optimize your health</p>
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white/40" />
              </div>
              <h2 className="text-2xl font-bold mb-3">No Results Yet</h2>
              <p className="text-white/60 mb-8">Your lab results will appear here once they are available from Labcorp</p>
              <Link
                href="/patient"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all hover:scale-105"
              >
                View Dashboard <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-black mb-2">{result.lab_panel_name}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
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
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => exportToPDF(result)}
                        className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-500 transition hover:scale-105 shadow-lg shadow-yellow-400/20"
                      >
                        <Download className="w-4 h-4" />
                        Export PDF
                      </button>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        <span className={`px-4 py-2 rounded-full text-sm font-bold border ${
                          result.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          result.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }`}>
                          {result.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {result.provider_notes && (
                    <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4">
                      <p className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Provider Notes
                      </p>
                      <p className="text-sm text-white/90 leading-relaxed">{result.provider_notes}</p>
                      {result.reviewed_by && (
                        <p className="text-xs text-white/60 mt-3 font-medium">— {result.reviewed_by}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h4 className="font-bold mb-6 flex items-center gap-2 text-lg">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Biomarker Analysis
                  </h4>
                  <div className="space-y-8">
                    {result.results_data.map((biomarker, index) => (
                      <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
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

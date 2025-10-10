'use client'

import { useState, useRef, useEffect } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, FileText, Calendar, CheckCircle, Download, Activity, TrendingUp, TrendingDown } from 'lucide-react'

interface BiomarkerData {
  biomarker: string
  value: number
  unit: string
  status: 'optimized' | 'needs-work' | 'at-risk'
  optimalMin: number
  optimalMax: number
  labMin: number
  labMax: number
  description: string
  history: { date: string, value: number }[]
}

const mockBiomarkers: BiomarkerData[] = [
  {
    biomarker: 'Testosterone Total',
    value: 650,
    unit: 'ng/dL',
    status: 'optimized',
    optimalMin: 500,
    optimalMax: 900,
    labMin: 264,
    labMax: 916,
    description: 'Total testosterone in blood',
    history: [
      { date: '2024-07-15', value: 520 },
      { date: '2024-08-20', value: 580 },
      { date: '2024-09-18', value: 610 },
      { date: '2024-10-02', value: 650 },
    ]
  },
  {
    biomarker: 'Vitamin D',
    value: 38,
    unit: 'ng/mL',
    status: 'needs-work',
    optimalMin: 40,
    optimalMax: 80,
    labMin: 30,
    labMax: 100,
    description: 'Vitamin D (25-hydroxyvitamin D)',
    history: [
      { date: '2024-07-15', value: 28 },
      { date: '2024-08-20', value: 32 },
      { date: '2024-09-18', value: 35 },
      { date: '2024-10-02', value: 38 },
    ]
  },
  {
    biomarker: 'Cortisol',
    value: 18.5,
    unit: 'μg/dL',
    status: 'optimized',
    optimalMin: 10,
    optimalMax: 20,
    labMin: 6,
    labMax: 23,
    description: 'Morning cortisol levels',
    history: [
      { date: '2024-07-15', value: 22 },
      { date: '2024-08-20', value: 20 },
      { date: '2024-09-18', value: 19 },
      { date: '2024-10-02', value: 18.5 },
    ]
  },
  {
    biomarker: 'HDL Cholesterol',
    value: 62,
    unit: 'mg/dL',
    status: 'optimized',
    optimalMin: 60,
    optimalMax: 100,
    labMin: 40,
    labMax: 120,
    description: 'High-density lipoprotein (good cholesterol)',
    history: [
      { date: '2024-07-15', value: 55 },
      { date: '2024-08-20', value: 58 },
      { date: '2024-09-18', value: 60 },
      { date: '2024-10-02', value: 62 },
    ]
  },
  {
    biomarker: 'LDL Cholesterol',
    value: 142,
    unit: 'mg/dL',
    status: 'at-risk',
    optimalMin: 50,
    optimalMax: 100,
    labMin: 0,
    labMax: 130,
    description: 'Low-density lipoprotein (bad cholesterol)',
    history: [
      { date: '2024-07-15', value: 155 },
      { date: '2024-08-20', value: 150 },
      { date: '2024-09-18', value: 145 },
      { date: '2024-10-02', value: 142 },
    ]
  },
  {
    biomarker: 'Hemoglobin A1c',
    value: 5.4,
    unit: '%',
    status: 'optimized',
    optimalMin: 4.0,
    optimalMax: 5.6,
    labMin: 4.0,
    labMax: 6.5,
    description: 'Average blood sugar over 3 months',
    history: [
      { date: '2024-07-15', value: 5.8 },
      { date: '2024-08-20', value: 5.6 },
      { date: '2024-09-18', value: 5.5 },
      { date: '2024-10-02', value: 5.4 },
    ]
  },
]

export default function ResultsDemoPage() {
  const { user } = useUser()
  const [hoveredPoint, setHoveredPoint] = useState<{biomarker: string, index: number} | null>(null)

  const BiomarkerCard = ({ biomarker }: { biomarker: BiomarkerData }) => {
    const { value, history } = biomarker
    const containerRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 128 })

    useEffect(() => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 128
        })
      }
    }, [])
    
    let trend: 'up' | 'down' | 'stable' = 'stable'
    if (history.length > 1) {
      const previous = history[history.length - 2].value
      const current = value
      const change = ((current - previous) / previous) * 100
      if (Math.abs(change) > 3) {
        trend = change > 0 ? 'up' : 'down'
      }
    }

    const minVal = Math.min(...history.map(p => p.value)) * 0.95
    const maxVal = Math.max(...history.map(p => p.value)) * 1.05
    const range = maxVal - minVal || 1

    const points = history.map((point, idx) => {
      const x = (idx / (history.length - 1)) * dimensions.width
      const y = dimensions.height - ((point.value - minVal) / range) * dimensions.height
      return { x, y, value: point.value, date: point.date }
    })

    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h4 className="text-lg font-bold mb-1">{biomarker.biomarker}</h4>
            <p className="text-sm text-white/40">{biomarker.description}</p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            biomarker.status === 'optimized' ? 'bg-green-500/20 text-green-400' :
            biomarker.status === 'needs-work' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {biomarker.status === 'optimized' ? 'OPTIMIZED' :
             biomarker.status === 'needs-work' ? 'NEEDS WORK' :
             'AT RISK'}
          </div>
        </div>

        <div className="flex items-end gap-4 mb-6">
          <div className="text-5xl font-black text-white">
            {value}
            <span className="text-xl text-white/40 ml-2">{biomarker.unit}</span>
          </div>
          
          {trend !== 'stable' && (
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

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-xs text-white/50 mb-1">Your optimal zone</div>
            <div className="text-sm font-bold text-green-400">
              {biomarker.optimalMin} - {biomarker.optimalMax} {biomarker.unit}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-xs text-white/50 mb-1">Lab reference range</div>
            <div className="text-sm font-bold text-white/60">
              {biomarker.labMin} - {biomarker.labMax} {biomarker.unit}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="text-xs text-white/50 mb-4 uppercase tracking-wider font-semibold">Historical Trend</div>
          
          <div ref={containerRef} className="h-32 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-white/5" />
              <div className="border-t border-white/10" />
              <div className="border-t border-white/5" />
            </div>

            {dimensions.width > 0 && (
              <>
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <polyline
                    points={points.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2.5"
                  />
                </svg>

                {points.map((point, idx) => {
                  const pointIsOptimal = point.value >= biomarker.optimalMin && point.value <= biomarker.optimalMax
                  const isHovered = hoveredPoint?.biomarker === biomarker.biomarker && hoveredPoint?.index === idx

                  return (
                    <div
                      key={idx}
                      className="absolute"
                      style={{
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ring-2 ring-gray-900 cursor-pointer transition-all ${
                          pointIsOptimal ? 'bg-green-400' : 'bg-blue-400'
                        } ${isHovered ? 'scale-150' : ''}`}
                        onMouseEnter={() => setHoveredPoint({biomarker: biomarker.biomarker, index: idx})}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      
                      {isHovered && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-10">
                          <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-semibold border border-white/20 shadow-xl">
                            {point.value} {biomarker.unit}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </>
            )}

            <div className="absolute inset-x-0 flex justify-between" style={{ top: 'calc(100% + 8px)' }}>
              {history.map((point, idx) => (
                <div 
                  key={idx}
                  className="text-xs text-white/40"
                  style={{ 
                    marginLeft: idx === 0 ? '0' : 'auto',
                    marginRight: idx === history.length - 1 ? '0' : 'auto'
                  }}
                >
                  {new Date(point.date).toLocaleDateString('en-US', { 
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            ADONIS
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/patient/results" className="text-white/70 hover:text-yellow-400 transition text-sm font-medium">
              Back to Results
            </Link>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold">{user?.firstName || 'Demo'}</div>
                <div className="text-xs text-white/60">Lab Results Demo</div>
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
        <Link 
          href="/patient/results" 
          className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Real Results
        </Link>

        <div className="bg-blue-500/20 border border-blue-500/40 rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm font-bold text-blue-400">Demo Mode - Multiple Historical Readings</p>
              <p className="text-xs text-white/60">This shows how your results will look with trend data over time</p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">Lab Results</h1>
          <p className="text-white/60 text-lg">Your biomarkers and personalized optimal zones</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Complete Panel</h3>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  October 2, 2024
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Completed</span>
                </div>
              </div>
            </div>
            
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all border border-white/20">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>

          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="text-sm font-bold text-blue-400 mb-2">Provider Notes</div>
            <p className="text-sm text-white/80 leading-relaxed">
              Great progress on most biomarkers! Your testosterone and HDL cholesterol are trending well. 
              Continue current supplementation for Vitamin D (5000 IU daily). Let's work on reducing LDL 
              cholesterol through dietary modifications - consider increasing omega-3 intake and reducing 
              saturated fats. Your A1c improvement is excellent.
            </p>
            <p className="text-xs text-white/40 mt-2">— Dr. Sarah Johnson</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mockBiomarkers.map((biomarker, index) => (
            <BiomarkerCard key={index} biomarker={biomarker} />
          ))}
        </div>
      </div>
    </div>
  )
}

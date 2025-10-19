'use client'

import { useState, useRef, useEffect } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Calendar, CheckCircle, Download, Activity, TrendingUp, TrendingDown } from 'lucide-react'
import { AccordionContainer, AccordionSection } from '@/app/components/AccordionSection'
import { BIOMARKER_CATEGORIES, categorizeBiomarkers, getCategorySummary } from '@/lib/biomarker-categories'

interface BiomarkerData {
  biomarker: string
  value: number
  unit: string
  status: 'optimized' | 'needs-work' | 'at-risk' | 'normal'
  optimalMin?: number
  optimalMax?: number
  labMin?: number
  labMax?: number
  referenceRange: string
  optimalRange?: string
  description: string
  history: { date: string, value: number }[]
}

// Comprehensive demo data covering all categories
const mockBiomarkers: BiomarkerData[] = [
  // SEX HORMONES
  {
    biomarker: 'Testosterone Total',
    value: 650,
    unit: 'ng/dL',
    status: 'optimized',
    referenceRange: '264 - 916',
    optimalRange: '500 - 900',
    description: 'Total testosterone in blood',
    history: [
      { date: '2024-07-15', value: 520 },
      { date: '2024-08-20', value: 580 },
      { date: '2024-09-18', value: 610 },
      { date: '2024-10-02', value: 650 },
    ]
  },
  {
    biomarker: 'Testosterone Free',
    value: 18.5,
    unit: 'pg/mL',
    status: 'optimized',
    referenceRange: '9 - 30',
    optimalRange: '15 - 25',
    description: 'Unbound, bioavailable testosterone',
    history: [
      { date: '2024-07-15', value: 14.2 },
      { date: '2024-08-20', value: 16.8 },
      { date: '2024-09-18', value: 17.5 },
      { date: '2024-10-02', value: 18.5 },
    ]
  },
  {
    biomarker: 'Estradiol',
    value: 28,
    unit: 'pg/mL',
    status: 'optimized',
    referenceRange: '7.6 - 42.6',
    optimalRange: '20 - 30',
    description: 'Primary estrogen hormone',
    history: [
      { date: '2024-07-15', value: 32 },
      { date: '2024-08-20', value: 30 },
      { date: '2024-09-18', value: 29 },
      { date: '2024-10-02', value: 28 },
    ]
  },
  {
    biomarker: 'DHEA-S',
    value: 420,
    unit: 'μg/dL',
    status: 'optimized',
    referenceRange: '164 - 530',
    optimalRange: '350 - 500',
    description: 'Dehydroepiandrosterone sulfate',
    history: [
      { date: '2024-07-15', value: 380 },
      { date: '2024-08-20', value: 395 },
      { date: '2024-09-18', value: 410 },
      { date: '2024-10-02', value: 420 },
    ]
  },
  {
    biomarker: 'Cortisol',
    value: 14.5,
    unit: 'μg/dL',
    status: 'optimized',
    referenceRange: '6 - 23',
    optimalRange: '10 - 18',
    description: 'Morning cortisol levels',
    history: [
      { date: '2024-07-15', value: 22 },
      { date: '2024-08-20', value: 18 },
      { date: '2024-09-18', value: 16 },
      { date: '2024-10-02', value: 14.5 },
    ]
  },
  {
    biomarker: 'IGF-1',
    value: 245,
    unit: 'ng/mL',
    status: 'optimized',
    referenceRange: '115 - 307',
    optimalRange: '200 - 300',
    description: 'Insulin-like growth factor 1',
    history: [
      { date: '2024-07-15', value: 220 },
      { date: '2024-08-20', value: 230 },
      { date: '2024-09-18', value: 238 },
      { date: '2024-10-02', value: 245 },
    ]
  },
  {
    biomarker: 'SHBG',
    value: 32,
    unit: 'nmol/L',
    status: 'normal',
    referenceRange: '16.5 - 55.9',
    description: 'Sex hormone binding globulin',
    history: [
      { date: '2024-07-15', value: 35 },
      { date: '2024-08-20', value: 34 },
      { date: '2024-09-18', value: 33 },
      { date: '2024-10-02', value: 32 },
    ]
  },
  {
    biomarker: 'Pregnenolone',
    value: 165,
    unit: 'ng/dL',
    status: 'optimized',
    referenceRange: '22 - 237',
    optimalRange: '100 - 200',
    description: 'Precursor to all steroid hormones',
    history: [
      { date: '2024-07-15', value: 145 },
      { date: '2024-08-20', value: 155 },
      { date: '2024-09-18', value: 160 },
      { date: '2024-10-02', value: 165 },
    ]
  },

  // THYROID
  {
    biomarker: 'TSH',
    value: 1.8,
    unit: 'μIU/mL',
    status: 'optimized',
    referenceRange: '0.45 - 4.5',
    optimalRange: '0.5 - 2.5',
    description: 'Thyroid stimulating hormone',
    history: [
      { date: '2024-07-15', value: 2.8 },
      { date: '2024-08-20', value: 2.3 },
      { date: '2024-09-18', value: 2.0 },
      { date: '2024-10-02', value: 1.8 },
    ]
  },
  {
    biomarker: 'T4 Free',
    value: 1.3,
    unit: 'ng/dL',
    status: 'optimized',
    referenceRange: '0.82 - 1.77',
    optimalRange: '1.0 - 1.5',
    description: 'Free thyroxine (thyroid hormone)',
    history: [
      { date: '2024-07-15', value: 1.1 },
      { date: '2024-08-20', value: 1.2 },
      { date: '2024-09-18', value: 1.25 },
      { date: '2024-10-02', value: 1.3 },
    ]
  },
  {
    biomarker: 'T3 Free',
    value: 3.5,
    unit: 'pg/mL',
    status: 'optimized',
    referenceRange: '2.0 - 4.4',
    optimalRange: '3.0 - 4.0',
    description: 'Free triiodothyronine (active thyroid hormone)',
    history: [
      { date: '2024-07-15', value: 2.8 },
      { date: '2024-08-20', value: 3.1 },
      { date: '2024-09-18', value: 3.3 },
      { date: '2024-10-02', value: 3.5 },
    ]
  },

  // CANCER SCREENING
  {
    biomarker: 'PSA',
    value: 0.7,
    unit: 'ng/mL',
    status: 'optimized',
    referenceRange: '0 - 4',
    optimalRange: '0 - 1.0',
    description: 'Prostate specific antigen',
    history: [
      { date: '2024-07-15', value: 0.9 },
      { date: '2024-08-20', value: 0.8 },
      { date: '2024-09-18', value: 0.75 },
      { date: '2024-10-02', value: 0.7 },
    ]
  },

  // METABOLIC PANEL
  {
    biomarker: 'Glucose',
    value: 82,
    unit: 'mg/dL',
    status: 'optimized',
    referenceRange: '65 - 99',
    optimalRange: '70 - 85',
    description: 'Fasting blood sugar',
    history: [
      { date: '2024-07-15', value: 92 },
      { date: '2024-08-20', value: 88 },
      { date: '2024-09-18', value: 85 },
      { date: '2024-10-02', value: 82 },
    ]
  },
  {
    biomarker: 'Hemoglobin A1c',
    value: 5.4,
    unit: '%',
    status: 'optimized',
    referenceRange: '4.0 - 6.5',
    optimalRange: '4.0 - 5.0',
    description: 'Average blood sugar over 3 months',
    history: [
      { date: '2024-07-15', value: 5.8 },
      { date: '2024-08-20', value: 5.6 },
      { date: '2024-09-18', value: 5.5 },
      { date: '2024-10-02', value: 5.4 },
    ]
  },
  {
    biomarker: 'Cholesterol Total',
    value: 185,
    unit: 'mg/dL',
    status: 'normal',
    referenceRange: '100 - 199',
    description: 'Total cholesterol',
    history: [
      { date: '2024-07-15', value: 195 },
      { date: '2024-08-20', value: 190 },
      { date: '2024-09-18', value: 188 },
      { date: '2024-10-02', value: 185 },
    ]
  },
  {
    biomarker: 'HDL Cholesterol',
    value: 62,
    unit: 'mg/dL',
    status: 'optimized',
    referenceRange: '40 - 120',
    optimalRange: '60 - 100',
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
    value: 108,
    unit: 'mg/dL',
    status: 'needs-work',
    referenceRange: '0 - 130',
    optimalRange: '50 - 100',
    description: 'Low-density lipoprotein (bad cholesterol)',
    history: [
      { date: '2024-07-15', value: 125 },
      { date: '2024-08-20', value: 118 },
      { date: '2024-09-18', value: 112 },
      { date: '2024-10-02', value: 108 },
    ]
  },
  {
    biomarker: 'Triglycerides',
    value: 95,
    unit: 'mg/dL',
    status: 'optimized',
    referenceRange: '0 - 150',
    optimalRange: '50 - 100',
    description: 'Blood fat levels',
    history: [
      { date: '2024-07-15', value: 125 },
      { date: '2024-08-20', value: 110 },
      { date: '2024-09-18', value: 102 },
      { date: '2024-10-02', value: 95 },
    ]
  },

  // KIDNEY FUNCTION
  {
    biomarker: 'Creatinine',
    value: 1.0,
    unit: 'mg/dL',
    status: 'normal',
    referenceRange: '0.76 - 1.27',
    description: 'Kidney function marker',
    history: [
      { date: '2024-07-15', value: 1.1 },
      { date: '2024-08-20', value: 1.05 },
      { date: '2024-09-18', value: 1.02 },
      { date: '2024-10-02', value: 1.0 },
    ]
  },
  {
    biomarker: 'eGFR',
    value: 95,
    unit: 'mL/min/1.73',
    status: 'normal',
    referenceRange: '>59',
    description: 'Estimated glomerular filtration rate',
    history: [
      { date: '2024-07-15', value: 92 },
      { date: '2024-08-20', value: 93 },
      { date: '2024-09-18', value: 94 },
      { date: '2024-10-02', value: 95 },
    ]
  },
  {
    biomarker: 'BUN',
    value: 16,
    unit: 'mg/dL',
    status: 'normal',
    referenceRange: '6 - 20',
    description: 'Blood urea nitrogen',
    history: [
      { date: '2024-07-15', value: 18 },
      { date: '2024-08-20', value: 17 },
      { date: '2024-09-18', value: 16.5 },
      { date: '2024-10-02', value: 16 },
    ]
  },

  // LIVER FUNCTION
  {
    biomarker: 'ALT',
    value: 22,
    unit: 'U/L',
    status: 'normal',
    referenceRange: '0 - 44',
    description: 'Alanine aminotransferase',
    history: [
      { date: '2024-07-15', value: 28 },
      { date: '2024-08-20', value: 25 },
      { date: '2024-09-18', value: 23 },
      { date: '2024-10-02', value: 22 },
    ]
  },
  {
    biomarker: 'AST',
    value: 24,
    unit: 'U/L',
    status: 'normal',
    referenceRange: '0 - 40',
    description: 'Aspartate aminotransferase',
    history: [
      { date: '2024-07-15', value: 30 },
      { date: '2024-08-20', value: 27 },
      { date: '2024-09-18', value: 25 },
      { date: '2024-10-02', value: 24 },
    ]
  },
  {
    biomarker: 'Albumin',
    value: 4.5,
    unit: 'g/dL',
    status: 'normal',
    referenceRange: '3.5 - 5.5',
    description: 'Protein made by the liver',
    history: [
      { date: '2024-07-15', value: 4.3 },
      { date: '2024-08-20', value: 4.4 },
      { date: '2024-09-18', value: 4.45 },
      { date: '2024-10-02', value: 4.5 },
    ]
  },

  // COMPLETE BLOOD COUNT
  {
    biomarker: 'WBC',
    value: 6.8,
    unit: 'x10E3/uL',
    status: 'normal',
    referenceRange: '3.4 - 10.8',
    description: 'White blood cells',
    history: [
      { date: '2024-07-15', value: 7.2 },
      { date: '2024-08-20', value: 7.0 },
      { date: '2024-09-18', value: 6.9 },
      { date: '2024-10-02', value: 6.8 },
    ]
  },
  {
    biomarker: 'RBC',
    value: 5.1,
    unit: 'x10E6/uL',
    status: 'normal',
    referenceRange: '4.14 - 5.80',
    description: 'Red blood cells',
    history: [
      { date: '2024-07-15', value: 4.9 },
      { date: '2024-08-20', value: 5.0 },
      { date: '2024-09-18', value: 5.05 },
      { date: '2024-10-02', value: 5.1 },
    ]
  },
  {
    biomarker: 'Hemoglobin',
    value: 15.2,
    unit: 'g/dL',
    status: 'normal',
    referenceRange: '12.6 - 17.7',
    description: 'Oxygen-carrying protein in red blood cells',
    history: [
      { date: '2024-07-15', value: 14.8 },
      { date: '2024-08-20', value: 15.0 },
      { date: '2024-09-18', value: 15.1 },
      { date: '2024-10-02', value: 15.2 },
    ]
  },
  {
    biomarker: 'Hematocrit',
    value: 45.2,
    unit: '%',
    status: 'normal',
    referenceRange: '37.5 - 51.0',
    description: 'Percentage of red blood cells in blood',
    history: [
      { date: '2024-07-15', value: 44.0 },
      { date: '2024-08-20', value: 44.5 },
      { date: '2024-09-18', value: 44.8 },
      { date: '2024-10-02', value: 45.2 },
    ]
  },
  {
    biomarker: 'Platelet Count',
    value: 245,
    unit: 'x10E3/uL',
    status: 'normal',
    referenceRange: '150 - 450',
    description: 'Blood clotting cells',
    history: [
      { date: '2024-07-15', value: 238 },
      { date: '2024-08-20', value: 240 },
      { date: '2024-09-18', value: 242 },
      { date: '2024-10-02', value: 245 },
    ]
  },

  // IRON STUDIES
  {
    biomarker: 'Iron Total',
    value: 95,
    unit: 'ug/dL',
    status: 'normal',
    referenceRange: '38 - 169',
    description: 'Total iron in blood',
    history: [
      { date: '2024-07-15', value: 88 },
      { date: '2024-08-20', value: 91 },
      { date: '2024-09-18', value: 93 },
      { date: '2024-10-02', value: 95 },
    ]
  },
  {
    biomarker: 'Ferritin',
    value: 125,
    unit: 'ng/mL',
    status: 'normal',
    referenceRange: '30 - 400',
    description: 'Iron storage protein',
    history: [
      { date: '2024-07-15', value: 115 },
      { date: '2024-08-20', value: 120 },
      { date: '2024-09-18', value: 122 },
      { date: '2024-10-02', value: 125 },
    ]
  },

  // INFLAMMATION & CARDIOVASCULAR
  {
    biomarker: 'HS CRP',
    value: 0.8,
    unit: 'mg/L',
    status: 'optimized',
    referenceRange: '0 - 3.0',
    optimalRange: '0 - 1.0',
    description: 'High sensitivity C-reactive protein',
    history: [
      { date: '2024-07-15', value: 1.5 },
      { date: '2024-08-20', value: 1.2 },
      { date: '2024-09-18', value: 1.0 },
      { date: '2024-10-02', value: 0.8 },
    ]
  },

  // VITAMINS
  {
    biomarker: 'Vitamin D',
    value: 52,
    unit: 'ng/mL',
    status: 'optimized',
    referenceRange: '30 - 100',
    optimalRange: '40 - 80',
    description: 'Vitamin D (25-hydroxyvitamin D)',
    history: [
      { date: '2024-07-15', value: 38 },
      { date: '2024-08-20', value: 45 },
      { date: '2024-09-18', value: 48 },
      { date: '2024-10-02', value: 52 },
    ]
  },
  {
    biomarker: 'Vitamin B12',
    value: 625,
    unit: 'pg/mL',
    status: 'normal',
    referenceRange: '211 - 946',
    description: 'Vitamin B12 (cobalamin)',
    history: [
      { date: '2024-07-15', value: 580 },
      { date: '2024-08-20', value: 600 },
      { date: '2024-09-18', value: 610 },
      { date: '2024-10-02', value: 625 },
    ]
  },
]

export default function ResultsDemoPage() {
  const { user } = useUser()
  const [hoveredPoint, setHoveredPoint] = useState<{biomarker: string, index: number} | null>(null)

  const getOptimalRange = (biomarkerName: string): string => {
    const biomarker = mockBiomarkers.find(b => b.biomarker === biomarkerName)
    return biomarker?.optimalRange || ''
  }

  const getStatusBadge = (biomarker: BiomarkerData) => {
    if (biomarker.status === 'optimized') {
      return { label: 'OPTIMIZED', color: 'bg-green-500/20 text-green-400' }
    }
    if (biomarker.status === 'needs-work') {
      return { label: 'NEEDS WORK', color: 'bg-yellow-500/20 text-yellow-400' }
    }
    if (biomarker.status === 'at-risk') {
      return { label: 'AT RISK', color: 'bg-red-500/20 text-red-400' }
    }
    return { label: 'NORMAL', color: 'bg-green-500/20 text-green-400' }
  }

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

    const badge = getStatusBadge(biomarker)

    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h4 className="text-lg font-bold mb-1">{biomarker.biomarker}</h4>
            <p className="text-sm text-white/40">{biomarker.description}</p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}>
            {badge.label}
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
              {biomarker.optimalRange || 'Within range'}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-xs text-white/50 mb-1">Lab reference range</div>
            <div className="text-sm font-bold text-white/60">
              {biomarker.referenceRange}
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
                  const pointIsOptimal = biomarker.optimalMin && biomarker.optimalMax ? 
                    point.value >= biomarker.optimalMin && point.value <= biomarker.optimalMax : 
                    true
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

  const categorizedBiomarkers = categorizeBiomarkers(mockBiomarkers.map(b => ({
    ...b,
    optimalRange: getOptimalRange(b.biomarker)
  })))

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
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
          href="/patient" 
          className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="bg-blue-500/20 border border-blue-500/40 rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm font-bold text-blue-400">Demo Mode - Comprehensive Panel with Historical Data</p>
              <p className="text-xs text-white/60">This shows 40+ biomarkers across all categories with trend analysis over time</p>
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
              <h3 className="text-2xl font-bold mb-2">Complete Comprehensive Panel</h3>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  October 2, 2024
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Completed</span>
                </div>
                <div className="text-yellow-400 font-semibold">
                  {mockBiomarkers.length} Biomarkers
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
              Excellent progress across the board! Your testosterone optimization protocol is working beautifully. 
              Continue current supplementation for Vitamin D (5000 IU daily). LDL cholesterol is improving - 
              keep up the omega-3 intake. All thyroid markers are in optimal range. Blood count and liver function excellent.
            </p>
            <p className="text-xs text-white/40 mt-2">— Dr. Sarah Johnson, MD</p>
          </div>
        </div>

        <AccordionContainer>
          {BIOMARKER_CATEGORIES.map(category => {
            const biomarkersInCategory = categorizedBiomarkers.get(category.id) || []
            
            if (biomarkersInCategory.length === 0) {
              return null
            }
            
            const summary = getCategorySummary(biomarkersInCategory)
            
            return (
              <AccordionSection
                key={category.id}
                id={category.id}
                title={category.name}
                icon={category.icon}
                description={category.description}
                biomarkerCount={biomarkersInCategory.length}
                summary={summary}
                defaultExpanded={category.defaultExpanded}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  {biomarkersInCategory.map((biomarker, index) => (
                    <BiomarkerCard key={index} biomarker={biomarker} />
                  ))}
                </div>
              </AccordionSection>
            )
          })}
        </AccordionContainer>
      </div>
    </div>
  )
}

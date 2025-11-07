'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CategorySummaryBadgeProps {
  optimized: number
  needsWork: number
  atRisk: number
}

function CategorySummaryBadge({ optimized, needsWork, atRisk }: CategorySummaryBadgeProps) {
  if (atRisk > 0) {
    return (
      <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-semibold">
        {atRisk} at risk
      </span>
    )
  }
  
  if (needsWork > 0) {
    return (
      <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-semibold">
        {needsWork} need attention
      </span>
    )
  }
  
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-semibold">
      All optimal ✓
    </span>
  )
}

interface AccordionSectionProps {
  id: string
  title: string
  icon: string
  description: string
  biomarkerCount: number
  summary: {
    optimized: number
    needsWork: number
    atRisk: number
  }
  defaultExpanded?: boolean
  children: React.ReactNode
}

export function AccordionSection({
  id,
  title,
  icon,
  description,
  biomarkerCount,
  summary,
  defaultExpanded = false,
  children,
}: AccordionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  
  if (biomarkerCount === 0) {
    return null
  }
  
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{icon}</span>
          <div className="text-left">
            <h3 className="text-xl font-bold text-white flex items-center gap-3 group-hover:text-yellow-400 transition-colors">
              {title}
              <span className="text-sm text-white/40 font-normal">
                {biomarkerCount} biomarker{biomarkerCount !== 1 ? 's' : ''}
              </span>
            </h3>
            <p className="text-sm text-white/60">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {!isExpanded && (
            <CategorySummaryBadge
              optimized={summary.optimized}
              needsWork={summary.needsWork}
              atRisk={summary.atRisk}
            />
          )}
          
          <div className="text-white/60 group-hover:text-yellow-400 transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6 pt-2">
          {children}
        </div>
      )}
    </div>
  )
}

interface AccordionContainerProps {
  children: React.ReactNode
}

export function AccordionContainer({ children }: AccordionContainerProps) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  )
}

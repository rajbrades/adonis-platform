'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { getBrand } from '@/lib/brand'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [treatmentsOpen, setTreatmentsOpen] = useState(false)
  const brand = getBrand()

  const treatments = [
    { name: 'Testosterone Replacement Therapy', href: '/treatments/testosterone-replacement' },
    { name: 'Testosterone Boosters', href: '/treatments/testosterone-boosters' },
    { name: 'Sexual Wellness', href: '/treatments/sexual-wellness' },
    { name: 'Hair Loss Prevention', href: '/treatments/hair' },
    { name: 'Peptide Therapy', href: '/treatments/peptide-therapy' },
    { name: 'Nutrient Therapy', href: '/treatments/nutrient-therapy' },
    { name: 'Longevity & Anti-Aging', href: '/treatments/longevity' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="text-3xl font-black tracking-tight hover:opacity-80 transition-opacity" style={{ color: brand.colors.primary }}>
            {brand.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Treatments Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setTreatmentsOpen(true)}
              onMouseLeave={() => setTreatmentsOpen(false)}
            >
              <button className="flex items-center gap-1 text-white/80 hover:text-white font-semibold transition-colors py-4">
                Treatments
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {treatmentsOpen && (
                <div className="absolute top-full left-0 -mt-2 pt-2 z-[9999]">
                  <div className="w-64 bg-gray-900 border border-white/10 rounded-lg shadow-xl py-2">
                    {treatments.map((treatment) => (
                      <Link
                        key={treatment.href}
                        href={treatment.href}
                        className="block px-4 py-2 text-white/70 hover:bg-white/5 transition-colors"
                        style={{ 
                          '--hover-color': brand.colors.primary 
                        } as React.CSSProperties}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = brand.colors.primary
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        {treatment.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/goals" className="text-white/80 hover:text-white font-semibold transition-colors">
              Goals
            </Link>
            <Link href="/how-it-works" className="text-white/80 hover:text-white font-semibold transition-colors">
              How it Works
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white font-semibold transition-colors">
              About Us
            </Link>
            <Link href="/faq" className="text-white/80 hover:text-white font-semibold transition-colors">
              FAQ
            </Link>
            <Link href="/blog" className="text-white/80 hover:text-white font-semibold transition-colors">
              Blog
            </Link>
            
            <Link 
              href="/consultation"
              className="px-6 py-3 rounded-lg font-bold transition-all duration-300"
              style={{ 
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 space-y-4">
            <button
              onClick={() => setTreatmentsOpen(!treatmentsOpen)}
              className="w-full flex items-center justify-between text-white/80 font-semibold"
            >
              Treatments
              <ChevronDown className={`w-4 h-4 transition-transform ${treatmentsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {treatmentsOpen && (
              <div className="pl-4 space-y-2">
                {treatments.map((treatment) => (
                  <Link
                    key={treatment.href}
                    href={treatment.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-white/60 hover:text-white py-2"
                  >
                    {treatment.name}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/goals" onClick={() => setIsOpen(false)} className="block text-white/80 font-semibold">
              Goals
            </Link>
            <Link href="/how-it-works" onClick={() => setIsOpen(false)} className="block text-white/80 font-semibold">
              How it Works
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block text-white/80 font-semibold">
              About Us
            </Link>
            <Link href="/faq" onClick={() => setIsOpen(false)} className="block text-white/80 font-semibold">
              FAQ
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block text-white/80 font-semibold">
              Blog
            </Link>
            
            <Link 
              href="/consultation"
              onClick={() => setIsOpen(false)}
              className="block text-center px-6 py-3 rounded-lg font-bold transition-all"
              style={{ 
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

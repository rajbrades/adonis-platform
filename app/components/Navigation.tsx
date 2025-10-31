'use client'

import { getTenantConfig } from '@/lib/tenant-config'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

export default function Navigation() {
  const tenant = getTenantConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [treatmentsOpen, setTreatmentsOpen] = useState(false)

  const treatmentSubPages = [
    { name: 'Testosterone Replacement Therapy', href: '/treatments/testosterone-replacement' },
    { name: 'Testosterone Boosters', href: '/treatments/testosterone-boosters' },
    { name: 'Sexual Wellness', href: '/treatments/sexual-wellness' },
    { name: 'Hair', href: '/treatments/hair' },
    { name: 'Peptide Therapy', href: '/treatments/peptide-therapy' },
    { name: 'Nutrient Therapy', href: '/treatments/nutrient-therapy' },
    { name: 'Longevity', href: '/treatments/longevity' }
  ]

  return (
    <header className="bg-black border-b border-white/10 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-3xl font-black" 
            style={{ color: tenant.colors.primary }}
          >
            {tenant.name}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-white hover:text-yellow-400 transition-colors">
                Treatments
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-black border border-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {treatmentSubPages.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link href="/goals" className="text-white hover:text-yellow-400 transition-colors">
              Goals
            </Link>
            <Link href="/how-it-works" className="text-white hover:text-yellow-400 transition-colors">
              How it Works
            </Link>
            <Link href="/lab-testing" className="text-white hover:text-yellow-400 transition-colors">
              Lab Testing
            </Link>
            <Link href="/about" className="text-white hover:text-yellow-400 transition-colors">
              About Us
            </Link>
            <Link href="/faq" className="text-white hover:text-yellow-400 transition-colors">
              FAQ
            </Link>
            <Link href="/blog" className="text-white hover:text-yellow-400 transition-colors">
              Blog
            </Link>
            <Link 
              href="/consultation" 
              className="text-black px-6 py-2 rounded-lg font-bold hover:shadow-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: tenant.colors.primary }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setTreatmentsOpen(!treatmentsOpen)}
                  className="flex items-center justify-between w-full text-white hover:text-yellow-400 transition-colors"
                >
                  Treatments
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${treatmentsOpen ? 'rotate-180' : ''}`} />
                </button>
                {treatmentsOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    {treatmentSubPages.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-white/70 hover:text-yellow-400 transition-colors py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link href="/goals" className="block text-white hover:text-yellow-400 transition-colors" onClick={() => setIsOpen(false)}>
                Goals
              </Link>
              <Link href="/how-it-works" className="block text-white hover:text-yellow-400 transition-colors" onClick={() => setIsOpen(false)}>
                How it Works
              </Link>
              <Link href="/lab-testing" className="block text-white hover:text-yellow-400 transition-colors" onClick={() => setIsOpen(false)}>
                Lab Testing
              </Link>
              <Link href="/about" className="block text-white hover:text-yellow-400 transition-colors" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
              <Link href="/faq" className="block text-white hover:text-yellow-400 transition-colors" onClick={() => setIsOpen(false)}>
                FAQ
              </Link>
              <Link href="/blog" className="block text-white hover:text-yellow-400 transition-colors" onClick={() => setIsOpen(false)}>
                Blog
              </Link>
              <Link 
                href="/consultation" 
                className="block text-black px-6 py-2 rounded-lg font-bold hover:shadow-lg hover:opacity-90 transition-all text-center mt-4"
                style={{ backgroundColor: tenant.colors.primary }}
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

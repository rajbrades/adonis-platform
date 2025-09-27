'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent hover:text-yellow-300 transition-colors">
              ADONIS
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative">
                <button 
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className="flex items-center text-white/90 hover:text-yellow-400 transition-colors font-medium"
                >
                  Services
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {/* Dropdown Menu */}
                {servicesOpen && (
                  <div 
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-yellow-500/20 rounded-lg shadow-2xl py-2"
                  >
                    <Link href="/products" className="block px-4 py-3 text-white/80 hover:text-yellow-400 hover:bg-white/5 transition-colors">
                      <div className="font-medium">Treatment Catalog</div>
                      <div className="text-sm text-white/60">View all available therapies</div>
                    </Link>
                    <Link href="/consultation" className="block px-4 py-3 text-white/80 hover:text-yellow-400 hover:bg-white/5 transition-colors">
                      <div className="font-medium">Medical Consultation</div>
                      <div className="text-sm text-white/60">Start your assessment</div>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/products" className="text-white/90 hover:text-yellow-400 transition-colors font-medium">
                Treatments
              </Link>
              
              <Link href="/how-it-works" className="text-white/90 hover:text-yellow-400 transition-colors font-medium">
                How It Works
              </Link>
              
              <Link href="/science" className="text-white/90 hover:text-yellow-400 transition-colors font-medium">
                Science
              </Link>
              
              <Link href="/about" className="text-white/90 hover:text-yellow-400 transition-colors font-medium">
                About
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/login" className="text-white/90 hover:text-yellow-400 transition-colors font-medium">
                Sign In
              </Link>
              <Link 
                href="/consultation" 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2.5 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white/90 hover:text-yellow-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-yellow-500/20 py-4">
              <div className="space-y-4">
                <Link 
                  href="/products" 
                  className="block text-white/90 hover:text-yellow-400 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Treatments
                </Link>
                <Link 
                  href="/consultation" 
                  className="block text-white/90 hover:text-yellow-400 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Consultation
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="block text-white/90 hover:text-yellow-400 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  href="/science" 
                  className="block text-white/90 hover:text-yellow-400 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Science
                </Link>
                <Link 
                  href="/about" 
                  className="block text-white/90 hover:text-yellow-400 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="pt-4 border-t border-yellow-500/20">
                  <Link 
                    href="/login" 
                    className="block text-white/90 hover:text-yellow-400 transition-colors font-medium mb-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/consultation" 
                    className="block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2.5 rounded-lg font-bold text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent leading-tight">
            PEAK<br />PERFORMANCE<br />UNLOCKED
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            Precision medicine for elite executives. Data-driven hormone optimization with licensed physicians.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              href="/consultation" 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all inline-flex items-center"
            >
              Start Consultation
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link 
              href="/products" 
              className="border-2 border-yellow-400 text-yellow-400 px-12 py-4 rounded-lg text-xl font-bold hover:bg-yellow-400 hover:text-black transition-all"
            >
              View Treatments
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">98%</div>
              <div className="text-white/70">Patient Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">24-48h</div>
              <div className="text-white/70">Lab Review</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">FDA</div>
              <div className="text-white/70">Approved Medications</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">Licensed</div>
              <div className="text-white/70">Medical Providers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 text-yellow-400">
            PREMIUM TREATMENT OPTIONS
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Hormone Optimization</h3>
              <div className="text-2xl font-bold text-white mb-4">From $199/mo</div>
            </div>
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Peptide Therapy</h3>
              <div className="text-2xl font-bold text-white mb-4">From $249/mo</div>
            </div>
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Weight Management</h3>
              <div className="text-2xl font-bold text-white mb-4">From $399/mo</div>
            </div>
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Longevity Protocols</h3>
              <div className="text-2xl font-bold text-white mb-4">From $299/mo</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-black text-black mb-8">
            READY TO OPTIMIZE?
          </h2>
          <p className="text-xl text-black/80 mb-12">
            Join thousands of executives already performing at their peak
          </p>
          <Link 
            href="/consultation" 
            className="bg-black text-yellow-400 px-12 py-4 rounded-lg text-xl font-bold inline-flex items-center"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-black text-yellow-400 mb-4">
            ADONIS
          </div>
          <p className="text-white/70">
            Peak performance medicine for elite executives
          </p>
        </div>
      </footer>
    </div>
  )
}

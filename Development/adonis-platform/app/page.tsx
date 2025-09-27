'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react'
import ThemeSwitcher from './components/ThemeSwitcher'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <div className="min-h-screen theme-bg-primary theme-text-primary">
      {/* Header */}
      <header className="theme-bg-primary/95 backdrop-blur-sm border-b theme-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-black theme-gradient-text hover:opacity-80 transition-opacity">
              ADONIS
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative">
                <button 
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className="flex items-center theme-text-secondary hover:theme-accent transition-colors font-medium"
                >
                  Services
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {servicesOpen && (
                  <div 
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 theme-bg-secondary theme-border rounded-lg shadow-2xl py-2"
                  >
                    <Link href="/products" className="block px-4 py-3 theme-text-secondary hover:theme-accent hover:bg-white/5 transition-colors">
                      <div className="font-medium">Treatment Catalog</div>
                      <div className="text-sm theme-text-muted">View all available therapies</div>
                    </Link>
                    <Link href="/consultation" className="block px-4 py-3 theme-text-secondary hover:theme-accent hover:bg-white/5 transition-colors">
                      <div className="font-medium">Medical Consultation</div>
                      <div className="text-sm theme-text-muted">Start your assessment</div>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/products" className="theme-text-secondary hover:theme-accent transition-colors font-medium">
                Treatments
              </Link>
              
              <Link href="/how-it-works" className="theme-text-secondary hover:theme-accent transition-colors font-medium">
                How It Works
              </Link>
              
              <Link href="/science" className="theme-text-secondary hover:theme-accent transition-colors font-medium">
                Science
              </Link>
              
              <Link href="/about" className="theme-text-secondary hover:theme-accent transition-colors font-medium">
                About
              </Link>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/login" className="theme-text-secondary hover:theme-accent transition-colors font-medium">
                Sign In
              </Link>
              <Link 
                href="/consultation" 
                className="theme-button-primary px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden theme-text-secondary hover:theme-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t theme-border py-4">
              <div className="space-y-4">
                <Link href="/products" className="block theme-text-secondary hover:theme-accent transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Treatments
                </Link>
                <Link href="/consultation" className="block theme-text-secondary hover:theme-accent transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Consultation
                </Link>
                <div className="pt-4 border-t theme-border">
                  <Link href="/consultation" className="block theme-button-primary px-6 py-2.5 rounded-lg font-bold text-center" onClick={() => setMobileMenuOpen(false)}>
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
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-400)] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-500)] opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 theme-gradient-text leading-tight">
            PEAK<br />PERFORMANCE<br />UNLOCKED
          </h1>
          
          <p className="text-xl md:text-2xl theme-text-secondary mb-12 max-w-3xl mx-auto">
            Precision medicine for elite executives. Data-driven hormone optimization with licensed physicians.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              href="/consultation" 
              className="theme-button-primary px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all inline-flex items-center"
            >
              Start Consultation
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link 
              href="/products" 
              className="theme-button-secondary px-12 py-4 rounded-lg text-xl font-bold hover:bg-[var(--primary-500)] hover:text-[var(--secondary-900)] transition-all"
            >
              View Treatments
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold theme-accent">98%</div>
              <div className="theme-text-muted">Patient Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold theme-accent">24-48h</div>
              <div className="theme-text-muted">Lab Review</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold theme-accent">FDA</div>
              <div className="theme-text-muted">Approved Medications</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold theme-accent">Licensed</div>
              <div className="theme-text-muted">Medical Providers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 theme-accent">
            PREMIUM TREATMENT OPTIONS
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Hormone Optimization", price: "From $199/mo" },
              { name: "Peptide Therapy", price: "From $249/mo" },
              { name: "Weight Management", price: "From $399/mo" },
              { name: "Longevity Protocols", price: "From $299/mo" }
            ].map((treatment, index) => (
              <div key={index} className="theme-card border rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold mb-4 theme-accent">{treatment.name}</h3>
                <div className="text-2xl font-bold theme-text-primary mb-4">{treatment.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 theme-accent-bg">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-black text-[var(--secondary-900)] mb-8">
            READY TO OPTIMIZE?
          </h2>
          <p className="text-xl text-[var(--secondary-900)]/80 mb-12">
            Join thousands of executives already performing at their peak
          </p>
          <Link 
            href="/consultation" 
            className="bg-[var(--secondary-900)] text-[var(--primary-500)] px-12 py-4 rounded-lg text-xl font-bold inline-flex items-center hover:bg-[var(--secondary-800)] transition-colors"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="theme-bg-primary border-t theme-border py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-black theme-accent mb-4">
            ADONIS
          </div>
          <p className="theme-text-muted">
            Peak performance medicine for elite executives
          </p>
        </div>
      </footer>

      <ThemeSwitcher />
    </div>
  )
}

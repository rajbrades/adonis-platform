'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-black text-yellow-400">
              ADONIS
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/treatments" className="text-white hover:text-yellow-400 transition-colors duration-300">
                Treatments
              </Link>
              <Link href="/process" className="text-white hover:text-yellow-400 transition-colors duration-300">
                Process
              </Link>
              <Link href="/science" className="text-white hover:text-yellow-400 transition-colors duration-300">
                Science
              </Link>
              <Link href="/about" className="text-white hover:text-yellow-400 transition-colors duration-300">
                About
              </Link>
            </nav>

            <div className="hidden lg:block">
              <Link 
                href="/consultation" 
                className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-500 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
              >
                GET STARTED
              </Link>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white hover:text-yellow-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-[600px] flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-1.5 rounded-full border border-yellow-400/50 text-yellow-400 text-sm font-medium">
              PEAK PERFORMANCE MEDICINE
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Achieve Your <span className="text-yellow-400">Peak</span><br />
            <span className="text-yellow-400">Testosterone Levels</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Data-driven hormone optimization for executives and high-performers. 
            Boost energy, build muscle mass, and feel like your younger self.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/consultation" 
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20 transition-all duration-300"
            >
              START YOUR TRANSFORMATION
            </Link>
            <Link 
              href="/how-it-works" 
              className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all duration-300"
            >
              SEE HOW IT WORKS
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-yellow-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-12">
            Results Guaranteed or Your Money Back
          </h2>
          <p className="text-center text-black/80 mb-12 max-w-3xl mx-auto">
            See a 70% increase in Total Testosterone or your medication is free. Simple as that.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">95%</div>
              <div className="text-sm text-black/70">TESTOSTERONE DECLINE SINCE 1980S</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">2-3x</div>
              <div className="text-sm text-black/70">AVERAGE T-LEVEL INCREASE</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">24hrs</div>
              <div className="text-sm text-black/70">LAB RESULTS & CONSULTATION</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">100%</div>
              <div className="text-sm text-black/70">LICENSED US PHYSICIANS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Advanced Hormone Therapies
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enclomiphene Citrate */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10 hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Enclomiphene Citrate</h3>
              <p className="text-gray-400">
                Pure enclomiphene formula that naturally stimulates testosterone production without the
                estrogenic side effects of traditional clomiphene.
              </p>
            </div>

            {/* Peptide Optimization */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10 hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Peptide Optimization</h3>
              <p className="text-gray-400">
                Advanced peptide therapies including Tesamorelin, Sermorelin, and Pentadeca 
                Arginate for enhanced recovery and growth hormone support.
              </p>
            </div>

            {/* NAD+ & Glutathione */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10 hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">NAD+ & Glutathione</h3>
              <p className="text-gray-400">
                Cellular regeneration and anti-aging protocols to optimize mitochondrial function and combat
                oxidative stress.
              </p>
            </div>

            {/* GLP-1 Therapy */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10 hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">GLP-1 Therapy</h3>
              <p className="text-gray-400">
                Advanced weight management and metabolic optimization using cutting-edge GLP-1
                receptor agonists.
              </p>
            </div>

            {/* Performance Stack */}
            <div className="bg-gray-900 border border-yellow-500/30 rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10 hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Performance Stack</h3>
              <p className="text-gray-400">
                Comprehensive protocols combining multiple therapies for maximum results in energy, body
                composition, and cognitive function.
              </p>
            </div>

            {/* Custom Formulations */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10 hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Custom Formulations</h3>
              <p className="text-gray-400">
                Personalized compound medications tailored to your specific biomarkers and optimization
                goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Your Path to Peak Performance
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-2xl hover:rotate-12 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Lab Analysis</h3>
              <p className="text-gray-400">
                Comprehensive testing, including 40+ biomarkers tracking testosterone, thyroid, 
                hormones, PSA, and metabolic health.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-2xl hover:rotate-12 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Physician Review</h3>
              <p className="text-gray-400">
                Board-certified physicians specialized in hormone optimization review your results 
                and design your protocol.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-2xl hover:rotate-12 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Protocol</h3>
              <p className="text-gray-400">
                FDA-approved medications and custom compounds tailored to your biomarkers, goals, 
                and lifestyle preferences.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-2xl hover:rotate-12 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Continuous Optimization</h3>
              <p className="text-gray-400">
                Monthly monitoring, dose optimization, and ongoing physician guidance to maximize 
                results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Excellence */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Built With Medical Excellence
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            <div>
              <div className="text-yellow-400 font-bold mb-2">Board Certified</div>
              <div className="text-sm text-gray-400">Endocrinology & Internal Medicine</div>
            </div>
            <div>
              <div className="text-yellow-400 font-bold mb-2">Harvard Medical</div>
              <div className="text-sm text-gray-400">Alumni Physicians</div>
            </div>
            <div>
              <div className="text-yellow-400 font-bold mb-2">FDA Registered</div>
              <div className="text-sm text-gray-400">503A Pharmacies</div>
            </div>
            <div>
              <div className="text-yellow-400 font-bold mb-2">HIPAA Compliant</div>
              <div className="text-sm text-gray-400">Medical Records</div>
            </div>
            <div>
              <div className="text-yellow-400 font-bold mb-2">Peer Reviewed</div>
              <div className="text-sm text-gray-400">Evidence Based Protocols</div>
            </div>
            <div>
              <div className="text-yellow-400 font-bold mb-2">Licensed</div>
              <div className="text-sm text-gray-400">All 50 States</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-medium text-black italic mb-8">
            &ldquo;Started the protocol and I will never turn back. The massive improvements to overall quality 
            of life have been worth their weight in gold. Everything from mood to energy has gone up. 
            It made me the man I was genetically intended to be.&rdquo;
          </p>
          <p className="text-black font-bold">— Marcus R., Executive, Verified Patient</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Optimize Your Performance?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of executives and high-performers who have unlocked their genetic potential through data-driven hormone optimization.
          </p>
          <Link 
            href="/consultation" 
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20 transition-all duration-300 inline-block"
          >
            START YOUR TRANSFORMATION TODAY
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-black text-yellow-400 mb-4">ADONIS</div>
              <p className="text-gray-400 text-sm">
                Peak performance medicine for the modern man. Data-driven hormone optimization delivering life-changing results.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Treatments</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/enclomiphene" className="hover:text-yellow-400 transition-colors">Testosterone Optimization</Link></li>
                <li><Link href="/peptides" className="hover:text-yellow-400 transition-colors">Peptide Therapy</Link></li>
                <li><Link href="/nad" className="hover:text-yellow-400 transition-colors">Anti-Aging Protocols</Link></li>
                <li><Link href="/glp1" className="hover:text-yellow-400 transition-colors">GLP-1 Therapy</Link></li>
                <li><Link href="/stack" className="hover:text-yellow-400 transition-colors">Performance Stacks</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact & Schedule</Link></li>
                <li><Link href="/lab-guide" className="hover:text-yellow-400 transition-colors">Lab Testing Guide</Link></li>
                <li><Link href="/faq" className="hover:text-yellow-400 transition-colors">Insurance & Billing</Link></li>
                <li><Link href="/help" className="hover:text-yellow-400 transition-colors">Medical Team</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Science</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/research" className="hover:text-yellow-400 transition-colors">Clinical Studies</Link></li>
                <li><Link href="/biomarkers" className="hover:text-yellow-400 transition-colors">Biomarker Guide</Link></li>
                <li><Link href="/protocols" className="hover:text-yellow-400 transition-colors">Treatment Protocols</Link></li>
                <li><Link href="/safety" className="hover:text-yellow-400 transition-colors">Safety Data</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© 2024 Adonis. All rights reserved. The products and claims made on this site have not been evaluated by the FDA. 
            This information is not intended to diagnose, treat, cure or prevent any disease.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react'
import styles from './page.module.css'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerFlex}>
            <Link href="/" className={styles.logo}>
              ADONIS
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.nav}>
              <div className="relative">
                <button 
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className={`${styles.navLink} flex items-center`}
                >
                  Services
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {servicesOpen && (
                  <div 
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className={styles.dropdown}
                  >
                    <Link href="/products" className={styles.dropdownItem}>
                      <div className="font-medium">Treatment Catalog</div>
                      <div className="text-sm text-white/60">View all available therapies</div>
                    </Link>
                    <Link href="/consultation" className={styles.dropdownItem}>
                      <div className="font-medium">Medical Consultation</div>
                      <div className="text-sm text-white/60">Start your assessment</div>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/products" className={styles.navLink}>Treatments</Link>
              <Link href="/how-it-works" className={styles.navLink}>How It Works</Link>
              <Link href="/science" className={styles.navLink}>Science</Link>
              <Link href="/about" className={styles.navLink}>About</Link>
            </nav>

            {/* CTA Buttons */}
            <div className={styles.ctaContainer}>
              <Link href="/login" className={styles.signInLink}>Sign In</Link>
              <Link href="/consultation" className={styles.primaryButton}>Get Started</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.mobileMenuButton}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={styles.mobileMenu}>
              <div className={styles.mobileMenuContent}>
                <Link href="/products" className={styles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>
                  Treatments
                </Link>
                <Link href="/consultation" className={styles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>
                  Consultation
                </Link>
                <Link href="/how-it-works" className={styles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>
                  How It Works
                </Link>
                <Link href="/science" className={styles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>
                  Science
                </Link>
                <Link href="/about" className={styles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
                <div className={styles.mobileMenuCta}>
                  <Link href="/login" className={`${styles.mobileMenuLink} mb-3`} onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link href="/consultation" className={`${styles.primaryButton} block text-center`} onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBlur1}></div>
          <div className={styles.heroBlur2}></div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            PEAK<br />PERFORMANCE<br />UNLOCKED
          </h1>
          
          <p className={styles.heroSubtitle}>
            Precision medicine for elite executives. Data-driven hormone optimization with licensed physicians.
          </p>

          <div className={styles.heroButtonContainer}>
            <Link href="/consultation" className={styles.heroPrimaryButton}>
              Start Consultation
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link href="/products" className={styles.heroSecondaryButton}>
              View Treatments
            </Link>
          </div>

          <div className={styles.trustIndicators}>
            <div className={styles.trustIndicatorItem}>
              <div className={styles.trustIndicatorNumber}>98%</div>
              <div className={styles.trustIndicatorLabel}>Patient Satisfaction</div>
            </div>
            <div className={styles.trustIndicatorItem}>
              <div className={styles.trustIndicatorNumber}>24-48h</div>
              <div className={styles.trustIndicatorLabel}>Lab Review</div>
            </div>
            <div className={styles.trustIndicatorItem}>
              <div className={styles.trustIndicatorNumber}>FDA</div>
              <div className={styles.trustIndicatorLabel}>Approved Medications</div>
            </div>
            <div className={styles.trustIndicatorItem}>
              <div className={styles.trustIndicatorNumber}>Licensed</div>
              <div className={styles.trustIndicatorLabel}>Medical Providers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className={styles.treatmentSection}>
        <div className={styles.treatmentContainer}>
          <h2 className={styles.treatmentTitle}>PREMIUM TREATMENT OPTIONS</h2>
          
          <div className={styles.treatmentGrid}>
            <div className={styles.treatmentCard}>
              <h3 className={styles.treatmentCardTitle}>Hormone Optimization</h3>
              <div className={styles.treatmentCardPrice}>From $199/mo</div>
            </div>
            <div className={styles.treatmentCard}>
              <h3 className={styles.treatmentCardTitle}>Peptide Therapy</h3>
              <div className={styles.treatmentCardPrice}>From $249/mo</div>
            </div>
            <div className={styles.treatmentCard}>
              <h3 className={styles.treatmentCardTitle}>Weight Management</h3>
              <div className={styles.treatmentCardPrice}>From $399/mo</div>
            </div>
            <div className={styles.treatmentCard}>
              <h3 className={styles.treatmentCardTitle}>Longevity Protocols</h3>
              <div className={styles.treatmentCardPrice}>From $299/mo</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaSectionContainer}>
          <h2 className={styles.ctaSectionTitle}>READY TO OPTIMIZE?</h2>
          <p className={styles.ctaSectionSubtitle}>
            Join thousands of executives already performing at their peak
          </p>
          <Link href="/consultation" className={styles.ctaSectionButton}>
            Start Your Assessment
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>ADONIS</div>
          <p className={styles.footerText}>Peak performance medicine for elite executives</p>
        </div>
      </footer>
    </div>
  )
}

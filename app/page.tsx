import Link from 'next/link'
import { getTenantConfig } from '@/lib/tenant-config'
import { ArrowRight, Zap, TrendingUp, Sparkles, Shield, Heart, Clock, Award, Star, Brain } from 'lucide-react'

export default function HomePage() {
  const tenant = getTenantConfig()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || "adonis"
  const is10X = tenantId === "10x"
  
  // ALL classes defined simply upfront - NO complex template literals
  const bgClass = is10X ? "bg-white" : "bg-gradient-to-br from-black via-gray-900 to-black"
  const textClass = is10X ? "text-black" : "text-white"
  const headingClass = is10X ? "text-black" : "text-white"
  const mutedClass = is10X ? "text-gray-600" : "text-gray-400"
  const cardBgClass = is10X ? "bg-gray-50" : "bg-gray-800/80"
  const cardHoverBgClass = is10X ? "hover:bg-gray-100" : "hover:bg-gray-700/80"
  const borderClass = is10X ? "border-gray-300" : "border-gray-700"
  const sectionBgClass = is10X ? "bg-gray-50" : "bg-black/20"
  const buttonTextColor = is10X ? "#FFFFFF" : "#000000"
  const badgeBgClass = is10X ? "bg-red-50 border-red-200" : "bg-yellow-500/10 border-yellow-500/20"
  const secondaryButtonClass = is10X ? "bg-transparent hover:bg-gray-100 text-black border-2 border-gray-300" : "bg-transparent hover:bg-white/10 text-white border-2 border-gray-700"

  // Build className strings BEFORE the JSX - LARGER SIZES to match production
  const containerClass = `min-h-screen ${bgClass} ${textClass}`
  const heroTextClass = `text-2xl md:text-3xl mb-16 max-w-4xl mx-auto leading-relaxed ${mutedClass}`
  const sectionHeadingClass = `text-5xl md:text-6xl font-bold text-center mb-6 leading-tight ${headingClass}`
  const sectionSubheadingClass = `text-2xl text-center mb-16 max-w-4xl mx-auto leading-relaxed ${mutedClass}`
  const cardClass = `group p-8 rounded-2xl border-2 transition-all ${cardHoverBgClass} ${cardBgClass} ${borderClass}`
  const cardTitleClass = `text-2xl font-bold mb-4 transition-colors ${headingClass}`
  const cardTextClass = `text-base leading-relaxed ${mutedClass}`
  const stepCardClass = `p-8 rounded-2xl border-2 ${cardBgClass} ${borderClass}`
  const featureCardClass = `p-6 rounded-2xl border-2 ${cardBgClass} ${borderClass}`

  return (
    <div className={containerClass}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-6xl">
          <div className={`mb-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border ${badgeBgClass}`}>
            <Sparkles className="w-5 h-5" style={{ color: tenant.colors.primary }} />
            <span className="text-base font-semibold tracking-wide" style={{ color: tenant.colors.primary }}>
              HUMAN OPTIMIZATION MEDICINE
            </span>
          </div>
          
          <h1 className={`text-7xl md:text-8xl font-bold mb-8 tracking-tight leading-none ${headingClass}`}>
            Unlock Your <span style={{ color: tenant.colors.primary }}>Peak</span><br />
            Human Performance
          </h1>
          
          <p className={heroTextClass}>
            Advanced therapies and protocols to optimize your energy, performance, and longevity. 
            Feel stronger, sharper, and more vital than ever before.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-10 py-5 rounded-lg font-bold text-xl hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: tenant.colors.primary,
                color: buttonTextColor
              }}
            >
              START YOUR TRANSFORMATION
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            
            <Link
              href="/how-it-works"
              className={`inline-flex items-center justify-center px-10 py-5 rounded-lg font-bold text-xl transition-all ${secondaryButtonClass}`}
            >
              SEE HOW IT WORKS
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={sectionHeadingClass}>
            Advanced <span style={{ color: tenant.colors.primary }}>Optimization</span> Solutions
          </h2>
          <p className={sectionSubheadingClass}>
            Comprehensive therapies designed to enhance your performance, recovery, and longevity.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/treatments/testosterone-replacement" className={cardClass}>
              <div className="mb-6 w-16 h-16 rounded-xl flex items-center justify-center" 
                style={{ backgroundColor: `${tenant.colors.primary}20` }}>
                <Zap className="w-8 h-8" style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className={cardTitleClass} style={{ ['--hover-color' as any]: tenant.colors.primary }}>
                <span className="group-hover:text-[var(--hover-color)]">Testosterone Replacement</span>
              </h3>
              <p className={cardTextClass}>
                Optimize hormone levels for increased energy, muscle mass, and vitality.
              </p>
            </Link>

            <Link href="/treatments/peptide-therapy" className={cardClass}>
              <div className="mb-6 w-16 h-16 rounded-xl flex items-center justify-center" 
                style={{ backgroundColor: `${tenant.colors.primary}20` }}>
                <TrendingUp className="w-8 h-8" style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className={cardTitleClass} style={{ ['--hover-color' as any]: tenant.colors.primary }}>
                <span className="group-hover:text-[var(--hover-color)]">Peptide Therapy</span>
              </h3>
              <p className={cardTextClass}>
                Advanced peptides for recovery, fat loss, muscle growth, and anti-aging.
              </p>
            </Link>

            <Link href="/treatments/nutrient-therapy" className={cardClass}>
              <div className="mb-6 w-16 h-16 rounded-xl flex items-center justify-center" 
                style={{ backgroundColor: `${tenant.colors.primary}20` }}>
                <Sparkles className="w-8 h-8" style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className={cardTitleClass} style={{ ['--hover-color' as any]: tenant.colors.primary }}>
                <span className="group-hover:text-[var(--hover-color)]">NAD+ Therapy</span>
              </h3>
              <p className={cardTextClass}>
                Boost cellular energy, mental clarity, and longevity at the molecular level.
              </p>
            </Link>

            <Link href="/treatments/nutrient-therapy" className={cardClass}>
              <div className="mb-6 w-16 h-16 rounded-xl flex items-center justify-center" 
                style={{ backgroundColor: `${tenant.colors.primary}20` }}>
                <Shield className="w-8 h-8" style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className={cardTitleClass} style={{ ['--hover-color' as any]: tenant.colors.primary }}>
                <span className="group-hover:text-[var(--hover-color)]">Glutathione</span>
              </h3>
              <p className={cardTextClass}>
                Powerful antioxidant for detoxification, immune support, and cellular health.
              </p>
            </Link>

            <Link href="/treatments/testosterone-boosters" className={cardClass}>
              <div className="mb-6 w-16 h-16 rounded-xl flex items-center justify-center" 
                style={{ backgroundColor: `${tenant.colors.primary}20` }}>
                <Heart className="w-8 h-8" style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className={cardTitleClass} style={{ ['--hover-color' as any]: tenant.colors.primary }}>
                <span className="group-hover:text-[var(--hover-color)]">Enclomiphene Citrate</span>
              </h3>
              <p className={cardTextClass}>
                Natural testosterone optimization while preserving fertility and testicular function.
              </p>
            </Link>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/goals" 
              className="inline-flex items-center gap-2 text-xl font-bold hover:underline"
              style={{ color: tenant.colors.primary }}
            >
              Explore All Optimization Goals
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Your Path to Peak Performance Section */}
      <section className={`py-24 px-6 ${sectionBgClass}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={sectionHeadingClass}>
            Your Path to <span style={{ color: tenant.colors.primary }}>Peak Performance</span>
          </h2>
          <p className={sectionSubheadingClass}>
            A systematic, science-backed approach to optimizing your health and vitality.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={stepCardClass}>
              <div className="mb-8 w-20 h-20 rounded-full flex items-center justify-center mx-auto font-bold text-3xl"
                style={{ 
                  backgroundColor: tenant.colors.primary,
                  color: buttonTextColor
                }}>
                1
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${headingClass}`}>Complete Assessment</h3>
              <p className={`text-center text-base leading-relaxed ${cardTextClass}`}>
                Free health questionnaire analyzed by our medical team. Get lab recommendations within 24-48 hours.
              </p>
            </div>

            <div className={stepCardClass}>
              <div className="mb-8 w-20 h-20 rounded-full flex items-center justify-center mx-auto font-bold text-3xl"
                style={{ 
                  backgroundColor: tenant.colors.primary,
                  color: buttonTextColor
                }}>
                2
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${headingClass}`}>Get Tested & Reviewed</h3>
              <p className={`text-center text-base leading-relaxed ${cardTextClass}`}>
                Comprehensive bloodwork with physician consultation to create your personalized protocol.
              </p>
            </div>

            <div className={stepCardClass}>
              <div className="mb-8 w-20 h-20 rounded-full flex items-center justify-center mx-auto font-bold text-3xl"
                style={{ 
                  backgroundColor: tenant.colors.primary,
                  color: buttonTextColor
                }}>
                3
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${headingClass}`}>Optimize & Thrive</h3>
              <p className={`text-center text-base leading-relaxed ${cardTextClass}`}>
                Receive your treatments with ongoing monitoring and adjustments to maximize results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={sectionHeadingClass}>
            Why Choose <span style={{ color: tenant.colors.primary }}>{is10X ? "10X HEALTH" : "ADONIS"}</span>
          </h2>
          <p className={sectionSubheadingClass}>
            The most advanced human optimization platform designed for high-performers.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={featureCardClass}>
              <div className="mb-6">
                <Shield className="w-12 h-12" style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${headingClass}`}>Licensed Physicians</h3>
              <p className={`text-base leading-relaxed ${cardTextClass}`}>
                All treatments prescribed by board-certified US physicians.
              </p>
            </div>

            <div className={featureCardClass}>
              <div className="mb-6">
                <Star className="w-12 h-12" style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${headingClass}`}>Premium Quality</h3>
              <p className={`text-base leading-relaxed ${cardTextClass}`}>
                Pharmaceutical-grade medications from top US compounding pharmacies.
              </p>
            </div>

            <div className={featureCardClass}>
              <div className="mb-6">
                <Clock className="w-12 h-12" style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${headingClass}`}>Fast Results</h3>
              <p className={`text-base leading-relaxed ${cardTextClass}`}>
                Get your assessment reviewed and recommendations within 24-48 hours.
              </p>
            </div>

            <div className={featureCardClass}>
              <div className="mb-6">
                <Brain className="w-12 h-12" style={{ color: tenant.colors.primary }} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${headingClass}`}>Personalized Care</h3>
              <p className={`text-base leading-relaxed ${cardTextClass}`}>
                Custom protocols designed specifically for your goals and biomarkers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-24 px-6 ${sectionBgClass}`}>
        <div className="max-w-7xl mx-auto">
          <div className={`rounded-3xl p-16 border-2 ${cardBgClass} ${borderClass}`}>
            <h2 className={sectionHeadingClass}>
              Proven <span style={{ color: tenant.colors.primary }}>Results</span>
            </h2>
            <p className={sectionSubheadingClass}>
              Join thousands who have transformed their health through evidence-based optimization.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-16">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: tenant.colors.primary }}>
                  10K+
                </div>
                <div className={`text-base md:text-lg ${mutedClass}`}>PATIENTS OPTIMIZED</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: tenant.colors.primary }}>
                  24-48h
                </div>
                <div className={`text-base md:text-lg ${mutedClass}`}>ASSESSMENT REVIEW TIME</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: tenant.colors.primary }}>
                  98%
                </div>
                <div className={`text-base md:text-lg ${mutedClass}`}>PATIENT SATISFACTION</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: tenant.colors.primary }}>
                  100%
                </div>
                <div className={`text-base md:text-lg ${mutedClass}`}>LICENSED US PHYSICIANS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-bold mb-8 leading-tight ${headingClass}`}>
            Ready to Optimize Your Life?
          </h2>
          
          <p className={`text-2xl mb-12 leading-relaxed ${mutedClass}`}>
            Take the first step toward peak performance, energy, and longevity with a free health assessment.
          </p>

          <Link
            href="/consultation"
            className="inline-flex items-center justify-center px-12 py-6 rounded-lg font-bold text-xl hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: tenant.colors.primary,
              color: buttonTextColor
            }}
          >
            Start Free Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>

          <p className={`mt-8 text-lg ${mutedClass}`}>
            No credit card required • 100% confidential
          </p>
        </div>
      </section>
    </div>
  )
}

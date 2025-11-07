import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Zap, TrendingUp, Sparkles, Shield, Heart, Clock, Brain, Award } from 'lucide-react'

const iconMap = {
  Zap,
  TrendingUp,
  Sparkles,
  Shield,
  Heart,
  Clock,
  Brain,
  Award
}

export default function HomePage() {
  const brand = getBrand()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-6xl">
          <div 
            className="mb-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border"
            style={{ 
              backgroundColor: `${brand.colors.primary}10`,
              borderColor: `${brand.colors.primary}20`
            }}
          >
            <Sparkles className="w-5 h-5" style={{ color: brand.colors.primary }} />
            <span className="text-base font-semibold tracking-wide" style={{ color: brand.colors.primary }}>
              {brand.hero.badge}
            </span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-8 tracking-tight leading-none text-white">
            {brand.hero.title} <span style={{ color: brand.colors.primary }}>{brand.hero.titleHighlight}</span><br />
            Human Performance
          </h1>
          
          <p className="text-2xl md:text-3xl mb-16 max-w-4xl mx-auto leading-relaxed text-gray-400">
            {brand.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-10 py-5 rounded-lg font-bold text-xl hover:opacity-90 transition-opacity"
              style={{ 
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              {brand.hero.ctaPrimary}
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center px-10 py-5 rounded-lg font-bold text-xl transition-all bg-transparent hover:bg-white/10 text-white border-2 border-gray-700"
            >
              {brand.hero.ctaSecondary}
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 leading-tight text-white">
            Advanced <span style={{ color: brand.colors.primary }}>Optimization</span> Solutions
          </h2>
          <p className="text-2xl text-center mb-16 max-w-4xl mx-auto leading-relaxed text-gray-400">
            Comprehensive therapies designed to enhance your performance, recovery, and longevity.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {brand.services.slice(0, 3).map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap]
              return (
                <Link key={service.href} href={service.href} className="group p-8 rounded-2xl border-2 transition-all hover:bg-gray-700/80 bg-gray-800/80 border-gray-700">
                  <div 
                    className="mb-6 w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${brand.colors.primary}10` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: brand.colors.primary }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:opacity-80 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-400">
                    {service.description}
                  </p>
                </Link>
              )
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {brand.services.slice(3).map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap]
              return (
                <Link key={service.href} href={service.href} className="group p-8 rounded-2xl border-2 transition-all hover:bg-gray-700/80 bg-gray-800/80 border-gray-700">
                  <div 
                    className="mb-6 w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${brand.colors.primary}10` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: brand.colors.primary }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:opacity-80 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-400">
                    {service.description}
                  </p>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/treatments"
              className="inline-flex items-center gap-2 font-bold hover:opacity-80 transition-opacity"
              style={{ color: brand.colors.primary }}
            >
              Explore All Optimization Goals
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 text-white">
            Your Path to <span style={{ color: brand.colors.primary }}>Peak Performance</span>
          </h2>
          <p className="text-2xl text-center mb-16 max-w-4xl mx-auto text-gray-400">
            A systematic, science-backed approach to optimizing your health and vitality.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Complete Assessment', desc: 'Free health questionnaire analyzed by our medical team. Get lab recommendations within 24-48 hours.' },
              { num: '2', title: 'Get Your Labs', desc: 'Order comprehensive testing at Quest Diagnostics or upload recent results. We analyze everything.' },
              { num: '3', title: 'Physician Consultation', desc: 'Review results with your provider. Discuss goals. Get personalized treatment protocol.' },
              { num: '4', title: 'Optimize & Monitor', desc: 'Start treatment. Track progress. Adjust protocol. Feel stronger, sharper, better than ever.' }
            ].map((step) => (
              <div key={step.num} className="p-8 rounded-2xl border-2 bg-gray-800/80 border-gray-700 text-center">
                <div 
                  className="mb-6 w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${brand.colors.primary}10` }}
                >
                  <span className="text-3xl font-bold" style={{ color: brand.colors.primary }}>{step.num}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-10 py-5 rounded-lg font-bold text-xl hover:opacity-90 transition-opacity"
              style={{ 
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              START YOUR JOURNEY
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 text-white">
            Why Choose <span style={{ color: brand.colors.primary }}>{brand.name}</span>
          </h2>
          <p className="text-xl text-center mb-16 max-w-4xl mx-auto text-gray-400">
            {brand.whyChoose.sectionSubtitle}
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {brand.whyChoose.items.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              return (
                <div key={item.title} className="p-8 rounded-2xl border-2 bg-gray-800/80 border-gray-700">
                  <div 
                    className="mb-6 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${brand.colors.primary}10` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: brand.colors.primary }} />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border-2 border-gray-800 bg-gray-900/50 p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">
              {brand.stats.title}
            </h2>
            <p className="text-lg text-center mb-16 max-w-3xl mx-auto text-gray-400">
              {brand.stats.subtitle}
            </p>

            <div className="grid md:grid-cols-4 gap-12">
              {brand.stats.items.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-3" style={{ color: brand.colors.primary }}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-gray-400 tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
              {brand.finalCta.title}
            </h2>
            <p className="text-xl mb-10 text-gray-400">
              {brand.finalCta.subtitle}
            </p>

            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-10 py-5 rounded-lg font-bold text-xl hover:opacity-90 transition-opacity mb-6"
              style={{ 
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              {brand.finalCta.buttonText}
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>

            <p className="text-sm text-gray-500">
              {brand.finalCta.disclaimer}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

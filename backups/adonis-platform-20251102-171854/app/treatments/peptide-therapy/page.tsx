'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Sparkles, TrendingUp, Heart, Brain, Shield, Activity } from 'lucide-react'

export default function PeptideTherapyPage() {
  const brand = getBrand()

  const peptides = [
    { icon: TrendingUp, title: "Growth Hormone Peptides", description: "Enhance muscle growth, fat loss, and recovery" },
    { icon: Heart, title: "BPC-157", description: "Accelerate healing and tissue repair" },
    { icon: Brain, title: "Cognitive Peptides", description: "Improve focus, memory, and mental clarity" },
    { icon: Activity, title: "Performance Peptides", description: "Boost endurance and athletic performance" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Peptide <span style={{ color: brand.colors.primary }}>Therapy</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge peptide treatments to optimize recovery, performance, and longevity.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            Our <span style={{ color: brand.colors.primary }}>Peptide Protocols</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {peptides.map((peptide, index) => {
              const Icon = peptide.icon
              return (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div 
                    className="mb-6 w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${brand.colors.primary}10` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: brand.colors.primary }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{peptide.title}</h3>
                  <p className="text-white/60">{peptide.description}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8" style={{ color: brand.colors.primary }} />
              Why Peptides?
            </h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Peptides are short chains of amino acids that act as signaling molecules in the body. 
              They can enhance natural processes like muscle growth, fat loss, recovery, and cognitive function 
              with minimal side effects.
            </p>
            <p className="text-white/60 leading-relaxed">
              Our physician-supervised peptide protocols are customized to your specific goals and monitored 
              for safety and effectiveness.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm rounded-2xl p-12 text-center border"
            style={{ 
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
              borderColor: `${brand.colors.primary}20`
            }}>
            <h2 className="text-4xl font-black mb-6">
              Start <span style={{ color: brand.colors.primary }}>Peptide Therapy</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Discover how peptides can optimize your performance and recovery.
            </p>
            
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300"
              style={{
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Learn More
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

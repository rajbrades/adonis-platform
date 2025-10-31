import Link from 'next/link'
import { getTenantConfig } from "@/lib/tenant-config"
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function PeptideTherapyPage() {
  const tenant = getTenantConfig()
  const peptides = [
    {
      name: "Sermorelin",
      category: "Growth Hormone Releasing Hormone",
      benefits: ["Increased natural GH production", "Improved sleep quality", "Enhanced muscle growth", "Better recovery"]
    },
    {
      name: "Tesamorelin",
      category: "Growth Hormone Releasing Hormone",
      benefits: ["Reduces visceral fat", "Improves body composition", "Enhances cognitive function", "Boosts energy"]
    },
    {
      name: "IGF-1 LR3",
      category: "Insulin-like Growth Factor",
      benefits: ["Accelerated muscle growth", "Enhanced recovery", "Improved protein synthesis", "Fat loss support"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Peptide <span className="text-yellow-400">Therapy</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced peptide protocols for enhanced recovery, fat loss, muscle growth, and anti-aging benefits.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">Featured <span className="text-yellow-400">Peptides</span></h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Cutting-edge peptide compounds for optimal performance and longevity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {peptides.map((peptide, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">{peptide.name}</h3>
                <p className="text-yellow-400 text-sm mb-6">{peptide.category}</p>
                
                <div className="space-y-3">
                  {peptide.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center text-sm text-white/60">
                      <CheckCircle className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">Explore <span className="text-yellow-400">Peptide Therapy</span></h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Discover how advanced peptides can optimize your performance and recovery.
            </p>
            <Link 
              href="/consultation"
              className="inline-flex items-center " style={{ backgroundColor: tenant.colors.primary }} className="text-black px-12 py-4 rounded-lg text-lg font-bold hover:opacity-90 hover:shadow-2xl hover:shadow-[oklch(90.5%_0.182_98.111)]/50 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Assessment
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

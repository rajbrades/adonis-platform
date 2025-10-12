import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function TestosteroneReplacementPage() {
  const benefits = [
    "Increased energy and vitality",
    "Enhanced muscle mass and strength",
    "Improved mood and mental clarity",
    "Better sleep quality",
    "Increased libido and sexual performance",
    "Enhanced fat loss",
    "Improved bone density",
    "Better cardiovascular health"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Testosterone <span className="text-yellow-400">Replacement Therapy</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Clinically proven testosterone optimization for men experiencing low T symptoms. 
            Restore your energy, strength, and confidence with physician-supervised TRT.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black mb-6">Transform Your <span className="text-yellow-400">Life</span></h2>
              <p className="text-white/60 mb-8 text-lg leading-relaxed">
                Testosterone Replacement Therapy (TRT) is the gold standard for treating clinically low testosterone. 
                Our physician-supervised protocols help restore your hormone levels to optimal ranges.
              </p>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                    <span className="text-white/60">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Treatment Timeline</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-yellow-400/10 w-10 h-10 rounded-xl flex items-center justify-center text-yellow-400 font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold mb-1">Week 1-2</h4>
                    <p className="text-white/60 text-sm">Initial energy improvements and mood enhancement</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-400/10 w-10 h-10 rounded-xl flex items-center justify-center text-yellow-400 font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold mb-1">Week 3-6</h4>
                    <p className="text-white/60 text-sm">Increased libido, better sleep, and mental clarity</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-400/10 w-10 h-10 rounded-xl flex items-center justify-center text-yellow-400 font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold mb-1">Month 3-6</h4>
                    <p className="text-white/60 text-sm">Visible muscle growth and body composition changes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">Ready to Optimize Your <span className="text-yellow-400">Testosterone?</span></h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Start your journey to peak performance with physician-supervised TRT.
            </p>
            <Link 
              href="/consultation"
              className="inline-flex items-center bg-yellow-400 text-black px-12 py-4 rounded-lg text-lg font-bold hover:bg-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
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

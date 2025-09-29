import Link from 'next/link'
import { ArrowRight, Zap, TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react'
import Navigation from '../../components/Navigation'

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

  const protocols = [
    {
      name: "Injectable Testosterone",
      description: "Weekly or bi-weekly injections for optimal hormone levels",
      pros: ["Most cost-effective", "Proven results", "Flexible dosing"],
      frequency: "Weekly"
    },
    {
      name: "Testosterone Gel",
      description: "Daily topical application for steady hormone levels",
      pros: ["Easy application", "Steady levels", "No injections"],
      frequency: "Daily"
    },
    {
      name: "Testosterone Pellets",
      description: "Long-acting pellets inserted under the skin",
      pros: ["3-6 month duration", "Consistent levels", "Convenient"],
      frequency: "Quarterly"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">
            Testosterone Replacement Therapy
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Clinically proven testosterone optimization for men experiencing low T symptoms. 
            Restore your energy, strength, and confidence with physician-supervised TRT.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 text-yellow-400">Transform Your Life</h2>
              <p className="text-white/80 mb-8 text-lg">
                Testosterone Replacement Therapy (TRT) is the gold standard for treating clinically low testosterone. 
                Our physician-supervised protocols help restore your hormone levels to optimal ranges, 
                allowing you to feel like your younger self again.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                    <span className="text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Treatment Timeline</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">1</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Weeks 1-2</h4>
                    <p className="text-white/70">Initial energy improvements and mood stabilization</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">2</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Weeks 3-6</h4>
                    <p className="text-white/70">Increased libido, better sleep, and mental clarity</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">3</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Weeks 8-12</h4>
                    <p className="text-white/70">Muscle growth, fat loss, and strength improvements</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">4</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">3-6 Months</h4>
                    <p className="text-white/70">Maximum benefits achieved with optimized body composition</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Treatment Options</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We offer multiple delivery methods to fit your lifestyle and preferences. 
              All protocols are customized based on your lab results and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {protocols.map((protocol, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{protocol.name}</h3>
                <p className="text-white/70 mb-6">{protocol.description}</p>
                
                <div className="mb-6">
                  <div className="text-yellow-400 font-bold mb-2">Frequency</div>
                  <div className="text-white/80">{protocol.frequency}</div>
                </div>
                
                <div className="space-y-2">
                  {protocol.pros.map((pro, idx) => (
                    <div key={idx} className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                      <span className="text-white/80 text-sm">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Safety & Monitoring</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Your safety is our priority. All TRT protocols include comprehensive monitoring 
              and physician oversight to ensure optimal results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <Shield className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Licensed Physicians</h3>
              <p className="text-white/70 text-sm">Board-certified doctors oversee all treatments</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <Clock className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Regular Monitoring</h3>
              <p className="text-white/70 text-sm">Monthly check-ins and quarterly lab work</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <TrendingUp className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Dose Optimization</h3>
              <p className="text-white/70 text-sm">Personalized adjustments based on your response</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
              <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-yellow-400">24/7 Support</h3>
              <p className="text-white/70 text-sm">Access to medical team whenever you need</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Optimize Your Testosterone?</h2>
          <p className="text-xl text-white/70 mb-8">
            Start your journey to increased energy, strength, and confidence with physician-supervised TRT.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Get Your Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

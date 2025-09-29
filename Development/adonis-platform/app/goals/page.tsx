import Link from 'next/link'
import { ArrowRight, Target, TrendingUp, Zap, Shield, Clock, Award } from 'lucide-react'
import Navigation from '../components/Navigation'

export default function GoalsPage() {
  const goals = [
    {
      icon: <Zap className="w-12 h-12 text-yellow-400" />,
      title: "Increase Energy & Vitality",
      description: "Combat fatigue and low energy that's holding you back from peak performance.",
      benefits: ["All-day sustained energy", "Mental clarity and focus", "Improved motivation", "Better workout performance"],
      treatments: ["Testosterone Replacement", "Nutrient Therapy", "Peptide Therapy"]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-yellow-400" />,
      title: "Build Lean Muscle Mass",
      description: "Optimize your body composition and build the physique you want.",
      benefits: ["Increased muscle growth", "Faster recovery", "Enhanced strength", "Better body composition"],
      treatments: ["Testosterone Optimization", "Peptide Therapy", "Nutrient Therapy"]
    },
    {
      icon: <Target className="w-12 h-12 text-yellow-400" />,
      title: "Sexual Performance & Libido",
      description: "Restore confidence and performance in intimate relationships.",
      benefits: ["Increased libido", "Better performance", "Enhanced confidence", "Stronger relationships"],
      treatments: ["Testosterone Therapy", "Sexual Wellness Program"]
    },
    {
      icon: <Shield className="w-12 h-12 text-yellow-400" />,
      title: "Anti-Aging & Longevity",
      description: "Turn back the clock and optimize your biological age.",
      benefits: ["Slower aging process", "Improved skin quality", "Better sleep", "Enhanced recovery"],
      treatments: ["Longevity Protocol", "Peptide Therapy", "Hormone Optimization"]
    },
    {
      icon: <Clock className="w-12 h-12 text-yellow-400" />,
      title: "Sleep & Recovery",
      description: "Optimize your sleep quality and recovery for peak performance.",
      benefits: ["Deeper sleep", "Faster recovery", "Better mood", "Enhanced focus"],
      treatments: ["Hormone Balancing", "Peptide Therapy", "Nutrient Optimization"]
    },
    {
      icon: <Award className="w-12 h-12 text-yellow-400" />,
      title: "Cognitive Enhancement",
      description: "Sharpen your mental edge and cognitive performance.",
      benefits: ["Improved focus", "Better memory", "Enhanced creativity", "Mental clarity"],
      treatments: ["Testosterone Optimization", "Peptide Therapy", "Nutrient Therapy"]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">
            Your Optimization Goals
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Whether you're looking to increase energy, build muscle, enhance performance, or slow aging, 
            we have targeted treatments to help you achieve your specific goals.
          </p>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-400/40 transition-all">
                <div className="mb-6">{goal.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">{goal.title}</h3>
                <p className="text-white/70 mb-6">{goal.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {goal.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-white/80">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3">Recommended Treatments:</h4>
                  <div className="space-y-2">
                    {goal.treatments.map((treatment, idx) => (
                      <span key={idx} className="inline-block bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {treatment}
                      </span>
                    ))}
                  </div>
                </div>

                <Link 
                  href="/consultation"
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-bold"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Achieve Your Goals?</h2>
          <p className="text-xl text-white/70 mb-8">
            Our personalized approach ensures you get the right treatment for your specific objectives.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Get Your Personalized Plan
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

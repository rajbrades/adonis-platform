'use client'

import Link from 'next/link'
import { 
  Zap, Dumbbell, Scale, Trophy, Moon, Brain, 
  Heart, Clock, Sparkles, ArrowRight, Target
} from 'lucide-react'

export default function GoalsPage() {
  const goals = [
    {
      icon: Zap,
      title: 'Increase Energy & Vitality',
      description: 'Combat fatigue and boost your daily energy levels through optimized hormone balance and targeted supplementation.',
      benefits: ['Enhanced stamina', 'Better focus', 'Increased motivation'],
    },
    {
      icon: Dumbbell,
      title: 'Build Muscle',
      description: 'Optimize testosterone and growth hormone levels to maximize muscle growth and strength gains.',
      benefits: ['Increased muscle mass', 'Faster recovery', 'Better strength gains'],
    },
    {
      icon: Scale,
      title: 'Weight Loss & Body Composition',
      description: 'Achieve your ideal physique through metabolic optimization and personalized hormone therapy.',
      benefits: ['Fat loss', 'Lean muscle retention', 'Improved metabolism'],
    },
    {
      icon: Trophy,
      title: 'Enhanced Athletic Performance',
      description: 'Take your performance to the next level with optimized recovery, endurance, and power output.',
      benefits: ['Better endurance', 'Faster recovery', 'Peak performance'],
    },
    {
      icon: Moon,
      title: 'Improved Sleep Quality',
      description: 'Optimize your sleep hormones for deeper, more restorative rest and better recovery.',
      benefits: ['Deeper sleep', 'Better recovery', 'More energy'],
    },
    {
      icon: Brain,
      title: 'Better Mental Clarity & Focus',
      description: 'Enhance cognitive function and mental performance through hormone optimization.',
      benefits: ['Sharper thinking', 'Better memory', 'Improved focus'],
    },
    {
      icon: Heart,
      title: 'Increased Libido & Sexual Performance',
      description: 'Restore your drive and performance with optimized testosterone and hormone balance.',
      benefits: ['Enhanced libido', 'Better performance', 'Increased confidence'],
    },
    {
      icon: Clock,
      title: 'Anti-Aging & Longevity',
      description: 'Turn back the clock with therapies designed to optimize cellular health and longevity.',
      benefits: ['Slower aging', 'Better vitality', 'Enhanced wellness'],
    },
    {
      icon: Sparkles,
      title: 'Hair Loss Prevention',
      description: 'Combat hair loss with targeted treatments that address the root hormonal causes.',
      benefits: ['Hair regrowth', 'Prevention', 'Fuller hair'],
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-2 mb-6">
            <Target className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400">Your Optimization Goals</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            What Do You Want to <span className="text-yellow-400">Optimize?</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Choose your health optimization goals and let our medical team create a personalized protocol designed specifically for you.
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-yellow-400/50 hover:bg-white/[0.07] transition-all duration-300"
            >
              {/* Icon - Minimal yellow/white only */}
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/10 group-hover:border-yellow-400/30 transition-all duration-300">
                <goal.icon className="w-7 h-7 text-white/70 group-hover:text-yellow-400 transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                {goal.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                {goal.description}
              </p>

              {/* Benefits */}
              <div className="space-y-2">
                {goal.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Start Your <span className="text-yellow-400">Optimization Journey?</span>
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Complete our free health assessment and receive personalized recommendations from our medical team.
          </p>
          <Link
            href="/consultation/intake"
            className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 text-lg"
          >
            Get Started - Free Assessment
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-sm text-white/50 mt-4">
            No credit card required • 100% confidential
          </p>
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">
            How It <span className="text-yellow-400">Works</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Complete Assessment</h3>
              <p className="text-white/60">
                Fill out our comprehensive health questionnaire to help us understand your goals and medical history.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Medical Review</h3>
              <p className="text-white/60">
                A licensed physician reviews your assessment and recommends appropriate lab tests and treatments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Start Optimizing</h3>
              <p className="text-white/60">
                Receive your personalized protocol and begin your journey to peak performance and vitality.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-white/50 text-sm">
            © 2025 Adonis Health. All rights reserved.
          </p>
        </div>
      </div>

    </div>
  )
}

'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { 
  ArrowRight, Zap, Heart, Brain, TrendingUp, 
  Activity, Award, Clock, Sparkles 
} from 'lucide-react'

export default function GoalsPage() {
  const brand = getBrand()
  
  const goals = [
    {
      icon: Zap,
      title: "Increase Energy",
      description: "Optimize hormone levels and metabolic function to experience sustained energy throughout the day.",
      benefits: ["Higher daily energy", "Better stamina", "Reduced fatigue", "Improved motivation"]
    },
    {
      icon: TrendingUp,
      title: "Build Muscle",
      description: "Enhance protein synthesis and recovery for optimal muscle growth and body composition.",
      benefits: ["Faster muscle growth", "Better recovery", "Increased strength", "Improved definition"]
    },
    {
      icon: Activity,
      title: "Lose Weight",
      description: "Optimize metabolic hormones to efficiently burn fat while preserving lean muscle mass.",
      benefits: ["Accelerated fat loss", "Preserved muscle", "Better metabolism", "Sustainable results"]
    },
    {
      icon: Brain,
      title: "Mental Clarity",
      description: "Enhance cognitive function, focus, and mental sharpness through hormonal optimization.",
      benefits: ["Sharper focus", "Better memory", "Clear thinking", "Enhanced productivity"]
    },
    {
      icon: Heart,
      title: "Sexual Wellness",
      description: "Restore libido and sexual performance through balanced hormone optimization.",
      benefits: ["Increased libido", "Better performance", "Enhanced confidence", "Improved satisfaction"]
    },
    {
      icon: Clock,
      title: "Better Sleep",
      description: "Optimize hormones that regulate sleep cycles for deeper, more restorative rest.",
      benefits: ["Deeper sleep", "Faster sleep onset", "Better recovery", "More energy"]
    },
    {
      icon: Award,
      title: "Athletic Performance",
      description: "Maximize strength, endurance, and recovery for peak athletic performance.",
      benefits: ["Greater endurance", "Faster recovery", "Increased power", "Better competition results"]
    },
    {
      icon: Sparkles,
      title: "Anti-Aging",
      description: "Support longevity and vitality through comprehensive hormone optimization.",
      benefits: ["Youthful vitality", "Better skin", "Increased longevity", "Enhanced quality of life"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Your <span style={{ color: brand.colors.primary }}>Optimization</span> Goals
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Whether you want to build muscle, lose fat, increase energy, or enhance performance, 
            we create personalized protocols to help you achieve your goals.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {goals.map((goal, index) => {
              const Icon = goal.icon
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
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">{goal.title}</h3>
                  <p className="text-white/60 mb-6 leading-relaxed">{goal.description}</p>
                  
                  <div className="space-y-3">
                    {goal.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: brand.colors.primary }}
                        ></div>
                        <span className="text-white/70">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
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
              Ready to Achieve Your <span style={{ color: brand.colors.primary }}>Goals?</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Start with a free health assessment and get personalized recommendations from our medical team.
            </p>
            
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300"
              style={{
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Start Free Assessment
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

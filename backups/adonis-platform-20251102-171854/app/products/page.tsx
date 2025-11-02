import Link from 'next/link'

export const dynamic = 'force-dynamic'
import { ArrowLeft, Star, CheckCircle } from 'lucide-react'

export default function ProductsPage() {
  const products = [
    {
      name: "Testosterone Optimization",
      description: "Enclomiphene Citrate therapy for natural hormone balance",
      price: "$199/month",
      features: ["Lab analysis included", "Doctor consultation", "Monthly monitoring"]
    },
    {
      name: "NAD+ Longevity Therapy", 
      description: "Cellular energy restoration and anti-aging support",
      price: "$249/month",
      features: ["Weekly injections", "Energy optimization", "Cognitive enhancement"]
    },
    {
      name: "GLP-1 Weight Management",
      description: "Advanced metabolic optimization for executives", 
      price: "$399/month",
      features: ["Rapid results", "Appetite regulation", "Metabolic reset"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12 pt-20">
          <h1 className="text-5xl font-black mb-6">
            Elite <span className="text-yellow-400">Treatments</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Precision medicine protocols designed for peak performance executives
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
              <p className="text-white/60 mb-6 leading-relaxed">{product.description}</p>
              <div className="text-3xl font-bold mb-6 text-yellow-400">{product.price}</div>
              <ul className="space-y-3 mb-8">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-white/60">
                    <CheckCircle className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-all">
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

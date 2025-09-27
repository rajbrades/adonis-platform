import Link from 'next/link'
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
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-6 text-yellow-400">
            ELITE TREATMENTS
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Precision medicine protocols designed for peak performance executives
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">{product.name}</h3>
              <p className="text-white/70 mb-6">{product.description}</p>
              <div className="text-3xl font-bold mb-6 text-white">{product.price}</div>
              <ul className="space-y-3 mb-8">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-yellow-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-yellow-400 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

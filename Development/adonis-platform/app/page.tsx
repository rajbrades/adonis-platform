import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-black text-yellow-400">
            ADONIS
          </div>
        </nav>
      </header>

      <section className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-black mb-8 text-yellow-400">
            PEAK PERFORMANCE UNLOCKED
          </h1>
          
          <p className="text-xl text-white/80 mb-12">
            Precision medicine for elite executives.
          </p>

          <button className="bg-yellow-400 text-black px-12 py-4 rounded-lg text-xl font-bold">
            Start Consultation
          </button>
        </div>
      </section>
    </div>
  )
}

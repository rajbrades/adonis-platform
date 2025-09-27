import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-3xl font-black text-yellow-400">
            ADONIS
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-black mb-8 text-yellow-400">
            PEAK PERFORMANCE UNLOCKED
          </h1>
          
          <p className="text-xl text-white mb-12">
            Precision medicine for elite executives.
          </p>

          <Link 
            href="/products" 
            className="bg-yellow-400 text-black px-12 py-4 rounded-lg text-xl font-bold block w-fit mx-auto hover:bg-yellow-500"
          >
            Start Consultation →
          </Link>
        </div>
      </div>
    </div>
  )
}

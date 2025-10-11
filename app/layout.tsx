import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from './contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Adonis - Peak Performance Medicine',
  description: 'Data-driven hormone optimization for executives and high-performers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-white/10 z-50">
              <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-black text-yellow-400">
                  ADONIS
                </Link>
                <div className="flex items-center gap-8">
                  <Link href="/treatments" className="text-white/90 hover:text-yellow-400 transition">
                    Treatments
                  </Link>
                  <Link href="/goals" className="text-white/90 hover:text-yellow-400 transition">
                    Goals
                  </Link>
                  <Link href="/how-it-works" className="text-white/90 hover:text-yellow-400 transition">
                    How it Works
                  </Link>
                  <Link href="/lab-testing" className="text-white/90 hover:text-yellow-400 transition">
                    Lab Testing
                  </Link>
                  <Link href="/about" className="text-white/90 hover:text-yellow-400 transition">
                    About Us
                  </Link>
                  <Link href="/faq" className="text-white/90 hover:text-yellow-400 transition">
                    FAQ
                  </Link>
                  <Link href="/blog" className="text-white/90 hover:text-yellow-400 transition">
                    Blog
                  </Link>
                  <Link href="/patient/login" className="text-white/90 hover:text-yellow-400 transition">
                    Patient Portal
                  </Link>
                  <Link 
                    href="/get-started"
                    className="bg-yellow-400 text-black px-6 py-2.5 rounded-lg font-bold hover:bg-yellow-500 transition"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </nav>
            <div className="pt-20">
              {children}
            </div>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

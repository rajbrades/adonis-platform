import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from './contexts/CartContext'
import Navigation from './components/Navigation'

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
            <Navigation />
            {children}
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
// Force rebuild Wed Oct 22 12:22:19 EDT 2025

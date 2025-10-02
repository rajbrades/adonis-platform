'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { CheckCircle, Package, Calendar, Mail } from 'lucide-react'

export default function OrderConfirmationPage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-yellow-400">ADONIS</Link>
          <div className="flex items-center gap-4">
            <span className="text-white/80">Welcome, {user?.firstName}</span>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </div>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-green-500/10 border border-green-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>

        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl text-white/70 mb-8">
          Thank you for your order. Your lab test kit is on its way!
        </p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold mb-6">What's Next?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-full p-3">
                <Package className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Lab Kit Shipment</h3>
                <p className="text-white/70 text-sm">
                  Your at-home lab test kit will arrive within 3-5 business days. It includes everything you need for sample collection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-400/10 border border-blue-400/20 rounded-full p-3">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Complete Your Test</h3>
                <p className="text-white/70 text-sm">
                  Follow the simple instructions included in your kit. Send your sample back using the prepaid shipping label.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-400/10 border border-green-400/20 rounded-full p-3">
                <Mail className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Receive Your Results</h3>
                <p className="text-white/70 text-sm">
                  Results will be available in your patient dashboard within 5-7 days of the lab receiving your sample.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/patient"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            View My Dashboard
          </Link>
          <Link
            href="/"
            className="bg-white/5 border border-white/10 px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

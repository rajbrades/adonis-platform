'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { CheckCircle, FileText, MapPin, Calendar, CheckSquare } from 'lucide-react'

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
          Your lab panels have been ordered. Here's what happens next.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-full p-3 flex-shrink-0">
                <FileText className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">1. Receive Your Lab Requisition</h3>
                <p className="text-white/70 text-sm">
                  Within 24 hours, you'll receive a Labcorp requisition form (PDF) via email. This authorizes the lab tests.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-400/10 border border-blue-400/20 rounded-full p-3 flex-shrink-0">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">2. Visit Any Labcorp Location</h3>
                <p className="text-white/70 text-sm">
                  Present your requisition form at any Labcorp patient service center. No appointment necessary. Find locations at labcorp.com.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-400/10 border border-purple-400/20 rounded-full p-3 flex-shrink-0">
                <CheckSquare className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">3. Results Processing</h3>
                <p className="text-white/70 text-sm">
                  Lab results will be available in your patient dashboard within 5-7 business days. You'll receive an email notification when they're ready.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-400/10 border border-green-400/20 rounded-full p-3 flex-shrink-0">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">4. Results Review Call</h3>
                <p className="text-white/70 text-sm">
                  Once your results are in, we'll schedule a consultation call to review your biomarkers and provide personalized treatment recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-bold mb-2">Important Reminders</h3>
          <ul className="text-sm text-white/70 space-y-2">
            <li>• Fasting may be required for certain panels - check your requisition form</li>
            <li>• Bring a valid photo ID to the lab</li>
            <li>• Most Labcorp locations accept walk-ins, but you can schedule online</li>
            <li>• Keep a copy of your requisition for your records</li>
          </ul>
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

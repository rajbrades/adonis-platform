'use client'
import { getBrand } from "@/lib/brand"

import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { CheckCircle, Mail, MapPin, Clock, Phone, FileText, ArrowRight, Sparkles } from 'lucide-react'

export default function OrderConfirmationPage() {
  const brand = getBrand()
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-green-500/20 blur-3xl animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>
          
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Order Confirmed!
          </h1>
          <p className="text-xl text-white/80 mb-2">
            Welcome to your optimization journey, {user?.firstName}
          </p>
          <p className="text-white/60">
            Your lab order has been successfully placed
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-b border-green-500/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold">What Happens Next</h2>
            </div>
            <p className="text-sm text-white/70">Follow these simple steps to complete your lab testing</p>
          </div>

          <div className="p-8">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">Check Your Email</h3>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
                      WITHIN 24 HOURS
                    </span>
                  </div>
                  <p className="text-white/70 mb-3">
                    We will send your Labcorp requisition PDF to <span className="text-yellow-400 font-semibold">{user?.emailAddresses[0]?.emailAddress}</span>
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <p className="text-sm text-blue-400 font-medium mb-1">Pro Tip</p>
                    <p className="text-sm text-white/70">
                      Save the PDF to your phone for easy access at the lab. No appointment needed!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">Visit Any Labcorp</h3>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold border border-purple-500/30">
                      NO APPOINTMENT
                    </span>
                  </div>
                  <p className="text-white/70 mb-3">
                    Find a convenient Labcorp location near you and bring your requisition PDF
                  </p>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                    <p className="text-sm text-purple-400 font-medium mb-1">Find Your Lab</p>
                    <p className="text-sm text-white/70">
                      Visit labcorp.com to find the nearest location to you
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-500/30">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">Get Your Results</h3>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold border border-yellow-500/30">
                      5-7 BUSINESS DAYS
                    </span>
                  </div>
                  <p className="text-white/70 mb-3">
                    Once Labcorp processes your samples, your results will be available in your dashboard
                  </p>
                  <Link
                    href="/patient/results"
                    className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition font-medium text-sm border border-yellow-500/30"
                  >
                    View Results <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">Consultation Call</h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">
                      PERSONALIZED
                    </span>
                  </div>
                  <p className="text-white/70 mb-3">
                    Our providers will review your results and schedule a call to discuss your personalized optimization plan
                  </p>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <p className="text-sm text-green-400 font-medium mb-1">What to Expect</p>
                    <p className="text-sm text-white/70">
                      We will analyze your biomarkers and recommend specific interventions to optimize your health
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/patient"
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
          >
            <FileText className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition">View Dashboard</h3>
            <p className="text-sm text-white/60 mb-4">
              Track your orders and view your consultation history
            </p>
            <div className="flex items-center text-sm font-semibold text-blue-400 group-hover:gap-2 transition-all">
              Go to Dashboard <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/patient/results"
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
          >
            <Sparkles className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition">Lab Results</h3>
            <p className="text-sm text-white/60 mb-4">
              View your biomarker results when they are ready
            </p>
            <div className="flex items-center text-sm font-semibold text-purple-400 group-hover:gap-2 transition-all">
              View Results <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Need Help?</h3>
          <p className="text-white/70 mb-6">
            Our support team is here to assist you with any questions about your order or the lab testing process
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-xl font-medium">
              <Mail className="w-5 h-5" />
              support@adonis.health
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-xl font-medium">
              <Phone className="w-5 h-5" />
              (123) 456-7890
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

export const dynamic = 'force-dynamic'

import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Upload, FileText, LogOut, Users, FlaskConical } from 'lucide-react'

export default function AdminDashboard() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/sign-in')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">Admin Dashboard</h1>
            <p className="text-white/60">Welcome back, {user.emailAddresses[0]?.emailAddress}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/dashboard/results/upload"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition group"
          >
            <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-400/30 transition mb-4">
              <Upload className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Upload Lab Results</h2>
            <p className="text-white/60">Parse and process PDF lab reports</p>
          </Link>

          <Link
            href="/dashboard/results/view"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition group"
          >
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center group-hover:bg-blue-400/30 transition mb-4">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">View All Results</h2>
            <p className="text-white/60">Browse uploaded lab results</p>
          </Link>

          <Link
            href="/provider"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition group"
          >
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center group-hover:bg-green-400/30 transition mb-4">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Provider Portal</h2>
            <p className="text-white/60">Review consultations & approvals</p>
          </Link>

          <Link
            href="/dashboard/debug-pdf"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition group"
          >
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center group-hover:bg-purple-400/30 transition mb-4">
              <FlaskConical className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Debug PDF Parser</h2>
            <p className="text-white/60">Test PDF parsing functionality</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

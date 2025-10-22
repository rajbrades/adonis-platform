'use client'

export const dynamic = 'force-dynamic'

import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Upload, FileText, LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push('/sign-in')
      } else {
        const role = user.publicMetadata?.role
        if (role !== 'admin') {
          router.push('/unauthorized')
        }
      }
    }
  }, [user, isLoaded, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  const role = user.publicMetadata?.role
  if (role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">Admin Dashboard</h1>
            <p className="text-white/60">Welcome back, {user.firstName || 'Admin'}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/results/upload"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-400/30 transition">
                <Upload className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Upload Lab Results</h2>
                <p className="text-white/60">Parse PDF lab reports</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/results/view"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center group-hover:bg-blue-400/30 transition">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">View All Results</h2>
                <p className="text-white/60">Browse uploaded results</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

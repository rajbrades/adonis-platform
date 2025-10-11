'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Upload, FileText, LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/admin/login')
    }
  }, [isLoaded, user, router])

  const handleSignOut = async () => {
    router.push('/api/auth/signout')
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ADONIS ADMIN
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">
              {user.firstName || user.emailAddresses[0].emailAddress}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-black mb-4">Admin Dashboard</h1>
        <p className="text-xl text-white/60 mb-12">
          Manage lab results and patient data
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin/results/upload" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-yellow-400/50 transition-all">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Upload Lab Results</h2>
              <p className="text-white/60">
                Upload and parse PDF lab reports for patients
              </p>
            </div>
          </Link>

          <Link href="/admin/results/view" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-yellow-400/50 transition-all">
              <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">View Lab Results</h2>
              <p className="text-white/60">
                Search and view all uploaded lab results
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

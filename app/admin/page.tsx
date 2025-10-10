'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Upload, Users, FileText, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ADONIS ADMIN
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">{user?.firstName}</div>
              <div className="text-xs text-white/60">Administrator</div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-black mb-12">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/results/upload"
            className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-2xl p-8 hover:from-yellow-400/30 hover:to-yellow-600/30 transition-all group"
          >
            <Upload className="w-12 h-12 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">Upload Lab Results</h2>
            <p className="text-white/60">Upload PDF lab reports and auto-extract data</p>
          </Link>

          <Link
            href="/admin/patients"
            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
          >
            <Users className="w-12 h-12 text-white/60 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">Manage Patients</h2>
            <p className="text-white/60">View and manage patient accounts</p>
          </Link>

          <Link
            href="/admin/reports"
            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
          >
            <BarChart3 className="w-12 h-12 text-white/60 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">Analytics</h2>
            <p className="text-white/60">View platform analytics</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

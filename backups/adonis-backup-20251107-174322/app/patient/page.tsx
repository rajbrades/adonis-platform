'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getBrand } from '@/lib/brand'
import { FileText, Calendar, ShoppingCart, Pill, User, LogOut } from 'lucide-react'

export default function PatientPortal() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const brand = getBrand()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    router.push('/patient/login')
    return null
  }

  const menuItems = [
    {
      icon: FileText,
      title: 'Lab Results',
      description: 'View your test results and health metrics',
      href: '/patient/results'
    },
    {
      icon: Calendar,
      title: 'Appointments',
      description: 'Schedule and manage consultations',
      href: '/patient/appointments'
    },
    {
      icon: Pill,
      title: 'My Treatments',
      description: 'View current medications and protocols',
      href: '/patient/treatments'
    },
    {
      icon: ShoppingCart,
      title: 'Shop',
      description: 'Browse and order supplements',
      href: '/patient/cart'
    },
    {
      icon: User,
      title: 'Profile',
      description: 'Update your information and preferences',
      href: '/patient/profile'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Welcome back, <span style={{ color: brand.colors.primary }}>{user.firstName}</span>
            </h1>
            <p className="text-white/60 text-lg">Your {brand.name} Health Dashboard</p>
          </div>
          
          <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Exit Portal
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div 
            className="p-6 rounded-2xl border"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
              borderColor: `${brand.colors.primary}20`
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: brand.colors.primary }}>2</div>
            <div className="text-white/60">Active Treatments</div>
          </div>
          
          <div 
            className="p-6 rounded-2xl border"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
              borderColor: `${brand.colors.primary}20`
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: brand.colors.primary }}>3</div>
            <div className="text-white/60">Lab Reports</div>
          </div>
          
          <div 
            className="p-6 rounded-2xl border"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
              borderColor: `${brand.colors.primary}20`
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: brand.colors.primary }}>1</div>
            <div className="text-white/60">Upcoming Appointment</div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${brand.colors.primary}10` }}
                >
                  <Icon className="w-7 h-7" style={{ color: brand.colors.primary }} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
                  {item.title}
                </h3>
                <p className="text-white/60">
                  {item.description}
                </p>
              </Link>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${brand.colors.primary}20` }}
              >
                <FileText className="w-5 h-5" style={{ color: brand.colors.primary }} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Lab Results Available</div>
                <div className="text-sm text-white/60">Your Q3 2024 hormone panel is ready</div>
              </div>
              <div className="text-sm text-white/50">2 days ago</div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${brand.colors.primary}20` }}
              >
                <Pill className="w-5 h-5" style={{ color: brand.colors.primary }} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Treatment Updated</div>
                <div className="text-sm text-white/60">Your protocol was adjusted by Dr. Smith</div>
              </div>
              <div className="text-sm text-white/50">5 days ago</div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${brand.colors.primary}20` }}
              >
                <Calendar className="w-5 h-5" style={{ color: brand.colors.primary }} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Appointment Confirmed</div>
                <div className="text-sm text-white/60">Follow-up consultation scheduled</div>
              </div>
              <div className="text-sm text-white/50">1 week ago</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

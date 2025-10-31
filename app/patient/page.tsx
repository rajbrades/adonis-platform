'use client'

import { getTenantConfig } from '@/lib/tenant-config'
const tenant = getTenantConfig()


export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Clock, FileText, CheckCircle, AlertCircle, ShoppingBag, Calendar, DollarSign, ArrowRight, TrendingUp, Activity, Sparkles, Package } from 'lucide-react'

interface Consultation {
  id: string
  status: string
  optimization_goals: string[]
  created_at: string
  reviewed_at?: string
  provider_notes?: string
  recommended_labs?: any[]
}

interface Order {
  id: string
  items: {
    id: string
    name: string
    price: number
  }[]
  total: number
  status: string
  payment_status: string
  created_at: string
}

export default function PatientDashboard() {
  const { user, isLoaded } = useUser()
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [linkingConsultation, setLinkingConsultation] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      const urlParams = new URLSearchParams(window.location.search)
      const consultationId = urlParams.get('link')
      
      if (consultationId) {
        linkConsultation(consultationId)
      } else {
        fetchData()
      }
    } else {
      setLoading(false)
    }
  }, [isLoaded, user])

  const linkConsultation = async (consultationId: string) => {
    setLinkingConsultation(true)
    try {
      const response = await fetch('/api/patient/link-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consultationId })
      })

      if (response.ok) {
        window.history.replaceState({}, '', '/patient')
        await fetchData()
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error('Error linking consultation:', error)
      setLoading(false)
    } finally {
      setLinkingConsultation(false)
    }
  }

  const fetchData = async () => {
    try {
      const [consultationsRes, ordersRes] = await Promise.all([
        fetch('/api/patient/consultations'),
        fetch('/api/orders')
      ])
      
      const consultationsData = await consultationsRes.json()
      const ordersData = await ordersRes.json()
      
      setConsultations(consultationsData)
      setOrders(ordersData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || loading || linkingConsultation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <div className="text-xl mb-2 font-semibold">
            {linkingConsultation ? 'Linking your consultation...' : 'Loading your dashboard...'}
          </div>
          {linkingConsultation && (
            <p className="text-white/60 text-sm">Setting up your personalized health plan</p>
          )}
        </div>
      </div>
    )
  }

  const pendingCount = consultations.filter(c => c.status === 'pending').length
  const approvedCount = consultations.filter(c => c.status === 'approved').length
  const recentOrder = orders[0]
  const hasActiveConsultation = consultations.some(c => c.status === 'approved')

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-yellow-500/20 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {tenant.name}
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/patient/cart" className="relative">
              <ShoppingBag className="w-5 h-5 text-white/70 hover:text-yellow-400 transition" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold">{user?.firstName} {user?.lastName}</div>
                <div className="text-xs text-white/60">Premium Member</div>
              </div>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-yellow-400/50"
                  }
                }}
              />
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h1 className="text-4xl font-black">Welcome back, {user?.firstName}</h1>
          </div>
          <p className="text-xl text-white/60">Your health optimization journey at a glance</p>
        </div>

        {/* Quick Actions - Prominent CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Link
            href="/patient/results"
            className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-500/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <Activity className="w-10 h-10 mb-4 text-white" />
            <h3 className="text-xl font-bold mb-2">Lab Results</h3>
            <p className="text-sm text-white/80 mb-4">View your biomarker insights</p>
            <div className="flex items-center text-sm font-semibold group-hover:gap-2 transition-all">
              View Results <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/patient/cart"
            className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <ShoppingBag className="w-10 h-10 mb-4 text-white" />
            <h3 className="text-xl font-bold mb-2">Order Labs</h3>
            <p className="text-sm text-white/80 mb-4">Browse and order lab panels</p>
            <div className="flex items-center text-sm font-semibold group-hover:gap-2 transition-all">
              Go to Cart <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/consultation"
            className="group relative overflow-hidden bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-yellow-500/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <FileText className="w-10 h-10 mb-4 text-black" />
            <h3 className="text-xl font-bold mb-2 text-black">New Consultation</h3>
            <p className="text-sm text-black/80 mb-4">Start your optimization plan</p>
            <div className="flex items-center text-sm font-semibold text-black group-hover:gap-2 transition-all">
              Get Started <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-3xl font-black">{pendingCount}</span>
            </div>
            <div className="text-sm font-medium text-white/70">Pending Review</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-3xl font-black">{approvedCount}</span>
            </div>
            <div className="text-sm font-medium text-white/70">Active Plans</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-3xl font-black">{consultations.length}</span>
            </div>
            <div className="text-sm font-medium text-white/70">Consultations</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-3xl font-black">{orders.length}</span>
            </div>
            <div className="text-sm font-medium text-white/70">Lab Orders</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Order Highlight */}
            {recentOrder && (
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold">Latest Order</h3>
                    </div>
                    <p className="text-sm text-white/60">Order #{recentOrder.id.slice(0, 8)}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    recentOrder.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    recentOrder.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {recentOrder.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {recentOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white/5 backdrop-blur-sm rounded-lg p-3">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-bold text-green-400">${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-sm text-white/60">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {new Date(recentOrder.created_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/60 mb-1">Total</div>
                    <div className="text-2xl font-black text-green-400">${recentOrder.total}</div>
                  </div>
                </div>
              </div>
            )}

            {/* All Orders */}
            {orders.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Order History</h2>
                    <p className="text-sm text-white/60">Track your lab panel orders</p>
                  </div>
                  <Link 
                    href="/patient/results"
                    className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition flex items-center gap-1"
                  >
                    View Results <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="divide-y divide-white/10">
                  {orders.map((order, index) => (
                    <div key={order.id} className={`p-6 hover:bg-white/5 transition ${index === 0 ? 'bg-white/5' : ''}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg">Order #{order.id.slice(0, 8)}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {order.items.length} {order.items.length === 1 ? 'panel' : 'panels'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-yellow-400">${order.total}</div>
                          <div className="text-xs text-white/60 mt-1">
                            {order.payment_status === 'paid' ? '✓ Paid' : 'Pending'}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
                            {item.name}
                          </span>
                        ))}
                      </div>

                      <Link
                        href="/patient/results"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition"
                      >
                        View Lab Results <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Consultations */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10">
                <h2 className="text-xl font-bold mb-1">Consultations</h2>
                <p className="text-sm text-white/60">Your health assessments</p>
              </div>

              {consultations.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-sm text-white/60 mb-4">No consultations yet</p>
                  <Link
                    href="/consultation"
                    className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-5 py-2.5 rounded-lg font-bold hover:shadow-lg transition text-sm"
                  >
                    Start Now
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-white/10 max-h-[600px] overflow-y-auto">
                  {consultations.map((consultation) => (
                    <div key={consultation.id} className="p-5 hover:bg-white/5 transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                            consultation.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {consultation.status}
                          </span>
                          <p className="text-xs text-white/60">
                            {new Date(consultation.created_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <Link
                          href={`/patient/consultations/${consultation.id}`}
                          className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition flex items-center gap-1"
                        >
                          View <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {consultation.optimization_goals?.slice(0, 2).map((goal, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-white/10 text-white/80 rounded text-xs"
                          >
                            {goal}
                          </span>
                        ))}
                        {consultation.optimization_goals?.length > 2 && (
                          <span className="px-2 py-0.5 bg-white/10 text-white/80 rounded text-xs">
                            +{consultation.optimization_goals.length - 2}
                          </span>
                        )}
                      </div>

                      {consultation.status === 'approved' && consultation.recommended_labs && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <p className="text-xs font-bold text-green-400">
                            ✓ Plan Ready
                          </p>
                          <p className="text-xs text-green-400/80 mt-0.5">
                            {consultation.recommended_labs.length} labs recommended
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Health Tips Card */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold">Pro Tip</h3>
              </div>
              <p className="text-sm text-white/80 mb-4">
                Regular lab testing helps track your optimization progress. We recommend testing every 3-6 months.
              </p>
              <Link
                href="/patient/cart"
                className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition flex items-center gap-1"
              >
                Order Labs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

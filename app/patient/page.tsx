'use client'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Clock, FileText, CheckCircle, AlertCircle, ShoppingBag, Calendar, DollarSign } from 'lucide-react'

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
    console.log('Patient Dashboard - Clerk status:', { isLoaded, user: user?.id })
    if (isLoaded && user) {
      console.log('Fetching consultations for user:', user.id)
      
      // Check for consultation link query parameter
      const urlParams = new URLSearchParams(window.location.search)
      const consultationId = urlParams.get('link')
      
      if (consultationId) {
        linkConsultation(consultationId)
      } else {
        fetchData()
      }
    } else {
      console.log('Not fetching - isLoaded:', isLoaded, 'user:', !!user)
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
        console.error('Failed to link consultation')
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-2">
            {linkingConsultation ? 'Linking your consultation...' : 'Loading...'}
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-yellow-400">
            ADONIS
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-white/80">Welcome, {user?.firstName}</span>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-white/60">Track your health optimization journey</p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Link
            href="/patient/results"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
          >
            <FileText className="w-5 h-5" />
            View Lab Results
          </Link>
          <Link
            href="/patient/cart"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            View Cart
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold">{pendingCount}</span>
            </div>
            <div className="text-white/60 text-sm">Pending Review</div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold">{approvedCount}</span>
            </div>
            <div className="text-white/60 text-sm">Approved Plans</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold">{consultations.length}</span>
            </div>
            <div className="text-white/60 text-sm">Total Consultations</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold">{orders.length}</span>
            </div>
            <div className="text-white/60 text-sm">Lab Orders</div>
          </div>
        </div>

        {/* Recent Orders Section */}
        {orders.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-lg mb-8">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link 
                href="/patient/results"
                className="text-sm text-yellow-400 hover:text-yellow-300 transition"
              >
                View Lab Results →
              </Link>
            </div>

            <div className="divide-y divide-white/10">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="p-6 hover:bg-white/5 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          Lab Order #{order.id.slice(0, 8)}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${order.total}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm bg-white/5 rounded p-3">
                        <span className="text-white/80">{item.name}</span>
                        <span className="font-semibold">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-white/60">Payment Status: </span>
                      <span className={`font-semibold ${
                        order.payment_status === 'paid' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {order.payment_status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href="/patient/results"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                      >
                        View Results
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {orders.length > 3 && (
              <div className="px-6 py-4 border-t border-white/10 text-center">
                <button className="text-sm text-yellow-400 hover:text-yellow-300 transition">
                  View All {orders.length} Orders
                </button>
              </div>
            )}
          </div>
        )}

        {/* Consultations List */}
        <div className="bg-white/5 border border-white/10 rounded-lg">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-bold">My Consultations</h2>
          </div>

          {consultations.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 mb-4">No consultations yet</p>
              <Link
                href="/consultation"
                className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Start Your Consultation
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {consultations.map((consultation) => (
                <div key={consultation.id} className="p-6 hover:bg-white/5 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          Health Optimization Consultation
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            consultation.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}
                        >
                          {consultation.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/60">
                        Submitted: {new Date(consultation.created_at).toLocaleDateString()}
                      </p>
                      {consultation.reviewed_at && (
                        <p className="text-sm text-white/60">
                          Reviewed: {new Date(consultation.reviewed_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Link
                      href={`/patient/consultations/${consultation.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {consultation.optimization_goals?.map((goal, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>

                  {consultation.status === 'approved' && consultation.recommended_labs && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm font-medium text-green-400 mb-1">
                        Your personalized health plan is ready!
                      </p>
                      <p className="text-xs text-green-400/80">
                        {consultation.recommended_labs.length} lab panels recommended
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

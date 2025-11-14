'use client'
import { getBrand } from "@/lib/brand"

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useCart } from '@/app/contexts/CartContext'
import Link from 'next/link'
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const brand = getBrand()
  const { user } = useUser()
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.emailAddresses?.[0]?.emailAddress || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setOrderComplete(true)
    clearCart()
    setIsProcessing(false)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-black mb-4">Order Complete!</h1>
          <p className="text-white/60 mb-8">
            Your order has been placed successfully. You'll receive a confirmation email shortly.
          </p>
          <Link
            href="/patient"
            className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link href="/patient/cart" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-black mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="First Name"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Last Name"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street Address"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="State"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      placeholder="ZIP Code"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="Card Number"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      placeholder="MM/YY"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                      type="text"
                      required
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      placeholder="CVC"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : `Pay $${total}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-white/60">{item.name} x{item.quantity}</span>
                    <span className="font-semibold">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-yellow-400">${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

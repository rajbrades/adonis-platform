'use client'

import { useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, CreditCard, MapPin, User as UserIcon, Loader2, Shield, Lock, CheckCircle } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'

export default function CheckoutPage() {
  const { user } = useUser()
  const { items, totalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const orderData = {
        consultationId: items[0]?.consultationId || null,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price
        })),
        subtotal: totalPrice,
        processingFee: 0,
        total: totalPrice
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const { order } = await response.json()
      console.log('Order created:', order)

      await new Promise(resolve => setTimeout(resolve, 1000))

      clearCart()
      
      window.location.href = '/patient/order-confirmation'
    } catch (error) {
      console.error('Checkout error:', error)
      alert('There was an error processing your order. Please try again.')
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-yellow-500/20 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ADONIS
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Cart</span>
              </div>
              <div className="w-8 h-0.5 bg-yellow-400"></div>
              <div className="flex items-center gap-2 text-yellow-400">
                <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-xs">2</div>
                <span className="font-medium">Checkout</span>
              </div>
              <div className="w-8 h-0.5 bg-white/20"></div>
              <div className="flex items-center gap-2 text-white/40">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">3</div>
                <span className="font-medium">Confirmation</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold">{user?.firstName}</div>
                <div className="text-xs text-white/60">Secure Checkout</div>
              </div>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10 ring-2 ring-yellow-400/50" } }} />
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link href="/patient/cart" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </Link>

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Lock className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black">Secure Checkout</h1>
              <p className="text-white/60 mt-1">Complete your order to begin your optimization journey</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <UserIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold">Contact Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(555) 123-4567"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold">Billing Address</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="123 Main Street"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Miami"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        placeholder="FL"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        placeholder="33101"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold">Payment Information</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm bg-white/5 rounded-xl p-3">
                      <span className="text-white/80 font-medium">{item.name}</span>
                      <span className="font-bold text-yellow-400">${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span className="font-semibold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Processing Fee</span>
                    <span className="font-semibold text-green-400">FREE</span>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-3xl font-black text-yellow-400">${totalPrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-105"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Complete Order • $${totalPrice}`
                  )}
                </button>

                <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <p className="text-center font-bold text-blue-400 mb-3 text-sm">What Happens Next</p>
                  <div className="space-y-3 text-xs text-white/80">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5 flex-shrink-0">1.</span>
                      <p>Labcorp requisition PDF sent to your email within 24 hours</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5 flex-shrink-0">2.</span>
                      <p>Visit any Labcorp location with your requisition (no appointment needed)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5 flex-shrink-0">3.</span>
                      <p>Results ready in 5-7 days, then we'll schedule your consultation call</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/50">
                  <Shield className="w-4 h-4" />
                  <span>Secure 256-bit SSL encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

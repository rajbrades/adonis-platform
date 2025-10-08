'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Trash2, ShoppingBag, AlertCircle, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'

export default function CartPage() {
  const { user } = useUser()
  const { items, totalPrice, removeFromCart, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-yellow-500/20 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ADONIS
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/patient" className="text-white/70 hover:text-yellow-400 transition text-sm font-medium">
              Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold">{user?.firstName}</div>
                <div className="text-xs text-white/60">Premium Member</div>
              </div>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10 ring-2 ring-yellow-400/50" } }} />
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link href="/patient" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black">Your Cart</h1>
              <p className="text-white/60 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'} selected for optimization</p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-white/40" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
              <p className="text-white/60 mb-8">Start your health optimization journey by browsing our lab panels</p>
              <Link
                href="/patient"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all hover:scale-105"
              >
                Browse Lab Panels <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items - 2 columns */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition">
                          <Sparkles className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                          <p className="text-sm text-white/60 mb-4">{item.description}</p>
                          
                          {/* Features */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium border border-green-500/20 flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              Labcorp Certified
                            </span>
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              5-7 Day Results
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-3xl font-black text-yellow-400">${item.price}</div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition font-medium"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {items.length > 1 && (
                <button
                  onClick={clearCart}
                  className="w-full bg-white/5 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 text-red-400 hover:bg-red-500/10 transition font-medium"
                >
                  Clear All Items
                </button>
              )}
            </div>

            {/* Order Summary Sidebar - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-semibold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Processing Fee</span>
                    <span className="font-semibold text-green-400">FREE</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-3xl font-black text-yellow-400">${totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/patient/checkout"
                  className="block w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-4 rounded-xl font-bold text-center hover:shadow-lg hover:shadow-yellow-500/50 transition-all hover:scale-105 mb-4"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/patient"
                  className="block w-full text-center text-sm text-white/60 hover:text-yellow-400 transition font-medium"
                >
                  Continue Shopping
                </Link>

                {/* What's Included */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="font-bold mb-4 text-sm">What's Included</h3>
                  <div className="space-y-3 text-xs text-white/80">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-400 font-bold">✓</span>
                      </div>
                      <span>Labcorp requisition PDF sent within 24 hours</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-400 font-bold">✓</span>
                      </div>
                      <span>No appointment needed at any Labcorp location</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-400 font-bold">✓</span>
                      </div>
                      <span>Results ready in 5-7 business days</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-400 font-bold">✓</span>
                      </div>
                      <span>Provider consultation call to review results</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                  <Shield className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-blue-400 font-medium">Secure Checkout</p>
                  <p className="text-xs text-blue-400/60 mt-1">256-bit SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

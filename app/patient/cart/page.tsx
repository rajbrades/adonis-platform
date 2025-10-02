'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Trash2, ShoppingCart, CheckCircle } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'

export default function CartPage() {
  const { user } = useUser()
  const router = useRouter()
  const { items, removeFromCart, clearCart, totalPrice, itemCount } = useCart()

  const handleCheckout = () => {
    router.push('/patient/checkout')
  }

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="bg-black border-b border-yellow-500/20">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-black text-yellow-400">ADONIS</Link>
            <div className="flex items-center gap-4">
              <span className="text-white/80">Welcome, {user?.firstName}</span>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
            </div>
          </nav>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-white/60 mb-6">Add lab panels from your consultation to get started</p>
          <Link 
            href="/patient"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            View Consultations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-yellow-400">ADONIS</Link>
          <div className="flex items-center gap-4">
            <span className="text-white/80">Welcome, {user?.firstName}</span>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </div>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/patient" className="inline-flex items-center text-white/70 hover:text-yellow-400 transition-colors mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-white/60">{itemCount} lab panel{itemCount !== 1 ? 's' : ''} selected</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                    <p className="text-sm text-white/70 mb-3">{item.description}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-yellow-400">${item.price}</span>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 text-sm font-semibold transition"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Processing Fee</span>
                  <span>$0</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-yellow-400">${totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all mb-3"
              >
                Proceed to Checkout
              </button>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-green-400 mb-1">Medical-grade testing</p>
                    <p className="text-green-400/80">All panels processed by CLIA-certified labs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

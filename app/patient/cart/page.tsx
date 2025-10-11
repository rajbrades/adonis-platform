'use client'

import { useCart } from '@/app/contexts/CartContext'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react'

export default function PatientCartPage() {
  const { items, removeItem, clearCart, total } = useCart()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/dashboard" className="inline-flex items-center text-white/60 hover:text-yellow-400 transition mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-black">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-white/60 mb-6">Add treatments or supplements to get started</p>
            <Link
              href="/treatments"
              className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Browse Treatments
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                    <p className="text-white/60">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold">${item.price * item.quantity}</div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-3xl font-bold text-yellow-400">${total}</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition"
                >
                  Clear Cart
                </button>
                <button className="flex-1 px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

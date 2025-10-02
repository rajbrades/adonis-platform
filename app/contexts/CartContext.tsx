'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LabPanel {
  id: string
  name: string
  description: string
  price: number
}

interface CartItem extends LabPanel {
  consultationId: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (lab: LabPanel, consultationId: string) => void
  removeFromCart: (labId: string) => void
  clearCart: () => void
  totalPrice: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('adonis-cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('adonis-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (lab: LabPanel, consultationId: string) => {
    setItems(prev => {
      // Check if already in cart
      const exists = prev.find(item => item.id === lab.id)
      if (exists) return prev
      
      return [...prev, { ...lab, consultationId }]
    })
  }

  const removeFromCart = (labId: string) => {
    setItems(prev => prev.filter(item => item.id !== labId))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)
  const itemCount = items.length

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalPrice, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface CartItem {
  type: 'panel' | 'test';
  id: string;
  name: string;
  price: number;
  quantity: number;
  labReview?: boolean;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const VENIPUNCTURE_FEE = 5.00;
  const RESTRICTED_STATES = ['NY', 'NJ', 'RI'];

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('labCart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      setCart(parsed.items || []);
    }
  };

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('labCart', JSON.stringify({ items: newCart, total: calculateTotal(newCart) }));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }
    
    const newCart = cart.map((item, i) =>
      i === index ? { ...item, quantity } : item
    );
    setCart(newCart);
    localStorage.setItem('labCart', JSON.stringify({ items: newCart, total: calculateTotal(newCart) }));
  };

  const calculateSubtotal = (items = cart) => {
    return items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      const labReviewFee = item.labReview ? 199 : 0;
      return sum + itemTotal + labReviewFee;
    }, 0);
  };

  const calculateTotal = (items = cart) => {
    const subtotal = calculateSubtotal(items);
    const venipunctureFee = items.length > 0 ? VENIPUNCTURE_FEE : 0;
    return subtotal + venipunctureFee;
  };

  const validateForm = () => {
    if (!email || !firstName || !lastName || !phone || !address || !city || !state || !zip) {
      setError('Please fill in all required fields');
      return false;
    }

    if (RESTRICTED_STATES.includes(state.toUpperCase())) {
      setError(`Due to state regulations, we cannot process orders for residents of ${state.toUpperCase()}. We apologize for the inconvenience.`);
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setProcessing(true);

    try {
      // Using pre-configured supabase client

      const orderNumber = `ADN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const orderData = {
        order_number: orderNumber,
        customer_email: email,
        customer_first_name: firstName,
        customer_last_name: lastName,
        customer_phone: phone,
        customer_address: {
          address,
          city,
          state,
          zip
        },
        subtotal: calculateSubtotal(),
        venipuncture_fee: VENIPUNCTURE_FEE,
        total: calculateTotal(),
        payment_status: 'pending',
      };

      const { data: order, error: orderError } = await supabase
        .from('lab_orders')
        .insert([orderData])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cart.map(item => ({
        order_id: order.id,
        item_type: item.type,
        panel_id: item.type === 'panel' ? item.id : null,
        test_id: item.type === 'test' ? item.id : null,
        item_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity + (item.labReview ? 199 : 0)
      }));

      const { error: itemsError } = await supabase
        .from('lab_order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      localStorage.removeItem('labCart');

      router.push(`/lab-testing/confirmation?order=${orderNumber}`);
    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message || 'An error occurred during checkout. Please try again.');
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
        <div className="text-center">
          <svg className="w-24 h-24 text-slate-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-slate-400 mb-8">Browse our lab panels to get started</p>
          <Link
            href="/lab-testing"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Lab Testing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="bg-slate-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Address</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-slate-300 mb-2">Street Address *</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2">City *</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">State *</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g., CA"
                        maxLength={2}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 uppercase"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </div>
                  {RESTRICTED_STATES.includes(state.toUpperCase()) && (
                    <div className="bg-red-900/30 border-l-4 border-red-600 p-4 rounded-r-lg">
                      <p className="text-red-400">
                        Due to state regulations, we cannot process orders for residents of {state.toUpperCase()}.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-900/30 border-l-4 border-red-600 p-4 rounded-r-lg">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={processing || RESTRICTED_STATES.includes(state.toUpperCase())}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : 'Complete Order'}
              </button>
            </form>
          </div>

          <div>
            <div className="bg-slate-800 rounded-xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="border-b border-slate-700 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-grow pr-4">
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-slate-400 text-sm">
                          {item.type === 'panel' ? 'Lab Panel' : 'Individual Test'}
                        </div>
                        {item.labReview && (
                          <div className="text-green-400 text-sm mt-1">+ Lab Review ($199)</div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-8 h-8 bg-slate-700 rounded text-white hover:bg-slate-600"
                        >
                          -
                        </button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-8 h-8 bg-slate-700 rounded text-white hover:bg-slate-600"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-white font-semibold">
                        ${((item.price * item.quantity) + (item.labReview ? 199 : 0)).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-700">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Venipuncture Fee</span>
                  <span>${VENIPUNCTURE_FEE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-white pt-3 border-t border-slate-700">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-slate-300">
                  <div className="mb-2">✓ Requisition form sent within 1-2 business days</div>
                  <div className="mb-2">✓ Results within 14 business days</div>
                  <div>✓ HSA/FSA eligible via TrueMed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
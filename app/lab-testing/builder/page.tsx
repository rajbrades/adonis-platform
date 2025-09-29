'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  sample_type: string;
  category_id: string;
  category_name: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CartItem {
  test: LabTest;
  quantity: number;
}

export default function LabBuilderPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tests, setTests] = useState<LabTest[]>([]);
  const [filteredTests, setFilteredTests] = useState<LabTest[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const VENIPUNCTURE_FEE = 5.00;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterTests();
  }, [selectedCategory, searchTerm, tests]);

  const fetchData = async () => {
    try {
      // Using pre-configured supabase client

      const { data: categoriesData, error: categoriesError } = await supabase
        .from('lab_categories')
        .select('*')
        .order('display_order');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      const { data: testsData, error: testsError } = await supabase
        .from('lab_tests')
        .select(`
          *,
          lab_categories:category_id (
            name
          )
        `)
        .eq('is_active', true)
        .order('name');

      if (testsError) throw testsError;

      const formattedTests = testsData.map((test: any) => ({
        ...test,
        category_name: test.lab_categories?.name || 'Other'
      }));

      setTests(formattedTests);
      setFilteredTests(formattedTests);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTests = () => {
    let filtered = tests;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(test => test.category_id === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(test =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTests(filtered);
  };

  const addToCart = (test: LabTest) => {
    const existingItem = cart.find(item => item.test.id === test.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.test.id === test.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { test, quantity: 1 }]);
    }
  };

  const removeFromCart = (testId: string) => {
    setCart(cart.filter(item => item.test.id !== testId));
  };

  const updateQuantity = (testId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(testId);
    } else {
      setCart(cart.map(item =>
        item.test.id === testId ? { ...item, quantity } : item
      ));
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.test.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + (cart.length > 0 ? VENIPUNCTURE_FEE : 0);
  };

  const proceedToCheckout = () => {
    const customPanel = {
      items: cart.map(item => ({
        type: 'test',
        id: item.test.id,
        name: item.test.name,
        price: item.test.price,
        quantity: item.quantity
      })),
      total: calculateTotal()
    };

    localStorage.setItem('labCart', JSON.stringify(customPanel));
    router.push('/lab-testing/cart');
  };

  const testsByCategory = filteredTests.reduce((acc: any, test) => {
    const category = test.category_name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(test);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/lab-testing"
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Lab Testing
          </Link>
          
          <h1 className="text-5xl font-bold text-white mb-6">
            Lab Builder
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Build your custom lab panel by selecting individual biomarkers. Choose the tests that matter most for your health goals.
          </p>
        </div>
      </section>

      <div className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-slate-800 rounded-xl p-6 mb-6">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    All Tests
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="text-slate-400 mt-4">Loading tests...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(testsByCategory).map(([category, categoryTests]: [string, any]) => (
                    <div key={category} className="bg-slate-800 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {categoryTests.map((test: LabTest) => {
                          const inCart = cart.find(item => item.test.id === test.id);
                          return (
                            <div
                              key={test.id}
                              className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                            >
                              <div className="flex-grow">
                                <div className="text-white font-medium mb-1">{test.name}</div>
                                {test.description && (
                                  <div className="text-slate-400 text-sm mb-2">{test.description}</div>
                                )}
                                <div className="text-slate-400 text-xs">
                                  {test.sample_type} • ${test.price.toFixed(2)}
                                </div>
                              </div>
                              <button
                                onClick={() => addToCart(test)}
                                className={`ml-4 px-6 py-2 rounded-lg font-semibold transition-colors ${
                                  inCart
                                    ? 'bg-green-600 text-white'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                              >
                                {inCart ? `In Cart (${inCart.quantity})` : 'Add'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  
                  {filteredTests.length === 0 && (
                    <div className="bg-slate-800 rounded-xl p-12 text-center">
                      <p className="text-slate-400">No tests found matching your criteria.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-slate-800 rounded-xl p-6 border-2 border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-6">Your Custom Panel</h3>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-slate-400">No tests selected yet</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.test.id} className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-white font-medium text-sm flex-grow pr-2">
                              {item.test.name}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.test.id)}
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
                                onClick={() => updateQuantity(item.test.id, item.quantity - 1)}
                                className="w-7 h-7 bg-slate-600 rounded text-white hover:bg-slate-500"
                              >
                                -
                              </button>
                              <span className="text-white w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.test.id, item.quantity + 1)}
                                className="w-7 h-7 bg-slate-600 rounded text-white hover:bg-slate-500"
                              >
                                +
                              </button>
                            </div>
                            <div className="text-white font-semibold">
                              ${(item.test.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-700 pt-4 mb-6 space-y-2">
                      <div className="flex justify-between text-slate-300">
                        <span>Subtotal</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Venipuncture Fee</span>
                        <span>${VENIPUNCTURE_FEE.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-slate-700">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={proceedToCheckout}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                    >
                      Proceed to Checkout
                    </button>

                    <div className="mt-4 text-center text-sm text-slate-400">
                      <div className="mb-1">{cart.length} test{cart.length !== 1 ? 's' : ''} selected</div>
                      <div>HSA/FSA eligible via TrueMed</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
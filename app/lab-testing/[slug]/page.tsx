'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';

interface LabPanel {
  id: string;
  name: string;
  slug: string;
  description: string;
  detailed_description: string;
  price: number;
  panel_type: string;
  biomarker_count: number;
  best_for: string;
  meets_treatment_requirements: boolean;
}

interface LabTest {
  id: string;
  name: string;
  description: string;
  category_name: string;
}

export default function PanelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const [panel, setPanel] = useState<LabPanel | null>(null);
  const [tests, setTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [labReview, setLabReview] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPanelDetails();
    }
  }, [slug]);

  const fetchPanelDetails = async () => {
    try {
      const supabase = createClient();
      
      const { data: panelData, error: panelError } = await supabase
        .from('lab_panels')
        .select('*')
        .eq('slug', slug)
        .single();

      if (panelError) throw panelError;
      setPanel(panelData);

      const { data: testsData, error: testsError } = await supabase
        .from('lab_panel_tests')
        .select(`
          lab_tests:test_id (
            id,
            name,
            description,
            lab_categories:category_id (
              name
            )
          )
        `)
        .eq('panel_id', panelData.id);

      if (testsError) throw testsError;
      
      const formattedTests = testsData.map((item: any) => ({
        id: item.lab_tests.id,
        name: item.lab_tests.name,
        description: item.lab_tests.description,
        category_name: item.lab_tests.lab_categories?.name || 'Other'
      }));

      setTests(formattedTests);
    } catch (error) {
      console.error('Error fetching panel details:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!panel) return;
    
    setAddingToCart(true);
    
    const existingCart = localStorage.getItem('labCart');
    const cart = existingCart ? JSON.parse(existingCart) : { items: [], total: 0 };

    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.type === 'panel' && item.id === panel.id
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({
        type: 'panel',
        id: panel.id,
        name: panel.name,
        price: panel.price,
        quantity: 1,
        labReview: labReview
      });
    }

    cart.total = cart.items.reduce(
      (sum: number, item: any) => sum + (item.price * item.quantity) + (item.labReview ? 199 : 0),
      0
    );

    localStorage.setItem('labCart', JSON.stringify(cart));

    setTimeout(() => {
      router.push('/lab-testing/cart');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-400 mt-4">Loading panel details...</p>
        </div>
      </div>
    );
  }

  if (!panel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Panel not found</h2>
          <Link href="/lab-testing" className="text-blue-600 hover:text-blue-500">
            ← Back to Lab Testing
          </Link>
        </div>
      </div>
    );
  }

  const testsByCategory = tests.reduce((acc: any, test) => {
    const category = test.category_name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(test);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/lab-testing"
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Lab Testing
          </Link>
        </div>
      </div>

      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {panel.meets_treatment_requirements && (
                <span className="inline-block bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
                  MEETS TREATMENT REQUIREMENTS
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {panel.name}
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                {panel.description}
              </p>
              <p className="text-lg text-slate-400 mb-8">
                {panel.detailed_description}
              </p>

              <div className="bg-slate-800 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Biomarkers</div>
                    <div className="text-2xl font-bold text-white">{panel.biomarker_count}+</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Turnaround</div>
                    <div className="text-2xl font-bold text-white">14 days</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-slate-400 text-sm mb-1">Best For</div>
                    <div className="text-white">{panel.best_for}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="bg-slate-800 rounded-xl p-8 border-2 border-slate-700">
                <div className="mb-6">
                  <div className="text-slate-400 text-sm mb-2">Panel Price</div>
                  <div className="text-5xl font-bold text-white mb-2">
                    ${panel.price.toFixed(0)}
                  </div>
                  <div className="text-slate-400 text-sm">Includes venipuncture fee</div>
                </div>

                <div className="mb-6 p-4 bg-slate-700/50 rounded-lg">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={labReview}
                      onChange={(e) => setLabReview(e.target.checked)}
                      className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded"
                    />
                    <div>
                      <div className="text-white font-semibold mb-1">
                        Add Lab Review + $199
                      </div>
                      <div className="text-slate-400 text-sm">
                        45-minute consultation with expert health coach + custom 30-50 page analysis report
                      </div>
                    </div>
                  </label>
                </div>

                <div className="mb-6 pt-6 border-t border-slate-700">
                  <div className="flex justify-between text-xl font-bold text-white mb-2">
                    <span>Total</span>
                    <span>${(panel.price + (labReview ? 199 : 0)).toFixed(0)}</span>
                  </div>
                  <div className="text-slate-400 text-sm">
                    HSA/FSA eligible via TrueMed
                  </div>
                </div>

                <button
                  onClick={addToCart}
                  disabled={addingToCart}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </button>

                <div className="mt-4 text-center text-sm text-slate-400">
                  Requisition form sent within 1-2 business days
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">
            What's Included in This Panel
          </h2>

          {Object.keys(testsByCategory).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(testsByCategory).map(([category, categoryTests]: [string, any]) => (
                <div key={category} className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categoryTests.map((test: LabTest) => (
                      <div key={test.id} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="text-white font-medium">{test.name}</div>
                          {test.description && (
                            <div className="text-slate-400 text-sm mt-1">{test.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800 rounded-xl p-8 text-center">
              <p className="text-slate-400">
                Detailed test list coming soon. This panel includes {panel.biomarker_count}+ biomarkers.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to take control of your health?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Order now and receive your requisition form within 1-2 business days.
          </p>
          <button
            onClick={addToCart}
            className="bg-blue-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Add {panel.name} to Cart - ${panel.price.toFixed(0)}
          </button>
        </div>
      </section>
    </div>
  );
}
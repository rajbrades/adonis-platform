'use client';

import { useState, useEffect } from 'react';
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
  is_featured: boolean;
}

export default function LabTestingPage() {
  const [panels, setPanels] = useState<LabPanel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'comprehensive' | 'specialty'>('all');

  useEffect(() => {
    fetchPanels();
  }, []);

  const fetchPanels = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('lab_panels')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPanels(data || []);
    } catch (error) {
      console.error('Error fetching panels:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPanels = panels.filter(panel => {
    if (activeTab === 'all') return true;
    if (activeTab === 'comprehensive') return ['comprehensive', 'complete', 'executive'].includes(panel.panel_type);
    if (activeTab === 'specialty') return panel.panel_type === 'specialty';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Diagnostic Lab Testing
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            No waiting rooms. No chasing paperwork. Just precision diagnostics at your fingertips.
          </p>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto">
            Bridge the gap in traditional healthcare with convenient, comprehensive lab testing that empowers you to unlock your full potential. All panels designed by board-certified medical practitioners.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Select & Order</h3>
              <p className="text-slate-300">
                Choose your panel or build a custom test. Once paid, you'll receive an email with your lab order form and next steps.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Visit LabCorp</h3>
              <p className="text-slate-300">
                Visit a LabCorp location near you to provide your sample. Over 2,000 partnered US laboratory locations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Receive Results</h3>
              <p className="text-slate-300">
                Lab results typically arrive within 14 business days and we'll email them to you as soon as they arrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              All Panels
            </button>
            <button
              onClick={() => setActiveTab('comprehensive')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'comprehensive'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Total Health Panels
            </button>
            <button
              onClick={() => setActiveTab('specialty')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'specialty'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Specialty Panels
            </button>
          </div>

          {/* Lab Panels Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-slate-400 mt-4">Loading panels...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPanels.map((panel) => (
                <div
                  key={panel.id}
                  className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-blue-600 transition-all duration-300 flex flex-col"
                >
                  {panel.is_featured && (
                    <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
                      POPULAR
                    </span>
                  )}
                  {panel.meets_treatment_requirements && (
                    <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
                      MEETS TREATMENT REQUIREMENTS
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {panel.name}
                  </h3>
                  <p className="text-slate-300 mb-4 flex-grow">
                    {panel.description}
                  </p>
                  <div className="mb-4">
                    <div className="text-slate-400 text-sm mb-2">
                      <strong>Biomarkers:</strong> {panel.biomarker_count}+
                    </div>
                    <div className="text-slate-400 text-sm">
                      <strong>Best for:</strong> {panel.best_for}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                    <div>
                      <span className="text-3xl font-bold text-white">
                        ${panel.price.toFixed(0)}
                      </span>
                    </div>
                    <Link
                      href={`/lab-testing/${panel.slug}`}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lab Builder CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Want to customize your own panel?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Use our Lab Builder to select individual biomarkers and create a personalized testing panel.
            </p>
            <Link
              href="/lab-testing/builder"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors"
            >
              Open Lab Builder
            </Link>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 px-6 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-900/30 border-l-4 border-yellow-600 p-6 rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-lg font-semibold text-yellow-600 mb-2">Important Notice</h4>
                <p className="text-slate-300">
                  While LabCorp has locations in NY, NJ, and RI, Adonis is temporarily unable to process diagnostic test orders for residents of those states due to state regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Do I need insurance for lab testing?
              </h3>
              <p className="text-slate-300">
                No. Adonis is a cash-pay service offering direct access to comprehensive testing without the limitations, denials, or delays imposed by insurance companies. However, many clients successfully use their HSA/FSA funds to cover testing costs through our TrueMed integration.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Do I need to pay at the lab?
              </h3>
              <p className="text-slate-300">
                No additional payment is required at the lab. All fees including venipuncture are included in your panel price or automatically added at checkout for custom panels ($5 venipuncture fee).
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                How long is my requisition form valid?
              </h3>
              <p className="text-slate-300">
                Your lab requisition form is valid for six months from the date of purchase, giving you ample time to schedule your lab draw at your convenience.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Can I add a lab review consultation?
              </h3>
              <p className="text-slate-300">
                Yes! You can add a 45-minute lab review with an expert health coach who will review your results in the context of your unique health history, symptoms, and goals. You'll also receive a custom 30-50 page analysis report.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
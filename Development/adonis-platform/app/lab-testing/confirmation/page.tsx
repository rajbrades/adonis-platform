'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams?.get('order');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSuccess(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
      <div className={`max-w-2xl w-full transition-all duration-500 transform ${showSuccess ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="bg-slate-800 rounded-2xl p-12 text-center border-2 border-green-600/50">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Order Confirmed!
          </h1>

          {orderNumber && (
            <div className="bg-slate-700/50 rounded-lg p-4 mb-8">
              <div className="text-slate-400 text-sm mb-1">Order Number</div>
              <div className="text-2xl font-mono font-bold text-white">{orderNumber}</div>
            </div>
          )}

          <p className="text-xl text-slate-300 mb-8">
            Thank you for your order! Check your email for your lab requisition form and next steps.
          </p>

          <div className="bg-slate-700/30 rounded-xl p-8 mb-8 text-left">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What Happens Next?</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Check Your Email</h3>
                  <p className="text-slate-300">
                    Within 1-2 business days, you'll receive your lab requisition form and detailed instructions for sample collection.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Visit LabCorp</h3>
                  <p className="text-slate-300">
                    Take your requisition form to any LabCorp Patient Service Center. No appointment needed at most locations.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Receive Your Results</h3>
                  <p className="text-slate-300">
                    Results typically arrive within 14 business days. We'll email them to you as soon as they're ready.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border-l-4 border-yellow-600 p-6 rounded-r-lg mb-8 text-left">
            <h3 className="text-lg font-semibold text-yellow-600 mb-3">Important Reminders</h3>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Your requisition form is valid for 6 months
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Most tests require fasting - follow the guidelines in your email
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No additional payment is required at LabCorp
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Bring a photo ID to your appointment
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return Home
            </Link>
            
              href="https://www.labcorp.com/labs-and-appointments-locations"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
            >
              Find LabCorp Location
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              Questions? Contact us at{' '}
              <a href="mailto:labs@adonishealth.com" className="text-blue-400 hover:text-blue-300">
                labs@adonishealth.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
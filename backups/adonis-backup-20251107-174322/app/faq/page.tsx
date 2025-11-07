'use client'

import { useState } from 'react'
import { getBrand } from '@/lib/brand'
import { ChevronDown, MessageCircle, Phone, Mail } from 'lucide-react'

export default function FAQPage() {
  const brand = getBrand()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does the consultation process work?",
      answer: "Our consultation process is simple: complete our online health assessment, have a licensed physician review your information within 24-48 hours, get lab recommendations if needed, and receive your personalized treatment plan. Everything is done conveniently online."
    },
    {
      question: "Do I need to get labs done?",
      answer: "Yes, comprehensive lab work is essential for safe and effective hormone optimization. We'll provide you with a lab order for Quest Diagnostics or you can upload recent labs if available. Most insurance plans cover the testing."
    },
    {
      question: "How long until I see results?",
      answer: "Most patients begin noticing improvements within 2-4 weeks, with significant results by 8-12 weeks. Hormone optimization is a gradual process that requires monitoring and adjustment for optimal results."
    },
    {
      question: "Is treatment covered by insurance?",
      answer: "Lab work is often covered by insurance. Treatment medications and consultation fees are typically not covered, but we offer competitive pricing and flexible payment options."
    },
    {
      question: "What medications do you prescribe?",
      answer: "We prescribe FDA-approved bioidentical hormones, peptides, and other evidence-based treatments tailored to your specific needs and goals. All prescriptions are issued by licensed physicians."
    },
    {
      question: "How often do I need follow-up appointments?",
      answer: "Initial follow-ups are typically every 4-6 weeks to monitor progress and adjust treatment. Once optimized, most patients maintain with quarterly check-ins."
    },
    {
      question: "Can I cancel or pause my treatment?",
      answer: "Yes, you have complete control. You can pause or cancel your treatment at any time. We recommend discussing any changes with your provider for a safe transition."
    },
    {
      question: "What if I'm already on hormone therapy?",
      answer: "We can review your current protocol and optimize it if needed. Many patients switch to us for better service, pricing, or comprehensive optimization beyond basic hormone replacement."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Frequently Asked <span style={{ color: brand.colors.primary }}>Questions</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about {brand.name} and our optimization programs.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.07]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4"
                >
                  <h3 className="text-xl font-bold text-white pr-8">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    style={{ color: brand.colors.primary }}
                  />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6 text-white/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm rounded-2xl p-12 text-center border"
            style={{ 
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
              borderColor: `${brand.colors.primary}20`
            }}>
            <h2 className="text-4xl font-black mb-6">
              Still Have <span style={{ color: brand.colors.primary }}>Questions?</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Our medical team is here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="mailto:support@getadonishealth.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                  color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                }}
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
              
              <a 
                href="/consultation"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Start Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

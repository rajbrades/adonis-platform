'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Plus, Minus } from 'lucide-react'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I know if I'm a candidate for testosterone therapy?",
          answer: "You may be a candidate if you're experiencing symptoms like low energy, decreased muscle mass, poor sleep, low libido, or brain fog. Our comprehensive assessment and lab work will determine if hormone optimization is right for you."
        },
        {
          question: "What does the consultation process involve?",
          answer: "The process includes a detailed health questionnaire, physician review, comprehensive lab work, results consultation, and personalized treatment plan creation. The entire process typically takes 3-5 business days."
        },
        {
          question: "Is this covered by insurance?",
          answer: "Most lab work is covered by insurance. Treatment costs vary based on your personalized plan. We offer transparent pricing with no hidden fees and financing options are available."
        }
      ]
    },
    {
      category: "Treatment & Safety",
      questions: [
        {
          question: "Are your treatments safe?",
          answer: "Yes, all treatments are prescribed and monitored by licensed physicians. We use pharmaceutical-grade medications and require regular monitoring to ensure safety and effectiveness."
        },
        {
          question: "What are the potential side effects?",
          answer: "Side effects are generally mild and can include temporary acne, mood changes, or sleep disruption. Our physicians monitor you closely and adjust dosages to minimize any side effects."
        },
        {
          question: "How long before I see results?",
          answer: "Most patients notice improvements in energy and mood within 2-4 weeks. Physical changes like increased muscle mass and fat loss typically occur over 3-6 months with consistent treatment."
        },
        {
          question: "Can I stop treatment at any time?",
          answer: "Yes, you can discontinue treatment at any time. Our physicians will guide you through a safe tapering process if needed to minimize any potential effects."
        }
      ]
    },
    {
      category: "Logistics & Support",
      questions: [
        {
          question: "How are medications delivered?",
          answer: "All medications are delivered directly to your door in discreet packaging. Most deliveries arrive within 2-3 business days via expedited shipping."
        },
        {
          question: "What kind of ongoing support do you provide?",
          answer: "You'll have access to your physician team 24/7, monthly check-ins, lab work monitoring, dose adjustments, and our patient support team for any questions."
        },
        {
          question: "Do I need to visit a clinic?",
          answer: "No clinic visits required. Everything is done virtually except for lab work, which can be completed at thousands of locations nationwide."
        },
        {
          question: "What if I'm not satisfied with my results?",
          answer: "We offer a satisfaction guarantee. If you don't see significant improvements in your testosterone levels after 90 days, we'll refund your medication costs."
        }
      ]
    },
    {
      category: "Advanced Treatments",
      questions: [
        {
          question: "What is peptide therapy?",
          answer: "Peptide therapy uses specific amino acid sequences to optimize various bodily functions. They can enhance recovery, promote fat loss, improve sleep, and provide anti-aging benefits."
        },
        {
          question: "Do you offer other hormone treatments besides testosterone?",
          answer: "Yes, we optimize your complete hormonal profile including thyroid, growth hormone, cortisol, and other hormones based on your individual needs."
        },
        {
          question: "What makes your approach different from other clinics?",
          answer: "We focus on comprehensive optimization, not just testosterone replacement. Our approach includes lifestyle coaching, nutrition guidance, and multiple treatment modalities for optimal results."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto">
            Get answers to the most common questions about hormone optimization, 
            our treatments, and what to expect.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-yellow-400">{category.category}</h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const itemIndex = categoryIndex * 100 + questionIndex
                  const isOpen = openItems.includes(itemIndex)
                  
                  return (
                    <div key={questionIndex} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.07] transition-colors"
                      >
                        <h3 className="text-lg font-bold text-white pr-4">{faq.question}</h3>
                        {isOpen ? (
                          <Minus className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                        ) : (
                          <Plus className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-white/10 pt-4">
                            <p className="text-white/60 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">Still Have <span className="text-yellow-400">Questions?</span></h2>
            <p className="text-xl text-white/60 mb-8">
              Our medical team is here to help. Get personalized answers about your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/consultation"
                className="inline-flex items-center bg-yellow-400 text-black px-8 py-3 rounded-lg text-lg font-bold hover:bg-yellow-500 transition-all"
              >
                Start Your Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a 
                href="mailto:support@adonishealth.com"
                className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-white/10 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

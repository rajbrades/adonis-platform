'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Facebook, Linkedin } from 'lucide-react'

// Mock blog data
const blogPosts: Record<string, any> = {
  'understanding-hormone-optimization': {
    title: 'Understanding Hormone Optimization: A Complete Guide',
    author: 'Dr. Sarah Mitchell',
    date: 'Oct 15, 2024',
    readTime: '8 min read',
    category: 'Education',
    featured: true,
    content: `
      <p>Hormone optimization is revolutionizing how we approach health, vitality, and aging. As we age, our hormone levels naturally decline, leading to symptoms like fatigue, weight gain, decreased libido, and reduced mental clarity.</p>

      <h2>What is Hormone Optimization?</h2>
      <p>Hormone optimization therapy (HOT) is a medical approach that aims to restore hormone levels to their optimal ranges, typically seen in younger, healthier individuals.</p>

      <h2>Key Hormones in Optimization</h2>
      
      <h3>Testosterone</h3>
      <p>Often called the "vitality hormone," testosterone plays crucial roles beyond sexual function. It affects muscle mass, bone density, mood, cognitive function, and metabolic health.</p>

      <h3>Thyroid Hormones</h3>
      <p>Your thyroid acts as your body's metabolic thermostat. T3 and T4 hormones regulate energy production, weight management, and body temperature.</p>

      <h2>Benefits of Hormone Optimization</h2>
      <p>Patients typically report:</p>
      <ul>
        <li><strong>Increased Energy:</strong> Wake up refreshed and maintain vitality throughout the day</li>
        <li><strong>Improved Body Composition:</strong> Build lean muscle and reduce stubborn fat</li>
        <li><strong>Enhanced Mood:</strong> Better emotional stability and reduced anxiety</li>
        <li><strong>Sharper Cognition:</strong> Improved memory, focus, and mental clarity</li>
      </ul>

      <h2>Getting Started</h2>
      <p>The first step is comprehensive lab testing and a consultation with a qualified hormone specialist. We combine cutting-edge diagnostics with personalized treatment protocols.</p>
    `
  }
}

export default function BlogArticlePage() {
  const brand = getBrand()
  const params = useParams()
  const brand = getBrand()
  const slug = params.slug as string
  const post = blogPosts[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-white/60 hover:text-white">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-8">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 pb-20">
        
        {/* Category */}
        <div className="flex items-center gap-3 mb-6">
          {post.featured && (
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ 
                backgroundColor: `${brand.colors.primary}20`,
                color: brand.colors.primary 
              }}
            >
              Featured
            </span>
          )}
          <span className="text-white/60 text-sm">{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 mb-12 text-white/60">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Share */}
        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-white/10">
          <span className="text-white/60 text-sm">Share:</span>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <Facebook className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <Linkedin className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold 
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
            prose-ul:text-white/80 prose-li:my-2
            prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div 
          className="mt-16 p-8 rounded-2xl border"
          style={{
            background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
            borderColor: `${brand.colors.primary}20`
          }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Health?</h3>
          <p className="text-white/70 mb-6">
            Schedule a consultation and take the first step toward peak performance.
          </p>
          <Link
            href="/consultation"
            className="inline-block px-8 py-4 rounded-lg font-bold transition-all"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
              color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
            }}
          >
            Get Started Today
          </Link>
        </div>

      </article>
    </div>
  )
}

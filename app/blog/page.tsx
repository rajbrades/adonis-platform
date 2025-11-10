'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const brand = getBrand()

  const posts = [
    {
      slug: 'understanding-hormone-optimization',
      title: 'Understanding Hormone Optimization: A Complete Guide',
      excerpt: 'Learn the fundamentals of hormone optimization and how it can transform your health, energy levels, and overall quality of life.',
      author: 'Dr. Sarah Mitchell',
      date: 'Oct 15, 2024',
      readTime: '8 min read',
      category: 'Education',
      featured: true
    },
    {
      slug: 'testosterone-myths',
      title: '5 Common Testosterone Myths Debunked',
      excerpt: 'Separate fact from fiction when it comes to testosterone therapy and optimization.',
      author: 'Dr. Michael Chen',
      date: 'Oct 10, 2024',
      readTime: '6 min read',
      category: 'Science',
      featured: false
    },
    {
      slug: 'peptides-guide',
      title: 'A Beginner\'s Guide to Peptide Therapy',
      excerpt: 'Discover how peptides can enhance recovery, improve body composition, and promote longevity.',
      author: 'Dr. Sarah Mitchell',
      date: 'Oct 5, 2024',
      readTime: '10 min read',
      category: 'Treatment',
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span style={{ color: brand.colors.primary }}>Health</span> Insights
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Expert guidance on hormone optimization, wellness, and achieving peak performance.
          </p>
        </div>

        {/* Featured Post */}
        <Link
          href={`/blog/${posts[0].slug}`}
          className="group block mb-20"
        >
          <div 
            className="rounded-3xl border p-8 md:p-12 transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
              borderColor: `${brand.colors.primary}30`
            }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span 
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ 
                  backgroundColor: `${brand.colors.primary}`,
                  color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                }}
              >
                Featured
              </span>
              <span className="text-white/60">{posts[0].category}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 group-hover:opacity-80 transition-opacity">
              {posts[0].title}
            </h2>

            <p className="text-xl text-white/70 mb-8 max-w-3xl">
              {posts[0].excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {posts[0].date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {posts[0].readTime}
              </span>
              <span>By {posts[0].author}</span>
            </div>

            <div 
              className="inline-flex items-center gap-2 font-semibold group-hover:gap-4 transition-all"
              style={{ color: brand.colors.primary }}
            >
              Read Article
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </Link>

        {/* Other Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white/5 rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all"
            >
              <div className="text-xs text-white/60 mb-4 uppercase tracking-wider">
                {post.category}
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:opacity-80 transition-opacity">
                {post.title}
              </h3>

              <p className="text-white/60 mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <div 
                className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                style={{ color: brand.colors.primary }}
              >
                Read More
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

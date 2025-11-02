'use client'

import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { ArrowRight, Calendar, User, Clock } from 'lucide-react'

export default function BlogPage() {
  const brand = getBrand()

  const posts = [
    {
      id: 1,
      title: 'Understanding Hormone Optimization: A Complete Guide',
      excerpt: 'Learn the fundamentals of hormone optimization and how it can transform your health, energy levels, and overall quality of life.',
      author: 'Dr. Sarah Mitchell',
      date: '2024-10-15',
      readTime: '8 min read',
      category: 'Education'
    },
    {
      id: 2,
      title: 'The Science Behind Testosterone Replacement Therapy',
      excerpt: 'Exploring the clinical evidence and research supporting TRT for optimal health.',
      author: 'Dr. Michael Chen',
      date: '2024-10-10',
      readTime: '6 min read',
      category: 'Research'
    },
    {
      id: 3,
      title: '5 Signs You Might Benefit from Hormone Optimization',
      excerpt: 'Discover the key symptoms that indicate hormonal imbalance and when to consider therapy.',
      author: 'Dr. Lisa Anderson',
      date: '2024-10-05',
      readTime: '5 min read',
      category: 'Health Tips'
    },
    {
      id: 4,
      title: 'Peptide Therapy: The Future of Performance Medicine',
      excerpt: 'An in-depth look at peptide therapy and its applications for recovery and performance.',
      author: 'Dr. James Rodriguez',
      date: '2024-09-28',
      readTime: '10 min read',
      category: 'Research'
    },
    {
      id: 5,
      title: 'Optimizing Sleep for Better Hormone Balance',
      excerpt: 'How sleep quality affects your hormones and practical strategies to improve rest.',
      author: 'Dr. Emily Foster',
      date: '2024-09-20',
      readTime: '7 min read',
      category: 'Health Tips'
    },
    {
      id: 6,
      title: 'Nutrition Strategies for Hormone Health',
      excerpt: 'Evidence-based dietary approaches to support optimal hormone production.',
      author: 'Dr. Sarah Mitchell',
      date: '2024-09-15',
      readTime: '9 min read',
      category: 'Nutrition'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            {brand.name} <span style={{ color: brand.colors.primary }}>Health Blog</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Expert insights on hormone optimization, performance medicine, and wellness from our medical team.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 aspect-video md:aspect-auto"></div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ 
                      backgroundColor: brand.colors.primary + '20',
                      color: brand.colors.primary 
                    }}
                  >
                    FEATURED
                  </span>
                  <span className="text-white/50 text-sm">{posts[0].category}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">
                  {posts[0].title}
                </h2>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-white/50 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {posts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Oct 15, 2024
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {posts[0].readTime}
                  </div>
                </div>
                <Link
                  href={`/blog/${posts[0].id}`}
                  className="inline-flex items-center gap-2 font-bold hover:opacity-80 transition-opacity"
                  style={{ color: brand.colors.primary }}
                >
                  Read Article
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black mb-12">
            Recent <span style={{ color: brand.colors.primary }}>Articles</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 aspect-video"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: brand.colors.primary + '20',
                        color: brand.colors.primary 
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date.slice(5)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-semibold" style={{ color: brand.colors.primary }}>
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            className="backdrop-blur-sm rounded-2xl p-12 text-center border"
            style={{ 
              background: 'linear-gradient(to right, ' + brand.colors.primary + '10, ' + brand.colors.primaryDark + '10)',
              borderColor: brand.colors.primary + '20'
            }}
          >
            <h2 className="text-4xl font-black mb-6">
              Stay <span style={{ color: brand.colors.primary }}>Informed</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Get the latest health insights, research updates, and optimization strategies delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
              />
              <button
                className="px-8 py-3 rounded-lg font-bold transition-all duration-300"
                style={{
                  background: 'linear-gradient(to right, ' + brand.colors.primary + ', ' + brand.colors.primaryDark + ')',
                  color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                }}
              >
                Subscribe
              </button>
            </div>
            <p className="text-white/50 mt-4 text-sm">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

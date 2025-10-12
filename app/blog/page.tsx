import Link from 'next/link'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'

export default function BlogPage() {
  const featuredPost = {
    title: "The Modern Testosterone Crisis: Why 95% of Men Have Declining Levels",
    excerpt: "Explore the science behind the dramatic decline in male testosterone levels since the 1980s and what it means for your health and performance.",
    date: "March 15, 2024",
    readTime: "8 min read",
    author: "Dr. Michael Chen, MD",
    image: "/api/placeholder/800/400",
    category: "Health & Science"
  }

  const blogPosts = [
    {
      title: "Testosterone vs. Testosterone Boosters: What Actually Works",
      excerpt: "A comprehensive comparison of prescription testosterone therapy versus over-the-counter supplements and natural boosters.",
      date: "March 12, 2024",
      readTime: "6 min read",
      author: "Dr. Sarah Martinez, MD",
      category: "Treatment Options",
      slug: "testosterone-vs-boosters"
    },
    {
      title: "The Complete Guide to Peptide Therapy for Men",
      excerpt: "Everything you need to know about peptides for muscle growth, fat loss, recovery, and anti-aging benefits.",
      date: "March 10, 2024",
      readTime: "10 min read",
      author: "Dr. James Wilson, MD",
      category: "Peptide Therapy",
      slug: "complete-guide-peptide-therapy"
    },
    {
      title: "Optimizing Sleep for Better Hormone Production",
      excerpt: "How quality sleep directly impacts testosterone production and practical strategies for better rest.",
      date: "March 8, 2024",
      readTime: "5 min read",
      author: "Dr. Michael Chen, MD",
      category: "Lifestyle",
      slug: "sleep-hormone-optimization"
    },
    {
      title: "Hair Loss and Hormones: Prevention and Treatment Options",
      excerpt: "Understanding the connection between hormones and hair loss, plus effective treatment strategies.",
      date: "March 5, 2024",
      readTime: "7 min read",
      author: "Dr. Sarah Martinez, MD",
      category: "Hair & Aesthetics",
      slug: "hair-loss-hormones-treatment"
    },
    {
      title: "Nutrition for Optimal Testosterone Production",
      excerpt: "Evidence-based dietary strategies and key nutrients that support healthy hormone production.",
      date: "March 3, 2024",
      readTime: "8 min read",
      author: "Dr. James Wilson, MD",
      category: "Nutrition",
      slug: "nutrition-testosterone-production"
    },
    {
      title: "Exercise and Hormone Optimization: What You Need to Know",
      excerpt: "How different types of exercise affect hormone levels and the best training approaches for optimization.",
      date: "March 1, 2024",
      readTime: "9 min read",
      author: "Dr. Michael Chen, MD",
      category: "Fitness",
      slug: "exercise-hormone-optimization"
    }
  ]

  const categories = [
    "All Posts",
    "Health & Science", 
    "Treatment Options",
    "Peptide Therapy",
    "Lifestyle",
    "Nutrition",
    "Fitness",
    "Hair & Aesthetics"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Health & Performance <span className="text-yellow-400">Blog</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Expert insights on hormone optimization, performance enhancement, and men's health 
            from our team of licensed physicians and specialists.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-bold mr-4">
                Featured
              </span>
              <span className="text-yellow-400 text-sm">{featuredPost.category}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
              {featuredPost.title}
            </h2>
            
            <p className="text-white/60 mb-6 text-lg leading-relaxed">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-6 text-white/50">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {featuredPost.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {featuredPost.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {featuredPost.readTime}
              </div>
            </div>
            
            <Link 
              href="/blog/modern-testosterone-crisis"
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-bold text-lg transition-colors"
            >
              Read Full Article
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-lg border transition-all ${
                  index === 0
                    ? 'bg-yellow-400 text-black border-yellow-400'
                    : 'bg-white/5 text-white border-white/10 hover:border-yellow-400/50 hover:text-yellow-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-yellow-400 text-sm font-medium">{post.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-white/50 text-xs mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">{post.author}</span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-yellow-400 hover:text-yellow-300 font-medium text-sm inline-flex items-center transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">Stay <span className="text-yellow-400">Informed</span></h2>
            <p className="text-xl text-white/60 mb-8">
              Get the latest insights on hormone optimization and men's health delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none transition-colors"
              />
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

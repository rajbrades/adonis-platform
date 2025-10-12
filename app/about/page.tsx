import Link from 'next/link'
import { ArrowRight, Award, Users, Shield, Target, Clock, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { number: "10,000+", label: "Patients Treated" },
    { number: "95%", label: "Patient Satisfaction" },
    { number: "24/7", label: "Medical Support" },
    { number: "50+", label: "Licensed Physicians" }
  ]

  const team = [
    {
      name: "Dr. Michael Chen, MD",
      title: "Chief Medical Officer",
      specialty: "Endocrinology & Hormone Optimization",
      experience: "15+ years optimizing hormones for high-performers",
      credentials: "Board Certified Endocrinologist, Harvard Medical School"
    },
    {
      name: "Dr. Sarah Martinez, MD",
      title: "Medical Director",
      specialty: "Anti-Aging & Regenerative Medicine",
      experience: "12+ years in longevity and performance medicine",
      credentials: "Board Certified Internal Medicine, Stanford University"
    },
    {
      name: "Dr. James Wilson, MD",
      title: "Lead Physician",
      specialty: "Men's Health & Sexual Wellness",
      experience: "10+ years in men's optimization therapy",
      credentials: "Board Certified Urology, Johns Hopkins University"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            About <span className="text-yellow-400">ADONIS</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to help high-performers reclaim their energy, vitality, and peak physical condition 
            through evidence-based hormone optimization and personalized medicine.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">Our <span className="text-yellow-400">Mission</span></h2>
              <p className="text-white/60 mb-6 text-lg leading-relaxed">
                Modern men are experiencing a testosterone crisis. Levels have declined by 50% since the 1980s, 
                leaving executives, entrepreneurs, and high-achievers feeling exhausted, unfocused, and physically diminished.
              </p>
              <p className="text-white/60 mb-6 text-lg leading-relaxed">
                We believe every man deserves to feel like his best self - energetic, strong, confident, and mentally sharp. 
                That's why we've created a comprehensive hormone optimization platform that combines cutting-edge medicine 
                with personalized care.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                Our approach goes beyond basic testosterone replacement. We optimize your entire hormonal profile, 
                address root causes, and provide ongoing support to ensure you achieve and maintain peak performance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] transition-all duration-300">
                  <div className="text-3xl font-black text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">Our Core <span className="text-yellow-400">Values</span></h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              These principles guide everything we do and ensure you receive the highest quality care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Safety First</h3>
              <p className="text-white/60 leading-relaxed">All treatments are overseen by licensed physicians with ongoing monitoring and support.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Personalized Care</h3>
              <p className="text-white/60 leading-relaxed">Every treatment plan is customized based on your unique biology, goals, and lifestyle.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-white/60 leading-relaxed">Evidence-based treatments with measurable outcomes and guaranteed satisfaction.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Convenience</h3>
              <p className="text-white/60 leading-relaxed">Everything delivered to your door with 24/7 support and virtual consultations.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Team</h3>
              <p className="text-white/60 leading-relaxed">Board-certified physicians specializing in hormone optimization and men's health.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Quality Assurance</h3>
              <p className="text-white/60 leading-relaxed">Pharmaceutical-grade medications from licensed US pharmacies with quality guarantees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">Meet Our <span className="text-yellow-400">Medical Team</span></h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Our physicians are leaders in hormone optimization, with decades of combined experience 
              helping high-performers achieve their peak potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((doctor, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
                <div className="bg-yellow-400/10 w-20 h-20 rounded-xl mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-yellow-400" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-center">{doctor.name}</h3>
                <p className="text-white/60 font-medium mb-3 text-center">{doctor.title}</p>
                <p className="text-yellow-400 mb-4 text-center text-sm">{doctor.specialty}</p>
                
                <div className="space-y-3">
                  <p className="text-white/60 text-sm leading-relaxed">{doctor.experience}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{doctor.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black mb-6">Ready to Optimize Your <span className="text-yellow-400">Performance?</span></h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Join thousands of high-performers who have transformed their energy, strength, and confidence with ADONIS.
            </p>
            <Link 
              href="/consultation"
              className="inline-flex items-center bg-yellow-400 text-black px-12 py-4 rounded-lg text-lg font-bold hover:bg-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

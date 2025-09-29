import Link from 'next/link'
import { ArrowRight, Award, Users, Shield, Target, Clock, TrendingUp } from 'lucide-react'
import Navigation from '../components/Navigation'

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
      specialty: "Men&apos;s Health & Sexual Wellness",
      experience: "10+ years in men&apos;s optimization therapy",
      credentials: "Board Certified Urology, Johns Hopkins University"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">
            About Adonis
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            We&apos;re on a mission to help high-performers reclaim their energy, vitality, and peak physical condition 
            through evidence-based hormone optimization and personalized medicine.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 text-yellow-400">Our Mission</h2>
              <p className="text-white/80 mb-6 text-lg">
                Modern men are experiencing a testosterone crisis. Levels have declined by 50% since the 1980s, 
                leaving executives, entrepreneurs, and high-achievers feeling exhausted, unfocused, and physically diminished.
              </p>
              <p className="text-white/80 mb-6 text-lg">
                We believe every man deserves to feel like his best self - energetic, strong, confident, and mentally sharp. 
                That&apos;s why we&apos;ve created a comprehensive hormone optimization platform that combines cutting-edge medicine 
                with personalized care.
              </p>
              <p className="text-white/80 text-lg">
                Our approach goes beyond basic testosterone replacement. We optimize your entire hormonal profile, 
                address root causes, and provide ongoing support to ensure you achieve and maintain peak performance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Our Core Values</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              These principles guide everything we do and ensure you receive the highest quality care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Safety First</h3>
              <p className="text-white/70">All treatments are overseen by licensed physicians with ongoing monitoring and support.</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Target className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Personalized Care</h3>
              <p className="text-white/70">Every treatment plan is customized based on your unique biology, goals, and lifestyle.</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Proven Results</h3>
              <p className="text-white/70">Evidence-based treatments with measurable outcomes and guaranteed satisfaction.</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Convenience</h3>
              <p className="text-white/70">Everything delivered to your door with 24/7 support and virtual consultations.</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Expert Team</h3>
              <p className="text-white/70">Board-certified physicians specializing in hormone optimization and men&apos;s health.</p>
            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Quality Assurance</h3>
              <p className="text-white/70">Pharmaceutical-grade medications from licensed US pharmacies with quality guarantees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-yellow-400">Meet Our Medical Team</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our physicians are leaders in hormone optimization, with decades of combined experience 
              helping high-performers achieve their peak potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((doctor, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <div className="w-20 h-20 bg-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-black" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-yellow-400 text-center">{doctor.name}</h3>
                <p className="text-white/80 font-medium mb-3 text-center">{doctor.title}</p>
                <p className="text-yellow-400/80 mb-4 text-center">{doctor.specialty}</p>
                
                <div className="space-y-3">
                  <p className="text-white/70 text-sm">{doctor.experience}</p>
                  <p className="text-white/60 text-sm">{doctor.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-yellow-400">Ready to Optimize Your Performance?</h2>
          <p className="text-xl text-white/70 mb-8">
            Join thousands of high-performers who have transformed their energy, strength, and confidence with Adonis.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-lg transition-all"
          >
            Start Your Journey
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

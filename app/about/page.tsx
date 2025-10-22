import Link from 'next/link'
import { ArrowRight, Award, Users, Shield, Target, Clock, TrendingUp, Activity, Microscope, LineChart } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { number: "1000s", label: "Patients Optimized" },
    { number: "95%", label: "Patient Satisfaction" },
    { number: "Decades", label: "Combined Experience" },
    { number: "FL", label: "Licensed Medical Providers" }
  ]

  const team = [
    {
      name: "Dr. Michael Chen, MD",
      title: "Chief Medical Officer",
      specialty: "Endocrinology & Precision Hormone Medicine",
      experience: "15+ years in biomarker-driven hormone optimization",
      credentials: "Board Certified Endocrinologist, Harvard Medical School"
    },
    {
      name: "Dr. Sarah Martinez, MD",
      title: "Medical Director",
      specialty: "Precision Medicine & Longevity",
      experience: "12+ years in data-driven optimization protocols",
      credentials: "Board Certified Internal Medicine, Stanford University"
    },
    {
      name: "Dr. James Wilson, MD",
      title: "Lead Physician",
      specialty: "Men's Health & Biomarker Optimization",
      experience: "10+ years in personalized men's health medicine",
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
            We're pioneering the future of men's health through precision medicine—using advanced diagnostics, 
            biomarker analysis, and data-driven protocols to optimize your health at the cellular level.
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
                Modern men face a health crisis that one-size-fits-all medicine can't solve. Declining hormone levels, 
                metabolic dysfunction, and premature aging affect millions—yet conventional medicine relies on outdated 
                reference ranges that ignore individual biology.
              </p>
              <p className="text-white/60 mb-6 text-lg leading-relaxed">
                We believe optimal health requires precision medicine. That's why we've built a comprehensive platform 
                that analyzes your unique biomarkers, identifies deficiencies and imbalances, and creates individualized 
                protocols designed specifically for YOUR biology—not population averages.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                Our approach combines advanced diagnostic testing, continuous monitoring, and data-driven adjustments 
                to optimize your hormones, metabolism, and cellular function. Every treatment is personalized, 
                every protocol is tracked, and every adjustment is based on YOUR measurable results.
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

      {/* Precision Medicine Approach */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">
              The <span className="text-yellow-400">Precision Medicine</span> Difference
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Unlike traditional medicine that treats symptoms, we optimize your biology using your unique data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Microscope className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Advanced Diagnostics</h3>
              <p className="text-white/60 leading-relaxed">
                Comprehensive biomarker panels that go far beyond basic lab work—we measure what matters 
                for optimal cellular function and longevity.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <LineChart className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Data-Driven Protocols</h3>
              <p className="text-white/60 leading-relaxed">
                Every treatment decision is based on YOUR specific biomarkers, tracked over time, 
                and adjusted to achieve optimal ranges for YOUR body.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Continuous Optimization</h3>
              <p className="text-white/60 leading-relaxed">
                Regular monitoring and protocol adjustments ensure you maintain optimal biomarkers 
                as your body and goals evolve over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">Our Core <span className="text-yellow-400">Principles</span></h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              These values guide our approach to precision medicine and ensure you receive the highest standard of care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Individualized Medicine</h3>
              <p className="text-white/60 leading-relaxed">
                Every protocol is designed for YOUR unique biology, goals, and biomarker profile—never a generic template.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <LineChart className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Data-Driven Decisions</h3>
              <p className="text-white/60 leading-relaxed">
                All treatments and adjustments are based on measurable biomarkers and tracked results, not guesswork.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Medical Excellence</h3>
              <p className="text-white/60 leading-relaxed">
                Board-certified physicians with specialized training in precision hormone optimization and longevity medicine.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Evidence-Based</h3>
              <p className="text-white/60 leading-relaxed">
                All protocols are grounded in peer-reviewed research and clinical evidence, not trends or speculation.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Ongoing Optimization</h3>
              <p className="text-white/60 leading-relaxed">
                Regular monitoring and iterative adjustments to maintain optimal biomarkers as your body evolves.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.07] transition-all duration-300">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
              <p className="text-white/60 leading-relaxed">
                Pharmaceutical-grade medications from licensed US compounding pharmacies with rigorous quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">Meet Our <span className="text-yellow-400">Medical Team</span></h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Our physicians are pioneers in precision medicine, with decades of experience in biomarker-driven 
              optimization and individualized treatment protocols.
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
            <h2 className="text-4xl font-black mb-6">
              Ready to Experience <span className="text-yellow-400">Precision Medicine?</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Join thousands who have optimized their health through data-driven, individualized protocols 
              designed for their unique biology.
            </p>
            <Link 
              href="/consultation"
              className="inline-flex items-center bg-yellow-400 text-black px-12 py-4 rounded-lg text-lg font-bold hover:bg-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Assessment
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

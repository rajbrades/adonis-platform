export type BrandId = 'adonis' | 'athena'

export interface BrandConfig {
  id: BrandId
  name: string
  domain: string
  colors: {
    primary: string
    primaryDark: string
  }
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  services: Array<{
    title: string
    description: string
    href: string
    icon: string
  }>
  whyChoose: {
    sectionTitle: string
    sectionSubtitle: string
    items: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  whyUs: {
    sectionTitle: string
    items: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  stats: {
    title: string
    subtitle: string
    items: Array<{
      value: string
      label: string
    }>
  }
  finalCta: {
    title: string
    subtitle: string
    buttonText: string
    disclaimer: string
  }
}

const BRANDS: Record<BrandId, BrandConfig> = {
  adonis: {
    id: 'adonis',
    name: 'ADONIS',
    domain: 'getadonishealth.com',
    colors: {
      primary: '#FACC15',
      primaryDark: '#EAB308'
    },
    hero: {
      badge: 'HUMAN OPTIMIZATION MEDICINE',
      title: 'Unlock Your',
      titleHighlight: 'Peak',
      subtitle: 'Advanced therapies and protocols to optimize your energy, performance, and longevity. Feel stronger, sharper, and more vital than ever before.',
      ctaPrimary: 'START YOUR TRANSFORMATION',
      ctaSecondary: 'SEE HOW IT WORKS'
    },
    services: [
      {
        title: 'Testosterone Replacement',
        description: 'Optimize hormone levels for increased energy, muscle mass, and vitality.',
        href: '/treatments/testosterone-replacement',
        icon: 'Zap'
      },
      {
        title: 'Peptide Therapy',
        description: 'Advanced peptides for recovery, fat loss, muscle growth, and anti-aging.',
        href: '/treatments/peptide-therapy',
        icon: 'TrendingUp'
      },
      {
        title: 'NAD+ Therapy',
        description: 'Boost cellular energy, mental clarity, and longevity at the molecular level.',
        href: '/treatments/nad-therapy',
        icon: 'Sparkles'
      },
      {
        title: 'Glutathione',
        description: 'Powerful antioxidant for detoxification, immune support, and cellular health.',
        href: '/treatments/glutathione',
        icon: 'Shield'
      },
      {
        title: 'Enclomiphene Citrate',
        description: 'Natural testosterone optimization while preserving fertility and testicular function.',
        href: '/treatments/enclomiphene',
        icon: 'Heart'
      }
    ],
    whyChoose: {
      sectionTitle: 'Why Choose ADONIS',
      sectionSubtitle: 'The most advanced human optimization platform designed for high-performers.',
      items: [
        {
          title: 'Licensed Physicians',
          description: 'AI-supported, physician-led care from board-certified providers.',
          icon: 'Shield'
        },
        {
          title: 'Premium Quality',
          description: 'Pharmaceutical-grade medications from US-licensed compounding pharmacies.',
          icon: 'Award'
        },
        {
          title: 'Fast Results',
          description: 'Get your assessment reviewed and lab recommendations within 24-48 hours.',
          icon: 'Clock'
        },
        {
          title: 'Personalized Care',
          description: 'Custom protocols designed around your goals and biomarkers.',
          icon: 'Brain'
        }
      ]
    },
    whyUs: {
      sectionTitle: 'Why ADONIS',
      items: [
        {
          title: 'Board-Certified Physicians',
          description: 'Real doctors, not algorithms. Personalized care from licensed medical professionals.',
          icon: 'Shield'
        },
        {
          title: 'Science-Backed Protocols',
          description: 'Evidence-based treatments using the latest research in human optimization.',
          icon: 'Brain'
        },
        {
          title: 'Convenient & Discreet',
          description: 'Telehealth consultations. Treatment delivered to your door. Total privacy.',
          icon: 'Clock'
        }
      ]
    },
    stats: {
      title: 'Proven Results',
      subtitle: 'Join thousands who have transformed their health through evidence-based optimization.',
      items: [
        { value: '10K+', label: 'PATIENTS OPTIMIZED' },
        { value: '24-48h', label: 'ASSESSMENT REVIEW TIME' },
        { value: '98%', label: 'PATIENT SATISFACTION' },
        { value: '100%', label: 'LICENSED US PHYSICIANS' }
      ]
    },
    finalCta: {
      title: 'Ready to Optimize Your Life?',
      subtitle: 'Take the first step toward peak performance, energy, and longevity with a free health assessment.',
      buttonText: 'Start Free Assessment',
      disclaimer: 'No credit card required • 100% confidential'
    }
  },
  athena: {
    id: 'athena',
    name: 'ATHENA',
    domain: 'getathenahealth.com',
    colors: {
      primary: '#EC4899',
      primaryDark: '#DB2777'
    },
    hero: {
      badge: 'WOMEN\'S HEALTH OPTIMIZATION',
      title: 'Unlock Your',
      titleHighlight: 'Peak',
      subtitle: 'Comprehensive hormone optimization and wellness therapies designed for women. Feel balanced, energized, and empowered at every stage of life.',
      ctaPrimary: 'START YOUR JOURNEY',
      ctaSecondary: 'SEE HOW IT WORKS'
    },
    services: [
      {
        title: 'Hormone Balance',
        description: 'Optimize hormones for menopause, PCOS, thyroid issues, and overall wellness.',
        href: '/treatments/hormone-balance',
        icon: 'Heart'
      },
      {
        title: 'Peptide Therapy',
        description: 'Advanced peptides for skin health, weight management, and anti-aging.',
        href: '/treatments/peptide-therapy',
        icon: 'Sparkles'
      },
      {
        title: 'NAD+ Therapy',
        description: 'Boost cellular energy, mental clarity, and longevity at the molecular level.',
        href: '/treatments/nad-therapy',
        icon: 'TrendingUp'
      },
      {
        title: 'Glutathione',
        description: 'Powerful antioxidant for skin radiance, detoxification, and immune support.',
        href: '/treatments/glutathione',
        icon: 'Shield'
      },
      {
        title: 'Wellness Therapy',
        description: 'IV therapy, vitamin optimization, and comprehensive wellness support.',
        href: '/treatments/wellness-therapy',
        icon: 'Zap'
      }
    ],
    whyChoose: {
      sectionTitle: 'Why Choose ATHENA',
      sectionSubtitle: 'Specialized women\'s health optimization designed for every stage of life.',
      items: [
        {
          title: 'Women-Specialized Care',
          description: 'Physicians trained in women\'s hormones, metabolism, and wellness optimization.',
          icon: 'Heart'
        },
        {
          title: 'Premium Quality',
          description: 'Pharmaceutical-grade treatments from US-licensed compounding pharmacies.',
          icon: 'Award'
        },
        {
          title: 'Fast Results',
          description: 'Get your assessment reviewed and recommendations within 24-48 hours.',
          icon: 'Clock'
        },
        {
          title: 'Personalized Protocols',
          description: 'Custom treatment plans tailored to your unique hormonal profile and goals.',
          icon: 'Brain'
        }
      ]
    },
    whyUs: {
      sectionTitle: 'Why ATHENA',
      items: [
        {
          title: 'Women-Focused Care',
          description: 'Specialized treatment protocols designed specifically for women\'s health.',
          icon: 'Heart'
        },
        {
          title: 'Board-Certified Physicians',
          description: 'Expert doctors who understand women\'s hormones, metabolism, and wellness.',
          icon: 'Shield'
        },
        {
          title: 'Private & Convenient',
          description: 'Telehealth consultations. Discreet delivery. Care on your schedule.',
          icon: 'Clock'
        }
      ]
    },
    stats: {
      title: 'Proven Results',
      subtitle: 'Join thousands of women who have transformed their health through personalized care.',
      items: [
        { value: '10K+', label: 'WOMEN EMPOWERED' },
        { value: '24-48h', label: 'ASSESSMENT REVIEW TIME' },
        { value: '98%', label: 'PATIENT SATISFACTION' },
        { value: '100%', label: 'LICENSED US PHYSICIANS' }
      ]
    },
    finalCta: {
      title: 'Ready to Optimize Your Life?',
      subtitle: 'Take the first step toward balanced hormones, renewed energy, and vibrant health with a free assessment.',
      buttonText: 'Start Free Assessment',
      disclaimer: 'No credit card required • 100% confidential'
    }
  }
}

export function getBrand(): BrandConfig {
  const brandId = (process.env.NEXT_PUBLIC_BRAND || 'adonis') as BrandId
  return BRANDS[brandId]
}

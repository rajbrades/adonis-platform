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
  whyUs: {
    sectionTitle: string
    items: Array<{
      title: string
      description: string
      icon: string
    }>
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
        description: 'Advanced peptides for recovery, fat loss, muscle gain, and anti-aging.',
        href: '/treatments/peptide-therapy',
        icon: 'TrendingUp'
      },
      {
        title: 'Wellness Therapy',
        description: 'NAD+, glutathione, IV therapy, and complete wellness optimization.',
        href: '/treatments/wellness-therapy',
        icon: 'Heart'
      }
    ],
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
        title: 'Wellness Therapy',
        description: 'NAD+, glutathione, IV therapy, and comprehensive wellness optimization.',
        href: '/treatments/wellness-therapy',
        icon: 'TrendingUp'
      }
    ],
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
    }
  }
}

export function getBrand(): BrandConfig {
  const brandId = (process.env.NEXT_PUBLIC_BRAND || 'adonis') as BrandId
  return BRANDS[brandId]
}

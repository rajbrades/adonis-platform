export type BrandId = 'adonis' | '10x' | 'athena'

export interface BrandConfig {
  id: BrandId
  name: string
  colors: {
    primary: string
    primaryDark: string
    accent: string
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
    icon: string
    title: string
    description: string
    href: string
  }>
  whyChoose: {
    sectionTitle: string
    sectionSubtitle: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  whyUs: {
    items: Array<{
      icon: string
      title: string
      description: string
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
  about: {
    mission: string
  }
}

const brands: Record<BrandId, BrandConfig> = {
  adonis: {
    id: 'adonis',
    name: 'ADONIS',
    colors: {
      primary: '#FCD34D',
      primaryDark: '#F59E0B',
      accent: '#FFD700'
    },
    hero: {
      badge: 'PREMIUM MEN\'S HEALTH',
      title: 'Elevate',
      titleHighlight: 'Every Aspect',
      subtitle: 'Physician-supervised hormone optimization and performance medicine for men who demand excellence.',
      ctaPrimary: 'START FREE ASSESSMENT',
      ctaSecondary: 'HOW IT WORKS'
    },
    services: [
      {
        icon: 'Zap',
        title: 'Testosterone Optimization',
        description: 'Comprehensive TRT protocols designed to restore peak testosterone levels and vitality.',
        href: '/treatments/testosterone-replacement'
      },
      {
        icon: 'TrendingUp',
        title: 'Performance Enhancement',
        description: 'Advanced peptide therapies to maximize athletic performance and recovery.',
        href: '/treatments/peptide-therapy'
      },
      {
        icon: 'Heart',
        title: 'Sexual Wellness',
        description: 'Restore confidence and performance with evidence-based sexual health treatments.',
        href: '/treatments/sexual-wellness'
      },
      {
        icon: 'Sparkles',
        title: 'Hair Restoration',
        description: 'Prevent hair loss and promote regrowth with proven pharmaceutical interventions.',
        href: '/treatments/hair'
      },
      {
        icon: 'Shield',
        title: 'Longevity Medicine',
        description: 'Cutting-edge protocols to optimize healthspan and extend peak performance years.',
        href: '/treatments/longevity'
      }
    ],
    whyChoose: {
      sectionTitle: 'Why Choose Optimization',
      sectionSubtitle: 'Experience the difference that proper hormone balance makes in every aspect of your life.',
      items: [
        {
          icon: 'Zap',
          title: 'Peak Energy',
          description: 'Sustained vitality throughout the day'
        },
        {
          icon: 'TrendingUp',
          title: 'Muscle & Strength',
          description: 'Enhanced protein synthesis and recovery'
        },
        {
          icon: 'Brain',
          title: 'Mental Clarity',
          description: 'Improved focus and cognitive function'
        },
        {
          icon: 'Heart',
          title: 'Better Performance',
          description: 'Enhanced sexual health and confidence'
        }
      ]
    },
    whyUs: {
      items: [
        {
          icon: 'Shield',
          title: 'Licensed Physicians',
          description: 'All treatments overseen by board-certified doctors specializing in hormone optimization and performance medicine.'
        },
        {
          icon: 'Award',
          title: 'Proven Protocols',
          description: 'Evidence-based treatments combining the latest research with clinical experience for optimal results.'
        },
        {
          icon: 'Clock',
          title: 'Ongoing Support',
          description: 'Comprehensive monitoring, regular adjustments, and 24/7 access to our medical team throughout your journey.'
        }
      ]
    },
    stats: {
      title: 'Real Results',
      subtitle: 'Join thousands of men who have transformed their health and performance',
      items: [
        { value: '10,000+', label: 'MEN OPTIMIZED' },
        { value: '94%', label: 'SATISFACTION RATE' },
        { value: '24-48h', label: 'INITIAL RESPONSE' },
        { value: '100%', label: 'LICENSED PHYSICIANS' }
      ]
    },
    finalCta: {
      title: 'Ready to Unlock Your Peak Potential?',
      subtitle: 'Start your optimization journey with a comprehensive health assessment.',
      buttonText: 'BEGIN FREE ASSESSMENT',
      disclaimer: 'No credit card required • 100% confidential • HIPAA compliant'
    },
    about: {
      mission: 'Empowering men to achieve peak performance through physician-supervised hormone optimization and evidence-based performance medicine.'
    }
  },
  '10x': {
    id: '10x',
    name: '10X HEALTH',
    colors: {
      primary: '#FF0000',
      primaryDark: '#CC0000',
      accent: '#FF0000'
    },
    hero: {
      badge: 'HUMAN OPTIMIZATION MEDICINE',
      title: 'Unlock Your',
      titleHighlight: 'Peak',
      subtitle: 'Advanced therapies and protocols to optimize your energy, performance, and longevity.',
      ctaPrimary: 'START YOUR TRANSFORMATION',
      ctaSecondary: 'SEE HOW IT WORKS'
    },
    services: [
      {
        icon: 'Zap',
        title: 'Testosterone Optimization',
        description: 'Comprehensive TRT protocols designed to restore peak testosterone levels and vitality.',
        href: '/treatments/testosterone-replacement'
      },
      {
        icon: 'TrendingUp',
        title: 'Performance Enhancement',
        description: 'Advanced peptide therapies to maximize athletic performance and recovery.',
        href: '/treatments/peptide-therapy'
      },
      {
        icon: 'Heart',
        title: 'Sexual Wellness',
        description: 'Restore confidence and performance with evidence-based sexual health treatments.',
        href: '/treatments/sexual-wellness'
      },
      {
        icon: 'Sparkles',
        title: 'Hair Restoration',
        description: 'Prevent hair loss and promote regrowth with proven pharmaceutical interventions.',
        href: '/treatments/hair'
      },
      {
        icon: 'Shield',
        title: 'Longevity Medicine',
        description: 'Cutting-edge protocols to optimize healthspan and extend peak performance years.',
        href: '/treatments/longevity'
      }
    ],
    whyChoose: {
      sectionTitle: 'Why Choose Optimization',
      sectionSubtitle: 'Experience the difference that proper hormone balance makes in every aspect of your life.',
      items: [
        {
          icon: 'Zap',
          title: 'Peak Energy',
          description: 'Sustained vitality throughout the day'
        },
        {
          icon: 'TrendingUp',
          title: 'Muscle & Strength',
          description: 'Enhanced protein synthesis and recovery'
        },
        {
          icon: 'Brain',
          title: 'Mental Clarity',
          description: 'Improved focus and cognitive function'
        },
        {
          icon: 'Heart',
          title: 'Better Performance',
          description: 'Enhanced sexual health and confidence'
        }
      ]
    },
    whyUs: {
      items: [
        {
          icon: 'Shield',
          title: 'Licensed Physicians',
          description: 'All treatments overseen by board-certified doctors specializing in hormone optimization and performance medicine.'
        },
        {
          icon: 'Award',
          title: 'Proven Protocols',
          description: 'Evidence-based treatments combining the latest research with clinical experience for optimal results.'
        },
        {
          icon: 'Clock',
          title: 'Ongoing Support',
          description: 'Comprehensive monitoring, regular adjustments, and 24/7 access to our medical team throughout your journey.'
        }
      ]
    },
    stats: {
      title: 'Proven Results',
      subtitle: 'Join thousands who have transformed their health through evidence-based optimization',
      items: [
        { value: '10K+', label: 'PATIENTS OPTIMIZED' },
        { value: '98%', label: 'SATISFACTION RATE' },
        { value: '24-48h', label: 'ASSESSMENT REVIEW' },
        { value: '100%', label: 'LICENSED US PHYSICIANS' }
      ]
    },
    finalCta: {
      title: 'Ready to Optimize Your Life?',
      subtitle: 'Take the first step toward peak performance, energy, and longevity with a free health assessment.',
      buttonText: 'Start Free Assessment',
      disclaimer: 'No credit card required • 100% confidential'
    },
    about: {
      mission: 'Empowering individuals to achieve peak performance through physician-supervised hormone optimization and evidence-based performance medicine.'
    }
  },
  athena: {
    id: 'athena',
    name: 'ATHENA',
    colors: {
      primary: '#9333EA',
      primaryDark: '#7E22CE',
      accent: '#A855F7'
    },
    hero: {
      badge: 'PREMIUM WOMEN\'S HEALTH',
      title: 'Optimize',
      titleHighlight: 'Your Vitality',
      subtitle: 'Physician-supervised hormone optimization and wellness solutions designed specifically for women\'s unique health needs.',
      ctaPrimary: 'START FREE ASSESSMENT',
      ctaSecondary: 'HOW IT WORKS'
    },
    services: [
      {
        icon: 'Heart',
        title: 'Hormone Balance',
        description: 'Comprehensive hormone optimization to restore energy, mood, and overall wellness.',
        href: '/treatments/testosterone-replacement'
      },
      {
        icon: 'Sparkles',
        title: 'Aesthetic Wellness',
        description: 'Advanced treatments for skin health, hair vitality, and natural beauty enhancement.',
        href: '/treatments/peptide-therapy'
      },
      {
        icon: 'TrendingUp',
        title: 'Metabolic Health',
        description: 'Evidence-based protocols for weight management and metabolic optimization.',
        href: '/treatments/sexual-wellness'
      },
      {
        icon: 'Brain',
        title: 'Mental Clarity',
        description: 'Support cognitive function, focus, and emotional balance through targeted interventions.',
        href: '/treatments/hair'
      },
      {
        icon: 'Shield',
        title: 'Longevity & Vitality',
        description: 'Comprehensive wellness protocols to enhance healthspan and quality of life.',
        href: '/treatments/longevity'
      }
    ],
    whyChoose: {
      sectionTitle: 'Why Choose Hormone Optimization',
      sectionSubtitle: 'Experience renewed energy, balanced mood, and optimal wellness at every stage of life.',
      items: [
        {
          icon: 'Zap',
          title: 'Sustained Energy',
          description: 'Natural vitality throughout your day'
        },
        {
          icon: 'Heart',
          title: 'Balanced Mood',
          description: 'Emotional wellness and stability'
        },
        {
          icon: 'Brain',
          title: 'Sharp Mind',
          description: 'Enhanced focus and mental clarity'
        },
        {
          icon: 'Sparkles',
          title: 'Radiant Health',
          description: 'Glowing skin and vibrant wellness'
        }
      ]
    },
    whyUs: {
      items: [
        {
          icon: 'Shield',
          title: 'Women-Focused Care',
          description: 'Specialized protocols designed specifically for women\'s unique hormonal needs and life stages.'
        },
        {
          icon: 'Award',
          title: 'Evidence-Based',
          description: 'Treatment plans grounded in the latest research on women\'s hormone health and wellness.'
        },
        {
          icon: 'Heart',
          title: 'Comprehensive Support',
          description: 'Ongoing care with regular monitoring, adjustments, and compassionate medical guidance.'
        }
      ]
    },
    stats: {
      title: 'Trusted Results',
      subtitle: 'Join thousands of women who have reclaimed their vitality and wellness',
      items: [
        { value: '8,000+', label: 'WOMEN EMPOWERED' },
        { value: '96%', label: 'SATISFACTION RATE' },
        { value: '24-48h', label: 'INITIAL RESPONSE' },
        { value: '100%', label: 'LICENSED PHYSICIANS' }
      ]
    },
    finalCta: {
      title: 'Ready to Reclaim Your Vitality?',
      subtitle: 'Begin your wellness journey with a personalized health assessment.',
      buttonText: 'START FREE ASSESSMENT',
      disclaimer: 'No credit card required • 100% confidential • HIPAA compliant'
    },
    about: {
      mission: 'Empowering women to thrive through personalized hormone optimization and comprehensive wellness solutions tailored to their unique health journey.'
    }
  }
}

export function getBrand(): BrandConfig {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (tenantId === "athena") {
    return brands["athena"]
  }
  // Default to adonis
  return brands["adonis"]
}
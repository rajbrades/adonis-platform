import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

export const LAB_PANELS = {
  essential: {
    name: 'Essential Panel',
    price: 29900,
    description: 'Core biomarkers for general health optimization',
    features: [
      'Hormone Panel (Testosterone, Estradiol, DHEA)',
      'Thyroid Function (TSH, T3, T4)',
      'Metabolic Panel (Glucose, HbA1c, Lipids)',
      'Vitamin D',
      'Complete Blood Count'
    ]
  },
  comprehensive: {
    name: 'Comprehensive Panel',
    price: 49900,
    description: 'Extended biomarkers for deep health insights',
    features: [
      'Everything in Essential Panel',
      'Advanced Hormone Panel',
      'Liver & Kidney Function',
      'Inflammation Markers (CRP)',
      'Vitamins & Minerals',
      'PSA (Prostate Health)'
    ]
  },
  elite: {
    name: 'Elite Panel',
    price: 79900,
    description: 'Ultimate biomarker analysis for peak performance',
    features: [
      'Everything in Comprehensive Panel',
      'Advanced Cardiovascular Markers',
      'Insulin Resistance Testing',
      'Cortisol & Stress Hormones',
      'Growth Hormone Markers',
      'Nutrient Optimization Panel'
    ]
  }
}

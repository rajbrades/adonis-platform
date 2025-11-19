import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export const getStripe = () => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    })
  }
  return stripeInstance
}

// For backwards compatibility
export const stripe = new Proxy({} as Stripe, {
  get(target, prop) {
    return getStripe()[prop as keyof Stripe]
  }
})

export { LAB_PANELS } from './lab-panels'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about',
  '/treatments(.*)',
  '/consultation(.*)',
  '/blog(.*)',
  '/how-it-works',
  '/faq',
  '/goals',
  '/patient/login',
  '/patient/signup',
  '/patient/results',
  '/api(.*)'
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Handle patient link parameter BEFORE routing
  if (req.nextUrl.pathname === '/patient' && req.nextUrl.searchParams.has('link')) {
    const consultationId = req.nextUrl.searchParams.get('link')
    const url = req.nextUrl.clone()
    url.pathname = '/patient/signup'
    url.searchParams.set('consultation', consultationId!)
    url.searchParams.delete('link')
    return NextResponse.redirect(url)
  }

  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

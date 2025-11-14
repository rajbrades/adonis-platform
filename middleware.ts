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
  '/checkout(.*)',
  '/payment(.*)',
  '/blog(.*)',
  '/how-it-works',
  '/faq',
  '/goals',
  '/products',
  '/patient/login',
  '/patient/signup',
  '/patient/results(.*)',
  '/password',
  '/api/auth/verify-password',
  '/api/consultations/public(.*)',
  '/api/consultations/submit(.*)',
  '/api/patient(.*)',
  '/api/stripe(.*)',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const isPasswordRoute = req.nextUrl.pathname === '/password';
  const isPasswordAPI = req.nextUrl.pathname === '/api/auth/verify-password';
  
  if (isPasswordRoute || isPasswordAPI) {
    return NextResponse.next();
  }
  
  const hasAccess = req.cookies.get('site-access')?.value === 'granted';
  
  if (!hasAccess) {
    const url = new URL('/password', req.url);
    url.searchParams.set('returnUrl', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

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

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

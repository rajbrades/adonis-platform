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
  '/password',
  '/api/auth/verify-password',
  '/api(.*)'
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // PASSWORD PROTECTION - Check FIRST before Clerk
  const isPasswordRoute = req.nextUrl.pathname === '/password';
  const isPasswordAPI = req.nextUrl.pathname === '/api/auth/verify-password';
  
  // Always allow password page and API (handled by isPublicRoute now)
  if (isPasswordRoute || isPasswordAPI) {
    return NextResponse.next();
  }
  
  // Check if user has site access
  const hasAccess = req.cookies.get('site-access')?.value === 'granted';
  
  // Redirect to password page if no access
  if (!hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = '/password';
    return NextResponse.redirect(url);
  }

  // Handle patient link parameter
  if (req.nextUrl.pathname === '/patient' && req.nextUrl.searchParams.has('link')) {
    const consultationId = req.nextUrl.searchParams.get('link')
    const url = req.nextUrl.clone()
    url.pathname = '/patient/signup'
    url.searchParams.set('consultation', consultationId!)
    url.searchParams.delete('link')
    return NextResponse.redirect(url)
  }

  // Then run Clerk protection for non-public routes
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

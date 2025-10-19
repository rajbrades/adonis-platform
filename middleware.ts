import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isProviderRoute = createRouteMatcher(['/provider(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  
  // If not logged in and trying to access protected routes, redirect to sign-in
  if (!userId && (isAdminRoute(req) || isProviderRoute(req))) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // If logged in, check roles
  if (userId && sessionClaims) {
    const role = (sessionClaims.publicMetadata as { role?: string })?.role

    // Protect admin routes
    if (isAdminRoute(req) && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    // Protect provider routes (allow both admin and provider)
    if (isProviderRoute(req) && role !== 'admin' && role !== 'provider') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

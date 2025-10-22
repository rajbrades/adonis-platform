import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isProviderRoute = createRouteMatcher(['/provider(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  
  console.log('🔍 Middleware Debug:', {
    path: req.nextUrl.pathname,
    userId: userId ? 'exists' : 'none',
    sessionClaims: sessionClaims ? 'exists' : 'none',
    publicMetadata: sessionClaims?.publicMetadata,
    fullSessionClaims: JSON.stringify(sessionClaims, null, 2)
  })
  
  // If not logged in and trying to access protected routes, redirect to sign-in
  if (!userId && (isAdminRoute(req) || isProviderRoute(req))) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // If logged in, check roles
  if (userId && sessionClaims) {
    const role = (sessionClaims.publicMetadata as { role?: string })?.role
    
    console.log('🔑 Role check:', {
      role,
      isAdminRoute: isAdminRoute(req),
      isProviderRoute: isProviderRoute(req)
    })

    // Protect admin routes
    if (isAdminRoute(req) && role !== 'admin') {
      console.log('❌ Access denied - not admin')
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    // Protect provider routes (allow both admin and provider)
    if (isProviderRoute(req) && role !== 'admin' && role !== 'provider') {
      console.log('❌ Access denied - not admin or provider')
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
    
    console.log('✅ Access granted')
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

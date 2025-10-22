import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isProviderRoute = createRouteMatcher(['/provider(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  
  // DETAILED DEBUGGING
  const metadata = sessionClaims?.publicMetadata
  const role = metadata && typeof metadata === 'object' && 'role' in metadata 
    ? (metadata as { role?: string }).role 
    : undefined
  
  console.log('🔍 FULL DEBUG:', {
    path: req.nextUrl.pathname,
    userId,
    hasSessionClaims: !!sessionClaims,
    metadataType: typeof metadata,
    metadata: JSON.stringify(metadata),
    role,
    sessionClaimsKeys: sessionClaims ? Object.keys(sessionClaims) : []
  })
  
  // If not logged in and trying to access protected routes, redirect to sign-in
  if (!userId && (isAdminRoute(req) || isProviderRoute(req))) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // If logged in, check roles
  if (userId && sessionClaims) {
    console.log('🔑 Role check:', {
      role,
      expected: 'admin',
      match: role === 'admin',
      isAdminRoute: isAdminRoute(req)
    })

    // Protect admin routes
    if (isAdminRoute(req) && role !== 'admin') {
      console.log('❌ BLOCKED - Role is:', role, 'Expected: admin')
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    // Protect provider routes
    if (isProviderRoute(req) && role !== 'admin' && role !== 'provider') {
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

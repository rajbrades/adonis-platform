import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isProviderRoute = createRouteMatcher(['/provider(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  
  // If not logged in, redirect to sign-in
  if (!userId && (isAdminRoute(req) || isProviderRoute(req))) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // TEMPORARILY: Allow any logged-in user to access admin
  // We'll fix the role check later
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

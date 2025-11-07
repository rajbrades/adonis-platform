'use client'

import Link from 'next/link'
import { useClerk, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function UnauthorizedPage() {
  const brand = getBrand()
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-white/60">
            You do not have permission to access this page.
          </p>
        </div>

        {user && (
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-white/40 mb-1">Logged in as:</p>
            <p className="text-white font-medium">{user.emailAddresses[0]?.emailAddress}</p>
            {user.publicMetadata?.role ? (
              <p className="text-sm text-white/60 mt-1">Role: {user.publicMetadata.role as string}</p>
            ) : (
              <p className="text-sm text-yellow-400 mt-1">⚠️ No role assigned</p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl hover:bg-yellow-300 transition-colors"
          >
            Go to Homepage
          </Link>
          
          {user && (
            <button
              onClick={handleSignOut}
              className="block w-full bg-red-500/20 text-red-400 font-medium py-3 px-6 rounded-xl hover:bg-red-500/30 transition-colors"
            >
              Sign Out & Refresh Session
            </button>
          )}
          
          {!user && (
            <Link
              href="/sign-in"
              className="block w-full bg-white/10 text-white font-medium py-3 px-6 rounded-xl hover:bg-white/20 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        <p className="mt-6 text-xs text-white/40">
          If you just updated your role, sign out and back in to refresh your session.
        </p>
      </div>
    </div>
  )
}

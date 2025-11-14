'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function PasswordForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const returnUrl = searchParams.get('returnUrl') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        window.location.href = returnUrl
      } else {
        setError('Incorrect password')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Enter Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500"
          placeholder="Enter site password"
          autoFocus
        />
      </div>
      
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Enter Site'}
      </button>
    </form>
  )
}

export default function PasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">ADONIS Health</h1>
          <p className="text-white/60 mb-6">This site is currently in private beta</p>
          
          <Suspense fallback={
            <div className="space-y-4">
              <div className="h-20 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-12 bg-white/10 rounded-lg animate-pulse" />
            </div>
          }>
            <PasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

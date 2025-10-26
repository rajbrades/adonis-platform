'use client'

export const dynamic = 'force-dynamic'

import { useUser } from '@clerk/nextjs'

export default function TestAdmin() {
  const { user, isLoaded } = useUser()
  
  console.log('🎯 CALLING useUser():', { isLoaded, hasUser: !!user })
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, black, #1a1a1a)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: '18px',
      padding: '20px'
    }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        ✅ CALLING useUser() HOOK
      </div>
      <div>isLoaded: {String(isLoaded)}</div>
      <div>hasUser: {String(!!user)}</div>
      {user && <div>Email: {user.emailAddresses[0]?.emailAddress}</div>}
    </div>
  )
}

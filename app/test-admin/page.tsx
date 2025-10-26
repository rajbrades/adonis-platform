'use client'

export const dynamic = 'force-dynamic'

import { useUser } from '@clerk/nextjs'

export default function TestAdmin() {
  console.log('🎯 TEST PAGE WITH CLERK IMPORT - NOT CALLING HOOKS YET')
  
  // NOT calling useUser() yet
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, black, #1a1a1a)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      ✅ CLERK IMPORTED BUT NOT USED
    </div>
  )
}

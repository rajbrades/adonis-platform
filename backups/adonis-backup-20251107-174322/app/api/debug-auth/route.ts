import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId, sessionClaims } = await auth()
  
  return NextResponse.json({
    userId,
    sessionClaims: sessionClaims,
    publicMetadata: sessionClaims?.publicMetadata,
    role: (sessionClaims?.publicMetadata as any)?.role,
    fullSessionClaims: JSON.stringify(sessionClaims, null, 2)
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

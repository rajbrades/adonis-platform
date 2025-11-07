import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PASSWORD = process.env.SITE_PASSWORD || 'adonis2025'

export function middleware(request: NextRequest) {
  // Skip authentication check for API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const authCookie = request.cookies.get('site-auth')
  
  if (authCookie?.value === PROTECTED_PASSWORD) {
    return NextResponse.next()
  }

  // Show password prompt
  const response = new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Protected Site</title>
        <style>
          body {
            background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
          }
          .container {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 40px;
            max-width: 400px;
            text-align: center;
          }
          h1 {
            color: #FFD700;
            margin-bottom: 24px;
            font-size: 32px;
          }
          input {
            width: 100%;
            padding: 12px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: white;
            font-size: 16px;
            margin-bottom: 16px;
          }
          button {
            width: 100%;
            padding: 12px;
            background: #FFD700;
            color: black;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
          }
          button:hover {
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔒 ADONIS</h1>
          <p style="color: rgba(255,255,255,0.7); margin-bottom: 24px;">
            This site is password protected
          </p>
          <form method="POST">
            <input 
              type="password" 
              name="password" 
              placeholder="Enter password"
              required
              autofocus
            />
            <button type="submit">Access Site</button>
          </form>
        </div>
      </body>
    </html>`,
    { status: 401, headers: { 'content-type': 'text/html' } }
  )

  return response
}

export const config = {
  matcher: '/:path*',
}

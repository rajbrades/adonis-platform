import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PASSWORD = process.env.SITE_PASSWORD || 'GetAdonis25!'

export async function middleware(request: NextRequest) {
  // Skip auth for API routes, static files, and auth endpoint
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if user is authenticated via cookie
  const authCookie = request.cookies.get('site-auth')
  
  if (authCookie?.value === PROTECTED_PASSWORD) {
    return NextResponse.next()
  }

  // Handle password submission (POST request)
  if (request.method === 'POST') {
    const formData = await request.formData()
    const password = formData.get('password')

    if (password === PROTECTED_PASSWORD) {
      // Set auth cookie and redirect
      const response = NextResponse.redirect(request.url)
      response.cookies.set('site-auth', PROTECTED_PASSWORD, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      return response
    }
  }

  // Show password prompt
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Protected Site</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .container {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 40px;
            width: 90%;
            max-width: 400px;
            text-align: center;
          }
          h1 {
            color: #FFD700;
            margin-bottom: 8px;
            font-size: 32px;
            font-weight: 900;
            letter-spacing: 2px;
          }
          .subtitle {
            color: rgba(255,255,255,0.5);
            margin-bottom: 32px;
            font-size: 14px;
          }
          input {
            width: 100%;
            padding: 14px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: white;
            font-size: 16px;
            margin-bottom: 16px;
            transition: all 0.3s;
          }
          input:focus {
            outline: none;
            border-color: #FFD700;
            background: rgba(255, 255, 255, 0.15);
          }
          input::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }
          button {
            width: 100%;
            padding: 14px;
            background: #FFD700;
            color: #000;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
          }
          button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
          button:active {
            transform: translateY(0);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔒 ADONIS</h1>
          <p class="subtitle">This site is password protected</p>
          <form method="POST" action="${request.nextUrl.pathname}">
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
    { 
      status: 401, 
      headers: { 
        'content-type': 'text/html',
        'cache-control': 'no-store'
      } 
    }
  )
}

export const config = {
  matcher: '/:path*',
}

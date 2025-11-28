import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip password check if password protection is disabled
  const isPasswordProtected = process.env.NEXT_PUBLIC_PASSWORD_PROTECT === 'true'

  if (!isPasswordProtected) {
    return NextResponse.next()
  }

  // Check if user has valid session cookie
  const authCookie = request.cookies.get('site-auth')

  if (authCookie?.value === 'authenticated') {
    return NextResponse.next()
  }

  // Check if this is the login attempt
  const password = request.nextUrl.searchParams.get('password')
  const sitePassword = process.env.SITE_PASSWORD || 'changeme'

  if (password === sitePassword) {
    // Set authentication cookie
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.set('site-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return response
  }

  // Show password page
  if (password && password !== sitePassword) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Protected</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              padding: 3rem;
              border-radius: 1rem;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              max-width: 400px;
              width: 90%;
            }
            h1 {
              margin: 0 0 0.5rem 0;
              font-size: 1.5rem;
              color: #1a202c;
            }
            .error {
              color: #e53e3e;
              margin: 0 0 1.5rem 0;
              font-size: 0.875rem;
            }
            form {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
            input {
              padding: 0.75rem;
              border: 2px solid #e2e8f0;
              border-radius: 0.5rem;
              font-size: 1rem;
              transition: border-color 0.2s;
            }
            input:focus {
              outline: none;
              border-color: #667eea;
            }
            button {
              padding: 0.75rem;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              border-radius: 0.5rem;
              font-size: 1rem;
              font-weight: 600;
              cursor: pointer;
              transition: transform 0.2s;
            }
            button:hover {
              transform: translateY(-2px);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🔒 Password Required</h1>
            <p class="error">Incorrect password. Please try again.</p>
            <form method="GET">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                autofocus
                required
              />
              <button type="submit">Access Site</button>
            </form>
          </div>
        </body>
      </html>`,
      {
        status: 401,
        headers: { 'content-type': 'text/html' },
      }
    )
  }

  // Show initial password page
  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Protected</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .container {
            background: white;
            padding: 3rem;
            border-radius: 1rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 90%;
          }
          h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.5rem;
            color: #1a202c;
          }
          p {
            color: #718096;
            margin: 0 0 1.5rem 0;
            font-size: 0.875rem;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          input {
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: border-color 0.2s;
          }
          input:focus {
            outline: none;
            border-color: #667eea;
          }
          button {
            padding: 0.75rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
          }
          button:hover {
            transform: translateY(-2px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔒 Password Required</h1>
          <p>This site is password protected.</p>
          <form method="GET">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              autofocus
              required
            />
            <button type="submit">Access Site</button>
          </form>
        </div>
      </body>
    </html>`,
    {
      status: 401,
      headers: { 'content-type': 'text/html' },
    }
  )
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

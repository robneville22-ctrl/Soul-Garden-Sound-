import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, state } = req.query;
  
  if (!code || typeof code !== 'string') {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authorization Failed</title>
          <style>
            body { font-family: system-ui; text-align: center; padding: 2rem; }
            .error { color: #d32f2f; }
          </style>
        </head>
        <body>
          <h1 class="error">Authorization Failed</h1>
          <p>No authorization code provided. Please try again.</p>
        </body>
      </html>
    `);
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const siteUrl = process.env.SITE_URL || 'https://soul-garden-sound.vercel.app';

  if (!clientId || !clientSecret) {
    console.error('Missing OAuth credentials');
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Configuration Error</title>
          <style>
            body { font-family: system-ui; text-align: center; padding: 2rem; }
            .error { color: #d32f2f; }
          </style>
        </head>
        <body>
          <h1 class="error">Configuration Error</h1>
          <p>OAuth credentials are not configured. Please contact the administrator.</p>
        </body>
      </html>
    `);
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Soul-Garden-Sound-CMS'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    if (!tokenResponse.ok) {
      throw new Error(`GitHub API returned ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('GitHub OAuth error:', tokenData);
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Authorization Failed</title>
            <style>
              body { font-family: system-ui; text-align: center; padding: 2rem; }
              .error { color: #d32f2f; }
            </style>
          </head>
          <body>
            <h1 class="error">Authorization Failed</h1>
            <p>${tokenData.error_description || tokenData.error}</p>
            <p><small>Please try again or contact support if the problem persists.</small></p>
          </body>
        </html>
      `);
    }

    if (!tokenData.access_token) {
      throw new Error('No access token received from GitHub');
    }

    // Escape the token to prevent XSS
    const escapedToken = JSON.stringify(tokenData.access_token).replace(/</g, '\\u003c');

    // Return success page with token in the correct format for Decap CMS
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authorization Successful</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
            }
            .success-icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✓</div>
            <h1>Authorization Successful!</h1>
            <p>You can close this window and return to the CMS.</p>
          </div>
          <script>
            (function() {
              function receiveMessage(e) {
                // Validate origin for security
                const allowedOrigins = ['${siteUrl}', 'http://localhost:3000', 'http://localhost:5173'];
                if (!allowedOrigins.includes(e.origin)) {
                  console.warn('Rejected message from unauthorized origin:', e.origin);
                  return;
                }
                
                console.log("receiveMessage %o", e);
                // Send success message with token and provider
                window.opener.postMessage(
                  'authorization:github:success:' + JSON.stringify({
                    token: ${escapedToken},
                    provider: 'github'
                  }),
                  e.origin
                );
                window.removeEventListener("message", receiveMessage, false);
              }
              
              window.addEventListener("message", receiveMessage, false);
              console.log("Sending authorizing message");
              window.opener.postMessage("authorizing:github", "*");
              
              // Auto-close after 3 seconds if window is still open
              setTimeout(function() {
                if (window.opener) {
                  window.close();
                }
              }, 3000);
            })();
          </script>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.send(html);
  } catch (error) {
    console.error('OAuth error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authentication Error</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: #f5f5f5;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .error { color: #d32f2f; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="error">Authentication Failed</h1>
            <p>An error occurred during authentication: ${errorMessage}</p>
            <p><small>Please try again or contact support if the problem persists.</small></p>
          </div>
        </body>
      </html>
    `);
  }
}

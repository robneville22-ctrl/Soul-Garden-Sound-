import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description });
    }

    // Return success page with token
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authorization Successful</title>
        </head>
        <body>
          <script>
            (function() {
              function receiveMessage(e) {
                console.log("receiveMessage %o", e);
                window.opener.postMessage(
                  'authorization:github:success:${JSON.stringify(tokenData)}',
                  e.origin
                );
                window.removeEventListener("message", receiveMessage, false);
              }
              window.addEventListener("message", receiveMessage, false);
              console.log("Sending message: %o", "github");
              window.opener.postMessage("authorizing:github", "*");
            })();
          </script>
          <p>Authorization successful! You can close this window.</p>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('OAuth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

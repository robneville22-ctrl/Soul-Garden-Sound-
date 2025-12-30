import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const siteUrl = process.env.SITE_URL || 'https://soul-garden-sound.vercel.app';
  const redirectUri = `${siteUrl}/api/callback`;
  
  if (!clientId) {
    console.error('OAUTH_CLIENT_ID is not set');
    return res.status(500).json({ 
      error: 'OAuth configuration error',
      message: 'OAuth client ID is not configured. Please set OAUTH_CLIENT_ID environment variable.'
    });
  }

  // Generate a state parameter for CSRF protection (optional but recommended)
  const stateParam = req.query.state;
  const state: string = typeof stateParam === 'string' 
    ? stateParam 
    : Array.isArray(stateParam) && stateParam.length > 0
      ? String(stateParam[0])
      : Math.random().toString(36).substring(7);
  
  // Build authorization URL
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'repo,user');
  authUrl.searchParams.set('state', state);
  
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.redirect(authUrl.toString());
}

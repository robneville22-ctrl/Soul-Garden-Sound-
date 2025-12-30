import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const redirectUri = `${process.env.SITE_URL}/api/callback`;
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`;
  
  res.redirect(authUrl);
}

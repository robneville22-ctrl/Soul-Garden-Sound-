# Decap CMS → Automation Webhook Template

## Overview
This document outlines how to connect Decap CMS publish events in the Soul Garden Sound project
to downstream automation workflows (e.g., social media posts, YouTube pipeline triggers, email notifications).

Since Decap CMS saves content as Git commits to GitHub, the automation hook is a **GitHub Webhook**
rather than a CMS-native webhook.

## Architecture

```
[CMS Editor saves in Decap]
       ↓
[Git commit pushed to robneville22-ctrl/Soul-Garden-Sound-] 
       ↓
[GitHub Webhook fires POST to your automation endpoint]
       ↓
[Vercel API route /api/cms-webhook receives the payload]
       ↓
[Route inspects which file changed → triggers downstream action]
```

## Setup Steps

### 1. Create the Webhook Receiver Route

Create `api/cms-webhook.ts` in the Soul Garden Sound project:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify the webhook secret
  const signature = req.headers['x-hub-signature-256'];
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  // TODO: Verify HMAC signature for security

  const payload = req.body;
  const commits = payload.commits || [];
  
  for (const commit of commits) {
    const addedOrModified = [...(commit.added || []), ...(commit.modified || [])];
    
    for (const file of addedOrModified) {
      if (file.startsWith('src/content/services/')) {
        console.log('[Webhook] New/updated service:', file);
        // Trigger: Post to social media, update newsletter, etc.
      }
      if (file.startsWith('src/content/events/')) {
        console.log('[Webhook] New/updated event:', file);
        // Trigger: Send event notification email, create calendar entry
      }
      if (file.startsWith('src/content/testimonials/')) {
        console.log('[Webhook] New testimonial:', file);
        // Trigger: Queue for social media highlight
      }
    }
  }

  return res.status(200).json({ received: true });
}
```

### 2. Configure GitHub Webhook

1. Go to https://github.com/robneville22-ctrl/Soul-Garden-Sound-/settings/hooks
2. Click **Add webhook**
3. Set **Payload URL** to: `https://soul-garden-sound.vercel.app/api/cms-webhook`
4. Set **Content type** to: `application/json`
5. Set a **Secret** and save it as `WEBHOOK_SECRET` in Vercel env vars
6. Select **Just the push event**
7. Click **Add webhook**

### 3. Add Environment Variable

In the Vercel dashboard, add:
- **Name:** `WEBHOOK_SECRET`
- **Value:** (generate a random string, e.g., `openssl rand -hex 32`)

## Connecting to n8n or Zapier (Optional)

Instead of building custom logic in the Vercel route, you can forward the webhook
to an automation platform:

- **n8n (self-hosted):** Set the GitHub webhook URL to your n8n instance's webhook trigger URL
- **Zapier:** Use a Zapier webhook trigger and point GitHub at the Zapier URL

This lets non-developers build automation flows visually (e.g., "When a new event is published → post to Instagram → send email to subscriber list").

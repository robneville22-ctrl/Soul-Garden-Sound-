import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple email storage endpoint
// In production, you might want to use a service like Mailchimp, ConvertKit, or a database
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, message } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Log the subscription (in production, save to database or email service)
    console.log('New newsletter subscription:', {
      email,
      name: name || 'Not provided',
      message: message || 'Not provided',
      timestamp: new Date().toISOString()
    });

    // TODO: In production, integrate with:
    // - Mailchimp API
    // - ConvertKit API
    // - Airtable
    // - Google Sheets API
    // - Or your preferred email marketing service

    return res.status(200).json({ 
      success: true, 
      message: 'Email saved successfully' 
    });
  } catch (error) {
    console.error('Error saving email:', error);
    return res.status(500).json({ error: 'Failed to save email' });
  }
}


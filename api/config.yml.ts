import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In Vercel, files are in the project root
    // Try multiple possible paths
    const possiblePaths = [
      join(process.cwd(), 'public', 'admin', 'config.yml'),
      join(__dirname, '..', 'public', 'admin', 'config.yml'),
      join(process.cwd(), 'admin', 'config.yml'),
    ];

    let configContent: string | null = null;
    let lastError: Error | null = null;

    for (const configPath of possiblePaths) {
      try {
        configContent = readFileSync(configPath, 'utf-8');
        break;
      } catch (err) {
        lastError = err as Error;
        continue;
      }
    }

    if (!configContent) {
      console.error('Could not find config.yml in any of these paths:', possiblePaths);
      console.error('Last error:', lastError);
      return res.status(404).json({ error: 'Config file not found' });
    }

    res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(configContent);
  } catch (error) {
    console.error('Error reading config.yml:', error);
    res.status(500).json({ error: 'Failed to load config file' });
  }
}


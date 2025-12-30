import type { VercelRequest, VercelResponse } from '@vercel/node';

// Embed the config content directly to ensure it's always available
// This approach is more reliable than reading from filesystem in serverless functions
const CONFIG_CONTENT = `backend:
  name: github
  repo: robneville22-ctrl/Soul-Garden-Sound-
  branch: main
  base_url: https://soul-garden-sound.vercel.app
  auth_endpoint: api/auth

# Media library configuration
# Note: Image widget supports both URL input and file uploads
# For file uploads, configure a media library provider (e.g., Cloudinary, Uploadcare)
# For now, users can paste image URLs directly
media_folder: "public/images/uploads"
public_folder: "/images/uploads"

# Site configuration
site_url: https://soul-garden-sound.vercel.app
display_url: https://soul-garden-sound.vercel.app
locale: "en"

collections:
  - name: "services"
    label: "Services"
    folder: "src/content/services"
    create: true
    slug: "{{slug}}"
    format: "frontmatter"
    extension: "md"
    fields:
      - {label: "Title", name: "title", widget: "string", required: true, hint: "The name of the service (e.g., 'Intuitive Reiki Healing')"}
      - {label: "Description", name: "description", widget: "text", required: true, hint: "A brief description that appears on the service card"}
      - {label: "Price", name: "price", widget: "string", required: true, hint: "Price with dollar sign (e.g., '$85')"}
      - {label: "Duration", name: "duration", widget: "string", required: true, hint: "Session length (e.g., '60 min')"}
      - {label: "Image", name: "image", widget: "image", required: true, hint: "Upload or paste URL of service image"}
      - {label: "Icon", name: "icon", widget: "select", options: ["Sparkles", "Music", "Heart", "Star"], default: "Sparkles", hint: "Icon to display with the service"}
      - {label: "Tagline", name: "body", widget: "text", required: false, hint: "Short tagline that appears below the title (optional)"}

  - name: "events"
    label: "Events"
    folder: "src/content/events"
    create: true
    slug: "{{slug}}"
    format: "frontmatter"
    extension: "md"
    fields:
      - {label: "Title", name: "title", widget: "string", required: true, hint: "Event name (e.g., 'Full Moon Sound Bath Journey')"}
      - {label: "Date & Time", name: "date", widget: "datetime", required: true, format: "YYYY-MM-DDTHH:mm:ss", date_format: "YYYY-MM-DD", time_format: "HH:mm:ss", hint: "Select the event date and time"}
      - {label: "Display Time", name: "time", widget: "string", required: false, hint: "Human-readable time (e.g., '7:00 PM') - optional"}
      - {label: "Location", name: "location", widget: "string", required: true, hint: "Where the event takes place"}
      - {label: "Price", name: "price", widget: "string", required: true, hint: "Ticket price with dollar sign (e.g., '$45')"}
      - {label: "Description", name: "description", widget: "text", required: true, hint: "Short teaser description for the event card"}
      - {label: "Image", name: "image", widget: "image", required: true, hint: "Upload or paste URL of event image"}
      - {label: "Full Description", name: "body", widget: "markdown", required: false, hint: "Detailed event description (supports markdown formatting)"}

  - name: "testimonials"
    label: "Testimonials"
    folder: "src/content/testimonials"
    create: true
    slug: "{{slug}}"
    format: "frontmatter"
    extension: "md"
    fields:
      - {label: "Name", name: "name", widget: "string", required: true, hint: "Client's first and last name"}
      - {label: "Role/Title", name: "role", widget: "string", required: false, hint: "Optional title or description (e.g., 'Yoga Instructor')"}
      - {label: "Quote", name: "quote", widget: "text", required: true, hint: "The testimonial text"}
      - {label: "Rating", name: "rating", widget: "number", default: 5, value_type: "int", min: 1, max: 5, hint: "Star rating (1-5)"}
`;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(CONFIG_CONTENT);
  } catch (error) {
    console.error('Error serving config.yml:', error);
    res.status(500).json({ error: 'Failed to load config file' });
  }
}


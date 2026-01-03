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
  - name: "site_settings"
    label: "Site Settings"
    files:
      - label: "Homepage Settings"
        name: "homepage"
        file: "src/content/site-settings.md"
        fields:
          - {label: "Hero Image", name: "hero_image", widget: "image", required: true, hint: "Main image displayed below 'Start Your Journey' button"}
          - {label: "Hero Image Alt Text", name: "hero_image_alt", widget: "string", required: false, default: "Serene Wellness Atmosphere", hint: "Description of the hero image for accessibility"}
          
          - {label: "--- Header & Navigation ---", name: "header_divider", widget: "string", required: false, default: ""}
          - {label: "Site Name", name: "site_name", widget: "string", required: true, hint: "Website name displayed in header"}
          - {label: "Navigation - Benefits", name: "nav_benefits", widget: "string", required: true, hint: "Benefits navigation link text"}
          - {label: "Navigation - Mission", name: "nav_mission", widget: "string", required: true, hint: "Mission navigation link text"}
          - {label: "Navigation - Services", name: "nav_services", widget: "string", required: true, hint: "Services navigation link text"}
          - {label: "Book Button Text", name: "book_button", widget: "string", required: true, hint: "Text for the booking button in header"}
          
          - {label: "--- Hero Section ---", name: "hero_divider", widget: "string", required: false, default: ""}
          - {label: "Headline Line 1", name: "hero_headline_line1", widget: "string", required: true, hint: "First line of main headline"}
          - {label: "Headline Line 2", name: "hero_headline_line2", widget: "string", required: true, hint: "Second line of main headline (italicized)"}
          - {label: "Hero Description", name: "hero_description", widget: "text", required: true, hint: "Subheading text below headline"}
          - {label: "Hero Button Text", name: "hero_button", widget: "string", required: true, hint: "Text for main call-to-action button"}
          - {label: "Pill Menu - Benefits", name: "hero_pill_benefits", widget: "string", required: true, hint: "Benefits link in floating pill menu"}
          - {label: "Pill Menu - Mission", name: "hero_pill_mission", widget: "string", required: true, hint: "Mission link in floating pill menu"}
          - {label: "Pill Menu - Services", name: "hero_pill_services", widget: "string", required: true, hint: "Services link in floating pill menu"}
          
          - {label: "--- Benefits Section ---", name: "benefits_divider", widget: "string", required: false, default: ""}
          - {label: "Benefit 1 - Title", name: "benefits_title_1", widget: "string", required: true, hint: "First benefit card title"}
          - {label: "Benefit 1 - Description", name: "benefits_desc_1", widget: "text", required: true, hint: "First benefit card description"}
          - {label: "Benefit 2 - Title", name: "benefits_title_2", widget: "string", required: true, hint: "Second benefit card title"}
          - {label: "Benefit 2 - Description", name: "benefits_desc_2", widget: "text", required: true, hint: "Second benefit card description"}
          - {label: "Benefit 3 - Title", name: "benefits_title_3", widget: "string", required: true, hint: "Third benefit card title"}
          - {label: "Benefit 3 - Description", name: "benefits_desc_3", widget: "text", required: true, hint: "Third benefit card description"}
          
          - {label: "--- Mission Section ---", name: "mission_divider", widget: "string", required: false, default: ""}
          - {label: "Mission Title", name: "mission_title", widget: "string", required: true, hint: "Main heading for mission section"}
          - {label: "Mission Paragraph 1", name: "mission_para_1", widget: "text", required: true, hint: "First paragraph of mission content"}
          - {label: "Mission Paragraph 2", name: "mission_para_2", widget: "text", required: true, hint: "Second paragraph of mission content"}
          - {label: "Mission Bullet 1", name: "mission_bullet_1", widget: "string", required: true, hint: "First bullet point"}
          - {label: "Mission Bullet 2", name: "mission_bullet_2", widget: "string", required: true, hint: "Second bullet point"}
          - {label: "Mission Bullet 3", name: "mission_bullet_3", widget: "string", required: true, hint: "Third bullet point"}
          
          - {label: "--- Services & Events ---", name: "services_divider", widget: "string", required: false, default: ""}
          - {label: "Services Heading", name: "services_heading", widget: "string", required: true, hint: "Heading above services grid"}
          - {label: "Events Heading", name: "events_heading", widget: "string", required: true, hint: "Heading above events grid"}
          
          - {label: "--- Testimonials Section ---", name: "testimonials_divider", widget: "string", required: false, default: ""}
          - {label: "Testimonials Heading", name: "testimonials_heading", widget: "string", required: true, hint: "Heading above testimonials"}
          
          - {label: "--- Call-to-Action Section ---", name: "cta_divider", widget: "string", required: false, default: ""}
          - {label: "CTA Title", name: "cta_title", widget: "string", required: true, hint: "Main heading for final CTA section"}
          - {label: "CTA Description", name: "cta_description", widget: "text", required: true, hint: "Description text in CTA section"}
          - {label: "CTA Primary Button", name: "cta_button_primary", widget: "string", required: true, hint: "Text for primary CTA button"}
          - {label: "CTA Secondary Button", name: "cta_button_secondary", widget: "string", required: true, hint: "Text for secondary CTA button"}
          
          - {label: "--- Footer ---", name: "footer_divider", widget: "string", required: false, default: ""}
          - {label: "Footer Tagline", name: "footer_tagline", widget: "text", required: true, hint: "Footer tagline/description"}
          - {label: "Footer Address Line 1", name: "footer_address_line1", widget: "string", required: true, hint: "First line of address"}
          - {label: "Footer Address Line 2", name: "footer_address_line2", widget: "string", required: true, hint: "Second line of address"}
          - {label: "Footer Email", name: "footer_email", widget: "string", required: true, hint: "Contact email address"}
          - {label: "Footer Phone", name: "footer_phone", widget: "string", required: true, hint: "Contact phone number"}
          - {label: "Footer Copyright", name: "footer_copyright", widget: "string", required: true, hint: "Copyright notice"}
          - {label: "Footer Made With", name: "footer_made_with", widget: "string", required: true, hint: "Footer attribution text"}

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


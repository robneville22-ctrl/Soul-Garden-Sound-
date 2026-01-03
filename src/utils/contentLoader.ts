// Custom frontmatter parser to avoid CSP eval() issues with gray-matter
import { Service, WellnessEvent, Testimonial, SiteSettings } from '../types';

// Import all markdown files
// Use ?raw query to import as raw strings
const serviceFiles = import.meta.glob('../content/services/*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default'
}) as Record<string, any>;

const eventFiles = import.meta.glob('../content/events/*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default'
}) as Record<string, any>;

const testimonialFiles = import.meta.glob('../content/testimonials/*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default'
}) as Record<string, any>;

const siteSettingsFile = import.meta.glob('../content/site-settings.md', { 
  eager: true, 
  query: '?raw',
  import: 'default'
}) as Record<string, any>;

// Debug: Log what we're getting
if (typeof window !== 'undefined') {
  console.log('Service files loaded:', Object.keys(serviceFiles).length);
  console.log('Event files loaded:', Object.keys(eventFiles).length);
}

/**
 * Safely parse price string to number
 */
function parsePrice(price: string | undefined): number {
  if (!price) return 0;
  // Remove $ and any whitespace, then parse
  const cleaned = price.toString().replace(/[$,\s]/g, '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Parse frontmatter from markdown content
 * Simple YAML parser that doesn't use eval()
 */
function parseFrontmatter(content: string): { data: Record<string, any>, content: string } {
  const parts = content.split('---');
  
  if (parts.length < 3) {
    return { data: {}, content: content.trim() };
  }
  
  const frontmatter = parts[1].trim();
  const body = parts.slice(2).join('---').trim();
  
  // Simple YAML parser for our use case
  const data: Record<string, any> = {};
  const lines = frontmatter.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmed.substring(0, colonIndex).trim();
    let value = trimmed.substring(colonIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    data[key] = value;
  }
  
  return { data, content: body };
}

/**
 * Extract body content from markdown (content after frontmatter)
 */
function extractBody(content: string): string {
  const parts = content.split('---');
  if (parts.length >= 3) {
    return parts.slice(2).join('---').trim();
  }
  return '';
}

/**
 * Format event date for display
 */
function formatEventDate(date: string | Date | undefined, time?: string): string {
  if (!date) return 'Date TBA';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return date.toString();
    
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    return time ? `${formattedDate} • ${time}` : formattedDate;
  } catch (error) {
    console.warn('Error formatting date:', error);
    return time ? `${date} • ${time}` : date.toString();
  }
}

export function loadServices(): Service[] {
  try {
    // Check if serviceFiles is empty or not loaded
    if (!serviceFiles || Object.keys(serviceFiles).length === 0) {
      console.warn('No service files found. Available keys:', Object.keys(serviceFiles || {}));
      return [];
    }

    console.log('Loading services, found files:', Object.keys(serviceFiles).length);

    return Object.entries(serviceFiles).map(([path, content]) => {
      try {
        // Handle different content types - might be a module or string
        let contentString: string;
        
        if (typeof content === 'string') {
          contentString = content;
        } else if (content && typeof content === 'object') {
          // Handle module exports - try default, then the object itself
          if ('default' in content) {
            contentString = typeof content.default === 'string' 
              ? content.default 
              : String(content.default || '');
          } else {
            // Try to stringify the object
            contentString = JSON.stringify(content);
          }
        } else {
          contentString = String(content || '');
        }
        
        // Remove any JSON wrapping if present
        if (contentString.startsWith('"') && contentString.endsWith('"')) {
          try {
            contentString = JSON.parse(contentString);
          } catch (e) {
            // Not JSON, keep as is
          }
        }
        
        if (!contentString || contentString.trim().length === 0) {
          throw new Error(`Empty content for ${path}`);
        }
        
        // Ensure it starts with frontmatter
        if (!contentString.includes('---')) {
          throw new Error(`Invalid markdown format for ${path}`);
        }

        const { data } = parseFrontmatter(contentString);
        const id = path.split('/').pop()?.replace('.md', '') || '';
        const body = extractBody(contentString);
        
        if (!data.title) {
          console.warn(`Service ${id} missing title`);
        }
        
        return {
          id,
          name: data.title || 'Untitled Service',
          tagline: body || data.tagline || '',
          price: parsePrice(data.price),
          duration: data.duration || 'TBA',
          image: data.image || '',
          description: data.description || '',
          icon: data.icon || 'Sparkles'
        };
      } catch (error) {
        console.error(`Error loading service from ${path}:`, error);
        console.error('Content type:', typeof content);
        console.error('Content value:', content);
        // Return a safe default
        return {
          id: path.split('/').pop()?.replace('.md', '') || 'unknown',
          name: 'Error loading service',
          tagline: '',
          price: 0,
          duration: 'TBA',
          image: '',
          description: 'There was an error loading this service.',
          icon: 'Sparkles'
        };
      }
    });
  } catch (error) {
    console.error('Error loading services:', error);
    return [];
  }
}

export function loadEvents(): WellnessEvent[] {
  try {
    // Check if eventFiles is empty or not loaded
    if (!eventFiles || Object.keys(eventFiles).length === 0) {
      console.warn('No event files found. Available keys:', Object.keys(eventFiles || {}));
      return [];
    }

    console.log('Loading events, found files:', Object.keys(eventFiles).length);

    return Object.entries(eventFiles).map(([path, content]) => {
      try {
        // Handle different content types - might be a module or string
        let contentString: string;
        
        if (typeof content === 'string') {
          contentString = content;
        } else if (content && typeof content === 'object') {
          // Handle module exports - try default, then the object itself
          if ('default' in content) {
            contentString = typeof content.default === 'string' 
              ? content.default 
              : String(content.default || '');
          } else {
            // Try to stringify the object
            contentString = JSON.stringify(content);
          }
        } else {
          contentString = String(content || '');
        }
        
        // Remove any JSON wrapping if present
        if (contentString.startsWith('"') && contentString.endsWith('"')) {
          try {
            contentString = JSON.parse(contentString);
          } catch (e) {
            // Not JSON, keep as is
          }
        }
        
        if (!contentString || contentString.trim().length === 0) {
          throw new Error(`Empty content for ${path}`);
        }
        
        // Ensure it starts with frontmatter
        if (!contentString.includes('---')) {
          throw new Error(`Invalid markdown format for ${path}`);
        }

        const { data } = parseFrontmatter(contentString);
        const id = path.split('/').pop()?.replace('.md', '') || '';
        
        if (!data.title) {
          console.warn(`Event ${id} missing title`);
        }
        
        return {
          id,
          name: data.title || 'Untitled Event',
          teaser: data.description || '',
          price: parsePrice(data.price),
          date: formatEventDate(data.date, data.time),
          location: data.location || 'Location TBA',
          capacity: data.capacity || 20,
          image: data.image || ''
        };
      } catch (error) {
        console.error(`Error loading event from ${path}:`, error);
        console.error('Content type:', typeof content);
        console.error('Content value:', content);
        return {
          id: path.split('/').pop()?.replace('.md', '') || 'unknown',
          name: 'Error loading event',
          teaser: 'There was an error loading this event.',
          price: 0,
          date: 'Date TBA',
          location: 'Location TBA',
          capacity: 20,
          image: ''
        };
      }
    });
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
}

export function loadTestimonials(): Testimonial[] {
  try {
    // Check if testimonialFiles is empty or not loaded
    if (!testimonialFiles || Object.keys(testimonialFiles).length === 0) {
      console.warn('No testimonial files found. Available keys:', Object.keys(testimonialFiles || {}));
      return [];
    }

    return Object.entries(testimonialFiles).map(([path, content]) => {
      try {
        // Handle different content types - might be a module or string
        let contentString: string;
        
        if (typeof content === 'string') {
          contentString = content;
        } else if (content && typeof content === 'object') {
          // Handle module exports - try default, then the object itself
          if ('default' in content) {
            contentString = typeof content.default === 'string' 
              ? content.default 
              : String(content.default || '');
          } else {
            // Try to stringify the object
            contentString = JSON.stringify(content);
          }
        } else {
          contentString = String(content || '');
        }
        
        // Remove any JSON wrapping if present
        if (contentString.startsWith('"') && contentString.endsWith('"')) {
          try {
            contentString = JSON.parse(contentString);
          } catch (e) {
            // Not JSON, keep as is
          }
        }
        
        if (!contentString || contentString.trim().length === 0) {
          throw new Error(`Empty content for ${path}`);
        }
        
        // Ensure it starts with frontmatter
        if (!contentString.includes('---')) {
          throw new Error(`Invalid markdown format for ${path}`);
        }

        const { data } = parseFrontmatter(contentString);
        const id = path.split('/').pop()?.replace('.md', '') || '';
        
        return {
          id,
          name: data.name || 'Anonymous',
          text: data.quote || '',
          role: data.role || ''
        };
      } catch (error) {
        console.error(`Error loading testimonial from ${path}:`, error);
        console.error('Content type:', typeof content);
        console.error('Content value:', content);
        return {
          id: path.split('/').pop()?.replace('.md', '') || 'unknown',
          name: 'Anonymous',
          text: 'There was an error loading this testimonial.',
          role: ''
        };
      }
    });
  } catch (error) {
    console.error('Error loading testimonials:', error);
    return [];
  }
}

export function loadSiteSettings(): SiteSettings {
  // Default values
  const defaults: SiteSettings = {
    hero_image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1600',
    hero_image_alt: 'Serene Wellness Atmosphere',
    site_name: 'Soul Garden Sound',
    nav_benefits: 'Benefits',
    nav_mission: 'Mission',
    nav_services: 'Services',
    book_button: 'Book Appointment',
    hero_headline_line1: 'Realign Your Energy,',
    hero_headline_line2: 'Reclaim Your Peace.',
    hero_description: 'Personalized Reiki healing and immersive sound baths in the heart of Austin.',
    hero_button: 'Start Your Journey',
    hero_pill_benefits: 'Our Benefits',
    hero_pill_mission: 'Mission',
    hero_pill_services: 'Services',
    benefits_title_1: 'Vibrational Healing',
    benefits_desc_1: 'Sound frequencies that restore cellular balance and calm the nervous system.',
    benefits_title_2: 'Energy Clearing',
    benefits_desc_2: 'Remove blockages through targeted Reiki and intuitive energetic alignment.',
    benefits_title_3: 'Community Connection',
    benefits_desc_3: 'Safe spaces to heal alongside others in our monthly group ceremonies.',
    mission_title: 'Why Sound & Energy Work?',
    mission_para_1: 'In the modern world, our bodies are constantly bombarded by external stressors that disrupt our natural frequencies. This can manifest as anxiety, fatigue, or physical pain.',
    mission_para_2: 'By combining the ancient wisdom of Reiki with the scientific principles of sound therapy, we create an environment where your body\'s innate healing mechanisms can thrive.',
    mission_bullet_1: 'Reduce cortisol levels naturally',
    mission_bullet_2: 'Improve sleep quality and duration',
    mission_bullet_3: 'Emotional release and mental clarity',
    services_heading: 'Our Offerings',
    events_heading: 'Upcoming Events',
    testimonials_heading: 'The Experience',
    cta_title: 'Ready to find your balance?',
    cta_description: 'Join us for a session or event and begin your journey towards energetic resonance and lasting peace.',
    cta_button_primary: 'Book a Session',
    cta_button_secondary: 'Learn About Reiki',
    footer_tagline: 'Healing the mind, body, and spirit through vibrational frequency and energetic restoration. Located in the heart of Austin, TX.',
    footer_address_line1: '1201 Wellness Way',
    footer_address_line2: 'Austin, TX 78701',
    footer_email: 'hello@soulgardensound.com',
    footer_phone: '(512) 555-0123',
    footer_copyright: '© 2024 Soul Garden Sound. All rights reserved.',
    footer_made_with: 'Made with ❤️ by your friend'
  };

  try {
    const fileEntry = Object.entries(siteSettingsFile)[0];
    if (!fileEntry) {
      console.warn('Site settings file not found. Using defaults.');
      return defaults;
    }
    
    const [, content] = fileEntry;
    
    // Handle different content types
    let contentString: string;
    if (typeof content === 'string') {
      contentString = content;
    } else if (content && typeof content === 'object' && 'default' in content) {
      contentString = typeof content.default === 'string' 
        ? content.default 
        : String(content.default || '');
    } else {
      contentString = String(content || '');
    }
    
    // Remove any JSON wrapping if present
    if (contentString.startsWith('"') && contentString.endsWith('"')) {
      try {
        contentString = JSON.parse(contentString);
      } catch (e) {
        // Not JSON, keep as is
      }
    }
    
    const { data } = parseFrontmatter(contentString);
    
    // Merge loaded data with defaults
    return {
      ...defaults,
      ...data
    };
  } catch (error) {
    console.error('Error loading site settings:', error);
    return defaults;
  }
}

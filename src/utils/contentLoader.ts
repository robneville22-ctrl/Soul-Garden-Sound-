import matter from 'gray-matter';
import { Service, WellnessEvent, Testimonial, SiteSettings } from '../types';

// Import all markdown files
// Try both old and new syntax for compatibility
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
        } else if (content && typeof content === 'object' && 'default' in content) {
          // Handle module exports
          contentString = String(content.default || '');
        } else {
          contentString = String(content || '');
        }
        
        if (!contentString || contentString.trim().length === 0) {
          throw new Error(`Empty content for ${path}`);
        }

        const { data } = matter(contentString);
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

        const { data } = matter(contentString);
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
    return Object.entries(testimonialFiles).map(([path, content]) => {
      try {
        const { data } = matter(content);
        const id = path.split('/').pop()?.replace('.md', '') || '';
        
        return {
          id,
          name: data.name || 'Anonymous',
          text: data.quote || '',
          role: data.role || ''
        };
      } catch (error) {
        console.error(`Error loading testimonial from ${path}:`, error);
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
  try {
    const fileEntry = Object.entries(siteSettingsFile)[0];
    if (!fileEntry) {
      throw new Error('Site settings file not found');
    }
    
    const [, content] = fileEntry;
    const { data } = matter(content);
    
    return {
      hero_image: data.hero_image || 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1600',
      hero_image_alt: data.hero_image_alt || 'Serene Wellness Atmosphere'
    };
  } catch (error) {
    console.error('Error loading site settings:', error);
    // Return default values
    return {
      hero_image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1600',
      hero_image_alt: 'Serene Wellness Atmosphere'
    };
  }
}

import matter from 'gray-matter';
import { Service, WellnessEvent, Testimonial } from '../types';

// Import all markdown files
const serviceFiles = import.meta.glob('../content/services/*.md', { eager: true, as: 'raw' });
const eventFiles = import.meta.glob('../content/events/*.md', { eager: true, as: 'raw' });
const testimonialFiles = import.meta.glob('../content/testimonials/*.md', { eager: true, as: 'raw' });

export function loadServices(): Service[] {
  return Object.entries(serviceFiles).map(([path, content]) => {
    const { data } = matter(content);
    const id = path.split('/').pop()?.replace('.md', '') || '';
    
    return {
      id,
      name: data.title,
      tagline: content.split('---')[2]?.trim() || '',
      price: parseInt(data.price.replace('$', '')),
      duration: data.duration,
      image: data.image,
      description: data.description,
      icon: data.icon
    };
  });
}

export function loadEvents(): WellnessEvent[] {
  return Object.entries(eventFiles).map(([path, content]) => {
    const { data } = matter(content);
    const id = path.split('/').pop()?.replace('.md', '') || '';
    
    return {
      id,
      name: data.title,
      teaser: data.description,
      price: parseInt(data.price.replace('$', '')),
      date: data.time ? `${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • ${data.time}` : data.date,
      location: data.location,
      capacity: 20,
      image: data.image
    };
  });
}

export function loadTestimonials(): Testimonial[] {
  return Object.entries(testimonialFiles).map(([path, content]) => {
    const { data } = matter(content);
    const id = path.split('/').pop()?.replace('.md', '') || '';
    
    return {
      id,
      name: data.name,
      text: data.quote,
      role: data.role
    };
  });
}

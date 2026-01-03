import { Service, WellnessEvent, Testimonial, SiteSettings } from './types';
import { loadServices, loadEvents, loadTestimonials, loadSiteSettings } from './src/utils/contentLoader';

export const SERVICES: Service[] = loadServices();
export const EVENTS: WellnessEvent[] = loadEvents();
export const TESTIMONIALS: Testimonial[] = loadTestimonials();
export const SITE_SETTINGS: SiteSettings = loadSiteSettings();

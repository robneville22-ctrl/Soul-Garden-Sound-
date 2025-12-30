import { Service, WellnessEvent, Testimonial } from './types';
import { loadServices, loadEvents, loadTestimonials } from './src/utils/contentLoader';

export const SERVICES: Service[] = loadServices();
export const EVENTS: WellnessEvent[] = loadEvents();
export const TESTIMONIALS: Testimonial[] = loadTestimonials();

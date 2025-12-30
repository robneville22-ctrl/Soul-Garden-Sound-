import { Service, WellnessEvent, Testimonial } from '../types';

// Import all service files
import reiki1 from '../content/services/reiki-1.json';
import soundBath1 from '../content/services/sound-bath-1.json';

// Import all event files
import event1 from '../content/events/event-1.json';
import event2 from '../content/events/event-2.json';

// Import all testimonial files
import testimonial1 from '../content/testimonials/testimonial-1.json';
import testimonial2 from '../content/testimonials/testimonial-2.json';
import testimonial3 from '../content/testimonials/testimonial-3.json';

export const SERVICES: Service[] = [
  reiki1 as Service,
  soundBath1 as Service,
];

export const EVENTS: WellnessEvent[] = [
  event1 as WellnessEvent,
  event2 as WellnessEvent,
];

export const TESTIMONIALS: Testimonial[] = [
  testimonial1 as Testimonial,
  testimonial2 as Testimonial,
  testimonial3 as Testimonial,
];

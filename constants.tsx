
import { Service, WellnessEvent, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'reiki-1',
    name: 'Intuitive Reiki Healing',
    tagline: '60 Minutes of deep energetic restoration.',
    price: 85,
    duration: '1 hr',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200',
    description: 'A personalized energy clearing session designed to remove blockages and realign your chakras.'
  },
  {
    id: 'sound-bath-1',
    name: 'Private Sound Healing',
    tagline: 'Deep vibrational alignment for one.',
    price: 120,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=1200',
    description: 'Experience a focused sound journey with crystal bowls and gongs tailored to your specific intentions.'
  }
];

export const EVENTS: WellnessEvent[] = [
  {
    id: 'event-1',
    name: 'Full Moon Sound Bath Journey',
    teaser: 'An immersive auditory experience for deep relaxation.',
    price: 45,
    date: 'Saturday, July 20th • 7:00 PM',
    location: 'Austin Studio, Central Park',
    capacity: 20,
    image: 'https://images.unsplash.com/photo-1528319725582-ddc0b6a27515?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'event-2',
    name: 'New Moon Intentions & Reiki',
    teaser: 'Release the old and plant seeds for the future.',
    price: 45,
    date: 'Friday, August 4th • 6:30 PM',
    location: 'Austin Studio, Central Park',
    capacity: 20,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    text: "Since attending the sound baths, my anxiety has completely shifted. I feel a level of peace I haven't known in years.",
    role: 'Regular Practitioner'
  },
  {
    id: '2',
    name: 'David L.',
    text: "The Intuitive Reiki session was a breakthrough. Cleo has a gift for identifying exactly where energy is stagnant.",
    role: 'New Client'
  },
  {
    id: '3',
    name: 'Elena R.',
    text: "The aesthetic of the studio alone is healing, but the actual work being done is transformative. Highly recommend.",
    role: 'Yoga Instructor'
  }
];

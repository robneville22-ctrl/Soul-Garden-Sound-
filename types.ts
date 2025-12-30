
export interface Service {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  image: string;
  description: string;
  icon?: string;
}

export interface WellnessEvent {
  id: string;
  name: string;
  teaser: string;
  price: number;
  date: string;
  location: string;
  capacity: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  role: string;
}

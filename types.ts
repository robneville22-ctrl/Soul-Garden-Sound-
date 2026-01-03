
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

export interface SiteSettings {
  // Hero Image
  hero_image: string;
  hero_image_alt: string;
  
  // Header/Navigation
  site_name: string;
  nav_benefits: string;
  nav_mission: string;
  nav_services: string;
  book_button: string;
  
  // Hero Section
  hero_headline_line1: string;
  hero_headline_line2: string;
  hero_description: string;
  hero_button: string;
  hero_pill_benefits: string;
  hero_pill_mission: string;
  hero_pill_services: string;
  
  // Benefits Section (ValueProps)
  benefits_title_1: string;
  benefits_desc_1: string;
  benefits_title_2: string;
  benefits_desc_2: string;
  benefits_title_3: string;
  benefits_desc_3: string;
  
  // Mission Section (DetailedValue)
  mission_title: string;
  mission_para_1: string;
  mission_para_2: string;
  mission_bullet_1: string;
  mission_bullet_2: string;
  mission_bullet_3: string;
  
  // Services Section
  services_heading: string;
  events_heading: string;
  
  // Testimonials Section
  testimonials_heading: string;
  
  // Final CTA Section
  cta_title: string;
  cta_description: string;
  cta_button_primary: string;
  cta_button_secondary: string;
  
  // Footer
  footer_tagline: string;
  footer_address_line1: string;
  footer_address_line2: string;
  footer_email: string;
  footer_phone: string;
  footer_copyright: string;
  footer_made_with: string;
  
  // Instagram
  instagram_handle: string;
}

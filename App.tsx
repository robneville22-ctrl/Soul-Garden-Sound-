
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import DetailedValue from './components/DetailedValue';
import SocialProof from './components/SocialProof';
import ServicesGrid from './components/ServicesGrid';
import EventsGrid from './components/EventsGrid';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { SITE_SETTINGS } from './constants';

const App: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen aura-gradient">
      <Header onOpenBooking={() => setShowBooking(true)} />

      <main>
        <Hero onOpenBooking={() => setShowBooking(true)} />

        <div id="benefits">
          <ValueProps />
        </div>

        <div id="mission">
          <DetailedValue />
        </div>

        <div id="services" className="py-20 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-12">{SITE_SETTINGS.services_heading}</h2>
            <ServicesGrid />
            <div className="mt-20">
              <h3 className="text-3xl font-serif text-center mb-12">{SITE_SETTINGS.events_heading}</h3>
              <EventsGrid />
            </div>
          </div>
        </div>

        <SocialProof />

        <FinalCTA onOpenBooking={() => setShowBooking(true)} />
      </main>

      <Footer />

      {/* Booking Overlay Modal (Simplified) */}
      {showBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-[#FFFDF5] rounded-3xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 text-[#143D30] hover:scale-110 transition-transform"
            >
              ✕
            </button>
            <h3 className="text-2xl font-serif mb-4">Request a Session</h3>
            <p className="mb-6 text-sm text-[#143D30]/70">Let us know how you're feeling today, and we'll reach out to schedule your healing journey.</p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Booking request sent!"); setShowBooking(false); }}>
              <input type="text" placeholder="Your Name" className="w-full p-3 rounded-xl border border-[#143D30]/20 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#143D30]" required />
              <input type="email" placeholder="Email Address" className="w-full p-3 rounded-xl border border-[#143D30]/20 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#143D30]" required />
              <textarea placeholder="Have you had Reiki before? How are you feeling today?" className="w-full p-3 rounded-xl border border-[#143D30]/20 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#143D30] h-32" required></textarea>
              <button type="submit" className="w-full bg-[#143D30] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#1b4e3d] transition-colors">
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

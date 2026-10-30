import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Navigation,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Building2,
  DollarSign
} from 'lucide-react';
import { CAFE_INFO } from '../data/cafeInfo';
import { Button } from './ui/Button';

export const ContactAndLocation: React.FC = () => {
  return (
    <section id="contact" className="relative py-16 sm:py-24 bg-[#0B111E] overflow-hidden border-t border-stone-800/80">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Visit Pune's Rooftop Oasis</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Find <span className="gold-gradient-text">Cafe Cue & Brew</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-serif italic mb-2">
            कैफे क्यू & ब्रेव • 7th Floor Skyline View
          </p>
          <p className="text-stone-400 text-sm max-w-xl mx-auto font-sans">
            Opposite Sinhgad Campus on Vadgaon Budruk road. Elevator access directly to the 7th floor rooftop terrace.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Cards & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-6">
            {/* Address Card */}
            <div className="glass-card p-4 sm:p-6 rounded-2xl border border-stone-800">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white mb-1">
                    Rooftop Address
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans mb-3">
                    {CAFE_INFO.address}
                  </p>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-[11px] sm:text-xs text-amber-300 font-mono">
                    <span>Plus Code:</span>
                    <span className="font-bold">{CAFE_INFO.plusCode}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact & Hours Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="glass-card p-4 sm:p-5 rounded-2xl border border-stone-800">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                    Call Direct
                  </h4>
                </div>
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors block"
                >
                  {CAFE_INFO.phoneDisplay}
                </a>
                <span className="text-[10px] sm:text-[11px] text-stone-400">Available 24/7 for queries</span>
              </div>

              <div className="glass-card p-4 sm:p-5 rounded-2xl border border-stone-800">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                    Operating Hours
                  </h4>
                </div>
                <p className="text-sm sm:text-base font-bold text-emerald-400">
                  Open 24 Hours
                </p>
                <span className="text-[10px] sm:text-[11px] text-stone-400">Listed hours (always verify)</span>
              </div>
            </div>

            {/* Verified Google Rating & Pricing Card */}
            <div className="glass-card p-4 sm:p-6 rounded-2xl border border-stone-800 bg-gradient-to-br from-[#121927] to-[#171e2e]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-display font-black text-xl sm:text-2xl text-white">
                    {CAFE_INFO.rating.score}
                  </span>
                  <span className="text-xs text-stone-400">/ 5.0</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Google Listing</span>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-3 sm:mb-4 font-sans">
                {CAFE_INFO.rating.note}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-800 text-xs">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>Average Spend: <strong className="text-white">{CAFE_INFO.priceRange}</strong></span>
                </div>
                <span className="text-stone-400">Based on 56 reviews</span>
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={CAFE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Navigation className="w-4 h-4" />}
                  className="w-full text-xs font-bold uppercase tracking-wider"
                >
                  Driving Directions
                </Button>
              </a>

              <a
                href={`https://wa.me/${CAFE_INFO.whatsapp}?text=${encodeURIComponent('Hello Cafe Cue & Brew! I would like to enquire about table & snooker availability.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<MessageCircle className="w-4 h-4 text-emerald-400" />}
                  className="w-full text-xs font-bold uppercase tracking-wider border-emerald-500/30 hover:border-emerald-500/60"
                >
                  WhatsApp Desk
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Map & Landmark Guide */}
          <div className="lg:col-span-7 flex flex-col h-full rounded-2xl overflow-hidden border border-stone-800 bg-[#121927]">
            <div className="p-3.5 sm:p-4 bg-stone-900 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Sinhgad Campus Vadgaon Budruk Map
                </span>
              </div>
              <a
                href={CAFE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Google Maps Embed iframe with proper encoded query */}
            <div className="w-full flex-1 min-h-[280px] sm:min-h-[380px] relative bg-stone-950">
              <iframe
                title="Cafe Cue & Brew Location Map"
                src="https://maps.google.com/maps?q=Cafe+Cue+%26+Brew+7th+floor+above+Amigos+Gym+opposite+Sinhgad+Campus+Vadgaon+Budruk+Pune+411041&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '280px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />
            </div>

            {/* Landmark & Parking Guide Footer */}
            <div className="p-4 bg-stone-900/90 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">📍 Landmark:</span>
                <span>Above Amigos Gym, precisely opposite Sinhgad College main gate.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">🛗 Elevator:</span>
                <span>Take the elevator straight up to the 7th floor for rooftop reception.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

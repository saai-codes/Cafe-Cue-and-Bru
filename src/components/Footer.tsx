import React from 'react';
import { Phone, MapPin, Clock, ArrowUp, Sparkles, Navigation } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeInfo';
import { Button } from './ui/Button';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070B14] text-stone-300 pt-12 sm:pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/logo.svg"
                  alt="Cafe Cue & Brew Logo"
                  className="w-12 h-12 rounded-full border border-amber-500/40"
                />
                <div>
                  <h3 className="font-display font-bold text-xl text-white tracking-wider">
                    CAFE CUE & BREW
                  </h3>
                  <p className="text-xs text-amber-300 font-serif italic">
                    कैफे क्यू & ब्रेव • Rooftop & Snooker Lounge
                  </p>
                </div>
              </div>

              <p className="text-stone-300 text-sm italic font-serif mb-4">
                “{CAFE_INFO.tagline}”
              </p>

              <p className="text-stone-400 text-xs leading-relaxed max-w-sm mb-6 font-sans">
                Pune's premier 7th-floor rooftop destination blending artisanal coffee, delicious comfort dishes, and championship cue sports under open skies.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-300/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rated 4.9/5 by 56 verified guests on Google</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-1 lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Explore Experience
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#home" className="hover:text-amber-300 transition-colors">
                  Rooftop Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-300 transition-colors">
                  Digital Menu (15 Categories)
                </a>
              </li>
              <li>
                <a href="#snooker" className="hover:text-amber-300 transition-colors">
                  Snooker & Pool Tables
                </a>
              </li>
              <li>
                <a href="#ambience" className="hover:text-amber-300 transition-colors">
                  Terrace & Night Ambience
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-amber-300 transition-colors">
                  Table Reservation Request
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">
                  Directions & Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Visit & Contact Information */}
          <div className="md:col-span-1 lg:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Visit & Connect
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="hover:text-amber-300 font-semibold text-stone-300"
                >
                  {CAFE_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-emerald-400 font-medium">{CAFE_INFO.openingHours}</span>
              </div>

              <div className="pt-2">
                <a
                  href={CAFE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<Navigation className="w-3.5 h-3.5 text-amber-400" />}
                    className="text-xs"
                  >
                    Open Directions in Maps
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Demo Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Cafe Cue & Brew (कैफे क्यू & ब्रेव). All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-amber-400/80 font-medium">Client Presentation Demo</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            rightIcon={<ArrowUp className="w-3.5 h-3.5" />}
            className="text-stone-400 hover:text-amber-300 border border-stone-800 hover:border-amber-500/30"
          >
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Star, Sparkles, MapPin, Clock, Trophy, UtensilsCrossed } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeInfo';
import { Button } from './ui/Button';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
  onExploreSnooker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreMenu,
  onExploreSnooker,
}) => {
  return (
    <section id="home" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette & Golden Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/rooftop-hero.jpg"
          alt="Cafe Cue & Brew Pune Rooftop Terrace"
          className="w-full h-full object-cover object-center scale-105"
          loading="eager"
        />
        {/* Layered dark gradient overlays for luxury tone and contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-[#0B111E]/75 to-[#0B111E]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B111E]/50 to-[#0B111E]/95" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Rooftop Location Pill Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-stone-900/85 border border-amber-500/40 backdrop-blur-md mb-5 sm:mb-6 shadow-lg shadow-black/40 max-w-full">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-amber-200 leading-tight">
            7th Floor Rooftop & Championship Snooker Lounge • Sinhgad Road, Pune
          </span>
        </div>

        {/* Brand Name & Hindi Subtitle */}
        <h1 className="font-display font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-2 uppercase drop-shadow-2xl">
          Cafe <span className="gold-gradient-text">Cue & Brew</span>
        </h1>
        <p className="text-base sm:text-2xl text-amber-300 font-serif italic mb-3 sm:mb-4 tracking-wide">
          कैफे क्यू & ब्रेव
        </p>

        {/* Cafe Tagline */}
        <p className="text-lg sm:text-2xl md:text-3xl text-stone-200 font-serif font-normal max-w-3xl mb-4 sm:mb-6 leading-relaxed">
          “Great Food. Good View. Better Company.”
        </p>

        <p className="text-xs sm:text-base text-stone-300 max-w-2xl mb-8 sm:mb-10 leading-relaxed font-sans">
          Escape to Pune’s elevated rooftop destination above Amigos Gym. Indulge in artisanal coffees,
          sizzling burgers, authentic momos, and the legendary <span className="text-amber-300 font-semibold">FREYO Tower</span>,
          paired with an exclusive championship snooker and pool experience under the night sky.
        </p>

        {/* Call to Actions Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-14">
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenBooking}
            leftIcon={<Sparkles className="w-4 h-4" />}
            className="w-full sm:w-auto text-xs uppercase tracking-wider font-extrabold px-6 sm:px-8 shadow-xl shadow-amber-500/25"
          >
            Book a Table
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={onExploreMenu}
            leftIcon={<UtensilsCrossed className="w-4 h-4 text-amber-400" />}
            className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold px-5 sm:px-7"
          >
            Explore Digital Menu
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onExploreSnooker}
            leftIcon={<Trophy className="w-4 h-4 text-amber-400" />}
            className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold px-5 sm:px-6"
          >
            Snooker & Pool
          </Button>
        </div>

        {/* Trust Badges / Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 w-full max-w-4xl pt-5 sm:pt-6 border-t border-stone-800/80">
          <div className="glass-panel-subtle p-2.5 sm:p-3.5 rounded-xl flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-amber-400 mb-1">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-sm sm:text-base text-white">{CAFE_INFO.rating.score}</span>
              <span className="text-[10px] sm:text-xs text-stone-400">/ 5</span>
            </div>
            <span className="text-[10px] sm:text-xs text-stone-400">56 Verified Reviews</span>
          </div>

          <div className="glass-panel-subtle p-2.5 sm:p-3.5 rounded-xl flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-amber-400 mb-1">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="font-bold text-sm sm:text-base text-white">Open 24 Hours</span>
            </div>
            <span className="text-[10px] sm:text-xs text-stone-400">Sunset to Sunrise</span>
          </div>

          <div className="glass-panel-subtle p-2.5 sm:p-3.5 rounded-xl flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-amber-400 mb-1">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="font-bold text-sm sm:text-base text-white">Pool Lounge</span>
            </div>
            <span className="text-[10px] sm:text-xs text-stone-400">Tournament Tables</span>
          </div>

          <div className="glass-panel-subtle p-2.5 sm:p-3.5 rounded-xl flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-amber-400 mb-1">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="font-bold text-sm sm:text-base text-white">7th Floor</span>
            </div>
            <span className="text-[10px] sm:text-xs text-stone-400">Opp. Sinhgad Campus</span>
          </div>
        </div>
      </div>
    </section>
  );
};

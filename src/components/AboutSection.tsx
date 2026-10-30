import React from 'react';
import { Compass, Sparkles, Coffee, Trophy, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-24 bg-[#0E1522] overflow-hidden border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <img
                src="/images/ambience/rooftop-terrace.jpg"
                alt="Cafe Cue & Brew Rooftop Dining Pune"
                className="w-full h-[280px] sm:h-[380px] lg:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-3 left-3 right-3 p-3.5 sm:bottom-6 sm:left-6 sm:right-6 sm:p-5 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-amber-500/30">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-amber-500/20 text-amber-300 flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-xs sm:text-sm">
                      Pune's 7th Floor Rooftop Destination
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-amber-200">
                      Sinhgad Campus Vadgaon Budruk
                    </p>
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-300 italic font-serif">
                  “A sanctuary above the bustle — where great food meets memorable games under open skies.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4 w-fit">
              <Compass className="w-3.5 h-3.5" />
              <span>Our Rooftop Story</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
              Great Food. Good View. <span className="gold-gradient-text">Better Company.</span>
            </h2>

            <p className="text-amber-300 font-serif italic text-base sm:text-lg mb-4 sm:mb-6">
              कैफे क्यू & ब्रेव • Built for Pune’s Social Spirit
            </p>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 font-sans">
              Located on the 7th floor above Amigos Gym, directly opposite Sinhgad Campus, <strong>Cafe Cue & Brew</strong> was born to solve a simple longing: Pune needed a destination that fused high-energy leisure with elevated, comforting dining.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed mb-6 sm:mb-8 font-sans">
              Whether you come for an intensive 8-ball frame on tournament felt, a peaceful sunset iced latte overlooking Sinhgad road, or a late-night celebration tower with friends, our rooftop welcomes everyone with warm hospitality, honest recipes, and unmatched skyward atmosphere.
            </p>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-stone-800">
                <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1.5 sm:mb-2" />
                <h4 className="text-sm font-bold text-white mb-0.5 sm:mb-1">Artisanal Dining</h4>
                <p className="text-xs text-stone-400">15 curated categories with fresh ingredients & honest flavors.</p>
              </div>

              <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-stone-800">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1.5 sm:mb-2" />
                <h4 className="text-sm font-bold text-white mb-0.5 sm:mb-1">Snooker Arena</h4>
                <p className="text-xs text-stone-400">Championship cues & green felt tables under studio lighting.</p>
              </div>

              <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-stone-800">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1.5 sm:mb-2" />
                <h4 className="text-sm font-bold text-white mb-0.5 sm:mb-1">Open 24 Hours</h4>
                <p className="text-xs text-stone-400">From early morning brews to midnight stargazing cravings.</p>
              </div>

              <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-stone-800">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1.5 sm:mb-2" />
                <h4 className="text-sm font-bold text-white mb-0.5 sm:mb-1">Community Spirit</h4>
                <p className="text-xs text-stone-400">4.9/5 verified rating on Google with 56 passionate reviews.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

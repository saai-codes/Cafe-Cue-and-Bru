import React from 'react';
import { Crown, Sparkles, Layers, Flame, Heart, Plus } from 'lucide-react';
import type { MenuItem } from '../types';
import { Button } from './ui/Button';

interface FreyoTowerFeatureProps {
  onQuickView: (item: MenuItem) => void;
  onAddToDemoOrder: (item: MenuItem) => void;
  freyoItem: MenuItem;
}

export const FreyoTowerFeature: React.FC<FreyoTowerFeatureProps> = ({
  onQuickView,
  onAddToDemoOrder,
  freyoItem,
}) => {
  return (
    <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#0B111E] via-[#141A29] to-[#0B111E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-amber-500/40 bg-gradient-to-br from-[#121927] to-[#1C120C] p-5 sm:p-10 lg:p-14 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Story & Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Rooftop Signature Showstopper</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
                The Viral <span className="gold-gradient-text">FREYO Tower</span>
              </h2>

              <p className="text-amber-200/90 font-serif italic text-lg sm:text-xl mb-4">
                Pune's Most Talked-About Celebration Dessert
              </p>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                Engineered for birthdays, midnight hangouts, and milestone celebrations on the 7th floor terrace.
                An architecturally stacked dessert sensation featuring crisp Belgian waffle tiers, warm walnut brownie wedges,
                double Belgian chocolate & bourbon vanilla ice cream scoops, KitKat batons, crushed Oreo crumbles, and a dramatic tableside hot fudge cascade.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                <div className="glass-panel p-3 rounded-xl border border-stone-800">
                  <Layers className="w-4 h-4 text-amber-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-white mb-0.5">Multi-Level Layers</h4>
                  <p className="text-[11px] text-stone-400">Waffles, brownies & gelato</p>
                </div>

                <div className="glass-panel p-3 rounded-xl border border-stone-800">
                  <Sparkles className="w-4 h-4 text-amber-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-white mb-0.5">Custom Toppings</h4>
                  <p className="text-[11px] text-stone-400">Available per celebration</p>
                </div>

                <div className="glass-panel p-3 rounded-xl border border-stone-800">
                  <Flame className="w-4 h-4 text-amber-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-white mb-0.5">Hot Fudge Cascade</h4>
                  <p className="text-[11px] text-stone-400">Bubbling dark cocoa ganache</p>
                </div>
              </div>

              {/* Pricing & Order Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-4 border-t border-stone-800/80">
                <div className="sm:mr-2">
                  <span className="text-[10px] sm:text-xs text-stone-400 block uppercase tracking-wider">Price</span>
                  <span className="font-display font-black text-2xl sm:text-3xl text-amber-300">
                    ₹{freyoItem.price}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onAddToDemoOrder(freyoItem)}
                    leftIcon={<Plus className="w-4 h-4" />}
                    className="text-xs uppercase tracking-wider font-extrabold flex-1 sm:flex-none justify-center"
                  >
                    Add To Estimate
                  </Button>

                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => onQuickView(freyoItem)}
                    className="text-xs uppercase tracking-wider font-semibold flex-1 sm:flex-none justify-center"
                  >
                    View Presentation
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl group">
                <img
                  src={freyoItem.image}
                  alt="FREYO Tower Dessert Rooftop Special"
                  className="w-full h-[260px] sm:h-[340px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/80 backdrop-blur-md border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Rooftop Special
                      </p>
                      <p className="text-white font-display text-sm font-semibold">
                        Custom celebration message plate on request
                      </p>
                    </div>
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

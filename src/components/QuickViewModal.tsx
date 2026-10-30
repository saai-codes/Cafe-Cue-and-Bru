import React, { useEffect } from 'react';
import { X, Flame, Plus, Check } from 'lucide-react';
import type { MenuItem } from '../types';
import { Button } from './ui/Button';

interface QuickViewModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToDemoOrder: (item: MenuItem, variantName?: string, price?: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  item,
  onClose,
  onAddToDemoOrder,
}) => {
  const [selectedVariant, setSelectedVariant] = React.useState<{ name: string; price: number } | null>(null);
  const [added, setAdded] = React.useState(false);

  // Synchronize selected variant when item changes
  useEffect(() => {
    if (item && item.variants && item.variants.length > 0) {
      setSelectedVariant(item.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [item]);

  // Lock body scroll and support Escape key
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [item, onClose]);

  if (!item) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : item.price;

  const handleAdd = () => {
    onAddToDemoOrder(
      item,
      selectedVariant ? selectedVariant.name : undefined,
      currentPrice
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#121927] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 sm:p-2.5 rounded-full bg-stone-900/90 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Image */}
        <div className="md:w-1/2 relative h-48 sm:h-64 md:h-auto min-h-[190px] sm:min-h-[260px] bg-stone-900 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121927] via-transparent to-transparent md:hidden" />
          
          {item.badge && (
            <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-lg">
              {item.badge}
            </span>
          )}
        </div>

        {/* Modal Details */}
        <div className="md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[8px] font-bold ${
                  item.dietary === 'veg'
                    ? 'border-emerald-500 text-emerald-500'
                    : item.dietary === 'non-veg'
                    ? 'border-red-500 text-red-500'
                    : 'border-amber-400 text-amber-400'
                }`}
              >
                ●
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                {item.category.replace('-', ' ')}
              </span>
              {item.spicyLevel && (
                <span className="inline-flex items-center text-red-400 text-xs gap-0.5 ml-auto">
                  <Flame className="w-3.5 h-3.5 fill-red-400" />
                  <span>{'Spicy'.repeat(item.spicyLevel === 3 ? 1 : 1)}</span>
                </span>
              )}
            </div>

            <h3 id="quick-view-title" className="font-display font-bold text-xl sm:text-2xl text-white mb-2 leading-snug">
              {item.name}
            </h3>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-5 font-sans">
              {item.description}
            </p>

            {/* Variants Selector if present */}
            {item.variants && item.variants.length > 0 && (
              <div className="mb-5">
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                  Choose Variant / Preparation
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.variants.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        selectedVariant?.name === v.name
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-sm'
                          : 'border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-500 hover:text-white'
                      }`}
                    >
                      <span className="mr-1">{v.name}</span>
                      <span className="text-white font-bold">₹{v.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 sm:pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase tracking-wider">Price</span>
              <span className="font-display text-xl sm:text-2xl font-black text-amber-300">
                ₹{currentPrice}
              </span>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleAdd}
              leftIcon={added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              className="text-xs font-bold uppercase tracking-wider"
            >
              {added ? 'Added to Tray' : 'Add to Estimate'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

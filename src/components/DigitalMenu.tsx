import { useState, useMemo } from 'react';
import {
  Search,
  Flame,
  Sparkles,
  ShoppingBag,
  Eye,
  Check,
  Plus,
  Utensils,
  Coffee,
  CupSoda,
  Sandwich,
  Wine,
  UtensilsCrossed,
  GlassWater,
  Soup,
  Pizza,
  Crown
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import type { MenuItem } from '../types';
import type { OrderItem } from './OrderEstimateDrawer';
import { Button } from './ui/Button';

interface DigitalMenuProps {
  onQuickView: (item: MenuItem) => void;
  onAddToDemoOrder: (item: MenuItem, variantName?: string, price?: number) => void;
  orderItems: OrderItem[];
  onOpenOrderDrawer: () => void;
}

// Icon helper
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Coffee':
      return <Coffee className="w-3.5 h-3.5" />;
    case 'CupSoda':
      return <CupSoda className="w-3.5 h-3.5" />;
    case 'Sandwich':
      return <Sandwich className="w-3.5 h-3.5" />;
    case 'Wine':
      return <Wine className="w-3.5 h-3.5" />;
    case 'UtensilsCrossed':
      return <UtensilsCrossed className="w-3.5 h-3.5" />;
    case 'GlassWater':
      return <GlassWater className="w-3.5 h-3.5" />;
    case 'Soup':
      return <Soup className="w-3.5 h-3.5" />;
    case 'Pizza':
      return <Pizza className="w-3.5 h-3.5" />;
    case 'Crown':
      return <Crown className="w-3.5 h-3.5" />;
    case 'Flame':
      return <Flame className="w-3.5 h-3.5" />;
    case 'Sparkles':
      return <Sparkles className="w-3.5 h-3.5" />;
    default:
      return <Utensils className="w-3.5 h-3.5" />;
  }
};

export const DigitalMenu = ({
  onQuickView,
  onAddToDemoOrder,
  orderItems,
  onOpenOrderDrawer,
}: DigitalMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, { name: string; price: number }>>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Variant change handler
  const handleVariantSelect = (itemId: string, name: string, price: number) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [itemId]: { name, price },
    }));
  };

  const handleAddItem = (item: MenuItem) => {
    const chosenVariant = selectedVariants[item.id] || (item.variants && item.variants[0]);
    onAddToDemoOrder(
      item,
      chosenVariant ? chosenVariant.name : undefined,
      chosenVariant ? chosenVariant.price : item.price
    );
    setRecentlyAddedId(item.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter !== 'all') {
        if (dietaryFilter === 'veg' && item.dietary !== 'veg' && item.dietary !== 'both') return false;
        if (dietaryFilter === 'non-veg' && item.dietary !== 'non-veg' && item.dietary !== 'both') return false;
        if (dietaryFilter === 'beverage' && item.dietary !== 'beverage') return false;
        if (dietaryFilter === 'dessert' && item.dietary !== 'dessert') return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const totalEstimateCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <section id="menu" className="relative py-16 sm:py-24 bg-[#0B111E] overflow-hidden">
      {/* Decorative Subtle Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Culinary Menu</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Curated For <span className="gold-gradient-text">Rooftop Moments</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-serif italic mb-2">
            Great Food. Good View. Better Company.
          </p>
          <p className="text-stone-400 text-sm max-w-xl mx-auto font-sans">
            15 distinct categories crafted with fresh artisanal ingredients. Check actual variants, prices, and visual previews below.
          </p>
        </div>

        {/* Search & Dietary Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#121927]/85 p-4 rounded-2xl border border-stone-800 backdrop-blur-md shadow-lg">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search burgers, mojitos, shakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-stone-800"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none overscroll-x-contain [touch-action:pan-x]">
            {[
              { id: 'all', label: 'All Dishes' },
              { id: 'veg', label: 'Pure Veg', dot: 'bg-emerald-400' },
              { id: 'non-veg', label: 'Non-Veg', dot: 'bg-red-400' },
              { id: 'beverage', label: 'Beverages', dot: 'bg-blue-400' },
              { id: 'dessert', label: 'Desserts', dot: 'bg-amber-400' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDietaryFilter(d.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  dietaryFilter === d.id
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-400/80 shadow-sm shadow-amber-500/10'
                    : 'bg-stone-900/80 text-stone-300 border border-stone-800 hover:border-stone-700 hover:text-white'
                }`}
              >
                {d.dot && <span className={`w-2 h-2 rounded-full ${d.dot}`} />}
                <span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 15 Category Navigation Tabs */}
        <div className="relative mb-8 sm:mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin overscroll-x-contain [touch-action:pan-x]">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 shadow-md font-extrabold'
                  : 'bg-stone-900/70 text-stone-300 border border-stone-800 hover:border-amber-500/40 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>All Categories ({MENU_ITEMS.length})</span>
            </button>

            {MENU_CATEGORIES.map((cat) => {
              const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 shadow-md font-bold'
                      : 'bg-[#121927]/90 text-stone-300 border border-stone-800 hover:border-amber-400/40 hover:text-white'
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-stone-900/40 rounded-2xl border border-stone-800">
            <Utensils className="w-12 h-12 text-stone-600 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white mb-1">No items found</h3>
            <p className="text-sm text-stone-400 max-w-sm mx-auto mb-4">
              Try adjusting your search query or switching category / dietary filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const activeVariant =
                selectedVariants[item.id] ||
                (item.variants && item.variants.length > 0 ? item.variants[0] : null);
              const displayPrice = activeVariant ? activeVariant.price : item.price;
              const isAdded = recentlyAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300"
                >
                  <div>
                    {/* Item Image with Badges */}
                    <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121927] via-transparent to-black/30" />

                      {/* Badge (Bestseller, Rooftop Special, etc.) */}
                      {item.badge && (
                        <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>{item.badge}</span>
                        </div>
                      )}

                      {/* Dietary Tag */}
                      <div className="absolute top-3 right-3 p-1 rounded-md bg-stone-950/80 backdrop-blur-sm border border-stone-800">
                        <span
                          className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[7px] font-bold ${
                            item.dietary === 'veg'
                              ? 'border-emerald-500 text-emerald-500'
                              : item.dietary === 'non-veg'
                              ? 'border-red-500 text-red-500'
                              : 'border-amber-400 text-amber-400'
                          }`}
                        >
                          ●
                        </span>
                      </div>

                      {/* Quick View Button on Hover */}
                      <button
                        onClick={() => onQuickView(item)}
                        className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-stone-900/90 hover:bg-amber-500 hover:text-stone-950 text-stone-200 text-xs font-semibold border border-stone-700/80 backdrop-blur-sm transition-all flex items-center gap-1.5 opacity-90 group-hover:opacity-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        title="View dish details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-200 transition-colors leading-snug">
                          {item.name}
                        </h3>
                        {item.spicyLevel && (
                          <div className="flex items-center text-red-400 flex-shrink-0" title={`Spicy level ${item.spicyLevel}`}>
                            {Array.from({ length: item.spicyLevel }).map((_, i) => (
                              <Flame key={i} className="w-3.5 h-3.5 fill-red-400" />
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Variants Toggle (Preserving exact price variants) */}
                      {item.variants && item.variants.length > 0 && (
                        <div className="mb-4">
                          <span className="text-[10px] text-stone-400 uppercase tracking-wider block mb-1.5 font-medium">
                            Select Variant:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.variants.map((v) => {
                              const isSelected = activeVariant?.name === v.name;
                              return (
                                <button
                                  key={v.name}
                                  onClick={() => handleVariantSelect(item.id, v.name, v.price)}
                                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                                    isSelected
                                      ? 'border-amber-400 bg-amber-500/20 text-amber-200 shadow-sm'
                                      : 'border-stone-800 bg-stone-900/80 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                                  }`}
                                >
                                  <span>{v.name}</span>{' '}
                                  <span className="text-stone-200 font-bold">₹{v.price}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Price & Add Button */}
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Price</span>
                      <span className="font-display text-lg sm:text-xl font-black text-amber-300">
                        ₹{displayPrice}
                      </span>
                    </div>

                    <Button
                      variant={isAdded ? 'primary' : 'primary'}
                      size="sm"
                      onClick={() => handleAddItem(item)}
                      className={isAdded ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-bold' : ''}
                      leftIcon={isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    >
                      {isAdded ? 'Added' : 'Add to Estimate'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Order Estimate Button if items exist */}
        {totalEstimateCount > 0 && (
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-32px)]">
            <button
              onClick={onOpenOrderDrawer}
              className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 sm:gap-3 cursor-pointer border-2 border-stone-900 shadow-2xl shadow-amber-500/30 hover:brightness-105 active:scale-95 transition-all max-w-full"
            >
              <div className="relative flex-shrink-0">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-stone-950" />
                <span className="absolute -top-2 -right-2 bg-stone-950 text-amber-300 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalEstimateCount}
                </span>
              </div>
              <span className="truncate">View Estimate ({totalEstimateCount})</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

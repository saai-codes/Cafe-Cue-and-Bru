import React, { useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, AlertCircle, Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../types';
import { Button } from './ui/Button';

export interface OrderItem {
  item: MenuItem;
  variantName?: string;
  price: number;
  quantity: number;
}

interface OrderEstimateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onClearOrder: () => void;
  onProceedToBookingWithOrder: (items: OrderItem[]) => void;
}

export const OrderEstimateDrawer: React.FC<OrderEstimateDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearOrder,
  onProceedToBookingWithOrder,
}) => {
  // Lock body scroll and support Escape key
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const itemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-estimate-title"
    >
      {/* Backdrop overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-full sm:w-[448px] max-w-full bg-[#121927] border-l border-amber-500/30 shadow-2xl flex flex-col justify-between relative z-10">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 id="order-estimate-title" className="font-display font-bold text-base sm:text-lg text-white">
                  Table Order Estimate
                </h3>
                <p className="text-xs text-amber-300">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Demo Notice Banner */}
          <div className="bg-amber-950/30 border-b border-amber-500/20 px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-200/90 leading-relaxed font-sans">
              <strong>Order Estimate Mode:</strong> Browse & estimate your group’s meal cost. You can attach this dish list directly to your table reservation request.
            </p>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto mb-3 opacity-60" />
                <p className="text-stone-300 font-medium text-sm mb-1">
                  Your order estimate tray is empty
                </p>
                <p className="text-stone-500 text-xs max-w-xs mx-auto mb-6">
                  Explore the menu and click "Add to Estimate" to preview your table bill.
                </p>
                <Button variant="outline" size="sm" onClick={onClose}>
                  Browse Menu Items
                </Button>
              </div>
            ) : (
              items.map((orderItem, idx) => (
                <div
                  key={`${orderItem.item.id}-${orderItem.variantName || 'std'}`}
                  className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-stone-900/70 border border-stone-800"
                >
                  <img
                    src={orderItem.item.image}
                    alt={orderItem.item.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                      {orderItem.item.name}
                    </h4>
                    {orderItem.variantName && (
                      <span className="text-[10px] text-amber-300 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20 inline-block truncate max-w-full">
                        {orderItem.variantName}
                      </span>
                    )}
                    <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                      ₹{orderItem.price} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 bg-stone-800/90 p-1 rounded-lg border border-stone-700/60 flex-shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(idx, orderItem.quantity - 1)}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-3.5 sm:w-4 text-center">
                      {orderItem.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(idx, orderItem.quantity + 1)}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-amber-300 min-w-[44px] text-right flex-shrink-0">
                    ₹{orderItem.price * orderItem.quantity}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-800 bg-[#0E1522]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Estimated Total:</span>
                <span className="text-lg sm:text-xl font-display font-black text-amber-300">₹{totalAmount}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 mb-4">
                <span>Taxes & service charges:</span>
                <span>As per final table bill</span>
              </div>

              <div className="flex gap-2 sm:gap-2.5">
                <Button
                  variant="danger"
                  size="md"
                  onClick={onClearOrder}
                  title="Clear estimate tray"
                  aria-label="Clear estimate tray"
                  className="px-2.5 sm:px-3 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onProceedToBookingWithOrder(items)}
                  leftIcon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  className="flex-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider truncate"
                >
                  Reserve With This Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DigitalMenu } from './components/DigitalMenu';
import { FreyoTowerFeature } from './components/FreyoTowerFeature';
import { SnookerExperience } from './components/SnookerExperience';
import { AmbienceGallery } from './components/AmbienceGallery';
import { AboutSection } from './components/AboutSection';
import { TableBookingSection } from './components/TableBookingSection';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { OrderEstimateDrawer } from './components/OrderEstimateDrawer';
import type { OrderItem } from './components/OrderEstimateDrawer';
import { MENU_ITEMS } from './data/menuData';
import type { MenuItem } from './types';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState<boolean>(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Find FREYO Tower item for feature section
  const freyoItem = MENU_ITEMS.find((item) => item.category === 'freyo-tower') || MENU_ITEMS[0];

  // Active section observer on scroll
  useEffect(() => {
    const sectionIds = ['home', 'menu', 'snooker', 'ambience', 'about', 'booking', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    handleScrollToSection('booking');
  };

  const handleAddToDemoOrder = (item: MenuItem, variantName?: string, price?: number) => {
    const itemPrice = price || item.price;
    setOrderItems((prev) => {
      const existingIdx = prev.findIndex(
        (o) => o.item.id === item.id && o.variantName === variantName
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [...prev, { item, variantName, price: itemPrice, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    setOrderItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((_, idx) => idx !== index);
      }
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleProceedToBookingWithOrder = (_items: OrderItem[]) => {
    setIsOrderDrawerOpen(false);
    handleScrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-[#0B111E] text-stone-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Navbar with Sticky Glass Effect */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Cinematic Rooftop Hero */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onExploreMenu={() => handleScrollToSection('menu')}
          onExploreSnooker={() => handleScrollToSection('snooker')}
        />

        {/* Interactive Digital Menu (15 Categories, Search, Filters) */}
        <DigitalMenu
          onQuickView={(item) => setQuickViewItem(item)}
          onAddToDemoOrder={handleAddToDemoOrder}
          orderItems={orderItems}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        />

        {/* Rooftop Special: FREYO Tower Showcase */}
        <FreyoTowerFeature
          onQuickView={(item) => setQuickViewItem(item)}
          onAddToDemoOrder={(item) => handleAddToDemoOrder(item)}
          freyoItem={freyoItem}
        />

        {/* Championship Snooker & Pool Experience */}
        <SnookerExperience
          onOpenBooking={handleOpenBooking}
        />

        {/* Rooftop Terrace & Night Ambience Gallery with Lightbox */}
        <AmbienceGallery />

        {/* About the Cafe & Rooftop Heritage */}
        <AboutSection />

        {/* Table Reservation Engine (Verified Request Flow) */}
        <TableBookingSection
          initialOrderItems={orderItems}
        />

        {/* Real Location, Opening Hours & Google Maps Directions */}
        <ContactAndLocation />
      </main>

      {/* Polished Footer */}
      <Footer />

      {/* Quick View Item Details Modal */}
      <QuickViewModal
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onAddToDemoOrder={handleAddToDemoOrder}
      />

      {/* Demo Order Estimator Drawer */}
      <OrderEstimateDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearOrder={handleClearOrder}
        onProceedToBookingWithOrder={handleProceedToBookingWithOrder}
      />
    </div>
  );
}

export default App;

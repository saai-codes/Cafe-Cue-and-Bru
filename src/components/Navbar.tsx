import { useState, useEffect, useRef } from 'react';
import { Phone, X, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeInfo';
import { Button } from './ui/Button';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection: string;
}

export const Navbar = ({ onOpenBooking, activeSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for glass navbar state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll locking & Escape key for mobile drawer
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Experience', href: '#ambience', id: 'ambience' },
    { name: 'Snooker', href: '#snooker', id: 'snooker' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-[#0B111E]/92 backdrop-blur-xl border-b border-amber-500/20 py-2.5 shadow-xl shadow-black/50'
            : 'bg-gradient-to-b from-[#0B111E]/90 via-[#0B111E]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* 1. Left: Brand Identity Block */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-2 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1 min-w-0"
              aria-label="Cafe Cue & Brew Rooftop Cafe Home"
            >
              {/* Emblem / Brand Mark */}
              <div className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-700 shadow-md shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow duration-300 flex-shrink-0">
                <img
                  src="/images/logo.svg"
                  alt="Cafe Cue & Brew Logo"
                  className="w-full h-full object-contain rounded-full bg-[#0B111E]"
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col text-left min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-display font-extrabold text-sm xs:text-base sm:text-lg lg:text-xl tracking-wider text-white group-hover:text-amber-300 transition-colors truncate">
                    CAFE CUE & BREW
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-widest text-amber-300 font-semibold uppercase bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.2 sm:py-0.5 rounded hidden xs:inline-block flex-shrink-0">
                    Rooftop
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <span className="text-amber-200/90 font-medium tracking-wide truncate">
                    कैफे क्यू & ब्रेव
                  </span>
                  <span className="text-stone-500 text-[10px] hidden md:inline">•</span>
                  <span className="text-[11px] text-stone-400 hidden md:inline font-sans truncate">
                    7th Floor Sinhgad Campus, Pune
                  </span>
                </div>
              </div>
            </a>

            {/* 2. Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-[#121927]/60 border border-stone-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isActive
                        ? 'text-amber-200 bg-amber-500/20 shadow-sm border border-amber-500/40'
                        : 'text-stone-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* 3. Right: Desktop CTA & Direct Phone */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:text-white border border-stone-800 bg-[#121927]/80 hover:border-amber-500/40 hover:bg-[#162032] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                title="Call Front Desk 24/7"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: {CAFE_INFO.phoneDisplay}</span>
              </a>

              <Button
                variant="primary"
                size="md"
                onClick={onOpenBooking}
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Book a Table
              </Button>
            </div>

            {/* 4. Mobile: Quick Action & Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenBooking}
                className="text-[11px] px-3 font-bold"
              >
                Book
              </Button>

              <button
                ref={menuButtonRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-[#121927] border border-stone-800 text-stone-200 hover:text-amber-300 hover:border-amber-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors"
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 5. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div
            ref={mobileMenuRef}
            className="fixed inset-y-0 right-0 w-[290px] max-w-[88vw] bg-[#0E1522] border-l border-amber-500/30 p-5 sm:p-6 flex flex-col justify-between shadow-2xl shadow-black overflow-y-auto"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/logo.svg"
                    alt="Logo"
                    className="w-9 h-9 rounded-full border border-amber-500/40"
                  />
                  <div>
                    <p className="font-display font-bold text-white text-sm">
                      CAFE CUE & BREW
                    </p>
                    <p className="text-[11px] text-amber-300 font-serif italic">
                      कैफे क्यू & ब्रेव
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-stone-300 hover:bg-stone-800/50 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-stone-500" />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-stone-800 flex flex-col gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                leftIcon={<Sparkles className="w-4 h-4" />}
                className="w-full text-xs font-bold uppercase tracking-wider"
              >
                Reserve Table / Pool
              </Button>

              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="w-full py-3 px-4 rounded-xl border border-stone-700 bg-stone-900/60 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Desk: {CAFE_INFO.phoneDisplay}</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>7th Floor, Opp. Sinhgad Campus, Pune</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

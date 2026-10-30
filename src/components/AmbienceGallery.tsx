import { useState, useEffect, useCallback } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AMBIENCE_GALLERY } from '../data/cafeInfo';

export const AmbienceGallery = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + AMBIENCE_GALLERY.length) % AMBIENCE_GALLERY.length);
  }, [selectedPhotoIndex]);

  const nextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % AMBIENCE_GALLERY.length);
  }, [selectedPhotoIndex]);

  // Lock body scroll and handle keyboard events
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevPhoto();
        if (e.key === 'ArrowRight') nextPhoto();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedPhotoIndex, prevPhoto, nextPhoto]);

  return (
    <section id="ambience" className="relative py-16 sm:py-24 bg-[#0B111E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Atmosphere & Skyline</span>
          </div>
          <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-5xl text-white tracking-tight mb-3 sm:mb-4">
            Rooftop <span className="gold-gradient-text">Ambience & Views</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-lg font-serif italic mb-2">
            Perched High on the 7th Floor Above Sinhgad Campus
          </p>
          <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed">
            Bask in the golden evening light transitioning into cool Pune night breezes, with twinkling city vistas and ambient fairy lights.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {AMBIENCE_GALLERY.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 cursor-pointer shadow-lg hover:border-amber-500/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              tabIndex={0}
              role="button"
              aria-label={`View photo ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openLightbox(index);
                }
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-stone-700/60">
                <Eye className="w-4 h-4 text-amber-400" />
              </div>

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-0.5 sm:mb-1 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-20 p-2.5 sm:p-3 rounded-full bg-stone-900/90 text-white hover:text-amber-400 border border-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-stone-900/90 text-white hover:text-amber-400 border border-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-stone-900/90 text-white hover:text-amber-400 border border-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div
            className="max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-stone-950 border border-amber-500/30 flex flex-col relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 min-h-0 flex items-center justify-center bg-black/60 p-2 sm:p-4">
              <img
                src={AMBIENCE_GALLERY[selectedPhotoIndex].image}
                alt={AMBIENCE_GALLERY[selectedPhotoIndex].title}
                className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full object-contain mx-auto rounded-lg"
              />
            </div>
            <div className="p-3.5 sm:p-6 bg-[#121927] border-t border-stone-800 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h4 className="font-display font-bold text-sm sm:text-lg text-white truncate">
                  {AMBIENCE_GALLERY[selectedPhotoIndex].title}
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-300 line-clamp-1">
                  {AMBIENCE_GALLERY[selectedPhotoIndex].subtitle}
                </p>
              </div>
              <span className="text-[10px] sm:text-xs text-amber-400 font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 flex-shrink-0">
                {selectedPhotoIndex + 1} / {AMBIENCE_GALLERY.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

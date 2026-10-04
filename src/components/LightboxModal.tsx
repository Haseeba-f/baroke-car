import React, { useEffect } from 'react';
import { GalleryItem } from './GalleryCard';
import { ComparisonSlider } from './ComparisonSlider';

interface LightboxModalProps {
  item: GalleryItem | null;
  allItems: GalleryItem[];
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  allItems,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const currentIndex = allItems.findIndex((i) => i.id === item.id);
        const nextIndex = (currentIndex + 1) % allItems.length;
        onNavigate(allItems[nextIndex]);
      }
      if (e.key === 'ArrowLeft') {
        const currentIndex = allItems.findIndex((i) => i.id === item.id);
        const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
        onNavigate(allItems[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, allItems, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const nextItem = allItems[(currentIndex + 1) % allItems.length];
  const prevItem = allItems[(currentIndex - 1 + allItems.length) % allItems.length];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen Before and After Lightbox"
    >
      {/* Top Bar with Title, Counter, and Close Button */}
      <div
        className="w-full max-w-6xl mx-auto flex items-center justify-between text-white pb-3 border-b border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#ffdad7] font-semibold">
              Inspection Lightbox &bull; {currentIndex + 1} of {allItems.length}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-neutral-300">
              {item.category}
            </span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl uppercase tracking-wide text-white leading-tight">
            {item.title}
          </h2>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#8a0011] text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div
        className="w-full max-w-5xl mx-auto my-auto py-2 relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onNavigate(prevItem)}
          className="absolute -left-3 sm:-left-6 md:-left-12 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-[#8a0011] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg cursor-pointer"
          title="Previous transformation (Left arrow)"
          aria-label="Previous repair card"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>

        {/* Large Slider */}
        <div className="w-full max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/20">
          <ComparisonSlider
            beforeImage={item.beforeImage}
            afterImage={item.afterImage}
            beforeLabel={item.beforeLabel || 'Before'}
            afterLabel={item.afterLabel || 'After'}
            initialPosition={50}
            altText={item.title}
            aspectRatioClass="aspect-[16/10] max-h-[70vh]"
            autoSweepOnView={false}
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onNavigate(nextItem)}
          className="absolute -right-3 sm:-right-6 md:-right-12 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-[#8a0011] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg cursor-pointer"
          title="Next transformation (Right arrow)"
          aria-label="Next repair card"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>
      </div>

      {/* Bottom Bar: Caption and Controls */}
      <div
        className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white/80 pt-3 border-t border-white/15 text-xs sm:text-sm font-body"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-white">
          <span className="material-symbols-outlined text-[18px] text-[#ffdad7]">directions_car</span>
          <span className="font-medium">{item.vehicle} &bull; {item.repairType}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-white/60">
          <span>Tip: Drag center handle or use ← / → keyboard arrows</span>
          {item.isPlaceholder && (
            <span className="text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              Placeholder asset swappable in gallery.js
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;

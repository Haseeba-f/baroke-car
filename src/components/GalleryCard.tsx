import React from 'react';
import { ComparisonSlider } from './ComparisonSlider';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  vehicle: string;
  repairType: string;
  initialPosition?: number;
  isPlaceholder?: boolean;
  placeholderNotice?: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

interface GalleryCardProps {
  item: GalleryItem;
  onOpenLightbox: (item: GalleryItem) => void;
  index: number;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, onOpenLightbox, index }) => {
  return (
    <div
      onClick={() => onOpenLightbox(item)}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between border border-neutral-200/80 group cursor-pointer"
    >
      <div>
        {/* Header line with Title & Category */}
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <h3 className="font-headline text-xl sm:text-2xl uppercase tracking-tight text-[#1a1c1d] group-hover:text-[#8a0011] transition-colors leading-none">
            {item.title}
          </h3>
          <span className="text-xs uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
            {item.category}
          </span>
        </div>

        {/* Draggable Slider Component */}
        <div onClick={(e) => e.stopPropagation()}>
          <ComparisonSlider
            beforeImage={item.beforeImage}
            afterImage={item.afterImage}
            beforeLabel={item.beforeLabel || 'Before'}
            afterLabel={item.afterLabel || 'After'}
            initialPosition={item.initialPosition || 50}
            altText={item.title}
            autoSweepOnView={true}
            onOpenLightbox={() => onOpenLightbox(item)}
          />
        </div>
      </div>

      {/* Caption & Placeholder Notice */}
      <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-600 font-body">
        <div className="flex items-center gap-1.5 font-medium text-neutral-800">
          <span className="material-symbols-outlined text-[16px] text-[#8a0011]">directions_car</span>
          <span>{item.vehicle} &bull; {item.repairType}</span>
        </div>
        
        {item.isPlaceholder && (
          <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 font-mono tracking-tight shrink-0">
            {item.placeholderNotice || 'Placeholder Image (gallery.js)'}
          </span>
        )}
      </div>
    </div>
  );
};

export default GalleryCard;

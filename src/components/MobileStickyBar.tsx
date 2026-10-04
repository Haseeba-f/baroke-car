import React from 'react';
import { BUSINESS_INFO } from '../data/business';

interface MobileStickyBarProps {
  onBookClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onBookClick }) => {
  return (
    <aside
      aria-label="Quick Contact and Booking"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2.5 flex items-center gap-2 max-h-[64px]"
    >
      <a
        href={BUSINESS_INFO.phoneHref}
        className="flex-1 h-11 flex items-center justify-center gap-1.5 rounded-lg bg-[#1a1c1d] text-white font-headline text-base uppercase tracking-wider active:scale-98 transition-transform"
      >
        <span className="material-symbols-outlined text-[18px]">call</span>
        <span>Call Shop</span>
      </a>

      <button
        type="button"
        onClick={onBookClick}
        className="flex-1 h-11 flex items-center justify-center gap-1.5 rounded-lg bg-[#8a0011] text-white font-headline text-base uppercase tracking-wider active:scale-98 transition-transform shadow-sm"
      >
        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
        <span>Book Appt</span>
      </button>
    </aside>
  );
};

export default MobileStickyBar;

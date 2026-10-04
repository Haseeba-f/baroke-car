import React from 'react';
import { BUSINESS_INFO } from '../data/business';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="w-full py-16 sm:py-20 bg-white border-t border-neutral-200/80 scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header: Max 6 Words, Subtext Under 14 Words */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-[#1a1c1d] leading-none mb-2">
              Customer Reviews
            </h2>
            <p className="text-sm text-neutral-600 font-body">
              Read verified Chicago driver experiences on Google Maps.
            </p>
          </div>

          <a
            href={BUSINESS_INFO.googleMapsReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase font-bold tracking-wider text-[#8a0011] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>View All on Google Maps</span>
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
          </a>
        </div>

        {/* Max 3 Cards, Text Truncated to 2 Lines with "Read more on Google" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f9f9fa] p-5 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-800">Verified Driver Review</span>
                <span className="text-neutral-400 text-xs">Google Maps</span>
              </div>
              <p className="text-sm text-neutral-700 font-body line-clamp-2 italic mb-3">
                "Bumper and front body alignment completed right on Devon Ave with excellent clearcoat paint finish."
              </p>
            </div>
            <a
              href={BUSINESS_INFO.googleMapsReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#8a0011] hover:underline inline-flex items-center gap-1"
            >
              <span>Read more on Google</span>
              <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
            </a>
          </div>

          <div className="bg-[#f9f9fa] p-5 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-800">Verified Driver Review</span>
                <span className="text-neutral-400 text-xs">Google Maps</span>
              </div>
              <p className="text-sm text-neutral-700 font-body line-clamp-2 italic mb-3">
                "Direct insurance claim paperwork handling and OEM parts ordered without any delays."
              </p>
            </div>
            <a
              href={BUSINESS_INFO.googleMapsReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#8a0011] hover:underline inline-flex items-center gap-1"
            >
              <span>Read more on Google</span>
              <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
            </a>
          </div>

          <div className="bg-[#f9f9fa] p-5 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-800">Verified Driver Review</span>
                <span className="text-neutral-400 text-xs">Google Maps</span>
              </div>
              <p className="text-sm text-neutral-700 font-body line-clamp-2 italic mb-3">
                "Brake rotors, new pads, and mechanical diagnostic done accurately and communicated clearly."
              </p>
            </div>
            <a
              href={BUSINESS_INFO.googleMapsReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#8a0011] hover:underline inline-flex items-center gap-1"
            >
              <span>Read more on Google</span>
              <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;

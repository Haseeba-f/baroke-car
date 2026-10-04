import React from 'react';
import { BUSINESS_INFO } from '../data/business';
import { MagneticButton } from './MagneticButton';

export const MapLocationSection: React.FC = () => {
  return (
    <section id="contact" className="w-full py-16 sm:py-20 bg-white scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header: Max 6 Words, Subtext Under 14 Words */}
        <div className="mb-8">
          <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-[#1a1c1d] leading-none mb-2">
            Visit Our Chicago Shop
          </h2>
          <p className="text-sm text-neutral-600 font-body">
            Conveniently located on Devon Ave with quick highway access.
          </p>
        </div>

        <div className="bg-[#f9f9fa] rounded-2xl shadow-sm border border-neutral-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left: Contact Info, Hours & Directions */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block mb-1">
                    Address
                  </span>
                  <p className="font-headline text-2xl uppercase tracking-tight text-[#1a1c1d] leading-tight">
                    {BUSINESS_INFO.name}
                  </p>
                  <p className="text-sm text-neutral-700 font-body">
                    {BUSINESS_INFO.address}
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block mb-1">
                    Hours
                  </span>
                  <p className="text-sm text-neutral-800 font-body">
                    {BUSINESS_INFO.hoursShort}
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block mb-1">
                    Direct Contact
                  </span>
                  <div className="flex flex-col gap-1 text-sm font-body">
                    <a href={BUSINESS_INFO.phoneHref} className="text-[#8a0011] hover:underline font-semibold">
                      {BUSINESS_INFO.phone}
                    </a>
                    <a href={BUSINESS_INFO.emailHref} className="text-neutral-700 hover:text-neutral-900">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Get Directions & View on Google Maps */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
              <MagneticButton
                href={BUSINESS_INFO.directionsUrl}
                className="flex-1 py-3 px-4 rounded-lg bg-[#8a0011] text-white font-headline text-lg uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-[#b3121f] transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">directions</span>
                <span>Get Directions</span>
              </MagneticButton>

              <MagneticButton
                href={BUSINESS_INFO.googleMapsReviewUrl}
                className="flex-1 py-3 px-4 rounded-lg bg-[#1a1c1d] text-white font-headline text-lg uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">map</span>
                <span>View on Google Maps</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right: Embedded Google Maps Iframe */}
          <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-full bg-neutral-200">
            <iframe
              title="BARAKO Auto Repair & Body Fix Location Map"
              src={BUSINESS_INFO.embeddedMapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '360px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[360px]"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default MapLocationSection;

import React from 'react';
import { BUSINESS_INFO } from '../data/business';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-16 sm:py-20 bg-white scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header: Max 6 Words, Subtext Under 14 Words */}
        <div className="mb-8">
          <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-[#1a1c1d] leading-none mb-2">
            About BARAKO
          </h2>
          <p className="text-sm text-neutral-600 font-body">
            {BUSINESS_INFO.aboutText}
          </p>
        </div>

        {/* Photo Placeholder Container */}
        <div className="w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm relative aspect-[21/9] max-h-[420px] flex items-center justify-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS0nd0lqA3liYsJevqO_OimM_EnZoL0CG4GU7cvwPLih7t8fxQ8yD8S_L9eMwRFTMKaO1k_qyHtOzhtkHfGRBVpyr1PE2kSj0N2GS8WQpm9cDPRE_fV_BBRXUlBg_HQ1RIFurSNnS3-XW-FyIS6Ni7iygHvNP7g0bSbRwhdzHnt-qEo7XoRkl2mtCMjsipErgMlL2FHVvT4mhAygNMNhSt9p_dgmCLDdMnriRxgTMA5shq-QEC7AsyYg"
            alt="BARAKO Auto Repair Workshop on Devon Ave"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 font-mono">
            1500 W Devon Ave &bull; Chicago, IL 60660 &bull; {BUSINESS_INFO.servingText}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;

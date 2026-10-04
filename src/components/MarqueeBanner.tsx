import React from 'react';

interface MarqueeBannerProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  className = '',
  theme = 'dark'
}) => {
  const items = [
    'PRECISION AUTO REPAIR',
    'COLLISION & BODY RECONSTRUCTION',
    'FRAME STRAIGHTENING & LASER ALIGNMENT',
    'OEM COLOR-MATCH REFINISHING',
    'BRAKE & SUSPENSION OVERHAUL',
    'INSURANCE DIRECT REPAIR ASSISTANCE',
    'ROGERS PARK & DEVON AUTO CORRIDOR',
    'SERVING CHICAGO SINCE 2021'
  ];

  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full overflow-hidden py-3.5 select-none relative ${
        isDark
          ? 'bg-[#1a1c1d] text-white border-y border-white/10'
          : 'bg-[#eeeeef] text-[#1a1c1d] border-y border-neutral-300/80'
      } ${className}`}
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* Render twice for continuous infinite loop */}
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <span className="font-headline text-base sm:text-lg uppercase tracking-wider font-bold">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8a0011] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;

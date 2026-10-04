import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 450);
          }, 150);
          return 100;
        }
        return prev + Math.floor(Math.random() * 22) + 12;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#1a1c1d] flex flex-col items-center justify-center transition-all duration-500 ${
        isFading ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      aria-label="Loading BARAKO Auto Repair"
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 text-center">
        {/* Brand Monogram */}
        <div className="w-16 h-16 rounded-xl bg-[#8a0011] text-white flex items-center justify-center font-headline text-3xl font-bold tracking-widest shadow-2xl mb-4 border border-white/20 animate-pulse">
          B
        </div>

        <div className="flex flex-col items-center mb-6">
          <span className="font-headline text-3xl uppercase tracking-wider text-white font-bold leading-none">
            BARAKO
          </span>
          <span className="font-body text-xs text-neutral-400 uppercase tracking-widest mt-1">
            Auto Repair &amp; Body Fix
          </span>
          <span className="text-[11px] text-[#ffdad7] font-body mt-1">
            1500 W Devon Ave, Chicago, IL 60660
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#8a0011] transition-all duration-150 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full mt-2 text-[11px] text-neutral-500 font-mono">
          <span>INITIALIZING</span>
          <span>{Math.min(100, progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

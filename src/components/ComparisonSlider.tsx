import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  altText?: string;
  aspectRatioClass?: string;
  isInteractive?: boolean;
  onOpenLightbox?: () => void;
  autoSweepOnView?: boolean;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  initialPosition = 50,
  altText = 'Repair comparison',
  aspectRatioClass = 'aspect-[16/10]',
  isInteractive = true,
  onOpenLightbox,
  autoSweepOnView = true
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasSweptRef = useRef<boolean>(false);
  const isSweepingRef = useRef<boolean>(false);

  // Smooth position updater with 0-100 clamp
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // One-time auto sweep animation when entering viewport
  useEffect(() => {
    if (!autoSweepOnView || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasSweptRef.current && !isDragging) {
            hasSweptRef.current = true;
            isSweepingRef.current = true;

            const startTime = performance.now();
            const duration = 1200; // 1.2s smooth introductory sweep
            const startVal = 50;
            const targetVal = 22; // Sweep towards left then back to 50

            const animateSweep = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(1, elapsed / duration);
              
              // Sine wave for smooth oscillation: 50 -> 22 -> 72 -> 50
              const wave = Math.sin(progress * Math.PI * 2);
              const currentPos = startVal - wave * 25;
              
              setSliderPosition(Math.max(5, Math.min(95, currentPos)));

              if (progress < 1 && isSweepingRef.current) {
                requestAnimationFrame(animateSweep);
              } else {
                setSliderPosition(50);
                isSweepingRef.current = false;
              }
            };

            requestAnimationFrame(animateSweep);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoSweepOnView, isDragging]);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractive) return;
    isSweepingRef.current = false;
    setIsDragging(true);
    updatePosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignored if pointer capture was released
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full ${aspectRatioClass} overflow-hidden rounded-lg select-none bg-neutral-900 group cursor-ew-resize touch-none shadow-md`}
      role="region"
      aria-label={`${altText} comparison slider. Drag left and right to inspect.`}
    >
      {/* AFTER IMAGE (Base Layer) */}
      <img
        src={afterImage}
        alt={`${altText} - ${afterLabel}`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      {/* BEFORE IMAGE (Clipped Layer on Top) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-[clip-path] duration-75 ease-out"
        style={{
          clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`
        }}
      >
        <img
          src={beforeImage}
          alt={`${altText} - ${beforeLabel}`}
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 bg-[#1a1c1d]/85 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow pointer-events-none border border-white/10">
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 bg-[#8a0011]/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow pointer-events-none border border-white/10">
        {afterLabel}
      </div>

      {/* DRAG HANDLE BAR */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#1a1c1d] border-2 border-white shadow-xl flex items-center justify-center text-white transition-transform ${
            isDragging ? 'scale-115 bg-[#8a0011]' : 'group-hover:scale-105'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* Lightbox Trigger Icon (Top Right or Bottom Right) */}
      {onOpenLightbox && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox();
          }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-[#8a0011] text-white flex items-center justify-center backdrop-blur-sm transition-colors z-10 shadow cursor-pointer"
          title="Open Fullscreen Lightbox"
          aria-label="View larger comparison in lightbox"
        >
          <span className="material-symbols-outlined text-[17px]">fullscreen</span>
        </button>
      )}
    </div>
  );
};

export default ComparisonSlider;

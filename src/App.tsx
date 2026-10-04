import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from './data/business';
import { galleryItems } from './data/gallery';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { ThreeRotorScene } from './components/ThreeRotorScene';
import { MagneticButton } from './components/MagneticButton';
import { ComparisonSlider } from './components/ComparisonSlider';
import { GalleryCard, GalleryItem } from './components/GalleryCard';
import { LightboxModal } from './components/LightboxModal';
import { ServiceCard } from './components/ServiceCard';
import { MarqueeBanner } from './components/MarqueeBanner';
import { AboutSection } from './components/AboutSection';
import { BookingEstimateSection } from './components/BookingEstimateSection';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { MapLocationSection } from './components/MapLocationSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';

export function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [confirmationData, setConfirmationData] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Pause Lenis when modal is active
  useEffect(() => {
    if (lightboxItem || confirmationData) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [lightboxItem, confirmationData]);

  // Section Observer to update active navigation tab
  useEffect(() => {
    const sectionIds = ['home', 'services', 'gallery', 'about', 'reviews', 'faq', 'booking', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetElement, { offset: -80 });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectServiceFromCard = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    handleNavigate('booking');
  };

  const featuredItem = galleryItems[0];

  return (
    <div className="min-h-screen bg-[#f9f9fa] text-[#1a1c1d] flex flex-col font-body selection:bg-[#8a0011] selection:text-white relative">
      {/* 1. Logo Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Top Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="w-full flex-1 pt-16 lg:pt-28">
        
        {/* ========================================================================= */}
        {/* HERO SECTION: Minimal Text (Headline Max 6 words, Subtext Under 14 words) */}
        {/* ========================================================================= */}
        <section id="home" className="w-full relative overflow-hidden bg-[#f3f3f4] pt-8 pb-14 lg:pt-14 lg:pb-20 scroll-mt-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Headline & Actions */}
              <div className="lg:col-span-7 flex flex-col items-start">
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8a0011] mb-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#8a0011] animate-pulse" />
                  <span>1500 W Devon Ave &bull; {BUSINESS_INFO.servingText}</span>
                </motion.div>

                {/* Staggered Line-by-Line Headline: 5 words (Max 6 words) */}
                <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#1a1c1d] leading-none mb-3">
                  <motion.span
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="block"
                  >
                    Chicago Collision &amp;
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="block text-[#8a0011]"
                  >
                    Auto Repair Care
                  </motion.span>
                </h1>

                {/* Subtext: 10 words (Under 14 words) */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base sm:text-lg text-neutral-600 font-body mb-8"
                >
                  Precision mechanical care and collision body repair on Devon Ave.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="flex flex-wrap items-center gap-3.5"
                >
                  <MagneticButton
                    onClick={() => handleNavigate('booking')}
                    className="px-6 py-3 rounded-lg bg-[#8a0011] text-white font-headline text-xl uppercase tracking-wider hover:bg-[#b3121f] transition-all shadow-md"
                  >
                    <span>Book Appointment</span>
                    <span className="material-symbols-outlined ml-2 text-[20px]">calendar_today</span>
                  </MagneticButton>

                  <MagneticButton
                    onClick={() => handleNavigate('booking')}
                    className="px-6 py-3 rounded-lg bg-[#1a1c1d] text-white font-headline text-xl uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-sm"
                  >
                    <span>Photo Estimate</span>
                    <span className="material-symbols-outlined ml-2 text-[20px]">add_a_photo</span>
                  </MagneticButton>

                  <MagneticButton
                    href={BUSINESS_INFO.phoneHref}
                    className="px-5 py-3 rounded-lg bg-white text-[#1a1c1d] border border-neutral-300 font-headline text-xl uppercase tracking-wider hover:bg-neutral-50 transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined mr-1.5 text-[20px] text-[#8a0011]">call</span>
                    <span>(312) 312-0889</span>
                  </MagneticButton>
                </motion.div>

              </div>

              {/* Right Column: 3D Rotor Canvas */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="w-full max-w-[440px] aspect-square relative flex items-center justify-center">
                  <div className="absolute inset-4 rounded-full border border-neutral-300/60 shadow-inner bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                  <ThreeRotorScene className="z-10" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-neutral-400 font-mono uppercase tracking-widest bg-white/70 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-neutral-200 pointer-events-none select-none">
                    Rotate &bull; Tilt
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================================= */}
            {/* FEATURED TRANSFORMATION SLIDER (Minimal text)                             */}
            {/* ========================================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="mt-12 bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-neutral-200"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-2">
                <div>
                  <h3 className="font-headline text-2xl sm:text-3xl uppercase tracking-tight text-[#1a1c1d]">
                    Collision Transformation
                  </h3>
                  <p className="text-xs text-neutral-500 font-body">
                    Drag slider to inspect panel tolerances.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxItem(featuredItem)}
                  className="text-xs uppercase font-bold tracking-wider text-[#8a0011] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Fullscreen Lightbox</span>
                  <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                </button>
              </div>

              <div className="w-full max-h-[520px]">
                <ComparisonSlider
                  beforeImage={featuredItem.beforeImage}
                  afterImage={featuredItem.afterImage}
                  beforeLabel={featuredItem.beforeLabel}
                  afterLabel={featuredItem.afterLabel}
                  initialPosition={50}
                  altText={featuredItem.title}
                  aspectRatioClass="aspect-[16/10] sm:aspect-[21/9]"
                  onOpenLightbox={() => setLightboxItem(featuredItem)}
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* Marquee Banner */}
        <MarqueeBanner theme="dark" />

        {/* ========================================================================= */}
        {/* SERVICES SECTION: Icon + Name Only, Small Book Link                       */}
        {/* ========================================================================= */}
        <section id="services" className="w-full py-16 sm:py-20 bg-white scroll-mt-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-8">
              <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-[#1a1c1d] leading-none mb-2">
                Our Repair Services
              </h2>
              <p className="text-sm text-neutral-600 font-body">
                Mechanical diagnostics and complete body reconstruction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BUSINESS_INFO.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSelectService={handleSelectServiceFromCard}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* BEFORE & AFTER GALLERY: 6 Cards, Sliders, Minimal Caption                 */}
        {/* ========================================================================= */}
        <section id="gallery" className="w-full py-16 sm:py-20 bg-[#f3f3f4] scroll-mt-24 border-t border-neutral-200/80">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-[#1a1c1d] leading-none mb-2">
                  Before &amp; After Gallery
                </h2>
                <p className="text-sm text-neutral-600 font-body">
                  Drag sliders to inspect verified shop repairs.
                </p>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Click any card to open lightbox
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {galleryItems.map((item, idx) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={idx}
                  onOpenLightbox={(selected) => setLightboxItem(selected)}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ABOUT US: 2 Short Sentences Max, Photo Placeholder                         */}
        {/* ========================================================================= */}
        <AboutSection />

        {/* Marquee Banner */}
        <MarqueeBanner theme="light" />

        {/* ========================================================================= */}
        {/* INTAKE FORMS: Streamlined Minimal Fields                                  */}
        {/* ========================================================================= */}
        <BookingEstimateSection
          onSuccess={(data) => setConfirmationData(data)}
          selectedServicePreload={selectedService}
        />

        {/* ========================================================================= */}
        {/* REVIEWS: Max 3 Cards, 2 Lines Truncated, Read More on Google              */}
        {/* ========================================================================= */}
        <ReviewsSection />

        {/* ========================================================================= */}
        {/* FAQ: 5 Questions Max, 1 Sentence Answers Each                             */}
        {/* ========================================================================= */}
        <FAQSection />

        {/* ========================================================================= */}
        {/* MAP & LOCATION: Exact Iframe, Directions Link & Clean Contact             */}
        {/* ========================================================================= */}
        <MapLocationSection />

      </main>

      {/* Footer: Minimal 3 Columns, No Paragraph Text */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Bar (<15% height) */}
      <MobileStickyBar onBookClick={() => handleNavigate('booking')} />

      {/* Full-screen Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <LightboxModal
            item={lightboxItem}
            allItems={galleryItems}
            onClose={() => setLightboxItem(null)}
            onNavigate={(newItem) => setLightboxItem(newItem)}
          />
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmationData && (
          <ConfirmationModal
            data={confirmationData}
            onClose={() => setConfirmationData(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/business';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Before & After Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Scroll Progress Bar in Red */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/10 z-50">
        <div
          className="h-full bg-[#8a0011] transition-all duration-75 ease-out shadow-[0_0_8px_#8a0011]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Utility Bar (collapses smoothly on scroll) */}
      <div
        className={`bg-[#1a1c1d] text-white text-[12px] font-medium transition-all duration-300 overflow-hidden hidden lg:block ${
          isScrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-11 opacity-100 py-2 border-b border-white/10'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[15px] text-[#ffdad7]">call</span>
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={BUSINESS_INFO.smsHref}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[15px] text-[#ffdad7]">sms</span>
              <span>Text Us: {BUSINESS_INFO.sms}</span>
            </a>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="material-symbols-outlined text-[15px]">location_on</span>
              <span>{BUSINESS_INFO.address}</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              <span>{BUSINESS_INFO.hours[0].days}: {BUSINESS_INFO.hours[0].time} &bull; {BUSINESS_INFO.hours[1].days}: {BUSINESS_INFO.hours[1].time}</span>
            </span>
            <span className="text-[11px] text-[#ffdad7] font-semibold tracking-wider">
              {BUSINESS_INFO.servingText}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar (shrinks and blurs on scroll) */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5'
            : 'bg-white/90 backdrop-blur-sm shadow-sm py-4'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Wordmark (Single clean text element) */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick('home', e)}
            className="flex items-center gap-3 group shrink-0"
            aria-label="BARAKO Auto Repair & Body Fix Home"
          >
            <div className="w-9 h-9 rounded-lg bg-[#8a0011] text-white flex items-center justify-center font-headline text-xl font-bold tracking-wider shadow-sm group-hover:bg-[#b3121f] transition-colors">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-2xl tracking-wider text-[#1a1c1d] leading-none uppercase font-bold">
                BARAKO
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold leading-tight">
                Auto Repair &amp; Body Fix
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Animated Underline */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  className={`relative py-1 font-headline text-lg uppercase tracking-wide transition-colors ${
                    isActive ? 'text-[#8a0011] font-bold' : 'text-neutral-700 hover:text-neutral-900 font-semibold'
                  }`}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#8a0011] transition-all duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Primary Action Buttons with Magnetic Hover */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <MagneticButton
              href={BUSINESS_INFO.smsHref}
              className="hidden md:inline-flex px-3.5 py-2 rounded-lg bg-[#1a1c1d] text-white font-headline text-base uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Text Us
            </MagneticButton>

            <MagneticButton
              onClick={() => onNavigate('booking')}
              className="px-4 sm:px-5 py-2 rounded-lg bg-[#8a0011] text-white font-headline text-base uppercase tracking-wider hover:bg-[#b3121f] transition-all shadow-sm"
            >
              <span>Book Appointment</span>
              <span className="material-symbols-outlined ml-1.5 text-[18px]">calendar_today</span>
            </MagneticButton>

            {/* Mobile menu hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  className={`px-3 py-2 rounded-lg font-headline text-xl uppercase tracking-wider transition-colors ${
                    activeSection === link.id
                      ? 'bg-neutral-100 text-[#8a0011] font-bold'
                      : 'text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="flex items-center gap-2 text-sm text-neutral-700 font-body py-1.5 px-3"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#8a0011]">call</span>
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
                <a
                  href={BUSINESS_INFO.smsHref}
                  className="flex items-center gap-2 text-sm text-neutral-700 font-body py-1.5 px-3"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#8a0011]">sms</span>
                  <span>Text: {BUSINESS_INFO.sms}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

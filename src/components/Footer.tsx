import React from 'react';
import { BUSINESS_INFO } from '../data/business';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#1a1c1d] text-white pt-14 pb-24 md:pb-12 border-t border-white/10 font-body">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#8a0011] text-white flex items-center justify-center font-headline text-2xl font-bold">
              B
            </div>
            <div>
              <span className="font-headline text-2xl uppercase tracking-wider text-white block leading-none font-bold">
                {BUSINESS_INFO.name}
              </span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                {BUSINESS_INFO.servingText}
              </span>
            </div>
          </div>

          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-neutral-300 hover:text-white inline-flex items-center gap-1.5"
          >
            <span>Instagram</span>
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
          </a>
        </div>

        {/* 3 Link Columns Max (No paragraph text) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-sm">
          
          {/* Column 1: Services */}
          <div className="flex flex-col gap-2">
            <span className="font-headline text-lg uppercase tracking-wider text-white mb-1 font-bold">
              Services
            </span>
            {BUSINESS_INFO.services.map((s) => (
              <a
                key={s.id}
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-2">
            <span className="font-headline text-lg uppercase tracking-wider text-white mb-1 font-bold">
              Navigation
            </span>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('services');
              }}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('gallery');
              }}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Before &amp; After Gallery
            </a>
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('reviews');
              }}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('faq');
              }}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              FAQ
            </a>
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('booking');
              }}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Book Appointment
            </a>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="flex flex-col gap-2">
            <span className="font-headline text-lg uppercase tracking-wider text-white mb-1 font-bold">
              Contact &amp; Hours
            </span>
            <span className="text-neutral-300 font-medium">
              {BUSINESS_INFO.address}
            </span>
            <a href={BUSINESS_INFO.phoneHref} className="text-neutral-400 hover:text-white transition-colors">
              Phone: {BUSINESS_INFO.phone}
            </a>
            <a href={BUSINESS_INFO.emailHref} className="text-neutral-400 hover:text-white transition-colors">
              Email: {BUSINESS_INFO.email}
            </a>
            <span className="text-neutral-400">
              Hours: {BUSINESS_INFO.hoursShort}
            </span>
            <a
              href={BUSINESS_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#ffdad7] hover:underline uppercase tracking-wide inline-flex items-center gap-1 font-semibold mt-1"
            >
              <span>Get Directions</span>
              <span className="material-symbols-outlined text-[13px]">directions</span>
            </a>
          </div>

        </div>

        {/* Legal Row: Privacy, Terms, and Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

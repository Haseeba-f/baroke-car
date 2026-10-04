import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/business';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-20 bg-[#f3f3f4] scroll-mt-24">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Header: Max 6 Words, Subtext Under 14 Words */}
        <div className="text-center mb-8">
          <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-[#1a1c1d] leading-none mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-600 font-body">
            Quick answers to common repair questions.
          </p>
        </div>

        {/* 5 Questions Max, 1 Sentence Answers Each */}
        <div className="space-y-3">
          {BUSINESS_INFO.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-headline text-lg sm:text-xl uppercase tracking-wide text-[#1a1c1d] hover:text-[#8a0011] transition-colors cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-200 text-neutral-700 ${
                      isOpen ? 'rotate-180 bg-[#8a0011] text-white' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      expand_more
                    </span>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out font-body ${
                    isOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-4 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;

import React from 'react';
import { BUSINESS_INFO } from '../data/business';

interface ConfirmationData {
  type: 'appointment' | 'estimate';
  name: string;
  phone: string;
  vehicle: string;
  serviceOrDamage: string;
  dateOrVin?: string;
  reference: string;
}

interface ConfirmationModalProps {
  data: ConfirmationData | null;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  const isAppointment = data.type === 'appointment';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Submission confirmation dialog"
    >
      <div
        className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5 relative border border-neutral-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition-colors p-1"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Animated Check Mark Drawing In */}
        <div className="mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#ffdad7] flex items-center justify-center text-[#8a0011] shadow-inner mb-3">
            <svg
              className="w-9 h-9"
              viewBox="0 0 52 52"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="26"
                cy="26"
                r="23"
                className="opacity-25"
                stroke="currentColor"
              />
              <path
                className="animate-check-draw"
                d="M14 27l8 8 16-16"
              />
            </svg>
          </div>

          <h3 className="font-headline text-3xl uppercase tracking-tight text-[#1a1c1d] text-center leading-none">
            {isAppointment ? 'Appointment Queued' : 'Estimate Request Received'}
          </h3>
          <span className="text-xs text-neutral-500 font-mono mt-1">
            Reference: {data.reference}
          </span>
        </div>

        <p className="text-sm text-neutral-600 text-center font-body leading-relaxed">
          Thank you, <strong className="text-neutral-900">{data.name}</strong>. Our team at 1500 W Devon Ave has logged your request. We will reach out to you at <strong className="text-neutral-900">{data.phone}</strong> shortly.
        </p>

        {/* Summary Card */}
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 text-xs font-body space-y-1.5 text-neutral-700">
          <div className="flex justify-between py-0.5 border-b border-neutral-200/60">
            <span className="text-neutral-500">Contact:</span>
            <span className="font-medium text-neutral-900">{data.name} ({data.phone})</span>
          </div>
          <div className="flex justify-between py-0.5 border-b border-neutral-200/60">
            <span className="text-neutral-500">Vehicle:</span>
            <span className="font-medium text-neutral-900">{data.vehicle}</span>
          </div>
          <div className="flex justify-between py-0.5 border-b border-neutral-200/60">
            <span className="text-neutral-500">{isAppointment ? 'Requested Service:' : 'Damage Scope:'}</span>
            <span className="font-medium text-neutral-900">{data.serviceOrDamage}</span>
          </div>
          {data.dateOrVin && (
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-500">{isAppointment ? 'Requested Slot:' : 'VIN / Note:'}</span>
              <span className="font-medium text-neutral-900">{data.dateOrVin}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={BUSINESS_INFO.phoneHref}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#8a0011] text-white font-headline text-lg uppercase tracking-wider text-center flex items-center justify-center gap-1.5 hover:bg-[#b3121f] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call Shop Directly</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg bg-neutral-100 text-neutral-800 font-headline text-lg uppercase tracking-wider text-center hover:bg-neutral-200 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

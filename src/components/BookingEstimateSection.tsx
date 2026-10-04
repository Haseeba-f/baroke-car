import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/business';
import { api } from '../api';
import { MagneticButton } from './MagneticButton';

interface BookingEstimateSectionProps {
  onSuccess: (data: {
    type: 'appointment' | 'estimate';
    name: string;
    phone: string;
    vehicle: string;
    serviceOrDamage: string;
    dateOrVin?: string;
    reference: string;
  }) => void;
  selectedServicePreload?: string;
}

export const BookingEstimateSection: React.FC<BookingEstimateSectionProps> = ({
  onSuccess,
  selectedServicePreload
}) => {
  const [activeTab, setActiveTab] = useState<'appointment' | 'estimate'>('appointment');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Appointment Form State
  const [apptName, setApptName] = useState('');
  const [apptPhone, setApptPhone] = useState('');
  const [apptEmail, setApptEmail] = useState('');
  const [apptVehicle, setApptVehicle] = useState('');
  const [apptService, setApptService] = useState(selectedServicePreload || '');
  const [apptDateTime, setApptDateTime] = useState('');
  const [apptNotes, setApptNotes] = useState('');

  // Estimate Form State
  const [estName, setEstName] = useState('');
  const [estPhone, setEstPhone] = useState('');
  const [estEmail, setEstEmail] = useState('');
  const [estVehicle, setEstVehicle] = useState('');
  const [estDescription, setEstDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files).slice(0, 5));
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: apptName,
        phone: apptPhone,
        email: apptEmail,
        vehicle: apptVehicle,
        service: apptService,
        dateTime: apptDateTime,
        notes: apptNotes
      };
      const result = await api.submitAppointment(payload);
      onSuccess({
        type: 'appointment',
        name: apptName,
        phone: apptPhone,
        vehicle: apptVehicle,
        serviceOrDamage: apptService,
        dateOrVin: apptDateTime ? apptDateTime.replace('T', ' ') : 'Requested slot',
        reference: result.bookingRef
      });
      setApptName('');
      setApptPhone('');
      setApptEmail('');
      setApptVehicle('');
      setApptService('');
      setApptDateTime('');
      setApptNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEstimateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: estName,
        phone: estPhone,
        email: estEmail,
        vehicle: estVehicle,
        description: estDescription,
        photoCount: uploadedFiles.length
      };
      const result = await api.submitPhotoEstimate(payload);
      onSuccess({
        type: 'estimate',
        name: estName,
        phone: estPhone,
        vehicle: estVehicle,
        serviceOrDamage: estDescription.slice(0, 50),
        reference: result.estimateRef
      });
      setEstName('');
      setEstPhone('');
      setEstEmail('');
      setEstVehicle('');
      setEstDescription('');
      setUploadedFiles([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="w-full py-16 sm:py-20 bg-[#f3f3f4] scroll-mt-24">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Header: Max 6 Words, Subtext Under 14 Words */}
        <div className="text-center mb-8">
          <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-[#1a1c1d] leading-none mb-2">
            Schedule Appointment or Request Estimate
          </h2>
          <p className="text-sm text-neutral-600 font-body">
            Select your service or upload damage photos.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-200">
          <div className="flex p-1 bg-neutral-100 rounded-lg mb-6" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'appointment'}
              onClick={() => setActiveTab('appointment')}
              className={`flex-1 py-2 px-3 rounded-md font-headline text-base sm:text-lg uppercase tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'appointment'
                  ? 'bg-white text-[#1a1c1d] shadow-sm font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 font-semibold'
              }`}
            >
              Repair Appointment
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'estimate'}
              onClick={() => setActiveTab('estimate')}
              className={`flex-1 py-2 px-3 rounded-md font-headline text-base sm:text-lg uppercase tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'estimate'
                  ? 'bg-white text-[#1a1c1d] shadow-sm font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 font-semibold'
              }`}
            >
              Photo Estimate
            </button>
          </div>

          {/* Form 1: Appointment */}
          {activeTab === 'appointment' && (
            <form onSubmit={handleAppointmentSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="Full Name *"
                  value={apptName}
                  onChange={(e) => setApptName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number *"
                  value={apptPhone}
                  onChange={(e) => setApptPhone(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  type="email"
                  placeholder="Email Address *"
                  value={apptEmail}
                  onChange={(e) => setApptEmail(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                />
                <input
                  required
                  type="text"
                  placeholder="Vehicle (Year / Make / Model) *"
                  value={apptVehicle}
                  onChange={(e) => setApptVehicle(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  required
                  value={apptService}
                  onChange={(e) => setApptService(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                >
                  <option value="" disabled>Service Desired *</option>
                  {BUSINESS_INFO.services.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Mechanical Diagnostic">Mechanical Diagnostic</option>
                </select>

                <input
                  required
                  type="datetime-local"
                  value={apptDateTime}
                  onChange={(e) => setApptDateTime(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Notes (optional)"
                value={apptNotes}
                onChange={(e) => setApptNotes(e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
              />

              <MagneticButton
                type="submit"
                className="w-full py-3 rounded-lg bg-[#8a0011] text-white font-headline text-lg uppercase tracking-wider hover:bg-[#b3121f] transition-all shadow-md mt-1"
              >
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
              </MagneticButton>
            </form>
          )}

          {/* Form 2: Photo Estimate */}
          {activeTab === 'estimate' && (
            <form onSubmit={handleEstimateSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="Contact Name *"
                  value={estName}
                  onChange={(e) => setEstName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number *"
                  value={estPhone}
                  onChange={(e) => setEstPhone(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  type="email"
                  placeholder="Email Address *"
                  value={estEmail}
                  onChange={(e) => setEstEmail(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                />
                <input
                  required
                  type="text"
                  placeholder="Vehicle (Year / Make / Model) *"
                  value={estVehicle}
                  onChange={(e) => setEstVehicle(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
                />
              </div>

              <textarea
                required
                rows={2}
                placeholder="Damage Description *"
                value={estDescription}
                onChange={(e) => setEstDescription(e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a0011] text-sm text-[#1a1c1d] font-body"
              />

              <div>
                <label
                  htmlFor="est-photos"
                  className="p-4 rounded-lg bg-neutral-50 border-2 border-dashed border-neutral-300 hover:border-[#8a0011] flex flex-col items-center justify-center cursor-pointer transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-[22px] text-[#8a0011] mb-1">
                    add_a_photo
                  </span>
                  <span className="text-xs font-semibold text-neutral-800">
                    {uploadedFiles.length > 0
                      ? `${uploadedFiles.length} photo(s) selected`
                      : 'Attach Damage Photos (up to 5)'}
                  </span>
                  <input
                    id="est-photos"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <MagneticButton
                type="submit"
                className="w-full py-3 rounded-lg bg-[#1a1c1d] text-white font-headline text-lg uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md mt-1"
              >
                {isSubmitting ? 'Submitting...' : 'Request Photo Estimate'}
              </MagneticButton>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default BookingEstimateSection;

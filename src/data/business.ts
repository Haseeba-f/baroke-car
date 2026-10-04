/**
 * BARAKO Auto Repair & Body Fix
 * Core Business Information & Config
 * 
 * Central config for address, phone, email, and Google Maps links.
 */

export const BUSINESS_INFO = {
  name: 'BARAKO Auto Repair & Body Fix',
  shortName: 'BARAKO',
  tagline: 'Auto Repair & Body Fix',
  address: '1500 W Devon Ave, Chicago, IL 60660',
  street: '1500 W Devon Ave',
  cityStateZip: 'Chicago, IL 60660',
  phone: '+1 (312) 312-0889',
  phoneHref: 'tel:+13123120889',
  sms: '(312) 312-0889',
  smsHref: 'sms:+13123120889',
  email: 'info@barakoauto.com',
  emailHref: 'mailto:info@barakoauto.com',
  instagramUrl: 'https://instagram.com',
  servingSince: 2021,
  servingText: 'Serving Chicago since 2021',

  // Google Maps Links (Exact URLs specified by user)
  embeddedMapSrc: 'https://www.google.com/maps?q=BARAKO+AUTO+REPAIR+%26+BODY+FIX,+1500+W+Devon+Ave,+Chicago,+IL+60660&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=BARAKO+AUTO+REPAIR+%26+BODY+FIX,+1500+W+Devon+Ave,+Chicago,+IL+60660',
  googleMapsReviewUrl: 'https://www.google.com/maps?q=BARAKO+AUTO+REPAIR+%26+BODY+FIX,+1500+W+Devon+Ave,+Chicago,+IL+60660&ftid=0x880fd323fe36edbf:0xc4852f7045cc00a1',

  // Operating Hours (editable placeholder)
  hours: [
    { days: 'Mon – Sat', time: '8:00 AM – 6:00 PM' },
    { days: 'Sunday', time: 'Closed' }
  ],
  hoursShort: 'Mon–Sat: 8:00 AM – 6:00 PM | Sun: Closed',

  // Services: Icon + Name only (No long descriptions or bullet points)
  services: [
    { id: 'mechanical', title: 'Precision Auto Repair', icon: 'build' },
    { id: 'collision', title: 'Collision & Body Reconstruction', icon: 'minor_crash' },
    { id: 'frame', title: 'Frame Straightening & Alignment', icon: 'straighten' },
    { id: 'refinishing', title: 'OEM Color-Match Refinishing', icon: 'format_paint' },
    { id: 'brakes', title: 'Brake & Suspension Overhaul', icon: 'tire_repair' },
    { id: 'insurance', title: 'Insurance Repair Assistance', icon: 'assignment_turned_in' }
  ],

  // About Us: 2 short sentences max
  aboutText: 'Serving Chicago since 2021. Dedicated to precision auto care and collision repair.',

  // FAQ: 5 questions max, 1 sentence each
  faqs: [
    {
      question: 'Where are you located?',
      answer: 'We are located at 1500 W Devon Ave, Chicago, IL 60660 at Devon and Greenview.'
    },
    {
      question: 'Do you handle insurance claims?',
      answer: 'Yes, we coordinate directly with insurance carriers and provide itemized documentation.'
    },
    {
      question: 'How do I request an estimate?',
      answer: 'Submit photos through our online form or visit our Devon Ave shop.'
    },
    {
      question: 'Is night key drop-off available?',
      answer: 'Yes, our secure key drop box is accessible 24 hours a day.'
    },
    {
      question: 'What vehicles do you service?',
      answer: 'We service all domestic, Asian, and European passenger vehicles and light trucks.'
    }
  ]
};

export default BUSINESS_INFO;

/**
 * BARAKO Auto Repair & Body Fix
 * API Client Integration Placeholder
 * 
 * Ready to connect with backend endpoints or webhook handlers.
 */

export const api = {
  /**
   * Submit an appointment request
   * @param {Object} data 
   * @returns {Promise<{success: boolean, message: string, bookingRef: string}>}
   */
  async submitAppointment(data) {
    // Simulated network delay for smooth UX transition
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Optional: Send data to an actual endpoint if configured
    // const res = await fetch('/api/appointments', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return await res.json();

    const bookingRef = 'BK-' + Math.floor(100000 + Math.random() * 900000);
    return {
      success: true,
      message: 'Appointment request received successfully.',
      bookingRef,
      receivedAt: new Date().toISOString()
    };
  },

  /**
   * Submit collision photos and vehicle damage estimate request
   * @param {Object} data 
   * @returns {Promise<{success: boolean, message: string, estimateRef: string}>}
   */
  async submitPhotoEstimate(data) {
    await new Promise((resolve) => setTimeout(resolve, 750));

    // Optional: Send multipart form data to an actual endpoint
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, val]) => formData.append(key, val));
    // const res = await fetch('/api/estimates', { method: 'POST', body: formData });
    // return await res.json();

    const estimateRef = 'EST-' + Math.floor(100000 + Math.random() * 900000);
    return {
      success: true,
      message: 'Damage photos and details submitted successfully.',
      estimateRef,
      receivedAt: new Date().toISOString()
    };
  }
};

export default api;

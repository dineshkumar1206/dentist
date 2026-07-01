// Backend Server Connection Configuration
// Defaults to local port 8000 and can be overridden via VITE_API_BASE_URL in Vercel settings
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://amigowebster.in/dentist-form/api";

/**
 * Sends a POST request to submit a new dental appointment.
 * @param {Object} formData The appointment form details.
 * @returns {Promise<Object>} The server response data.
 */
export const createAppointment = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Failed to book appointment. Please try again.");
  }

  return data;
};

/**
 * Fetches all appointments from the backend server.
 * @returns {Promise<Object>} The server response data.
 */
export const getAllAppointments = async () => {
  const response = await fetch(`${API_BASE_URL}/appointments`);
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to retrieve appointments.");
  }

  return data;
};

/**
 * Validator placeholder for profile requests.
 */
const validateProfileRequest = (profile = {}) => {
  if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    return {
      valid: false,
      error: "Please provide a valid email address.",
    };
  }

  if (profile.postal_code && !/^\d{4}$/.test(String(profile.postal_code))) {
    return {
      valid: false,
      error: "Postal code must be 4 digits.",
    };
  }

  return {
    valid: true,
    error: null,
  };
};

module.exports = {
  validateProfileRequest,
};

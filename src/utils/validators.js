/**
 * Validates a Kenyan phone number.
 * Must start with +254 followed by 7 or 1 and 8 more digits.
 */
export function validatePhone(value) {
  if (!value || value.trim() === "") {
    return "Phone number is required.";
  }
  if (!/^\+254[17]\d{8}$/.test(value.trim())) {
    return "Enter a valid Kenyan number starting with +254 (e.g. +254712345678).";
  }
  return null;
}

/**
 * Mock authentication — only one valid credential for demo purposes.
 */
export function mockAuthenticate(phone) {
  return phone === "+254712345678";
}

/**
 * Session timeout — 30 minutes in milliseconds.
 */
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

/**
 * Checks whether the stored session has expired.
 */
export function isSessionExpired(loginTime) {
  if (!loginTime) return true;
  return Date.now() - new Date(loginTime).getTime() > SESSION_TIMEOUT_MS;
}
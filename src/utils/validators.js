/**
 * Validates an Irish mobile phone number.
 * Format: +353 8X XXXXXXX (Irish mobile numbers start with 08X)
 * Example: +353812345678
 */
export function validatePhone(value) {
  if (!value || value.trim() === "") {
    return "Phone number is required.";
  }
  if (!/^\+3538[0-9]\d{7}$/.test(value.trim())) {
    return "Enter a valid Irish number starting with +3538 (e.g. +353812345678).";
  }
  return null;
}

/**
 * Mock authentication — only one valid credential for demo purposes.
 */
export function mockAuthenticate(phone) {
  return phone === "+353812345678";
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
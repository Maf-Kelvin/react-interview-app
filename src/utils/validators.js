export function validatePhone(value) {
  if (!value || value.trim() === "") {
    return "Phone number is required.";
  }
  if (!/^\+254[17]\d{8}$/.test(value.trim())) {
    return "Enter a valid Kenyan number starting with +254 (e.g. +254712345678).";
  }
  return null;
}

export function mockAuthenticate(phone) {
  return phone === "+254712345678";
}

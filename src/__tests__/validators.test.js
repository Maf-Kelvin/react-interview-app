import { validatePhone, mockAuthenticate } from "../utils/validators";

describe("validatePhone", () => {
  it("returns error when value is empty", () => {
    expect(validatePhone("")).toMatch(/required/i);
  });
  it("returns error when value is null", () => {
    expect(validatePhone(null)).toMatch(/required/i);
  });
  it("returns error for number without country code", () => {
    expect(validatePhone("0712345678")).toMatch(/valid Kenyan number/i);
  });
  it("returns error for wrong country code", () => {
    expect(validatePhone("+1712345678")).toMatch(/valid Kenyan number/i);
  });
  it("returns error for too short a number", () => {
    expect(validatePhone("+25471234")).toMatch(/valid Kenyan number/i);
  });
  it("returns error for invalid digit after +254", () => {
    expect(validatePhone("+254512345678")).toMatch(/valid Kenyan number/i);
  });
  it("returns null for valid +2547x number", () => {
    expect(validatePhone("+254712345678")).toBeNull();
  });
  it("returns null for valid +2541x number", () => {
    expect(validatePhone("+254112345678")).toBeNull();
  });
});

describe("mockAuthenticate", () => {
  it("returns true for the valid demo credential", () => {
    expect(mockAuthenticate("+254712345678")).toBe(true);
  });
  it("returns false for any other number", () => {
    expect(mockAuthenticate("+254798765432")).toBe(false);
    expect(mockAuthenticate("")).toBe(false);
  });
});

import { validatePhone, mockAuthenticate } from "../utils/validators";

describe("validatePhone", () => {
  it("returns error when value is empty", () => {
    expect(validatePhone("")).toMatch(/required/i);
  });

  it("returns error when value is null", () => {
    expect(validatePhone(null)).toMatch(/required/i);
  });

  it("returns error for number without country code", () => {
    expect(validatePhone("0812345678")).toMatch(/valid Irish number/i);
  });

  it("returns error for wrong country code", () => {
    expect(validatePhone("+254712345678")).toMatch(/valid Irish number/i);
  });

  it("returns error for too short a number", () => {
    expect(validatePhone("+35381234")).toMatch(/valid Irish number/i);
  });

  it("returns error for number not starting with +3538", () => {
    expect(validatePhone("+353112345678")).toMatch(/valid Irish number/i);
  });

  it("returns null for a valid Irish mobile number", () => {
    expect(validatePhone("+353812345678")).toBeNull();
  });

  it("returns null for another valid Irish mobile number", () => {
    expect(validatePhone("+353887654321")).toBeNull();
  });
});

describe("mockAuthenticate", () => {
  it("returns true for the valid demo credential", () => {
    expect(mockAuthenticate("+353812345678")).toBe(true);
  });

  it("returns false for any other number", () => {
    expect(mockAuthenticate("+353887654321")).toBe(false);
    expect(mockAuthenticate("+254712345678")).toBe(false);
    expect(mockAuthenticate("")).toBe(false);
  });
});
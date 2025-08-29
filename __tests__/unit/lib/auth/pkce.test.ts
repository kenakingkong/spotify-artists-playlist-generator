/**
 * @jest-environment node
 */

import {
  CODE_CHALLENGE_METHOD,
  generateCodeChallenge,
  generateRandomString,
} from "@/lib/auth/pkce";

describe("unit/lib/auth/pkce tests", () => {
  it("should have the correct CODE_CHALLENGE_METHOD", () => {
    expect(CODE_CHALLENGE_METHOD).toBe("S256");
  });

  it("generateRandomString returns a string", () => {
    const result = generateCodeChallenge("random");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("generateRandomString returns a base64 String", () => {
    const result = generateRandomString();
    expect(typeof result).toBe("string");
    expect(result.length).toBe(64);
  });

  it("generateRandomString produces different strings on multiple calls", () => {
    const result1 = generateRandomString();
    const result2 = generateRandomString();

    expect(result1).not.toBe(result2);
  });
});

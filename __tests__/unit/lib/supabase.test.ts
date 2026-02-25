/**
 * @jest-environment node
 */

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({ mockClient: true })),
}));

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...ORIGINAL_ENV };
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe("unit/lib/supabase", () => {
  it("throws when NEXT_PUBLIC_SUPABASE_URL is missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY = "test-key";

    expect(() => require("@/lib/supabase")).toThrow(
      "Missing Supabase environment variables"
    );
  });

  it("throws when NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY is missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

    expect(() => require("@/lib/supabase")).toThrow(
      "Missing Supabase environment variables"
    );
  });

  it("throws when both env vars are missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

    expect(() => require("@/lib/supabase")).toThrow(
      "Missing Supabase environment variables"
    );
  });

  it("calls createClient with the correct URL and key", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY = "test-key";

    require("@/lib/supabase");

    const { createClient } = require("@supabase/supabase-js");
    expect(createClient).toHaveBeenCalledWith(
      "https://test.supabase.co",
      "test-key"
    );
  });

  it("exports the result of createClient as supabase", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY = "test-key";

    const { supabase } = require("@/lib/supabase");
    expect(supabase).toEqual({ mockClient: true });
  });
});

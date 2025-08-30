import { isValidUriString } from "@/lib/spotify/validate";

describe("unit/lib/spotify/validate tests", () => {
  it("validateUrisString returns true if valid", () => {
    const str =
      "uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M";

    expect(isValidUriString(str)).toBe(true);
  });

  it("validateUrisString returns false with episode", () => {
    const str =
      "uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:episode:512ojhOuo1ktJprKbVcKyQ";

    expect(isValidUriString(str)).toBe(false);
  });
});

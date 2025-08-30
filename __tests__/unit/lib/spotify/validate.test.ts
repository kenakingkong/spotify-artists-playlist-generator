import { urisToQueryString } from "@/lib/spotify/validate";

describe("/unit/lib/spotify/validate: urisToQueryString", () => {
  it("converts an array of URIs into a Spotify query string", () => {
    const uris = ["spotify:track:1", "spotify:track:2"];
    const result = urisToQueryString(uris);
    expect(result).toBe("spotify:track:1,spotify:track:2");
  });

  it("returns empty string for empty array", () => {
    expect(urisToQueryString([])).toBe("");
  });
});

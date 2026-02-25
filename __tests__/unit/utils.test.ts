import generatePlaylistName from "@/utils/generatePlaylistName";
import generateRandomString from "@/utils/generateRandomString";

describe("unit/utils tests", () => {
  it("generateRandomString returns a base64 String", () => {
    const result = generateRandomString();
    expect(typeof result).toBe("string");
    expect(result.length).toBe(64);
  });

  it("generatePlaylistName returns name", () => {
    const result = generatePlaylistName(["Artist 1", "Artist 2", "Artist 3"]);
    expect(typeof result).toBe("string");
    expect(result).toBe("Artist 1, Artist 2, Artist 3");
  });

  it("generatePlaylistName returns truncated name", () => {
    const result = generatePlaylistName([
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "Artist 4",
      "Artist 5",
      "Artist 6",
      "Artist 7",
      "Artist 8",
      "Artist 9",
      "Artist 10",
      "Artist 11",
      "Artist 12",
    ]);
    expect(typeof result).toBe("string");
    expect(result).toBe(
      "Artist 1, Artist 2, Artist 3, Artist 4, Artist 5, Artist 6, Artist 7, Artist 8, Artist 9 and more",
    );
  });
});

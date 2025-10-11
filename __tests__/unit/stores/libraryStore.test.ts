import { LibraryStore } from "@/stores/libraryStore";
import { IArtist } from "@/types/artist";
import { ITrack } from "@/types/track";
import { mockArtists, mockTracks } from "./config";

describe("LibraryStore", () => {
  let store: LibraryStore;

  beforeEach(() => {
    store = new LibraryStore();
  });

  describe("addArtist", () => {
    const artist = mockArtists[0];

    it("adds an artist to the store", () => {
      store.addArtist(artist);

      expect(store.artists.size).toBe(1);
      expect(store.artists.get(artist.id)).toEqual(artist);
    });

    it("does not add duplicate artists", () => {
      store.addArtist(artist);
      store.addArtist(artist);

      expect(store.artists.size).toBe(1);
    });

    it("warns and skips artist without ID", () => {
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
      const artist = { name: "No ID Artist" } as IArtist;

      store.addArtist(artist);

      expect(store.artists.size).toBe(0);
      expect(consoleWarnSpy).toHaveBeenCalledWith("Artist missing ID", artist);

      consoleWarnSpy.mockRestore();
    });
  });

  describe("addTrack", () => {
    const track = mockTracks[0];

    it("adds a track to the store", () => {
      store.addTrack(track);

      expect(store.tracks.size).toBe(1);
      expect(store.tracks.get(track.id)).toEqual(track);
    });

    it("does not add duplicate tracks", () => {
      store.addTrack(track);
      store.addTrack(track);

      expect(store.tracks.size).toBe(1);
    });

    it("warns and skips track without ID", () => {
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
      const track = { name: "No ID Track" } as ITrack;

      store.addTrack(track);

      expect(store.tracks.size).toBe(0);
      expect(consoleWarnSpy).toHaveBeenCalledWith("Track missing ID", track);

      consoleWarnSpy.mockRestore();
    });
  });

  describe("addArtists", () => {
    it("adds multiple artists to the store", () => {
      store.addArtists(mockArtists);

      expect(store.artists.size).toBe(mockArtists.length);
      expect(store.artists.get("artist1")).toEqual(mockArtists[0]);
      expect(store.artists.get("artist2")).toEqual(mockArtists[1]);
      expect(store.artists.get("artist3")).toEqual(mockArtists[2]);
    });

    it("handles empty array", () => {
      store.addArtists([]);
      expect(store.artists.size).toBe(0);
    });
  });

  describe("addTracks", () => {
    it("adds multiple tracks to the store", () => {
      store.addTracks(mockTracks);

      expect(store.tracks.size).toBe(mockTracks.length);
      expect(store.tracks.get("track1")).toEqual(mockTracks[0]);
      expect(store.tracks.get("track2")).toEqual(mockTracks[1]);
      expect(store.tracks.get("track3")).toEqual(mockTracks[2]);
    });
  });

  describe("getArtistById", () => {
    it("returns artist by ID", () => {
      const artist = mockArtists[0];
      store.addArtist(artist);

      expect(store.getArtistById("artist1")).toEqual(artist);
    });

    it("returns undefined for non-existent ID", () => {
      expect(store.getArtistById("nonexistent")).toBeUndefined();
    });
  });

  describe("getTrackById", () => {
    it("returns track by ID", () => {
      const track = mockTracks[0];
      store.addTrack(track);

      expect(store.getTrackById("track1")).toEqual(track);
    });

    it("returns undefined for non-existent ID", () => {
      expect(store.getTrackById("nonexistent")).toBeUndefined();
    });
  });

  describe("removeArtistById", () => {
    it("removes artist by ID", () => {
      const artist = mockArtists[0];

      store.addArtist(artist);
      expect(store.artists.size).toBe(1);

      store.removeArtistById("artist1");
      expect(store.artists.size).toBe(0);
    });
  });

  describe("removeTrackById", () => {
    it("removes track by ID", () => {
      const track = mockTracks[0];

      store.addTrack(track);
      expect(store.tracks.size).toBe(1);

      store.removeTrackById("track1");
      expect(store.tracks.size).toBe(0);
    });
  });

  describe("removeAllArtists", () => {
    it("removes all artists", () => {
      store.addArtists(mockArtists);
      expect(store.artists.size).toBe(mockArtists.length);

      store.removeAllArtists();
      expect(store.artists.size).toBe(0);
    });
  });

  describe("removeAllTracks", () => {
    it("removes all tracks", () => {
      store.addTracks(mockTracks);
      expect(store.tracks.size).toBe(mockTracks.length);

      store.removeAllTracks();
      expect(store.tracks.size).toBe(0);
    });
  });

  describe("searchArtistsByName", () => {
    beforeEach(() => {
      store.addArtists(mockArtists);
    });

    it("finds artists by name (case insensitive)", () => {
      const results = store.searchArtistsByName("beatles");
      expect(results).toHaveLength(2);
      expect(results.map((a) => a.name)).toContain("The Beatles");
      expect(results.map((a) => a.name)).toContain("Beatles Tribute Band");
    });

    it("returns empty array when no matches", () => {
      const results = store.searchArtistsByName("nonexistent");
      expect(results).toHaveLength(0);
    });

    it("handles partial matches", () => {
      const results = store.searchArtistsByName("roll");
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe("Rolling Stones");
    });
  });

  describe("searchTracksByName", () => {
    beforeEach(() => {
      store.addTracks(mockTracks);
    });

    it("finds tracks by name (case insensitive)", () => {
      const results = store.searchTracksByName("yesterday");
      expect(results).toHaveLength(2);
      expect(results.map((t) => t.name)).toContain("Yesterday");
      expect(results.map((t) => t.name)).toContain("Yesterday Once More");
    });

    it("returns empty array when no matches", () => {
      const results = store.searchTracksByName("nonexistent");
      expect(results).toHaveLength(0);
    });

    it("handles partial matches", () => {
      const results = store.searchTracksByName("tomor");
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe("Tomorrow");
    });
  });

  describe("getArtistNamesFromTrackIds", () => {
    beforeEach(() => {
      store.addTracks(mockTracks);
    });

    it("returns artist names from track IDs with default limit", () => {
      const names = store.getArtistNamesFromTrackIds(["track1", "track3"]);
      expect(names).toHaveLength(3);
      expect(names).toContain(mockArtists[0].name);
      expect(names).toContain(mockArtists[1].name);
      expect(names).toContain(mockArtists[2].name);
    });

    it("respects the limit parameter", () => {
      const names = store.getArtistNamesFromTrackIds(
        ["track1", "track2", "track3"],
        2
      );
      expect(names.length).toBeLessThanOrEqual(2);
    });

    it("handles non-existent track IDs", () => {
      const names = store.getArtistNamesFromTrackIds(["nonexistent"]);
      expect(names).toHaveLength(0);
    });

    it("returns unique artist names", () => {
      const names = store.getArtistNamesFromTrackIds(["track1", "track2"]);
      expect(names).toHaveLength(2);
      expect(names).toContain(mockArtists[0].name);
      expect(names).toContain(mockArtists[1].name);
    });

    it("handles tracks without artists", () => {
      const names = store.getArtistNamesFromTrackIds(["track4"]);
      expect(names).toHaveLength(0);
    });
  });

  describe("clear", () => {
    it("clears both artists and tracks", () => {
      store.addArtists(mockArtists);
      store.addTracks(mockTracks);

      expect(store.artists.size).toBe(mockArtists.length);
      expect(store.tracks.size).toBe(mockTracks.length);

      store.clear();

      expect(store.artists.size).toBe(0);
      expect(store.tracks.size).toBe(0);
    });
  });
});

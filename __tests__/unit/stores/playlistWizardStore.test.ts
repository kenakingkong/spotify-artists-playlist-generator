import { PlaylistWizardStore } from "@/stores/playlistWizardStore";
import { LibraryStore } from "@/stores/libraryStore";
import { ITrack } from "@/types/track";
import { mockArtists, mockTracks } from "./config";

describe("PlaylistWizardStore", () => {
  let playlistWizardStore: PlaylistWizardStore;
  let libraryStore: LibraryStore;

  beforeEach(() => {
    libraryStore = new LibraryStore();
    playlistWizardStore = new PlaylistWizardStore(libraryStore);
  });

  describe("initialization", () => {
    it("should initialize with empty artist and track sets", () => {
      expect(playlistWizardStore.artistIds.size).toBe(0);
      expect(playlistWizardStore.trackIds.size).toBe(0);
    });

    it("should initialize with currStep set to 0", () => {
      expect(playlistWizardStore.currStep).toBe(0);
    });
  });

  describe("selectArtistId", () => {
    it("should add an artist ID to the set", () => {
      playlistWizardStore.selectArtistId("artist1");

      expect(playlistWizardStore.artistIds.has("artist1")).toBe(true);
      expect(playlistWizardStore.artistIds.size).toBe(1);
    });

    it("should not add duplicate artist IDs", () => {
      playlistWizardStore.selectArtistId("artist1");
      playlistWizardStore.selectArtistId("artist1");

      expect(playlistWizardStore.artistIds.size).toBe(1);
    });

    it("should add multiple unique artist IDs", () => {
      playlistWizardStore.selectArtistId("artist1");
      playlistWizardStore.selectArtistId("artist2");
      playlistWizardStore.selectArtistId("artist3");

      expect(playlistWizardStore.artistIds.size).toBe(3);
    });
  });

  describe("selectTrackId", () => {
    it("should add a track ID to the set", () => {
      playlistWizardStore.selectTrackId("track1");

      expect(playlistWizardStore.trackIds.has("track1")).toBe(true);
      expect(playlistWizardStore.trackIds.size).toBe(1);
    });

    it("should not add duplicate track IDs", () => {
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track1");

      expect(playlistWizardStore.trackIds.size).toBe(1);
    });

    it("should add multiple unique track IDs", () => {
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track2");
      playlistWizardStore.selectTrackId("track3");

      expect(playlistWizardStore.trackIds.size).toBe(3);
    });
  });

  describe("getSelectedArtistIds", () => {
    it("should return empty set when no artists are selected", () => {
      const artistIds = playlistWizardStore.getSelectedArtistIds();

      expect(artistIds.size).toBe(0);
    });

    it("should return the set of selected artist IDs", () => {
      playlistWizardStore.selectArtistId("artist1");
      playlistWizardStore.selectArtistId("artist2");

      const artistIds = playlistWizardStore.getSelectedArtistIds();

      expect(artistIds.size).toBe(2);
      expect(artistIds.has("artist1")).toBe(true);
      expect(artistIds.has("artist2")).toBe(true);
    });
  });

  describe("getSelectedTrackIds", () => {
    it("should return empty set when no tracks are selected", () => {
      const trackIds = playlistWizardStore.getSelectedTrackIds();

      expect(trackIds.size).toBe(0);
    });

    it("should return the set of selected track IDs", () => {
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track2");

      const trackIds = playlistWizardStore.getSelectedTrackIds();

      expect(trackIds.size).toBe(2);
      expect(trackIds.has("track1")).toBe(true);
      expect(trackIds.has("track2")).toBe(true);
    });
  });

  describe("removeArtistId", () => {
    it("should remove an artist ID from the set", () => {
      playlistWizardStore.selectArtistId("artist1");
      playlistWizardStore.selectArtistId("artist2");
      playlistWizardStore.removeArtistId("artist1");

      expect(playlistWizardStore.artistIds.has("artist1")).toBe(false);
      expect(playlistWizardStore.artistIds.size).toBe(1);
    });

    it("should handle removing non-existent artist ID gracefully", () => {
      playlistWizardStore.selectArtistId("artist1");
      playlistWizardStore.removeArtistId("artist2");

      expect(playlistWizardStore.artistIds.size).toBe(1);
      expect(playlistWizardStore.artistIds.has("artist1")).toBe(true);
    });
  });

  describe("removeTrackId", () => {
    it("should remove a track ID from the set", () => {
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track2");
      playlistWizardStore.removeTrackId("track1");

      expect(playlistWizardStore.trackIds.has("track1")).toBe(false);
      expect(playlistWizardStore.trackIds.size).toBe(1);
    });

    it("should handle removing non-existent track ID gracefully", () => {
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.removeTrackId("track2");

      expect(playlistWizardStore.trackIds.size).toBe(1);
      expect(playlistWizardStore.trackIds.has("track1")).toBe(true);
    });
  });

  describe("removeAllArtistIds", () => {
    it("should clear all artist IDs", () => {
      playlistWizardStore.selectArtistId("artist1");
      playlistWizardStore.selectArtistId("artist2");
      playlistWizardStore.selectArtistId("artist3");
      playlistWizardStore.removeAllArtistIds();

      expect(playlistWizardStore.artistIds.size).toBe(0);
    });

    it("should handle clearing empty artist IDs set", () => {
      playlistWizardStore.removeAllArtistIds();

      expect(playlistWizardStore.artistIds.size).toBe(0);
    });
  });

  describe("removeAllTrackIds", () => {
    it("should clear all track IDs", () => {
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track2");
      playlistWizardStore.selectTrackId("track3");
      playlistWizardStore.removeAllTrackIds();

      expect(playlistWizardStore.trackIds.size).toBe(0);
    });

    it("should handle clearing empty track IDs set", () => {
      playlistWizardStore.removeAllTrackIds();

      expect(playlistWizardStore.trackIds.size).toBe(0);
    });
  });

  describe("canProceed", () => {
    it("should return false at step 0 when no artists are selected", () => {
      expect(playlistWizardStore.canProceed()).toBe(false);
    });

    it("should return true at step 0 when at least one artist is selected", () => {
      playlistWizardStore.selectArtistId("artist1");

      expect(playlistWizardStore.canProceed()).toBe(true);
    });

    it("should return false at step 1 when no tracks are selected", () => {
      playlistWizardStore.currStep = 1;

      expect(playlistWizardStore.canProceed()).toBe(false);
    });

    it("should return true at step 1 when at least one track is selected", () => {
      playlistWizardStore.currStep = 1;
      playlistWizardStore.selectTrackId("track1");

      expect(playlistWizardStore.canProceed()).toBe(true);
    });

    it("should return true for steps beyond step 1", () => {
      playlistWizardStore.currStep = 2;

      expect(playlistWizardStore.canProceed()).toBe(true);

      playlistWizardStore.currStep = 3;

      expect(playlistWizardStore.canProceed()).toBe(true);
    });
  });

  describe("nextStep", () => {
    it("should increment step when canProceed returns true", () => {
      playlistWizardStore.selectArtistId("artist1");
      playlistWizardStore.nextStep();

      expect(playlistWizardStore.currStep).toBe(1);
    });

    it("should not increment step when canProceed returns false", () => {
      playlistWizardStore.nextStep();

      expect(playlistWizardStore.currStep).toBe(0);
    });

    it("should allow multiple step increments", () => {
      playlistWizardStore.selectArtistId("artist1");
      playlistWizardStore.nextStep();

      expect(playlistWizardStore.currStep).toBe(1);

      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.nextStep();

      expect(playlistWizardStore.currStep).toBe(2);

      playlistWizardStore.nextStep();

      expect(playlistWizardStore.currStep).toBe(3);
    });
  });

  describe("reset", () => {
    it("should clear all artist IDs, track IDs and reset step to 0", () => {
      playlistWizardStore.selectArtistId("artist1");
      playlistWizardStore.selectArtistId("artist2");
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track2");
      playlistWizardStore.currStep = 2;

      playlistWizardStore.reset();

      expect(playlistWizardStore.artistIds.size).toBe(0);
      expect(playlistWizardStore.trackIds.size).toBe(0);
      expect(playlistWizardStore.currStep).toBe(0);
    });

    it("should work on already empty store", () => {
      playlistWizardStore.reset();

      expect(playlistWizardStore.artistIds.size).toBe(0);
      expect(playlistWizardStore.trackIds.size).toBe(0);
      expect(playlistWizardStore.currStep).toBe(0);
    });
  });

  describe("getFirstAristNamesAsStr", () => {
    beforeEach(() => {
      mockTracks.forEach((track) => libraryStore.addTrack(track));
    });

    it("should return empty string when no tracks are selected", () => {
      const result = playlistWizardStore.getFirstAristNamesAsStr();

      expect(result).toBe("");
    });

    it("should return artist names from selected tracks as comma-separated string", () => {
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track2");

      const result = playlistWizardStore.getFirstAristNamesAsStr();

      expect(result).toContain("The Beatles");
      expect(result).toContain("Beatles Tribute Band");
    });

    it("should respect the default limit of 4 artists", () => {
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track2");
      playlistWizardStore.selectTrackId("track3");

      const result = playlistWizardStore.getFirstAristNamesAsStr();
      const artistNames = result.split(", ");

      expect(artistNames.length).toBeLessThanOrEqual(4);
    });

    it("should respect custom limit parameter", () => {
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track2");

      const result = playlistWizardStore.getFirstAristNamesAsStr(2);
      const artistNames = result.split(", ");

      expect(artistNames.length).toBeLessThanOrEqual(2);
    });

    it("should handle tracks not found in library store", () => {
      playlistWizardStore.selectTrackId("nonexistent-track");
      const result = playlistWizardStore.getFirstAristNamesAsStr();

      expect(result).toBe("");
    });

    it("should return unique artist names", () => {
      const trackWithDuplicateArtist: ITrack = {
        id: "track4",
        uri: "spotify:track:4",
        name: "Song Four",
        href: "https://api.spotify.com/v1/tracks/4",
        preview_url: "https://preview.com/4",
        type: "track",
        artists: [mockArtists[0]], // The Beatles
      };

      libraryStore.addTrack(trackWithDuplicateArtist);
      playlistWizardStore.selectTrackId("track1");
      playlistWizardStore.selectTrackId("track4");

      const result = playlistWizardStore.getFirstAristNamesAsStr();
      const artistNames = result.split(", ");
      const uniqueNames = new Set(artistNames);

      expect(uniqueNames.size).toBe(artistNames.length);
    });
  });
});

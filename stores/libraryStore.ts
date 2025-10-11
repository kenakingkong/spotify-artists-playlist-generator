import { IArtist } from "@/types/artist";
import { ITrack } from "@/types/track";
import { makeAutoObservable } from "mobx";

export class LibraryStore {
  artists = new Map<string, IArtist>();
  tracks = new Map<string, ITrack>();

  constructor() {
    makeAutoObservable(this);
  }

  addArtist(data: IArtist) {
    if (!data.id) {
      console.warn("Artist missing ID", data);
      return;
    }

    this.artists.set(data.id, data);
  }

  addTrack(data: ITrack) {
    if (!data.id) {
      console.warn("Track missing ID", data);
      return;
    }

    this.tracks.set(data.id, data);
  }

  addArtists(lst: Array<IArtist>) {
    lst.forEach((data) => this.addArtist(data));
  }

  addTracks(lst: Array<ITrack>) {
    lst.forEach((data) => this.addTrack(data));
  }

  getArtistById(id: string) {
    return this.artists.get(id);
  }

  getTrackById(id: string) {
    return this.tracks.get(id);
  }

  removeArtistById(id: string) {
    this.artists.delete(id);
  }

  removeTrackById(id: string) {
    this.tracks.delete(id);
  }

  removeAllArtists() {
    this.artists.clear();
  }

  removeAllTracks() {
    this.tracks.clear();
  }

  searchArtistsByName(query: string) {
    let matchStr = query.toLowerCase();

    return Array.from(this.artists.values()).filter((artist) =>
      artist.name.toLowerCase().includes(matchStr)
    );
  }

  searchTracksByName(query: string) {
    let matchStr = query.toLowerCase();

    return Array.from(this.tracks.values()).filter((track) =>
      track.name.toLowerCase().includes(matchStr)
    );
  }

  getArtistNamesFromTrackIds(trackIds: Array<string>, limit = 3) {
    let count = 0;
    const artistNames = new Set<string>();

    for (const trackId of trackIds) {
      if (count >= limit) break;

      const track = this.getTrackById(trackId);

      if (track?.artists) {
        track.artists.forEach((artist) => {
          if (artist.name) {
            artistNames.add(artist.name);
            count++; // mak todo: doesnt check for uniq!
          }
        });
      }
    }

    return Array.from(artistNames);
  }

  clear() {
    this.removeAllArtists();
    this.removeAllTracks();
  }
}

export const libraryStore = new LibraryStore();

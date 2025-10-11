import { makeAutoObservable } from "mobx";
import { LibraryStore } from "./libraryStore";

export class PlaylistWizardStore {
  artistIds = new Set<string>();
  trackIds = new Set<string>();

  currStep = 0;

  constructor(private libraryStore: LibraryStore) {
    makeAutoObservable(this);
  }

  nextStep() {
    if (this.canProceed()) this.currStep++;
  }

  canProceed() {
    switch (this.currStep) {
      case 0:
        return this.artistIds.size > 0;
      case 1:
        return this.trackIds.size > 0;
      default:
        return true;
    }
  }

  selectArtistId(id: string) {
    this.artistIds.add(id);
  }

  selectTrackId(id: string) {
    this.trackIds.add(id);
  }

  getSelectedArtistIds() {
    return this.artistIds;
  }

  getSelectedTrackIds() {
    return this.trackIds;
  }

  removeArtistId(id: string) {
    this.artistIds.delete(id);
  }

  removeTrackId(id: string) {
    this.trackIds.delete(id);
  }

  removeAllArtistIds() {
    this.artistIds.clear();
  }

  removeAllTrackIds() {
    this.trackIds.clear();
  }

  reset() {
    this.removeAllArtistIds();
    this.removeAllTrackIds();
    this.currStep = 0;
  }

  getFirstAristNamesAsStr(limit = 4) {
    const trackIdsList = Array.from(this.trackIds);
    const names = this.libraryStore.getArtistNamesFromTrackIds(trackIdsList);
    return names.join(", ");

    // mak todo: x, y, z => z, y and z
  }
}

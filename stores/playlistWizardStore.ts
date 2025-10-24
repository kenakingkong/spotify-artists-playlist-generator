import { makeAutoObservable } from "mobx";
import { LibraryStore } from "./libraryStore";

export class PlaylistWizardStore {
  artistIds = new Set<string>();
  trackIds = new Set<string>();

  currStep = 2;

  constructor(private libraryStore: LibraryStore) {
    makeAutoObservable(this);
  }

  nextStep(stepNo?: number) {
    let nextStepNo =  stepNo ?? this.currStep + 1;
    
    if (this.canProceedToStep(nextStepNo)) {
      this.currStep = nextStepNo;
    }
  }

  canProceedToStep(stepNo?: number) {
    switch (stepNo) {
      case 0:
        return true;
      case 1:
        return true // return this.artistIds.size > 0;
      case 2:
        return true // return this.artistIds.size > 0 && this.trackIds.size > 0;
      default:
        return false;
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

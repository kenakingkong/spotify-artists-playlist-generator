import { StepArtists, StepPlaylist, StepTracks } from "./steps";

export interface IStep {
  index: number;
  id: string;
  shortLabel: string;
  longLabel: string;
}

export interface ISteps {
  [id: string]: IStep;
}

export const STEPS: ISteps = {
  "0": {
    index: 0,
    id: "ARTISTS",
    shortLabel: "Artists",
    longLabel: "Choose artists",
  },
  "1": {
    index: 1,
    id: "SONGS",
    shortLabel: "Songs",
    longLabel: "Choose songs",
  },
  "2": {
    index: 2,
    id: "PLAYLIST",
    shortLabel: "Playlist",
    longLabel: "Create Playlist",
  },
};

export const STEP_COMPONENTS = {
  "0": StepArtists,
  "1": StepTracks,
  "2": StepPlaylist,
};

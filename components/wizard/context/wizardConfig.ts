import { StepArtists, StepLogin, StepPlaylist, StepSongs } from "../steps";

export interface IStep {
  index: number;
  id: string;
  prev: string | null;
  next: string | null;
  shortLabel: string;
  longLabel: string;
}

export interface ISteps {
  [id: string]: IStep;
}

export const STEPS: ISteps = {
  LOGIN: {
    index: 0,
    id: "LOGIN",
    prev: null,
    next: "ARTISTS",
    shortLabel: "Login",
    longLabel: "Login to Spotify",
  },
  ARTISTS: {
    index: 1,
    id: "ARTISTS",
    prev: null,
    next: "SONGS",
    shortLabel: "Artists",
    longLabel: "Choose artists",
  },
  SONGS: {
    index: 2,
    id: "SONGS",
    prev: "ARTISTS",
    next: "PLAYLIST",
    shortLabel: "Songs",
    longLabel: "Choose songs",
  },
  PLAYLIST: {
    index: 3,
    id: "PLAYLIST",
    prev: "SONGS",
    next: null,
    shortLabel: "Playlist",
    longLabel: "Create Playlist",
  },
};

import { IArtist } from "@/types/artist";

export interface IStep {
  index: number;
  id: string;
  shortLabel: string;
  longLabel: string;
}

export interface ISteps {
  [id: string]: IStep;
}

export interface ICreatorContextProps {
  playlistUri: string | null;
  artists: IArtist[];
  reset: () => void;
  selectArtist: (artist: IArtist) => void;
  deselectArtist: (artistId: string) => void;
  toggleArtist: (artist: IArtist) => void;
  generatePlaylist: (
    onSuccess?: () => void,
    onError?: (error: Error) => void,
  ) => void;
}

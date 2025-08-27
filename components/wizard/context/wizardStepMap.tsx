import { StepArtists, StepLogin, StepPlaylist, StepSongs } from "../steps";
import { STEPS } from "./wizardConfig";

export const STEP_COMPONENTS: Record<string, React.FC> = {
  [STEPS.LOGIN.id]: StepLogin,
  [STEPS.ARTISTS.id]: StepArtists,
  [STEPS.SONGS.id]: StepSongs,
  [STEPS.PLAYLIST.id]: StepPlaylist,
};

import { useAuth } from "@/contexts/AuthContext";
import { CreatorContextProvider } from "./context";
import StepArtists from "./shared/StepArtists";
import StepPlaylist from "./shared/StepPlaylist";

export default function Creator() {
  const { user } = useAuth();

  if (!user?.id) return null;

  return (
    <CreatorContextProvider>
      <StepArtists />
      <StepPlaylist />
    </CreatorContextProvider>
  );
}

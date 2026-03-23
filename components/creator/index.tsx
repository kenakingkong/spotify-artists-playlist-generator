import { useAuth } from "@/contexts/AuthContext";
import { CreatorContextProvider } from "./context";
import StepArtists from "./shared/StepArtists";
import StepPlaylist from "./shared/StepPlaylist";
import { useState } from "react";

export default function Creator() {
  const { user } = useAuth();

  const [resetCount, setResetCount] = useState<number>(0);
  const key = `creator-${resetCount}`;

  if (!user?.id) return null;

  return (
    <CreatorContextProvider onReset={() => setResetCount((c) => c + 1)}>
      <StepArtists key={`${key}-step-artists`} />
      <StepPlaylist />
    </CreatorContextProvider>
  );
}

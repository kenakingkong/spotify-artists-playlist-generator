import { LibraryStore } from "@/stores/libraryStore";
import { PlaylistWizardStore } from "@/stores/playlistWizardStore";
import { createContext, ReactNode, useContext } from "react";

const PlaylistWizardContext = createContext<PlaylistWizardStore | null>(null);

export function PlaylistWizardContextProvider({
  library,
  children,
}: {
  library: LibraryStore;
  children: ReactNode;
}) {
  const store = new PlaylistWizardStore(library);

  return (
    <PlaylistWizardContext.Provider value={store}>
      {children}
    </PlaylistWizardContext.Provider>
  );
}

export function usePlaylistWizard() {
  return useContext(PlaylistWizardContext);
}

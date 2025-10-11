import { LibraryStore } from "@/stores/libraryStore";
import { PlaylistWizardStore } from "@/stores/playlistWizardStore";
import { createContext, ReactNode, useContext } from "react";

const WizardContext = createContext<PlaylistWizardStore | null>(null);

export function WizardContextProvider({
  library,
  children,
}: {
  library: LibraryStore;
  children: ReactNode;
}) {
  const store = new PlaylistWizardStore(library);
  return (
    <WizardContext.Provider value={store}>{children}</WizardContext.Provider>
  );
}

export function useWizardContext() {
  return useContext(WizardContext);
}

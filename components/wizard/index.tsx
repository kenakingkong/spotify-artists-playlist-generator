import { libraryStore } from "@/stores/libraryStore";
import { WizardContextProvider } from "./context";

export default function Wizard() {
  return (
    <WizardContextProvider library={libraryStore}>
      <Wizard />
    </WizardContextProvider>
  );
}

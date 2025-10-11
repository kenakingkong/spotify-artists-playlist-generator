import { libraryStore } from "@/stores/libraryStore";
import { WizardContextProvider } from "./context";
import WizardComponent from "./WizardComponent";

export default function Wizard() {
  return (
    <WizardContextProvider library={libraryStore}>
      <WizardComponent />
    </WizardContextProvider>
  );
}

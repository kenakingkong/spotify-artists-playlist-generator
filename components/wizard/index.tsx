import { WizardContextProvider } from "./context";
import WizardComponent from "./WizardComponent";

export default function Wizard() {
  return (
    <WizardContextProvider>
      <WizardComponent />
    </WizardContextProvider>
  );
}

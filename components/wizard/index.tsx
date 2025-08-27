import { WizardContextProvider } from "./context";
import WizardComponent from "./WizardComponent";
import WizardFooter from "./WizardFooter";
import WizardHeader from "./WizardHeader";

export default function Wizard() {
  return (
    <WizardContextProvider>
      <WizardHeader />
      <WizardComponent />
      <WizardFooter />
    </WizardContextProvider>
  );
}

import { ReactNode } from "react";
import WizardHeader from "./WizardHeader";
import WizardFooter from "./WizardFooter";

export default function WizardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <WizardHeader />
      {children}
      <WizardFooter />
    </>
  );
}

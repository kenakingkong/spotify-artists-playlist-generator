import { createContext, ReactNode, useContext, useState } from "react";
import { STEPS } from "./wizardConfig";

interface IWizardContextProps {
  step: String;
  hasNextStep: () => boolean;
  nextStep: () => void;
  forceStep: (s: string) => void;
}

const WizardContext = createContext<IWizardContextProps>({
  step: "",
  hasNextStep: () => false,
  nextStep: () => {},
  forceStep: () => {},
});

export default function useWizardContext() {
  return useContext(WizardContext);
}

export function WizardContextProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<string>(STEPS.SIGNIN.id);

  const hasNextStep = () => !!STEPS[step].next;
  const nextStep = () => setStep((prev) => STEPS[prev].next || prev);
  const forceStep = (s: string) => STEPS[s] && setStep(s);

  return (
    <WizardContext.Provider
      value={{
        step,
        hasNextStep,
        nextStep,
        forceStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

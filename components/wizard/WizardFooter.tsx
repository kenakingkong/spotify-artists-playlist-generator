import { useWizardContext } from "./context";

export default function WizardFooter() {
  const { hasNextStep, nextStep } = useWizardContext();

  if (!hasNextStep()) return null;

  return (
    <nav className="py-4">
      <button onClick={nextStep}>Next</button>
    </nav>
  );
}

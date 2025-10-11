import { useWizardContext } from "./context";

export default function WizardFooter() {
  const store = useWizardContext();

  if (!store?.canProceedToStep()) return null;

  return (
    <nav className="py-4">
      <button onClick={() => store.nextStep()}>Next</button>
    </nav>
  );
}

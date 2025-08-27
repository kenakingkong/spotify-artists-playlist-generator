import SignInButton from "@/components/auth/SignInButton";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useWizardContext } from "../context";

export default function StepSignIn() {
  const { nextStep } = useWizardContext();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) nextStep();
  }, [isLoggedIn, nextStep]);

  return (
    <div>
      <p>SignIn</p>
      <SignInButton />
    </div>
  );
}

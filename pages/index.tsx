import SignInButton from "@/components/auth/SignInButton";
import Wizard from "@/components/wizard";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <SignInButton />;
  return <Wizard />;
}

import SignInButton from "@/components/auth/SignInButton";
import Creator from "@/components/creator";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <SignInButton />;
  return <Creator />;
}

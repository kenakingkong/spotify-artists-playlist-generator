import { useRouter } from "next/router";
import { useEffect } from "react";

import SignInButton from "@/components/auth/SignInButton";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated, router]);

  return <SignInButton />;
}

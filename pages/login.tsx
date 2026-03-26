import Head from "next/head";
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

  return (
    <>
      <Head>
        <title>Sign In | Setlists</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SignInButton />
    </>
  );
}

import Head from "next/head";
import SignOutButton from "@/components/auth/SignOutButton";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function tryLogout() {
      try {
        await logout();
        if (isMounted) router.push("/");
      } catch (err) {
        console.error(err);
      }
    }

    tryLogout();

    return () => {
      isMounted = false;
    };
  }, [router, logout]);

  return (
    <>
      <Head>
        <title>Sign Out | Setlists</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SignOutButton />
    </>
  );
}

import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href="/api/auth/login" className="block whitespace-nowrap w-max button">
      Sign in with Spotify
    </Link>
  );
}

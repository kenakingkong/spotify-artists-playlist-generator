/* eslint-disable @next/next/no-html-link-for-pages */
export default function SignInButton() {
  return (
    <a
      href="/api/auth/login"
      className="block w-full min-w-[300px] button button-spotify whitespace-nowrap"
    >
      Sign in with Spotify
    </a>
  );
}

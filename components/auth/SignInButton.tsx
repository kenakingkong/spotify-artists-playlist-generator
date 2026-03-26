/* eslint-disable @next/next/no-html-link-for-pages */
export default function SignInButton() {
  return (
    <a
      href="/api/auth/login"
      className="block w-full min-w-[300px] button button-spotify whitespace-nowrap"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/spotify.svg" alt="" width={16} height={16} />
      Sign in with Spotify
    </a>
  );
}

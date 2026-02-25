/* eslint-disable @next/next/no-html-link-for-pages */
export default function SignOutButton() {
  return (
    <a href="/api/auth/logout" className="block whitespace-nowrap w-max text-[10px] hover:underline">
      Logout
    </a>
  );
}

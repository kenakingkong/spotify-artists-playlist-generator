/* eslint-disable @next/next/no-html-link-for-pages */
export default function SignOutButton() {
  return (
    <a
      href="/api/auth/logout"
      className="block whitespace-nowrap w-max text-app-gray text-[10px] hover:underline"
    >
      Logout
    </a>
  );
}

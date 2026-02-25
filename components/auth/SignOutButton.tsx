import Link from "next/link";

export default function SignOutButton() {
  return (
    <Link href="/api/auth/logout" className="block whitespace-nowrap w-max text-[10px] hover:underline">
      Logout
    </Link>
  );
}

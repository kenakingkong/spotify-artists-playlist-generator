import SignOutButton from "@/components/auth/SignOutButton";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function Header() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="space-y-4">
      <div className="flex justify-between gap-2">
        <p className="text-xs font-bold text-green-600">
          Spotify Artist Playlist Generator App idk
        </p>
        <p className="text-xs">
          Made by{" "}
          <a
            href="https://makenakong.com"
            target="_blank"
            className="underline hover:text-green-600"
          >
            Makena Kong
          </a>{" "}
          👩🏻‍💻
        </p>
      </div>
      {isAuthenticated && (
        <div>
          {user?.image ? (
            <div className="flex items-center gap-2">
              <Image
                src={user?.image?.url}
                alt={`${user?.displayName} avatar`}
                height={25}
                width={25}
                className="rounded-full"
              />
              <p className="grow text-sm">Hey {user?.displayName}!</p>
              <SignOutButton />
            </div>
          ) : (
            <div className="rounded-full bg-linear-to-r from-green-500 to-green-300 h-[30px] w-[30px] shrink-0 flex items-center justify-center">
              <p className="text-white font-medium uppercase">
                {user?.displayName[0]}
              </p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

import SignOutButton from "@/components/auth/SignOutButton";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex items-center justify-between gap-4">
      <div className="flex justify-between gap-2">
        <p className="text-xs">
          <span className="text-green-600 font-bold">Setlist maker</span> by{" "}
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
      {mounted && isAuthenticated && (
        <div className="flex items-center gap-1">
          {user?.image ? (
            <div className="flex items-center gap-2">
              <SignOutButton />
              <Image
                src={user?.image?.url}
                alt={`${user?.displayName} avatar`}
                height={25}
                width={25}
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="rounded-full bg-linear-to-r from-green-500 to-green-300 h-[25px] w-[25px] shrink-0 flex items-center justify-center">
              <p className="text-xs font-bold text-white font-medium uppercase">
                {user?.displayName[0]}
              </p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

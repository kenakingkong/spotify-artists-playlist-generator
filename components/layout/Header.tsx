import { useAuth } from "@/hooks/useAuth";
import SignOutButton from "../auth/SignOutButton";

export default function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      Spotify Artist Playlist Generator App IDK{" "}
      {isLoggedIn && <SignOutButton />}
    </nav>
  );
}

import { SPOTIFY_COOKIE } from "@/lib/spotify/config";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${SPOTIFY_COOKIE.LOGGED_IN}=`);
    setIsLoggedIn(parts.length === 2);
  }, []);

  return { isLoggedIn };
}

import { useEffect, useState } from "react";
import { SPOTIFY_COOKIES } from "@/lib/spotify/config";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${SPOTIFY_COOKIES.LOGGED_IN}=`);
    setIsLoggedIn(parts.length === 2);
  }, []);

  return { isLoggedIn };
}

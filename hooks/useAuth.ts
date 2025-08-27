import { SPOTIFY_LOGGED_IN_COOKIE_NAME } from "@/lib/spotifyConfig";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${SPOTIFY_LOGGED_IN_COOKIE_NAME}=`);
    setIsLoggedIn(parts.length === 2);
  }, []);

  return { isLoggedIn };
}

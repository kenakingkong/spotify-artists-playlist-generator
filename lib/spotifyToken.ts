import axios from "axios";
import { parse } from "cookie";
import { SPOTIFY_ENDPOINTS } from "./spotifyConfig";

const DEFAULT_EXPIRES_IN = 60 * 60 * 24 * 30;

export async function getSpotifyToken(req: any): Promise<string | null> {
  const cookies = parse(req.headers.cookie || "");
  let accessToken = cookies.spotify_access_token;

  if (!accessToken) {
    try {
      const refreshRes = await axios.get<{ access_token: string }>(
        SPOTIFY_ENDPOINTS.refresh,
        { headers: { cookie: req.headers.cookie } }
      );
      accessToken = refreshRes.data.access_token;
    } catch {
      return null;
    }
  }

  return accessToken;
}

export function getSpotifyCookieOptions(
  httpOnly: boolean = true,
  expires_in: number = DEFAULT_EXPIRES_IN
) {
  return {
    httpOnly: httpOnly,
    path: "/",
    maxAge: expires_in,
    sameSite: "lax" as any,
    secure: process.env.NODE_ENV === "production",
  };
}

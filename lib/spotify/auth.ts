import axios from "axios";
import { parse } from "cookie";
import { SPOTIFY_COOKIE, SPOTIFY_ENDPOINTS } from "./config";
import { NextApiRequest, NextApiResponse } from "next";

const DEFAULT_EXPIRES_IN = 300; //60 * 60 * 24 * 30;

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => void | Promise<void>;

export function withSpotifyAuth(handler: Handler): Handler {
  return async (req, res) => {
    try {
      const accessToken = await getSpotifyToken(req);
      if (!accessToken) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      return handler(req, res, accessToken);
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}

async function getSpotifyToken(req: NextApiRequest): Promise<string | null> {
  const cookies = parse(req.headers.cookie || "");
  let accessToken = cookies[SPOTIFY_COOKIE.ACCESS_TOKEN];

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

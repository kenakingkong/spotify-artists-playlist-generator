import axios from "axios";
import { parse } from "cookie";
import { SPOTIFY_COOKIES, SPOTIFY_AUTH_ENDPOINTS } from "./config";
import { NextApiRequest, NextApiResponse } from "next";
import { ERRORS } from "../errors";

const DEFAULT_EXPIRES_IN = 300; //60 * 60 * 24 * 30;

type THandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken?: string | null
) => void | Promise<void>;

export function withSpotifyAuth(handler: THandler): THandler {
  return async (req, res) => {
    try {
      const accessToken = await getSpotifyToken(req);
      if (!accessToken) {
        return res.status(401).json({ error: ERRORS.UNAUTHORIZED });
      }

      return handler(req, res, accessToken);
    } catch (err) {
      return res.status(401).json({ error: ERRORS.UNAUTHORIZED });
    }
  };
}

export async function getSpotifyToken(
  req: NextApiRequest
): Promise<string | null> {
  const cookies = parse(req.headers.cookie || "");
  let accessToken = cookies[SPOTIFY_COOKIES.ACCESS_TOKEN];

  if (!accessToken) {
    try {
      const refreshRes = await axios.get<{ access_token: string }>(
        SPOTIFY_AUTH_ENDPOINTS.refresh,
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

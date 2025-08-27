import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { parse, serialize } from "cookie";
import { SpotifyTokenResponse } from "../../../types/auth";
import {
  SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  SPOTIFY_ENDPOINTS,
} from "@/lib/spotifyConfig";
import { getSpotifyCookieOptions } from "@/lib/spotifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || "");
  const refresh_token = cookies.spotify_refresh_token;

  if (!refresh_token) {
    return res.status(401).json({ error: "No refresh token" });
  }

  try {
    const response = await axios.post<SpotifyTokenResponse>(
      SPOTIFY_ENDPOINTS.token,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, expires_in } = response.data;

    res.setHeader(
      "Set-Cookie",
      serialize(
        SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
        access_token,
        getSpotifyCookieOptions(true, expires_in)
      )
    );

    res.status(200).json({ access_token });
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to refresh token" });
  }
}

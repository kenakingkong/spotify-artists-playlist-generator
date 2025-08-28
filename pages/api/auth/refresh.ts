import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { parse, serialize } from "cookie";
import { SpotifyTokenResponse } from "../../../types/auth";
import { SPOTIFY_COOKIE, SPOTIFY_ENDPOINTS } from "@/lib/spotify/config";
import { getSpotifyCookieOptions } from "@/lib/spotify/auth";

const clientId = process.env.SPOTIFY_CLIENT_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || "");
  const refreshToken = cookies[SPOTIFY_COOKIE.REFRESH_TOKEN];

  if (!refreshToken) {
    return res.status(401).json({ error: "Missing refresh token" });
  }

  try {
    const payload = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId!,
    };

    const response = await axios.post<SpotifyTokenResponse>(
      SPOTIFY_ENDPOINTS.token,
      payload,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    res.setHeader("Set-Cookie", [
      serialize(
        SPOTIFY_COOKIE.ACCESS_TOKEN,
        access_token,
        getSpotifyCookieOptions(true, expires_in)
      ),
      serialize(
        SPOTIFY_COOKIE.REFRESH_TOKEN,
        refresh_token ?? "",
        getSpotifyCookieOptions(true)
      ),
      serialize(
        SPOTIFY_COOKIE.LOGGED_IN,
        "true",
        getSpotifyCookieOptions(false)
      ),
    ]);

    res.status(200).json({ access_token });
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to refresh token" });
  }
}

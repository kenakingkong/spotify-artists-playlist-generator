import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { parse, serialize } from "cookie";

import { ERRORS } from "@/lib/errors";
import { SPOTIFY_COOKIES, SPOTIFY_AUTH_ENDPOINTS } from "@/lib/spotify/config";
import { getSpotifyCookieOptions } from "@/lib/spotify/auth";
import { SpotifyTokenResponse } from "@/types/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const cookies = parse(req.headers.cookie || "");

  const refreshToken = cookies[SPOTIFY_COOKIES.REFRESH_TOKEN];

  if (!clientId) {
    throw new Error(ERRORS.MISSING_CREDENTIALS);
  }

  if (!refreshToken) {
    return res.status(401).json({ error: ERRORS.MISSING_REFRESH_TOKEN });
  }

  const headers = { "Content-Type": "application/x-www-form-urlencoded" };

  const payload = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId!,
  };

  try {
    const response = await axios.post<SpotifyTokenResponse>(
      SPOTIFY_AUTH_ENDPOINTS.token,
      payload,
      { headers }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    res.setHeader("Set-Cookie", [
      serialize(
        SPOTIFY_COOKIES.ACCESS_TOKEN,
        access_token,
        getSpotifyCookieOptions(true, expires_in)
      ),
      serialize(
        SPOTIFY_COOKIES.REFRESH_TOKEN,
        refresh_token ?? "",
        getSpotifyCookieOptions(true)
      ),
      serialize(
        SPOTIFY_COOKIES.LOGGED_IN,
        "true",
        getSpotifyCookieOptions(false)
      ),
    ]);

    res.status(200).json({ access_token });
  } catch (err: any) {
    res.status(500).json({ error: ERRORS.FAILED_REFRESH });
  }
}

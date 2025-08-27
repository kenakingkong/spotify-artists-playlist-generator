import {
  SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  SPOTIFY_ENDPOINTS,
  SPOTIFY_LOGGED_IN_COOKIE_NAME,
  SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/spotifyConfig";
import { getSpotifyCookieOptions } from "@/lib/spotifyToken";
import { SpotifyTokenResponse } from "@/types/auth";
import axios from "axios";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, error } = req.query;

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirectUri = SPOTIFY_ENDPOINTS.callback;

  try {
    if (!clientId || !clientSecret) {
      throw new Error("Missing Spotify client credentials");
    }

    if (error === "access_denied") {
      return res.redirect("/");
    }

    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    const response = await axios.post<SpotifyTokenResponse>(
      SPOTIFY_ENDPOINTS.token,
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    res.setHeader("Set-Cookie", [
      serialize(
        SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
        access_token,
        getSpotifyCookieOptions(true, expires_in)
      ),
      serialize(
        SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
        refresh_token ?? "",
        getSpotifyCookieOptions(true)
      ),
      serialize(
        SPOTIFY_LOGGED_IN_COOKIE_NAME,
        "true",
        getSpotifyCookieOptions(false)
      ),
    ]);

    res.redirect("/");
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Authentication failed");
  }
}

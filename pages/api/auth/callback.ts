import { SPOTIFY_COOKIE, SPOTIFY_ENDPOINTS } from "@/lib/spotify/config";
import { getSpotifyCookieOptions } from "@/lib/spotify/auth";
import axios from "axios";
import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { SpotifyTokenResponse } from "@/types/auth";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = SPOTIFY_ENDPOINTS.callback;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, error } = req.query;
  const cookies = parse(req.headers.cookie || "");
  const codeVerifier = cookies[SPOTIFY_COOKIE.CODE_VERIFIER];

  if (!clientId) {
    throw new Error("Missing Spotify client credentials");
  }

  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  if (error === "access_denied") {
    return res.redirect("/");
  }

  if (!codeVerifier) {
    return res.status(400).json({ error: "Missing code_verifier cookie" });
  }

  console.log(`---CALLBACK---`);
  console.log(`codeVerifier ${codeVerifier}`);

  try {
    const urlParams = new URLSearchParams({
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      client_id: clientId!,
      code: code as string,
      code_verifier: codeVerifier,
    });

    const response = await axios.post<SpotifyTokenResponse>(
      SPOTIFY_ENDPOINTS.token,
      urlParams.toString(),
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

    res.redirect("/");
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Authentication failed");
  }
}

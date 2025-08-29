import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize, parse } from "cookie";

import { ERRORS } from "@/lib/errors";
import { SPOTIFY_COOKIES, SPOTIFY_AUTH_ENDPOINTS } from "@/lib/spotify/config";
import { getSpotifyCookieOptions } from "@/lib/spotify/auth";
import { SpotifyTokenResponse } from "@/types/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = SPOTIFY_AUTH_ENDPOINTS.callback;

  const { code, error } = req.query;
  const cookies = parse(req.headers.cookie || "");
  const codeVerifier = cookies[SPOTIFY_COOKIES.CODE_VERIFIER];

  if (!clientId) {
    throw new Error(ERRORS.MISSING_CLIENT_ID);
  }

  if (error === "access_denied") {
    return res.redirect("/?error=access_denied");
  }

  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: ERRORS.MISSING_AUTH_CODE });
  }

  if (!codeVerifier) {
    return res.status(400).json({ error: ERRORS.MISSING_CODE_VERIFIER });
  }

  try {
    const urlParams = new URLSearchParams({
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      client_id: clientId!,
      code: code as string,
      code_verifier: codeVerifier,
    });

    const response = await axios.post<SpotifyTokenResponse>(
      SPOTIFY_AUTH_ENDPOINTS.token,
      urlParams.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
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

    res.redirect("/");
  } catch (err: any) {
    res.status(500).json({ error: ERRORS.AUTHENTICATION_FAILED });
  }
}

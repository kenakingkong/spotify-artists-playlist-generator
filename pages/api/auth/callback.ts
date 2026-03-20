import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";

import { ERRORS } from "@/lib/errors";
import { SPOTIFY_COOKIES, SPOTIFY_AUTH_ENDPOINTS } from "@/lib/spotify/config";
import { getSpotifyCookieOptions } from "@/lib/spotify/auth";
import { ISpotifyTokenResponse } from "@/types/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = SPOTIFY_AUTH_ENDPOINTS.callback;

  const code = req.query.code || null;
  const error = req.query.error || null;
  const state = req.query.state || null;

  if (!clientId || !clientSecret) {
    throw new Error(ERRORS.MISSING_CREDENTIALS);
  }

  if (error === "access_denied") {
    return res.redirect("/?error=access_denied");
  }

  if (state === null) {
    return res.redirect("/?error=state_mismatch");
  }

  if (!code) {
    res.status(400).json({ error: ERRORS.MISSING_AUTH_CODE });
  }

  const authHeader = `Basic ${Buffer.from(
    `${clientId}:${clientSecret}`,
  ).toString("base64")}`;

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const urlParams = new URLSearchParams({
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code: code as string,
  });

  try {
    const response = await axios.post<ISpotifyTokenResponse>(
      SPOTIFY_AUTH_ENDPOINTS.token,
      urlParams.toString(),
      { headers },
    );

    const { access_token, refresh_token, expires_in } = response.data;

    res.setHeader("Set-Cookie", [
      serialize(
        SPOTIFY_COOKIES.ACCESS_TOKEN,
        access_token,
        getSpotifyCookieOptions(true, expires_in),
      ),
      serialize(
        SPOTIFY_COOKIES.REFRESH_TOKEN,
        refresh_token ?? "",
        getSpotifyCookieOptions(true),
      ),
      serialize(
        SPOTIFY_COOKIES.LOGGED_IN,
        "true",
        getSpotifyCookieOptions(false),
      ),
    ]);

    res.redirect("/?new_session=true");
  } catch {
    res.status(500).json({ error: ERRORS.AUTHENTICATION_FAILED });
  }
}

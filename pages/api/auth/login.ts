import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

import {
  CODE_CHALLENGE_METHOD,
  generateCodeChallenge,
  generateRandomString,
} from "@/lib/auth/pkce";
import { ERRORS } from "@/lib/errors";
import { getSpotifyCookieOptions } from "@/lib/spotify/auth";
import { SPOTIFY_COOKIE, SPOTIFY_ENDPOINTS } from "@/lib/spotify/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = SPOTIFY_ENDPOINTS.callback;
  const scope =
    "user-read-private user-read-email user-top-read playlist-modify-public";

  const codeVerifier = generateRandomString();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  if (!clientId) {
    throw new Error(ERRORS.MISSING_CLIENT_ID);
  }

  res.setHeader(
    "Set-Cookie",
    serialize(
      SPOTIFY_COOKIE.CODE_VERIFIER,
      codeVerifier,
      getSpotifyCookieOptions(true, 300)
    )
  );

  const urlParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId!,
    scope,
    redirect_uri: redirectUri!,
    code_challenge_method: CODE_CHALLENGE_METHOD,
    code_challenge: codeChallenge,
  });

  const authUrl = `${SPOTIFY_ENDPOINTS.authorize}?${urlParams.toString()}`;
  res.redirect(authUrl);
}

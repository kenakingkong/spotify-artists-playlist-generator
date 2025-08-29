import type { NextApiRequest, NextApiResponse } from "next";

import { ERRORS } from "@/lib/errors";
import { SPOTIFY_AUTH_ENDPOINTS } from "@/lib/spotify/config";
import generateRandomString from "@/utils/generateRandomString";

const DEFAULT_SPOTIFY_SCOPE =
  "user-read-private user-read-email user-top-read playlist-modify-public";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = SPOTIFY_AUTH_ENDPOINTS.callback;
  const scope = DEFAULT_SPOTIFY_SCOPE;
  const state = generateRandomString(16);

  if (!clientId) {
    throw new Error(ERRORS.MISSING_CREDENTIALS);
  }

  const urlParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
  });

  const authUrl = `${SPOTIFY_AUTH_ENDPOINTS.authorize}?${urlParams.toString()}`;
  res.redirect(authUrl);
}

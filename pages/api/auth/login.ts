import { SPOTIFY_ENDPOINTS } from "@/lib/spotifyConfig";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = SPOTIFY_ENDPOINTS.callback;
  const scope =
    "user-read-private user-read-email user-top-read playlist-modify-public";

  if (!clientId) {
    throw new Error("Missing Spotify client credentials");
  }

  const authUrl = `${SPOTIFY_ENDPOINTS.authorize}?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;

  res.redirect(authUrl);
}

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { ERRORS } from "@/lib/errors";
import { withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_ENDPOINTS } from "@/lib/spotify/config";

async function getProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken?: string | null
) {
  try {
    const response = await axios.get(SPOTIFY_ENDPOINTS.me, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.status(200).json({ data: response.data });
  } catch (err: any) {
    return res.status(500).json({ error: ERRORS.SPOTIFY_PROFILE });
  }
}

export default withSpotifyAuth(getProfile);

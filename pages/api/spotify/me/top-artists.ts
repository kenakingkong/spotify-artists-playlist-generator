import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { ERRORS } from "@/lib/errors";
import { withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_API_ENDPOINTS } from "@/lib/spotify/config";

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken?: string | null
) {
  try {
    const rawLimit = req.query.limit ? Number(req.query.limit) : 20;
    const limit = Math.min(Math.max(rawLimit, 1), 50);

    const response = await axios.get(SPOTIFY_API_ENDPOINTS.userTopArtists, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { limit },
    });

    return res.status(200).json({ data: response.data });
  } catch (err: any) {
    return res.status(500).json({ error: ERRORS.GENERIC });
  }
}

export default withSpotifyAuth(GET);

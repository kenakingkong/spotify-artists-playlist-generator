import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { ERRORS } from "@/lib/errors";
import { withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_API_ENDPOINTS } from "@/lib/spotify/config";

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) {
  try {
    const response = await axios.get(SPOTIFY_API_ENDPOINTS.profile, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.status(200).json({ data: response.data });
  } catch (err: any) {
    return res.status(500).json({ error: ERRORS.SPOTIFY_DATA });
  }
}

export default withSpotifyAuth(GET);

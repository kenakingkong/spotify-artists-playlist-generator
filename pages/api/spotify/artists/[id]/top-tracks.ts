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
    const id = req.query.id as string;
    const endpoint = SPOTIFY_API_ENDPOINTS.artistTopTracks(id);

    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.status(200).json({ data: response.data });
  } catch (err: any) {
    return res.status(500).json({ error: ERRORS.GENERIC });
  }
}

export default withSpotifyAuth(GET);

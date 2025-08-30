import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { ERRORS } from "@/lib/errors";
import { withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_API_ENDPOINTS } from "@/lib/spotify/config";
import { isValidUriString } from "@/lib/spotify/validate";

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) {
  try {
    const id = req.query.id as string;
    const uris = req.body.uris;

    if (!isValidUriString(uris)) {
      return res.status(400).json({ data: ERRORS.INVALID_TRACKS });
    }

    const endpoint = SPOTIFY_API_ENDPOINTS.playlistTracks(id);

    const response = await axios.post(
      endpoint,
      { uris },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return res.status(201).json({ data: response.data });
  } catch (err: any) {
    return res.status(500).json({ error: ERRORS.GENERIC });
  }
}

export default withSpotifyAuth(POST);

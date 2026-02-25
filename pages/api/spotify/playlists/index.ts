import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { ERRORS } from "@/lib/errors";
import { withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_API_ENDPOINTS } from "@/lib/spotify/config";

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string,
) {
  try {
    const { userId, name, description } = req.body;

    if (!userId) {
      return res.status(400).json({ error: ERRORS.MISSING_USER_ID });
    }

    if (!name?.trim()) {
      return res.status(400).json({ error: ERRORS.REQUIRE_PLAYLIST_NAME });
    }

    const endpoint = SPOTIFY_API_ENDPOINTS.userPlaylists(userId);
    const payload = { name, description, public: true };

    const response = await axios.post(endpoint, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.status(201).json({ data: response.data });
  } catch {
    return res.status(500).json({ error: ERRORS.GENERIC });
  }
}

export default withSpotifyAuth(POST);

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { ERRORS } from "@/lib/errors";
import { withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_API_ENDPOINTS } from "@/lib/spotify/config";
import { getPlaylistsCreatedTodayCount } from "@/lib/events/queries";
import { trackPlaylistCreated } from "@/lib/events/track";

const MAX_PLAYLISTS_PER_DAY = 5;

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string,
) {
  try {
    const { userId, name, description, artists } = req.body;

    if (!userId) {
      return res.status(400).json({ error: ERRORS.MISSING_USER_ID });
    }

    if (!name?.trim()) {
      return res.status(400).json({ error: ERRORS.REQUIRE_PLAYLIST_NAME });
    }

    const count = await getPlaylistsCreatedTodayCount(userId);
    if (count >= MAX_PLAYLISTS_PER_DAY) {
      return res.status(429).json({ error: ERRORS.RATE_LIMIT_EXCEEDED });
    }

    const endpoint = SPOTIFY_API_ENDPOINTS.userPlaylists(userId);
    const payload = { name, description, public: true };

    const response = await axios.post(endpoint, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    void trackPlaylistCreated(userId, {
      playlistId: response.data.id,
      artists: artists ?? [],
    });

    return res.status(201).json({ data: response.data });
  } catch {
    return res.status(500).json({ error: ERRORS.GENERIC });
  }
}

export default withSpotifyAuth(POST);

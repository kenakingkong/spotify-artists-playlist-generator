import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { ERRORS } from "@/lib/errors";
import { withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_API_ENDPOINTS } from "@/lib/spotify/config";
import {
  trackPlaylistCreated,
  getPlaylistsCreatedTodayCount,
} from "@/lib/firebase/playlists";

const MAX_PLAYLISTS_PER_DAY = 3;

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string,
) {
  try {
    const { name, description, artists } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ error: ERRORS.REQUIRE_PLAYLIST_NAME });
    }

    const authHeaders = { headers: { Authorization: `Bearer ${accessToken}` } };

    // Get userId from Spotify token — never trust the request body
    const profileResponse = await axios.get(SPOTIFY_API_ENDPOINTS.profile, authHeaders);
    const userId: string = profileResponse.data.id;

    // Check rate limit for playlist creation
    const count = await getPlaylistsCreatedTodayCount(userId);
    if (count >= MAX_PLAYLISTS_PER_DAY) {
      return res.status(429).json({ error: ERRORS.RATE_LIMIT_EXCEEDED });
    }

    const endpoint = SPOTIFY_API_ENDPOINTS.userPlaylists(userId);
    const payload = { name, description, public: true };

    // Create playlist in Spotify
    const response = await axios.post(endpoint, payload, authHeaders);

    // Track playlist creation event in Firebase
    await trackPlaylistCreated({
      userId,
      playlistId: response.data.id,
      artists: artists ?? [],
    });

    return res.status(201).json({ data: response.data });
  } catch {
    return res.status(500).json({ error: ERRORS.GENERIC });
  }
}

export default withSpotifyAuth(POST);

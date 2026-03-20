import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { ERRORS } from "@/lib/errors";
import { withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_API_ENDPOINTS } from "@/lib/spotify/config";
import {
  trackPlaylistCreated,
  getPlaylistsCreatedTodayCount,
} from "@/lib/firebase/playlists";
import generatePlaylistName from "@/utils/generatePlaylistName";
import generatePlaylistDescription from "@/utils/generatePlaylistDescription";

const MAX_PLAYLISTS_PER_DAY = 3;

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { artists: rawArtists } = req.body;

    if (!Array.isArray(rawArtists) || rawArtists.length === 0) {
      return res.status(400).json({ error: ERRORS.NO_ARTISTS_PROVIDED });
    }

    // Validate each artist has a non-empty alphanumeric ID and a string name
    const artists = rawArtists.filter(
      (a): a is { id: string; name: string } =>
        typeof a?.id === "string" &&
        /^[a-zA-Z0-9]+$/.test(a.id) &&
        typeof a?.name === "string",
    );

    if (artists.length === 0) {
      return res.status(400).json({ error: ERRORS.INVALID_ARTISTS });
    }

    const authHeaders = { headers: { Authorization: `Bearer ${accessToken}` } };

    // Get userId from Spotify token — never trust the request body
    const profileResponse = await axios.get(
      SPOTIFY_API_ENDPOINTS.profile,
      authHeaders,
    );
    const userId: string = profileResponse.data.id;

    // Check rate limit
    const count = await getPlaylistsCreatedTodayCount(userId);
    if (count >= MAX_PLAYLISTS_PER_DAY) {
      return res.status(429).json({ error: ERRORS.RATE_LIMIT_EXCEEDED });
    }

    const artistIds = artists.map((a) => a.id);

    // Fetch top tracks for all artists in parallel
    const trackUriResults = await Promise.allSettled(
      artistIds.map(async (artistId: string) => {
        const response = await axios.get(
          SPOTIFY_API_ENDPOINTS.artistTopTracks(artistId),
          authHeaders,
        );
        return (response.data.tracks as { uri: string }[])
          .filter((track) => track.uri?.startsWith("spotify:track:"))
          .map((track) => track.uri);
      }),
    );

    const trackUriSets = trackUriResults
      .filter(
        (result): result is PromiseFulfilledResult<string[]> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);

    const uris = Array.from(new Set(trackUriSets.flat())).slice(0, 100);

    if (uris.length === 0) {
      return res.status(400).json({ error: ERRORS.NO_TRACKS_FOUND });
    }

    const artistNames = artists.map((a) => a.name);

    // Create spotify playlist
    const createResponse = await axios.post(
      SPOTIFY_API_ENDPOINTS.userPlaylists(userId),
      {
        name: generatePlaylistName(artistNames),
        description: generatePlaylistDescription(),
        public: true,
      },
      authHeaders,
    );
    const { id: playlistId, uri } = createResponse.data;

    // Add tracks to spotify playlist
    await axios.post(
      SPOTIFY_API_ENDPOINTS.playlistTracks(playlistId),
      { uris },
      authHeaders,
    );

    // Track in Firebase "playlists" node
    await trackPlaylistCreated({ userId, playlistId, artists: artistNames });

    return res.status(201).json({ data: { id: playlistId, uri } });
  } catch (err) {
    console.error("[generate playlist]", err);
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        return res.status(401).json({ error: ERRORS.UNAUTHORIZED });
      }
      if (status === 429) {
        return res.status(429).json({ error: ERRORS.RATE_LIMIT_EXCEEDED });
      }
    }
    return res.status(500).json({ error: ERRORS.GENERIC });
  }
}

export default withSpotifyAuth(POST);

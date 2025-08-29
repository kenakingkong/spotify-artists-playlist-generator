import { withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_ENDPOINTS } from "@/lib/spotify/config";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function getProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) {
  try {
    const response = await axios.get(SPOTIFY_ENDPOINTS.me, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.status(200).json(response.data);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch Spotify profile" });
  }
}

export default withSpotifyAuth(getProfile);

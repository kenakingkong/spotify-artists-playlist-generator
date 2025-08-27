import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSpotifyToken } from "@/lib/spotifyToken";
import { SPOTIFY_ENDPOINTS } from "@/lib/spotifyConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getSpotifyToken(req);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const me = await axios.get(SPOTIFY_ENDPOINTS.me, {
    headers: { Authorization: `Bearer ${token}` },
  });

  res.status(200).json(me.data);
}

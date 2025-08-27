import {
  SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  SPOTIFY_LOGGED_IN_COOKIE_NAME,
  SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/spotifyConfig";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", [
    `${SPOTIFY_ACCESS_TOKEN_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
    `${SPOTIFY_REFRESH_TOKEN_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
    `${SPOTIFY_LOGGED_IN_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
  ]);

  res.redirect("/");
}

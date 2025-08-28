import { SPOTIFY_COOKIE } from "@/lib/spotify/config";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", [
    `${SPOTIFY_COOKIE.CODE_VERIFIER}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
    `${SPOTIFY_COOKIE.ACCESS_TOKEN}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
    `${SPOTIFY_COOKIE.REFRESH_TOKEN}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
    `${SPOTIFY_COOKIE.LOGGED_IN}=; Path=/; Max-Age=0; SameSite=Lax; Secure`,
  ]);

  res.redirect("/");
}

import type { NextApiRequest, NextApiResponse } from "next";

import { SPOTIFY_COOKIES } from "@/lib/spotify/config";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", [
    `${SPOTIFY_COOKIES.CODE_VERIFIER}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
    `${SPOTIFY_COOKIES.ACCESS_TOKEN}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
    `${SPOTIFY_COOKIES.REFRESH_TOKEN}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
    `${SPOTIFY_COOKIES.LOGGED_IN}=; Path=/; Max-Age=0; SameSite=Lax; Secure`,
  ]);

  res.redirect("/");
}

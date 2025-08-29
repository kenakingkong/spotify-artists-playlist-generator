/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";

import handler from "@/pages/api/auth/logout";

import { SPOTIFY_COOKIES } from "@/lib/spotify/config";
import { createMockApi } from "@/tests/utils/mockApi";

describe("/api/auth/logout", () => {
  it("resets cookies and redirects to Root URL", () => {
    const { req, res } = createMockApi();

    handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      expect.arrayContaining([
        expect.stringContaining(`${SPOTIFY_COOKIES.CODE_VERIFIER}=`),
        expect.stringContaining(`${SPOTIFY_COOKIES.ACCESS_TOKEN}=`),
        expect.stringContaining(`${SPOTIFY_COOKIES.REFRESH_TOKEN}=`),
        expect.stringContaining(`${SPOTIFY_COOKIES.LOGGED_IN}=`),
      ])
    );

    const cookies = (res.setHeader as jest.Mock).mock.calls[0][1];
    cookies.forEach((cookie: string) => {
      expect(cookie).toMatch(/Max-Age=0/);
    });

    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});

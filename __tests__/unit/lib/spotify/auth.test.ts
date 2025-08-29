/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import { getSpotifyCookieOptions, withSpotifyAuth } from "@/lib/spotify/auth";
import { SPOTIFY_COOKIES } from "@/lib/spotify/config";

describe("unit/lib/spotify/auth tests", () => {
  it("getSpotifyCookieOptions should return a string", () => {
    const result = getSpotifyCookieOptions(true, 300);
    expect(result.httpOnly).toBe(true);
    expect(result.maxAge).toBe(300);
  });

  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    // Mock Next.js response
    jsonMock = jest.fn().mockReturnThis();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock, json: jsonMock };
  });

  it("calls handler when cookie has a valid access token", async () => {
    // Set the cookie on the request
    req = {
      headers: {
        cookie: `${SPOTIFY_COOKIES.ACCESS_TOKEN}=GOOD_TOKEN`,
      },
    };

    const handler = jest.fn(async (req, res, token) => {
      return res.status(200).json({ token });
    });

    const wrapped = withSpotifyAuth(handler);
    await wrapped(req as NextApiRequest, res as NextApiResponse);

    expect(handler).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object),
      "GOOD_TOKEN"
    );
    expect(statusMock).not.toHaveBeenCalledWith(401);
  });

  it("returns 401 when cookie is missing", async () => {
    req = { headers: { cookie: "" } };

    const handler = jest.fn();
    const wrapped = withSpotifyAuth(handler);
    await wrapped(req as NextApiRequest, res as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(handler).not.toHaveBeenCalled();
  });
});

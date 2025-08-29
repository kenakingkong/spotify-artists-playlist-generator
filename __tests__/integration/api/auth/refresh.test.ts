/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import handler from "@/pages/api/auth/refresh";

import { ERRORS } from "@/lib/errors";
import { createMockApi } from "@/tests/utils/mockApi";
import { withMockSpotifyClientId } from "@/tests/utils/mockEnv";
import { expectMissingSpotifyClientId } from "@/tests/utils/env";
import { SPOTIFY_COOKIE } from "@/lib/spotify/config";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("/api/auth/refresh", () => {
  it("throws an error if SPOTIFY_CLIENT_ID is missing", async () => {
    await expectMissingSpotifyClientId(handler);
  });

  it("throws a 401 if refresh_token is missing", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res } = createMockApi();
      req.headers = { cookie: "" };

      await handler(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: ERRORS.MISSING_REFRESH_TOKEN,
      });
    });
  });

  it("resets cookies and returns a new access token", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res } = createMockApi();
      req.query = {};
      req.headers = {
        cookie: `${SPOTIFY_COOKIE.REFRESH_TOKEN}=NEW_REFRESH_TOKEN`,
      };

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          access_token: "NEW_ACCESS_TOKEN",
          refresh_token: "NEW_REFRESH_TOKEN",
          expires_in: 3600,
        },
      });

      await handler(req as NextApiRequest, res as NextApiResponse);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        expect.arrayContaining([
          expect.stringContaining(
            `${SPOTIFY_COOKIE.ACCESS_TOKEN}=NEW_ACCESS_TOKEN`
          ),
          expect.stringContaining(
            `${SPOTIFY_COOKIE.REFRESH_TOKEN}=NEW_REFRESH_TOKEN`
          ),
          expect.stringContaining(`${SPOTIFY_COOKIE.LOGGED_IN}=true`),
        ])
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        access_token: "NEW_ACCESS_TOKEN",
      });
    });
  });
});

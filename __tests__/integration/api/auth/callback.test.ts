/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import handler from "@/pages/api/auth/callback";

import { SPOTIFY_COOKIE } from "@/lib/spotify/config";
import { ERRORS } from "@/lib/errors";
import { createMockApi } from "@/tests/utils/mockApi";
import { MOCK_ACCESS_TOKEN, MOCK_REFRESH_TOKEN } from "@/tests/utils/mockAuth";
import { withMockSpotifyClientId } from "@/tests/utils/mockEnv";
import { expectMissingSpotifyClientId } from "@/tests/utils/env";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("/api/auth/callback", () => {
  it("throws an error if SPOTIFY_CLIENT_ID is missing", async () => {
    await expectMissingSpotifyClientId(handler);
  });

  it("throws a 400 if authorization code is missing", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res } = createMockApi();
      req.query = {};
      req.headers = {};

      await handler(req as NextApiRequest, res as NextApiResponse);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: ERRORS.MISSING_AUTH_CODE,
      });
    });
  });

  it("throws a 400 if code_verifier is missing", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res } = createMockApi();
      req.query = { code: "FAKE_CODE" };
      req.headers = { cookie: "" };

      await handler(req as NextApiRequest, res as NextApiResponse);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: ERRORS.MISSING_CODE_VERIFIER,
      });
    });
  });

  it("redirects with ?error=access_denied on authorization error", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res, redirectMock } = createMockApi();
      req.query = { error: "access_denied" };
      req.headers = {};

      await handler(req as any, res as any);

      expect(redirectMock).toHaveBeenCalledWith("/?error=access_denied");
    });
  });

  it("sets cookies and redirects on successful token exchange", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res, redirectMock } = createMockApi();
      req.query = { code: "FAKE_CODE" };
      req.headers = { cookie: `${SPOTIFY_COOKIE.CODE_VERIFIER}=FAKE_VERIFIER` };

      mockedAxios.post.mockResolvedValue({
        data: {
          access_token: MOCK_ACCESS_TOKEN,
          refresh_token: MOCK_REFRESH_TOKEN,
          expires_in: 3600,
        },
      });

      await handler(req as NextApiRequest, res as NextApiResponse);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        expect.arrayContaining([
          expect.stringContaining(
            `${SPOTIFY_COOKIE.ACCESS_TOKEN}=${MOCK_ACCESS_TOKEN}`
          ),
          expect.stringContaining(
            `${SPOTIFY_COOKIE.REFRESH_TOKEN}=${MOCK_REFRESH_TOKEN}`
          ),
          expect.stringContaining(`${SPOTIFY_COOKIE.LOGGED_IN}=true`),
        ])
      );

      expect(redirectMock).toHaveBeenCalledWith("/");
    });
  });

  it("returns 500 if axios request fails", async () => {
    const { req, res } = createMockApi();
    req.query = { code: "FAKE_CODE" };
    req.headers = { cookie: `${SPOTIFY_COOKIE.CODE_VERIFIER}=FAKE_VERIFIER` };

    mockedAxios.post.mockRejectedValue(new Error());

    await handler(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: ERRORS.AUTHENTICATION_FAILED,
    });
  });
});

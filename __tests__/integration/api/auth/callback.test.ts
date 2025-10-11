/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import handler from "@/pages/api/auth/callback";

import { ERRORS } from "@/lib/errors";
import { SPOTIFY_COOKIES } from "@/lib/spotify/config";
import { createMockApi } from "@/tests/utils/mockApi";
import { MOCK_ACCESS_TOKEN, MOCK_REFRESH_TOKEN } from "@/tests/utils/mockAuth";
import { withMockSpotifyClientId } from "@/tests/utils/mockEnv";
import {
  expectMissingSpotifyClientId,
  expectMissingSpotifyClientSecret,
} from "@/tests/utils/env";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("/api/auth/callback", () => {
  it("throws an error if SPOTIFY_CLIENT_ID is missing", async () => {
    await expectMissingSpotifyClientId(handler);
  });

  it("throws an error if SPOTIFY_CLIENT_SECRET is missing", async () => {
    await expectMissingSpotifyClientSecret(handler);
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

  it("redirects with ?error=state_mismatch on state mismatch error", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res, redirectMock } = createMockApi();
      req.query = { state: undefined };
      req.headers = {};

      await handler(req as any, res as any);

      expect(redirectMock).toHaveBeenCalledWith("/?error=state_mismatch");
    });
  });

  it("throws a 400 if authorization code is missing", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res } = createMockApi();
      req.query = { state: "MOCK_STATE" };
      req.headers = {};

      await handler(req as NextApiRequest, res as NextApiResponse);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: ERRORS.MISSING_AUTH_CODE,
      });
    });
  });

  it("sets cookies and redirects on successful token exchange", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res, redirectMock } = createMockApi();
      req.query = { code: "MOCK_CODE", state: "MOCK_STATE" };

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
            `${SPOTIFY_COOKIES.ACCESS_TOKEN}=${MOCK_ACCESS_TOKEN}`
          ),
          expect.stringContaining(
            `${SPOTIFY_COOKIES.REFRESH_TOKEN}=${MOCK_REFRESH_TOKEN}`
          ),
          expect.stringContaining(`${SPOTIFY_COOKIES.LOGGED_IN}=true`),
        ])
      );

      expect(redirectMock).toHaveBeenCalledWith("/?new_session=true");
    });
  });

  it("returns 500 if axios request fails", async () => {
    const { req, res } = createMockApi();
    req.query = { code: "MOCK_CODE", state: "MOCK_STATE" };

    mockedAxios.post.mockRejectedValue(new Error());

    await handler(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: ERRORS.AUTHENTICATION_FAILED,
    });
  });
});

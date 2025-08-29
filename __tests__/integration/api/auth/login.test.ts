/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";

import handler from "@/pages/api/auth/login";

import { ERRORS } from "@/lib/errors";
import { SPOTIFY_AUTH_ENDPOINTS } from "@/lib/spotify/config";
import { createMockApi } from "@/tests/utils/mockApi";
import {
  MOCK_SPOTIFY_CLIENT_ID,
  withMockSpotifyClientId,
} from "@/tests/utils/mockEnv";



describe("/api/auth/login", () => {
  it("redirects to Spotify authorize URL", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res, redirectMock } = createMockApi();

      await handler(req as NextApiRequest, res as NextApiResponse);

      expect(redirectMock).toHaveBeenCalledWith(
        expect.stringContaining(SPOTIFY_AUTH_ENDPOINTS.authorize)
      );
      expect(redirectMock).toHaveBeenCalledWith(
        expect.stringContaining(`client_id=${MOCK_SPOTIFY_CLIENT_ID}`)
      );
      expect(redirectMock).toHaveBeenCalledWith(
        expect.stringContaining("state=")
      );
    });
  });

  it("throws an error if SPOTIFY_CLIENT_ID is missing", async () => {
    delete process.env.SPOTIFY_CLIENT_ID;

    const { req, res } = createMockApi();

    await expect(
      handler(req as NextApiRequest, res as NextApiResponse)
    ).rejects.toThrow(ERRORS.MISSING_CREDENTIALS);
  });
});

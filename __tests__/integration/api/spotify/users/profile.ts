/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import handler from "@/pages/api/spotify/users/profile";

import { ERRORS } from "@/lib/errors";
import { createMockApi } from "@/tests/utils/mockApi";
import { withMockSpotifyClientId } from "@/tests/utils/mockEnv";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/lib/spotify/auth", () => {
  const { mockWithSpotifyAuth } = require("@/tests/utils/mockAuth");

  return {
    withSpotifyAuth: mockWithSpotifyAuth,
  };
});

describe("/api/spotify/users/get", () => {
  it("returns 200 with profile data", async () => {
    await withMockSpotifyClientId(async () => {
      const { req, res } = createMockApi();

      const fakeProfile = {
        type: "user",
        id: "test",
        display_name: "test",
        email: "test@email.com",
        href: "https://api.spotify.com/v1/users/test",
        images: [
          { height: 300, url: "", width: 300 },
          { height: 64, url: "", width: 64 },
        ],
      };

      mockedAxios.get.mockResolvedValue({ data: fakeProfile });

      await handler(req as NextApiRequest, res as NextApiResponse);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: fakeProfile });
    });
  });

  it("returns 500 if axios request fails", async () => {
    const { req, res } = createMockApi();

    mockedAxios.get.mockRejectedValue(new Error());

    await handler(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: ERRORS.SPOTIFY_PROFILE,
    });
  });
});

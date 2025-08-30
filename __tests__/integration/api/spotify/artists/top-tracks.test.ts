/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import handler from "@/pages/api/spotify/artists/[id]/top-tracks";
import { ERRORS } from "@/lib/errors";
import { createMockApi } from "@/tests/utils/mockApi";
import { MOCK_ACCESS_TOKEN } from "@/tests/utils/mockAuth";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/lib/spotify/auth", () => {
  const { mockWithSpotifyAuth } = require("@/tests/utils/mockAuth");
  return { withSpotifyAuth: mockWithSpotifyAuth };
});

describe("/api/spotify/artists/[id]/top-tracks", () => {
  const MOCK_TRACK = {
    album: {
      album_type: "album",
      total_tracks: 14,
      name: "÷ (Deluxe)",
      release_date: "2017-03-03",
    },
    artists: [
      {
        name: "Ed Sheeran",
        id: "6eUKZXaKkcviH0Ku9w2n3V",
      },
    ],
    id: "7qiZfU4dY1lWllzX7mPBI3",
    name: "Shape of You",
    duration_ms: 233712,
    popularity: 91,
    uri: "spotify:track:7qiZfU4dY1lWllzX7mPBI3",
  };

  it("returns 200 and Spotify Artists Data", async () => {
    const fakeData = {
      tracks: [MOCK_TRACK, MOCK_TRACK],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: fakeData });

    const { req, res } = createMockApi();
    req.query = {};

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: fakeData });
  });

  it("returns 500 if axios throws", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error());

    const { req, res } = createMockApi();

    await handler(req as any, res as any, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.GENERIC });
  });
});

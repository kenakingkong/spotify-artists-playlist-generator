/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import handler from "@/pages/api/spotify/playlists";
import { ERRORS } from "@/lib/errors";
import { createMockApi } from "@/tests/utils/mockApi";
import { MOCK_ACCESS_TOKEN } from "@/tests/utils/mockAuth";
import { getPlaylistsCreatedTodayCount, trackPlaylistCreated } from "@/lib/firebase/playlists";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/lib/spotify/auth", () => {
  const { mockWithSpotifyAuth } = require("@/tests/utils/mockAuth");
  return { withSpotifyAuth: mockWithSpotifyAuth };
});

jest.mock("@/lib/firebase/playlists", () => ({
  trackPlaylistCreated: jest.fn(),
  getPlaylistsCreatedTodayCount: jest.fn(),
}));

const mockedGetCount = getPlaylistsCreatedTodayCount as jest.MockedFunction<
  typeof getPlaylistsCreatedTodayCount
>;
const mockedTrack = trackPlaylistCreated as jest.MockedFunction<
  typeof trackPlaylistCreated
>;

describe("/api/spotify/playlists", () => {
  beforeEach(() => {
    mockedGetCount.mockResolvedValue(0);
    mockedTrack.mockResolvedValue(undefined);
  });

  it("returns 400 if userId is missing", async () => {
    const { req, res } = createMockApi();
    req.body = { name: "My Playlist" };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.MISSING_USER_ID });
  });

  it("returns 400 if name is missing or empty", async () => {
    const { req, res } = createMockApi();
    req.body = { userId: "123" };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.REQUIRE_PLAYLIST_NAME });
  });

  it("returns 429 when daily rate limit is reached", async () => {
    mockedGetCount.mockResolvedValue(5);

    const { req, res } = createMockApi();
    req.body = { userId: "123", name: "My Playlist" };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.RATE_LIMIT_EXCEEDED });
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it("creates playlist successfully", async () => {
    const mockResponse = { id: "playlist123", name: "My Playlist" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const { req, res } = createMockApi();
    req.body = {
      userId: "123",
      name: "My Playlist",
      description: "A description",
      artists: ["Artist A", "Artist B"],
    };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: mockResponse });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      { name: "My Playlist", description: "A description", public: true },
      expect.any(Object)
    );
    expect(mockedTrack).toHaveBeenCalledWith({
      userId: "123",
      playlistId: "playlist123",
      artists: ["Artist A", "Artist B"],
    });
  });

  it("creates playlist successfully without description", async () => {
    const mockResponse = { id: "playlist123", name: "My Playlist" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const { req, res } = createMockApi();
    req.body = { userId: "123", name: "My Playlist" };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: mockResponse });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      { name: "My Playlist", description: undefined, public: true },
      expect.any(Object)
    );
    expect(mockedTrack).toHaveBeenCalledWith({
      userId: "123",
      playlistId: "playlist123",
      artists: [],
    });
  });

  it("handles axios errors gracefully", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    const { req, res } = createMockApi();
    req.body = { userId: "123", name: "My Playlist" };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.GENERIC });
  });
});

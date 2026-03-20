/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import handler from "@/pages/api/spotify/playlists/generate";
import { ERRORS } from "@/lib/errors";
import { createMockApi } from "@/tests/utils/mockApi";
import { MOCK_ACCESS_TOKEN } from "@/tests/utils/mockAuth";
import {
  getPlaylistsCreatedTodayCount,
  trackPlaylistCreated,
} from "@/lib/firebase/playlists";

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

const MOCK_TRACK_URI = "spotify:track:7qiZfU4dY1lWllzX7mPBI3";
const MOCK_TRACK_URI_2 = "spotify:track:1lCkSe3OxGRPFYmAfkHHEG";

const MOCK_ARTISTS = [
  { id: "6eUKZXaKkcviH0Ku9w2n3V", name: "Ed Sheeran" },
  { id: "0TnOYISbd1XYRBk9myaseg", name: "Pitbull" },
];

describe("/api/spotify/playlists/generate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetCount.mockResolvedValue(0);
    mockedTrack.mockResolvedValue(undefined);
    // Profile fetch
    mockedAxios.get.mockResolvedValue({ data: { id: "user123" } });
  });

  it("returns 400 if artists is missing", async () => {
    const { req, res } = createMockApi();
    req.body = {};

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 if artists is empty", async () => {
    const { req, res } = createMockApi();
    req.body = { artists: [] };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 if all artists have invalid IDs", async () => {
    const { req, res } = createMockApi();
    req.body = { artists: [{ id: "not valid!", name: "Bad Artist" }] };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 429 when daily rate limit is reached", async () => {
    mockedGetCount.mockResolvedValue(5);

    const { req, res } = createMockApi();
    req.body = { artists: MOCK_ARTISTS };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.RATE_LIMIT_EXCEEDED });
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it("returns 400 if no tracks are found for any artist", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { id: "user123" } }) // profile
      .mockResolvedValue({ data: { tracks: [] } }); // top-tracks for all artists

    const { req, res } = createMockApi();
    req.body = { artists: MOCK_ARTISTS };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("generates playlist successfully", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { id: "user123" } }) // profile
      .mockResolvedValueOnce({ data: { tracks: [{ uri: MOCK_TRACK_URI }] } }) // artist 1 top tracks
      .mockResolvedValueOnce({ data: { tracks: [{ uri: MOCK_TRACK_URI_2 }] } }); // artist 2 top tracks

    mockedAxios.post
      .mockResolvedValueOnce({ data: { id: "playlist123", uri: "spotify:playlist:playlist123" } }) // create playlist
      .mockResolvedValueOnce({ data: {} }); // add tracks

    const { req, res } = createMockApi();
    req.body = { artists: MOCK_ARTISTS };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: { id: "playlist123", uri: "spotify:playlist:playlist123" },
    });
    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    expect(mockedTrack).toHaveBeenCalledWith({
      userId: "user123",
      playlistId: "playlist123",
      artists: MOCK_ARTISTS.map((a) => a.name),
    });
  });

  it("deduplicates track URIs across artists", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { id: "user123" } })
      .mockResolvedValueOnce({ data: { tracks: [{ uri: MOCK_TRACK_URI }] } })
      .mockResolvedValueOnce({ data: { tracks: [{ uri: MOCK_TRACK_URI }] } }); // same URI

    mockedAxios.post
      .mockResolvedValueOnce({ data: { id: "playlist123", uri: "spotify:playlist:playlist123" } })
      .mockResolvedValueOnce({ data: {} });

    const { req, res } = createMockApi();
    req.body = { artists: MOCK_ARTISTS };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    const addTracksCall = mockedAxios.post.mock.calls[1] as [string, { uris: string[] }];
    const uris = addTracksCall[1].uris;
    expect(uris).toHaveLength(1);
    expect(uris[0]).toBe(MOCK_TRACK_URI);
  });

  it("filters out invalid track URIs", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { id: "user123" } })
      .mockResolvedValueOnce({
        data: { tracks: [{ uri: "invalid-uri" }, { uri: MOCK_TRACK_URI }] },
      });

    mockedAxios.post
      .mockResolvedValueOnce({ data: { id: "playlist123", uri: "spotify:playlist:playlist123" } })
      .mockResolvedValueOnce({ data: {} });

    const { req, res } = createMockApi();
    req.body = { artists: [MOCK_ARTISTS[0]] };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    const addTracksCall = mockedAxios.post.mock.calls[1] as [string, { uris: string[] }];
    const uris = addTracksCall[1].uris;
    expect(uris).toEqual([MOCK_TRACK_URI]);
  });

  it("returns 500 on unexpected error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    const { req, res } = createMockApi();
    req.body = { artists: MOCK_ARTISTS };

    await handler(req as NextApiRequest, res as NextApiResponse, MOCK_ACCESS_TOKEN);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.GENERIC });
  });
});

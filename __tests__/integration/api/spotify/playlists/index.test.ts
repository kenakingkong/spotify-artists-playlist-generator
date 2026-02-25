/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import handler from "@/pages/api/spotify/playlists";
import { ERRORS } from "@/lib/errors";
import { createMockApi } from "@/tests/utils/mockApi";
import { MOCK_ACCESS_TOKEN } from "@/tests/utils/mockAuth";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/lib/spotify/auth", () => {
  const { mockWithSpotifyAuth } = require("@/tests/utils/mockAuth");
  return { withSpotifyAuth: mockWithSpotifyAuth };
});

describe("/api/spotify/playlists", () => {
  it("returns 400 if userId is missing", async () => {
    const { req, res } = createMockApi();
    req.body = { name: "My Playlist" };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.MISSING_USER_ID });
  });

  it("returns 400 if name is missing or empty", async () => {
    const { req, res } = createMockApi();
    req.body = { userId: "123" };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: ERRORS.REQUIRE_PLAYLIST_NAME,
    });
  });

  it("creates playlist successfully", async () => {
    const mockResponse = { id: "playlist123", name: "My Playlist" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const { req, res } = createMockApi();
    req.body = { userId: "123", name: "My Playlist", description: "A description" };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: mockResponse });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      { name: "My Playlist", description: "A description", public: true },
      expect.any(Object)
    );
  });

  it("creates playlist successfully without description", async () => {
    const mockResponse = { id: "playlist123", name: "My Playlist" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const { req, res } = createMockApi();
    req.body = { userId: "123", name: "My Playlist" };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: mockResponse });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      { name: "My Playlist", description: undefined, public: true },
      expect.any(Object)
    );
  });

  it("handles axios errors gracefully", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    const { req, res } = createMockApi();
    req.body = { userId: "123", name: "My Playlist" };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.GENERIC });
  });
});

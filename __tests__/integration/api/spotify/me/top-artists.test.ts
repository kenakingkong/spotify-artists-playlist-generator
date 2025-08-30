/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import handler from "@/pages/api/spotify/me/top-artists";
import { ERRORS } from "@/lib/errors";
import { createMockApi } from "@/tests/utils/mockApi";
import { MOCK_ACCESS_TOKEN } from "@/tests/utils/mockAuth";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/lib/spotify/auth", () => {
  const { mockWithSpotifyAuth } = require("@/tests/utils/mockAuth");
  return { withSpotifyAuth: mockWithSpotifyAuth };
});

describe("/api/spotify/me/top-artists", () => {
  const MOCK_ARTIST = {
    type: "artist",
    name: "test",
    uri: "test",
  };

  it("returns 200 and Spotify Artists Data", async () => {
    const fakeData = {
      items: [MOCK_ARTIST],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: fakeData });

    const { req, res } = createMockApi();
    req.query = { limit: "1" };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: fakeData });
  });

  it("clamps limit to 1 if below 1", async () => {
    const fakeData = { items: [MOCK_ARTIST] };

    mockedAxios.get.mockResolvedValueOnce({ data: fakeData });

    const { req, res } = createMockApi();
    req.query = { limit: "0" };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: fakeData });
  });

  it("clamps limit to 50 if above 50", async () => {
    const fakeData = {
      items: new Array(50).fill(null).map(() => ({ ...MOCK_ARTIST })),
    };

    mockedAxios.get.mockResolvedValueOnce({ data: fakeData });

    const { req, res } = createMockApi();
    req.query = { limit: "100" };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: fakeData });
  });

  it("defaults limit to 20 if not provided", async () => {
    const fakeData = {
      items: new Array(20).fill(null).map(() => ({ ...MOCK_ARTIST })),
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

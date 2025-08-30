/**
 * @jest-environment node
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import handler from "@/pages/api/spotify/playlists/[id]/tracks";
import { ERRORS } from "@/lib/errors";
import { createMockApi } from "@/tests/utils/mockApi";
import { MOCK_ACCESS_TOKEN } from "@/tests/utils/mockAuth";
import * as validate from "@/lib/spotify/validate";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/lib/spotify/auth", () => {
  const { mockWithSpotifyAuth } = require("@/tests/utils/mockAuth");
  return { withSpotifyAuth: mockWithSpotifyAuth };
});

jest.mock("@/lib/spotify/validate", () => ({
  validateUris: jest.fn(),
  urisToQueryString: jest.fn(),
}));

(validate.urisToQueryString as jest.Mock).mockReturnValue("mocked-value");

describe("/api/spotify/playlists/[id]/tracks", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns 400 if uris are invalid", async () => {
    jest.spyOn(validate, "urisToQueryString").mockReturnValue("");

    const { req, res } = createMockApi();
    req.query = { id: "playlist123" };
    req.body = { uris: ["invalid-uri"] };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ data: ERRORS.INVALID_TRACKS });
  });

  it("adds tracks successfully", async () => {
    jest
      .spyOn(validate, "urisToQueryString")
      .mockReturnValue("spotify:track:1, spotify:track:2");

    const mockResponse = { snapshot_id: "snapshot123" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const { req, res } = createMockApi();
    req.query = { id: "playlist123" };
    req.body = { uris: ["spotify:track:1", "spotify:track:2"] };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: mockResponse });
  });

  it("handles axios errors gracefully", async () => {
    jest
      .spyOn(validate, "urisToQueryString")
      .mockReturnValue("spotify:track:1");
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    const { req, res } = createMockApi();
    req.query = { id: "playlist123" };
    req.body = { uris: ["spotify:track:1"] };

    await handler(
      req as NextApiRequest,
      res as NextApiResponse,
      MOCK_ACCESS_TOKEN
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: ERRORS.GENERIC });
  });
});

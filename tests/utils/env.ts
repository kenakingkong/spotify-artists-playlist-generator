import { NextApiRequest, NextApiResponse } from "next";
import { ERRORS } from "@/lib/errors";
import { createMockApi } from "./mockApi";
import { MOCK_SPOTIFY_CLIENT_ID } from "./mockEnv";

/**
 * Utility to assert that a handler throws when SPOTIFY_CLIENT_ID is missing
 */
export async function expectMissingSpotifyClientId(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
) {
  const original = process.env.SPOTIFY_CLIENT_ID;
  delete process.env.SPOTIFY_CLIENT_ID;

  const { req, res } = createMockApi();
  req.query = { code: MOCK_SPOTIFY_CLIENT_ID };
  req.headers = { cookie: "" };

  await expect(handler(req as any, res as any)).rejects.toThrow(
    ERRORS.MISSING_CLIENT_ID
  );

  if (original) process.env.SPOTIFY_CLIENT_ID = original;
}

import { NextApiRequest, NextApiResponse } from "next";
import { ERRORS } from "@/lib/errors";
import { createMockApi } from "./mockApi";

/**
 * Utility to assert that a handler throws when SPOTIFY_CLIENT_ID is missing
 */
export async function expectMissingSpotifyClientId(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
) {
  const original = process.env.SPOTIFY_CLIENT_ID;
  delete process.env.SPOTIFY_CLIENT_ID;

  const { req, res } = createMockApi();
  req.query = { code: "FAKE_CODE" };
  req.headers = { cookie: "" };

  await expect(handler(req as any, res as any)).rejects.toThrow(
    ERRORS.MISSING_CREDENTIALS
  );

  if (original) process.env.SPOTIFY_CLIENT_ID = original;
}

/**
 * Utility to assert that a handler throws when SPOTIFY_CLIENT_SECRET is missing
 */
export async function expectMissingSpotifyClientSecret(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
) {
  const original = process.env.SPOTIFY_CLIENT_SECRET;
  delete process.env.SPOTIFY_CLIENT_SECRET;

  const { req, res } = createMockApi();
  req.query = { code: "FAKE_CODE" };
  req.headers = { cookie: "" };

  await expect(handler(req as any, res as any)).rejects.toThrow(
    ERRORS.MISSING_CREDENTIALS
  );

  if (original) process.env.SPOTIFY_CLIENT_ID = original;
}

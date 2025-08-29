export const MOCK_SPOTIFY_CLIENT_ID = "MOCK_SPOTIFY_CLIENT_ID";

export function withMockSpotifyClientId(fn: () => Promise<void> | void) {
  const original = process.env.SPOTIFY_CLIENT_ID;
  process.env.SPOTIFY_CLIENT_ID = MOCK_SPOTIFY_CLIENT_ID;
  try {
    return fn();
  } finally {
    process.env.SPOTIFY_CLIENT_ID = original;
  }
}

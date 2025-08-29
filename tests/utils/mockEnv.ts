export const MOCK_SPOTIFY_CLIENT_ID = "MOCK_SPOTIFY_CLIENT_ID";
export const MOCK_SPOTIFY_CLIENT_SECRET = "MOCK_SPOTIFY_CLIENT_SECRET";

export function withMockSpotifyClientId(fn: () => Promise<void> | void) {
  const originalClientId = process.env.SPOTIFY_CLIENT_ID;
  const originalClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  process.env.SPOTIFY_CLIENT_ID = MOCK_SPOTIFY_CLIENT_ID;
  process.env.SPOTIFY_CLIENT_SECRET = MOCK_SPOTIFY_CLIENT_SECRET;

  try {
    return fn();
  } finally {
    process.env.SPOTIFY_CLIENT_ID = originalClientId;
    process.env.SPOTIFY_CLIENT_SECRET = originalClientSecret;
  }
}

export const APP_URL = process.env.AUTH_URL || "http://localhost:3000";

export const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
export const SPOTIFY_AUTH_BASE = "https://accounts.spotify.com";

export const SPOTIFY_ENDPOINTS = {
  authorize: `${SPOTIFY_AUTH_BASE}/authorize`,
  token: `${SPOTIFY_AUTH_BASE}/api/token`,

  callback: `${APP_URL}/api/auth/callback`,
  refresh: `${APP_URL}/api/auth/refresh`,

  me: `${SPOTIFY_API_BASE}/me`,
  playlists: (userId: string) =>
    `${SPOTIFY_API_BASE}/users/${userId}/playlists`,
  playlistTracks: (playlistId: string) =>
    `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
};

export const SPOTIFY_COOKIE = {
  ACCESS_TOKEN: "spotify_access_token",
  CODE_VERIFIER: "spotify_code_verifier",
  LOGGED_IN: "spotify_logged_in",
  REFRESH_TOKEN: "spotify_refresh_token",
};

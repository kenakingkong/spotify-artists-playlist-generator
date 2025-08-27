export const APP_URL = process.env.AUTH_URL || "http://localhost:3000";

export const SPOTIFY_ACCESS_TOKEN_COOKIE_NAME = "spotify_access_token";
export const SPOTIFY_REFRESH_TOKEN_COOKIE_NAME = "spotify_refresh_token";
export const SPOTIFY_LOGGED_IN_COOKIE_NAME = "spotify_logged_in";

export const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
export const SPOTIFY_AUTH_BASE = "https://accounts.spotify.com";

export const SPOTIFY_ENDPOINTS = {
  callback: `${APP_URL}/api/auth/callback`,
  refresh: `${APP_URL}/api/auth/refresh`,

  authorize: `${SPOTIFY_AUTH_BASE}/authorize`,
  token: `${SPOTIFY_AUTH_BASE}/api/token`,

  me: `${SPOTIFY_API_BASE}/me`,
  playlists: (userId: string) =>
    `${SPOTIFY_API_BASE}/users/${userId}/playlists`,
  playlistTracks: (playlistId: string) =>
    `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
};

export const ERRORS = {
  GENERIC: "Something went wrong",

  AUTHENTICATION_FAILED: "Authentication failed",
  UNAUTHORIZED: "Unauthorized",

  MISSING_AUTH_CODE: "Missing authorization code",
  MISSING_CREDENTIALS: "Missing Spotify client credentials",
  MISSING_CODE_VERIFIER: "Missing code verifier cookie",

  INVALID_TOKEN: "Invalid access token",
  MISSING_REFRESH_TOKEN: "Missing refresh token",
  FAILED_REFRESH: "Failed to refresh token",

  SPOTIFY_DATA: "Failed to fetch data from Spotify",

  ARTIST_NOT_FOUND: "Artist not found",
  MISSING_USER_ID: "Missing User ID",
  REQUIRE_PLAYLIST_NAME: "Playlist name is required",
  INVALID_TRACKS: "Invalid Track IDs",
  RATE_LIMIT_EXCEEDED: "You've reached your daily playlist limit. Try again tomorrow.",
  NO_ARTISTS_SELECTED: "Select 1 or more artists to create a playlist",

  USE_AUTH: "useAuth must be used within an AuthProvider",
  USE_TOAST: "useToast must be used within a ToastProvider"
};

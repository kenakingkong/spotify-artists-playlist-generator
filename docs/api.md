# API Reference

All Spotify endpoints require a valid session (HttpOnly cookies set after login). Auth endpoints manage the OAuth flow and do not require prior authentication.

---

## Auth

### `GET /api/auth/login`
Redirects the user to the Spotify OAuth authorization page.

**Auth required:** No

**Redirects to:** Spotify authorization URL with scopes:
- `user-read-private`
- `user-read-email`
- `user-top-read`
- `playlist-modify-public`

---

### `GET /api/auth/callback`
Handles the Spotify OAuth callback. Exchanges the authorization code for tokens and sets session cookies.

**Auth required:** No

**Query params:**
| Param   | Type   | Description                        |
|---------|--------|------------------------------------|
| `code`  | string | Authorization code from Spotify    |
| `state` | string | State value for CSRF validation    |
| `error` | string | Set to `access_denied` if rejected |

**Sets cookies:**
- `access_token` — HttpOnly, expires with token
- `refresh_token` — HttpOnly, long-lived
- `logged_in` — readable by client

**Redirects to:**
- `/?new_session=true` on success
- `/?error=access_denied` if user denied access
- `/?error=state_mismatch` if state is missing

**Errors:**
- `400` — missing authorization code
- `500` — token exchange failed

---

### `GET /api/auth/refresh`
Refreshes the access token using the stored refresh token cookie.

**Auth required:** No (uses `refresh_token` cookie)

**Response:**
```json
{ "access_token": "string" }
```

**Errors:**
- `401` — missing refresh token cookie
- `500` — refresh failed

---

### `GET /api/auth/logout`
Clears all session cookies and redirects to home.

**Auth required:** No

**Clears cookies:** `access_token`, `refresh_token`, `logged_in`, `code_verifier`

**Redirects to:** `/`

---

## Spotify — Me

### `GET /api/spotify/me/profile`
Returns the authenticated user's Spotify profile.

**Auth required:** Yes

**Response:**
```json
{ "data": { ...SpotifyUserProfile } }
```

**Errors:**
- `401` — not authenticated
- `500` — failed to fetch profile

---

### `GET /api/spotify/me/top-artists`
Returns the authenticated user's top artists on Spotify.

**Auth required:** Yes

**Query params:**
| Param   | Type   | Default | Description                  |
|---------|--------|---------|------------------------------|
| `limit` | number | `20`    | Number of results (1–50)     |

**Response:**
```json
{ "data": { ...SpotifyTopArtists } }
```

**Errors:**
- `401` — not authenticated
- `500` — failed to fetch top artists

---

## Spotify — Artists

### `GET /api/spotify/artists/[id]/top-tracks`
Returns the top tracks for a given artist.

**Auth required:** Yes

**Path params:**
| Param | Type   | Description         |
|-------|--------|---------------------|
| `id`  | string | Spotify artist ID   |

**Response:**
```json
{ "data": { ...SpotifyTopTracks } }
```

**Errors:**
- `401` — not authenticated
- `500` — failed to fetch top tracks

---

## Spotify — Search

### `GET /api/spotify/search/artists`
Searches Spotify for artists by name.

**Auth required:** Yes

**Query params:**
| Param   | Type   | Required | Default | Description               |
|---------|--------|----------|---------|---------------------------|
| `q`     | string | Yes      | —       | Search query              |
| `limit` | number | No       | `20`    | Number of results (1–50)  |

**Response:**
```json
{ "data": { ...SpotifySearchResults } }
```

**Errors:**
- `401` — not authenticated
- `500` — search failed

---

## Spotify — Playlists

### `POST /api/spotify/playlists`
Creates a new public Spotify playlist for the authenticated user. Rate limited to **5 playlists per day**.

**Auth required:** Yes

**Body:**
| Field         | Type     | Required | Description                          |
|---------------|----------|----------|--------------------------------------|
| `userId`      | string   | Yes      | Spotify user ID                      |
| `name`        | string   | Yes      | Playlist name                        |
| `description` | string   | No       | Playlist description                 |
| `artists`     | string[] | No       | Artist IDs used to generate playlist |

**Response:** `201`
```json
{ "data": { ...SpotifyPlaylist } }
```

**Errors:**
- `400` — missing `userId` or `name`
- `401` — not authenticated
- `429` — rate limit exceeded (5 playlists/day, resets at midnight)
- `500` — playlist creation failed

---

### `POST /api/spotify/playlists/[id]/tracks`
Adds tracks to an existing playlist by URI.

**Auth required:** Yes

**Path params:**
| Param | Type   | Description          |
|-------|--------|----------------------|
| `id`  | string | Spotify playlist ID  |

**Body:**
| Field  | Type     | Required | Description            |
|--------|----------|----------|------------------------|
| `uris` | string[] | Yes      | Spotify track URIs     |

**Response:** `201`
```json
{ "data": { ...SpotifySnapshotResponse } }
```

**Errors:**
- `400` — no valid track URIs provided
- `401` — not authenticated
- `500` — failed to add tracks

---

## Internal

### `GET /api/ping`
Health check endpoint. Pings the Supabase database to keep the connection alive.

**Auth required:** No

**Response:**
```json
{ "ok": true }
```

# spotify artists playlist generator


## Problem

Spotify has great tools for generating playlists and mixes personalized to your listening history.
Their "smart shuffle" is incredible at augmenting and enhancing playlists with similar songs.

However, I want to create playlists from just a few artists top songs - that's it.

https://community.spotify.com/t5/Content-Questions/How-to-create-a-Playlist-of-artists/td-p/5982188


## Tech Stack

### Next 
 Next.js is a React framework that makes building fast, SEO-friendly, and scalable web apps easy by handling routing, rendering, and APIs out of the box.
 [🔗 Next docs](https://nextjs.org/docs)

### Firebase Realtime Database
Firebase tracks playlist creation events and enforces the per-user rate limit (5 playlists/day, resets at UTC midnight).
[🔗 Firebase docs](https://firebase.google.com/docs/database)

### Vercel
Vercel hosts the Next.js frontend and serverless APIs, providing fast, scalable deployment for both UI and backend logic
[🔗 Vercel docs](https://vercel.com/docs/frameworks/full-stack/nextjs)

### Vercel Analytics
Vercel Analytics tracks page views and user interactions with zero configuration
[🔗 Vercel Analytics docs](https://vercel.com/docs/analytics)


## App Structure
                ┌─────────────────────────┐
                │       App / Pages       │
                └─────────────────────────┘
                              │
                              ▼
                ┌──────────────────────────┐
                │        API / Server      |────────────────────┐
                |──────────────────────────|                    │
                |  • Auth (via Spotify)    |                    ▼
                |  • Spotify API           │   ┌─────────────────────────┐
                └──────────────────────────┘   │       Firebase DB       │
                              │                │─────────────────────────│
                              │                │  playlists node         │
                              │                │    • userId             │
                              │                │    • playlistId         │
                              │                │    • artists            │
                              │                │    • environment        │
                              │                │    • timestamp          │
                              │                │                         │
                              │                │  rate limit: 5/day      │
                              │                │  (per user, resets UTC) │
                              ▼                └─────────────────────────┘
                  ┌────────────────────────┐
                  │   SWR / Axios Cache    │
                  │ (API calls, queries)   │
                  └────────────────────────┘
                              │
                              ▼
       ┌─────────────────────────────────────────────┐
       │           Top-level React Contexts          │
       │─────────────────────────────────────────────│
       │  AuthContext                                │
       │    • user (id, displayName, email, image)   │
       │    • isAuthenticated                        │
       │    • isLoading                              │
       │    • logout()                               │
       │                                             │
       │  ToastContext                               │
       │    • toast() / success() / error()          │
       │    • warning() / info()                     │
       └─────────────────────────────────────────────┘
                              │
                              ▼
       ┌─────────────────────────────────────────────┐
       │               Main Components               │
       │─────────────────────────────────────────────│
       │  Creator                                    │
       │    • CreatorContext                         │
       │        – artists[], playlistUri             │
       │        – selectArtist() / deselectArtist()  │
       │        – generatePlaylist()                 │
       │                                             │
       │  Gallery                                    │
       │    • displays embedded Spotify playlists    │
       └─────────────────────────────────────────────┘


## API Reference

See [docs/api.md](docs/api.md) for full endpoint documentation.

## Get Started

### Run development server
```bash
pnpm dev
```

### Run tests
```bash
pnpm test
```

### Build
```bash
pnpm build
```
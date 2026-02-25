# spotify artists playlist generator


## Problem

Spotify has great tools for generating playlists and mixes personalized to your listening history.
Their "smart shuffle" is incredible at augmenting and enhancing playlists with similar songs.

However, I want to create playlists from just a few artists top songs - that's it.

https://community.spotify.com/t5/Content-Questions/How-to-create-a-Playlist-of-artists/td-p/5982188


## Tech Stack

### Next
Next.js is a React framework that makes building fast, SEO-friendly, and scalable web apps easy by handling routing, rendering, and APIs out of the box.

[🔗 Next documentation](https://nextjs.org/docs)

### Vercel
Vercel hosts the Next.js frontend and serverless APIs, providing fast, scalable deployment for both UI and backend logic

[🔗 Vercel documentation](https://vercel.com/docs/frameworks/full-stack/nextjs)

### Vercel Analytics
Vercel Analytics tracks page views and user interactions with zero configuration

[🔗 Vercel Analytics documentation](https://vercel.com/docs/analytics)


### Breakdown
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
                └──────────────────────────┘   │       Supabase DB       │
                              │                │─────────────────────────│
                              │                │  events table           │
                              │                │    • event              │
                              │                │    • user_id            │
                              │                │    • payload            │
                              │                │    • environment        │
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
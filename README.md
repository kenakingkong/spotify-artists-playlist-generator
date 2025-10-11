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

### MobX
MobX is a state management system automatically updates only the parts of your app that depend on the state when it changes.

[🔗 MobX documentation](https://mobx.js.org/README.html)

### TanStack Query
TanStack Query is a library for managing server state that simplifies data fetching, caching, and synchronization.

[🔗 TanStack Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview)

### Vercel
Vercel hosts the Next.js frontend and serverless APIs, providing fast, scalable deployment for both UI and backend logic

[🔗 Vercel documentation](https://vercel.com/docs/frameworks/full-stack/nextjs)


### Breakdown
                ┌─────────────────────────┐
                │       App / Pages       │
                └─────────────────────────┘
                              │
                              ▼
                ┌──────────────────────────┐
                │        API / Server      |
                |──────────────────────────|
                |  • Auth (via Spotify)    |
                |  • Spotify API           │
                └──────────────────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │   React Query Cache    │
                  │ (API calls, queries)   │
                  └────────────────────────┘
                              │
                              ▼
       ┌─────────────────────────────────────────────┐
       │                  MobX Stores                │
       │─────────────────────────────────────────────│
       │  LibraryStore                               │
       │    • songs                                  │
       │    • artists                                │
       │                                             │
       │  PlaylistWizardStore                        │
       │    • songs                                  │
       │    • artist                                 │
       │    • name                                   │
       |    • url                                    |
       │    • currentStep                            │
       |                                             |
       |─────────────────────────────────────────────|
       |            React Context / State            │
       |─────────────────────────────────────────────|
       │  UserProfileContext                         │
       │    • id                                     │ 
       │    • displayName                            │
       │    • email                                  │
       │    • image                                  |
       └─────────────────────────────────────────────┘
                              │
                              ▼
       ┌─────────────────────────────────────────────┐
       │                  Components                 │
       |─────────────────────────────────────────────|
       │  • Wizard                                   |
       |    0. SignIn                                |
       |    1. Artists                               |
       |    2. Songs                                 |
       |    3. Playlist                              │
       │  • Search Component (Song, Artist).         │
       │  • Select Component (Song, Artist)          │
       └─────────────────────────────────────────────┘
                              │
                              ▼
       ┌─────────────────────────────────────────────┐
       │               Vercel Hosting                │
       |─────────────────────────────────────────────|
       │  • Frontend deployed as static/SSR pages    │
       │  • Serverless API endpoints.                │
       │    • e.g., send email when playlist created │
       │    • logging                                │
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
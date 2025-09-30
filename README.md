spotify artists playlist generator

```bash
pnpm dev
```

# Resources
https://community.spotify.com/t5/Content-Questions/How-to-create-a-Playlist-of-artists/td-p/5982188

# Architecture/Flow
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
       │  ObservableLibraryStore                     │
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
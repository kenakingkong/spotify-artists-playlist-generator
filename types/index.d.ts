declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
    Spotify?: {
      Player: any;
    };
  }
}

export {};

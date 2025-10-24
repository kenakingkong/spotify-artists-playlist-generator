// Type definitions for Spotify IFrame API
// https://developer.spotify.com/documentation/embeds/references/iframe-api

export interface SpotifyIFrameAPI {
  createController(
    element: HTMLElement,
    options: SpotifyEmbedOptions,
    callback: (controller: SpotifyEmbedController) => void
  ): void;
}

export interface SpotifyEmbedOptions {
  uri: string;
  width?: string | number;
  height?: string | number;
  theme?: "light" | "dark";
}

export interface SpotifyEmbedController {
  play(): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  togglePlay(): Promise<void>;
  seek(seconds: number): Promise<void>;
  destroy(): void;
  addListener(event: string, callback: (data: any) => void): void;
  removeListener(event: string): void;
}

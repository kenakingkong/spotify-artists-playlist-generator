import { useEffect, useRef } from "react";
import Script from "next/script";
import {
  SpotifyEmbedController,
  SpotifyEmbedOptions,
  SpotifyIFrameAPI,
} from "@/types/spotify";
import { useCreatorContext } from "../context";

export default function StepPlaylist() {
  const { playlistUri } = useCreatorContext();

  const embedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
      if (!playlistUri) return;

      const element = embedRef?.current;
      if (!element) return;

      const options: SpotifyEmbedOptions = {
        theme: "light",
        uri: playlistUri,
      };

      const callback = (EmbedController: SpotifyEmbedController) => {
        // console.log("callback");
      };

      IFrameAPI.createController(element, options, callback);
    };
  }, [playlistUri]);

  if (!playlistUri) return null;

  return (
    <div>
      <Script
        src="https://open.spotify.com/embed/iframe-api/v1"
        strategy="afterInteractive"
      />
      <div ref={embedRef} />
    </div>
  );
}

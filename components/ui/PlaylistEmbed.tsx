import { useEffect, useRef } from "react";
import Script from "next/script";
import {
  SpotifyEmbedController,
  SpotifyEmbedOptions,
  SpotifyIFrameAPI,
} from "@/types/spotify";

let cachedAPI: SpotifyIFrameAPI | null = null;
const pendingCallbacks: Array<(api: SpotifyIFrameAPI) => void> = [];

function registerEmbed(cb: (api: SpotifyIFrameAPI) => void) {
  if (cachedAPI) {
    cb(cachedAPI);
    return;
  }
  pendingCallbacks.push(cb);
  window.onSpotifyIframeApiReady = (api: SpotifyIFrameAPI) => {
    cachedAPI = api;
    pendingCallbacks.splice(0).forEach((fn) => fn(api));
  };
}

export default function PlaylistEmbed({
  uri,
  height,
  callback = () => {},
}: {
  uri: string;
  height?: number;
  callback?: (c: SpotifyEmbedController) => void;
}) {
  const embedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerEmbed((api) => {
      const element = embedRef.current;
      if (!element) return;

      const options: SpotifyEmbedOptions = {
        uri,
        theme: "light",
        width: "100%",
        height,
      };

      api.createController(element, options, callback);
    });
  }, [uri]);

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

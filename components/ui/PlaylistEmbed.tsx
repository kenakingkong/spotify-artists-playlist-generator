import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  SpotifyEmbedController,
  SpotifyEmbedOptions,
  SpotifyIFrameAPI,
} from "@/types/spotify";
import classNames from "classnames";

const REVEAL_DELAY = 3000;

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
  const [visible, setVisible] = useState(false);

  const playlistId = uri.split(":").slice(-1)[0];
  const spotifyUrl = `https://open.spotify.com/playlist/${playlistId}`;

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), REVEAL_DELAY);
    return () => clearTimeout(timer);
  }, [uri]);

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
  }, [uri]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full h-[352px] bg-app-dark-gray overflow-hidden">
      <Script
        src="https://open.spotify.com/embed/iframe-api/v1"
        strategy="afterInteractive"
      />
      {!visible && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          <p className="text-sm text-gray-600">Loading preview</p>
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-gray-500 hover:underline"
          >
            {spotifyUrl}
          </a>
        </div>
      )}
      <div
        ref={embedRef}
        className={classNames(!visible && "invisible h-0 overflow-hidden")}
      />
    </div>
  );
}

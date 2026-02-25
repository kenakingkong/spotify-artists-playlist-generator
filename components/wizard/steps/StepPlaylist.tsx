import { useEffect, useRef } from "react";
import Script from "next/script";
import { SpotifyEmbedOptions, SpotifyIFrameAPI } from "@/types/spotify";
import WizardLayout from "../WizardLayout";

export default function StepPlaylist() {
  const playlistUri =
    "spotify:playlist:0Qy7SBCnfBunmDuOuyCnfG?si=acfaf3f1e67448a1";
  const embedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
      const element = embedRef?.current;
      if (!element) return;

      const options: SpotifyEmbedOptions = {
        theme: "light",
        uri: playlistUri,
      };

      const callback = () => {
        console.log("callback");
      };

      IFrameAPI.createController(element, options, callback);
    };
  }, [playlistUri]);

  return (
    <WizardLayout>
      <Script
        src="https://open.spotify.com/embed/iframe-api/v1"
        strategy="afterInteractive"
      />
      <div ref={embedRef} />
    </WizardLayout>
  );
}

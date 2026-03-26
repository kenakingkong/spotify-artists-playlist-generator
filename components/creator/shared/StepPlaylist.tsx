import PlaylistEmbed from "@/components/ui/PlaylistEmbed";
import { useCreatorContext } from "../context";
import useCopy from "@/hooks/useCopy";
import SectionHeader from "@/components/ui/SectionHeader";

export default function StepPlaylist() {
  const { playlistUri, reset } = useCreatorContext();

  const spotifyUrl = playlistUri
    ? `https://open.spotify.com/playlist/${playlistUri.split(":").slice(-1)[0]}`
    : "";

  const { copied, onCopy } = useCopy(spotifyUrl);

  if (!playlistUri) return null;

  return (
    <div>
      <SectionHeader>Your setlist</SectionHeader>
      <div className="space-y-[20px] pb-[20px]">
        <div className="relative">
          <span className="absolute left-2 top-2">🔗</span>
          <input
            type="url"
            value={spotifyUrl}
            readOnly
            onClick={onCopy}
            className="input p-[10px] pl-[30px] pr-0"
          />
          {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
        </div>
        <div className="px-[10px] lg:px-0">
          <PlaylistEmbed uri={playlistUri} />
        </div>
        <div className="px-[10px] lg:px-0">
          <button
            className="w-full lg:w-max button button-pink"
            onClick={reset}
          >
            Create a new playlist 🔄
          </button>
        </div>
      </div>
    </div>
  );
}

import PlaylistEmbed from "@/components/ui/PlaylistEmbed";
import { useCreatorContext } from "../context";
import useCopy from "@/hooks/useCopy";

export default function StepPlaylist() {
  const { playlistUri, reset } = useCreatorContext();

  const spotifyUrl = playlistUri
    ? `https://open.spotify.com/playlist/${playlistUri.split(":").slice(-1)[0]}`
    : "";

  const { copied, onCopy } = useCopy(spotifyUrl);

  if (!playlistUri) return null;

  return (
    <div className="space-y-4">
      <PlaylistEmbed uri={playlistUri} />
      <div className="min-h-40 sm:min-h-32 border rounded-lg flex flex-col gap-1 p-4">
        <p className="text-sm font-bold">You just made a playlist 🥳</p>
        <div className="relative">
          <span className="absolute left-1 top-1.5">🔗</span>
          <input
            type="url"
            value={spotifyUrl}
            readOnly
            onClick={onCopy}
            className="border border-gray-200 bg-gray-200/50 rounded w-full p-2 pl-6 text-xs cursor-pointer"
          />
          {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
        </div>
        <button
          className="mt-4 w-max text-xs hover:underline cursor-pointer"
          onClick={reset}
        >
          Create a new playlist 🔄
        </button>
      </div>
    </div>
  );
}

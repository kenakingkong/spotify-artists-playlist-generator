import ErrorBoundary from "../ui/ErrorBoundary";
import PlaylistEmbed from "../ui/PlaylistEmbed";

const DEFAULT_PLAYLIST_URIS = [
  "spotify:playlist:6hGg3TyQPnrh46s4TtLy8f",
  "spotify:playlist:20dD6PlCOxkNDTlnqfVEm6",
  "spotify:playlist:6n0Cel9V4PDzT0ovlTVeN6",
  "spotify:playlist:1qdYnIAuPCW4bJ18I9JZj1" ,
];

export default function Gallery() {
  return (
    <ul className="space-y-2">
      {DEFAULT_PLAYLIST_URIS.map((uri) => (
        <li key={`playlist-${uri}`}>
          <ErrorBoundary>
            <PlaylistEmbed uri={uri} />
          </ErrorBoundary>
        </li>
      ))}
    </ul>
  );
}

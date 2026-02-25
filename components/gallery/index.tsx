import ErrorBoundary from "../ui/ErrorBoundary";
import PlaylistEmbed from "../ui/PlaylistEmbed";

const DEFAULT_PLAYLIST_URIS = [
  "spotify:playlist:3GVTzTg6m8YrCmGlzMf3zP",
  "spotify:playlist:3DGu8kYiiaqIdwCeyUZaLe?si=3dacb56b721e486c",
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

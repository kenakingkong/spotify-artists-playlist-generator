import ErrorBoundary from "../ui/ErrorBoundary";
import PlaylistEmbed from "../ui/PlaylistEmbed";

const DEFAULT_PLAYLIST_URIS = [
  "spotify:playlist:6lJb9QkmsZg2mAkNzwXzmz",
  "spotify:playlist:1rbomkz3hlS9QOzcmE2Cjq",
  "spotify:playlist:4rlf35FNPmHK1XIlpVxAfA",
  // "spotify:playlist: - 3.14 one" ,
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

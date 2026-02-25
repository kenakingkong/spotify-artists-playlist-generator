import { IArtist } from "@/types/artist";
import ArtistPill from "./ArtistPill";
import { useCreatorContext } from "../context";

export default function SelectedArtists() {
  const { artists } = useCreatorContext();

  if (!artists) return null;

  return (
    <ul className="flex items-center gap-2">
      {artists.map((artist: IArtist) => (
        <li key={`selected-artists-${artist.id}`}>
          <ArtistPill artist={artist} />
        </li>
      ))}
    </ul>
  );
}

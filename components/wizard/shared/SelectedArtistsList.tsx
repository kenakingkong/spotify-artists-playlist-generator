import { IArtist } from "@/types/artist";
import SelectedArtistPreview from "./SelectedArtistPreview";

export default function SelectedArtists() {
  const artists: Array<IArtist> = [];

  return (
    <ul className="flex gap-1">
      {artists.map((artist: IArtist) => (
        <li key={`selected-${artist.id}`}>
          <SelectedArtistPreview artist={artist} />
        </li>
      ))}
    </ul>
  );
}

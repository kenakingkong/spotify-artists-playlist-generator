import { IArtist } from "@/types/artist";
import ArtistPill from "./ArtistPill";
import { MAX_ARTISTS, useCreatorContext } from "../context";
import classNames from "classnames";

export default function SelectedArtists() {
  const { artists } = useCreatorContext();

  const totalArtists = artists.length;
  const isAtLimit = totalArtists == MAX_ARTISTS;

  if (!artists) return null;

  return (
    <div className="space-y-1">
      {!!totalArtists && (
        <span
          role="alert"
          className={classNames(
            isAtLimit ? "text-red-600" : "text-black",
            "block text-xs",
          )}
        >
          Selected {totalArtists}/{MAX_ARTISTS} artists.
        </span>
      )}
      <ul className="flex flex-wrap items-center gap-2">
        {artists.map((artist: IArtist) => (
          <li key={`selected-artists-${artist.id}`}>
            <ArtistPill artist={artist} />
          </li>
        ))}
      </ul>
    </div>
  );
}

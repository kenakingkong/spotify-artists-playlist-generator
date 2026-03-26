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
    <div className="space-y-[10px] pt-[10px]">
      {!!totalArtists && (
        <span
          role="alert"
          className={classNames(
            isAtLimit ? "text-app-pink" : "text-black",
            "block text-sm font-medium",
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

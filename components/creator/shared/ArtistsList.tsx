import { memo } from "react";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { IArtist } from "@/types/artist";
import ArtistLoadingSkeleton from "./ArtistLoadingSkeleton";
import ArtistPreview from "./ArtistPreview";
import GentleMessage from "@/components/ui/GentleMessage";

interface IArtistsListProps {
  id: string;
  artists?: Array<IArtist>;
  isLoading: boolean;
  error: string;
}

function ArtistsList({ id, artists, isLoading, error }: IArtistsListProps) {
  if (error) {
    return (
      <div className="p-[10px] lg:px-0">
        <ErrorMessage />
      </div>
    );
  }

  if (isLoading) {
    return (
      <ul className="space-y-[5px] p-[10px] lg:px-0">
        {Array.from({ length: 10 }).map((_, num) => (
          <li key={`loading-artist-${num}`}>
            <ArtistLoadingSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (!artists) {
    return null;
  }

  if (!artists.length) {
    return (
      <div className="p-[10px] lg:px-0">
        <GentleMessage>Try a different search</GentleMessage>
      </div>
    );
  }

  return (
    <ul className="space-y-[5px] p-[10px] lg:px-0">
      {artists.map((artist: IArtist) => (
        <li key={`${id}-${artist.id}`}>
          <ArtistPreview artist={artist} />
        </li>
      ))}
    </ul>
  );
}

export default memo(ArtistsList);

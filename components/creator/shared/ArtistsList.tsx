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
    return <ErrorMessage />;
  }

  if (isLoading) {
    return (
      <ul className="space-y-1">
        {[1, 2, 3].map((num: number) => (
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
    return <GentleMessage>Try a different search</GentleMessage>;
  }

  return (
    <ul className="space-y-1">
      {artists.map((artist: IArtist) => (
        <li key={`${id}-${artist.id}`}>
          <ArtistPreview artist={artist} />
        </li>
      ))}
    </ul>
  );
}

export default memo(ArtistsList);

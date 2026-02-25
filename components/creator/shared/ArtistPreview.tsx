import { memo } from "react";

import classNames from "classnames";
import Image from "next/image";

import { IArtist } from "@/types/artist";
import { MAX_ARTISTS, useCreatorContext } from "../context";

function ArtistPreview({ artist }: { artist: IArtist }) {
  const { artists, toggleArtist } = useCreatorContext();

  const { id, name, uri, images } = artist;
  const coverImage = images[0];
  const isAtLimit = artists.length == MAX_ARTISTS;
  const isSelected = artists.find((artist) => artist.id == id);

  function onClick() {
    toggleArtist(artist);
  }

  return (
    <button
      type="button"
      value={uri}
      className={classNames(
        "w-full rounded border overflow-hidden flex items-center text-left cursor-pointer",
        "transition-all hover:scale-[101%]",
        isSelected && "bg-gray-200/50",
      )}
      onClick={onClick}
      disabled={isAtLimit && !isSelected}
    >
      {coverImage?.url ? (
        <Image
          src={coverImage.url}
          alt={`${name} cover photo`}
          height={40}
          width={40}
          className="object-cover w-10 h-10"
        />
      ) : (
        <div className="h-10 w-10 bg-gray-300 flex items-center justify-center">
          <span>👤</span>
        </div>
      )}
      <p className="grow p-2 text-sm">{name}</p>
      {isSelected && <i className="pr-2">☑️</i>}
    </button>
  );
}

export default memo(ArtistPreview);

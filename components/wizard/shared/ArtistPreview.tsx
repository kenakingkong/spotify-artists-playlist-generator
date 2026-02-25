import { memo } from "react";

import classNames from "classnames";
import Image from "next/image";

import { IArtist } from "@/types/artist";

function ArtistPreview({ artist }: { artist: IArtist }) {
  const { name, uri, images } = artist;
  const coverImage = images[0];

  function onClick() {
    
  }

  return (
    <button
      type="button"
      value={uri}
      className={classNames(
        "w-full rounded border overflow-hidden flex items-center text-left cursor-pointer",
        "transition-transform hover:scale-[101%] focus:scale-[101%]"
      )}
    >
      <Image
        src={coverImage.url}
        alt={`${name} cover photo`}
        height={40}
        width={40}
        className="object-cover w-10 h-10"
      />
      <p className="grow p-2 text-sm">{name}</p>
    </button>
  );
}

export default memo(ArtistPreview);

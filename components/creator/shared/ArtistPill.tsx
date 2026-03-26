import { memo } from "react";

import classNames from "classnames";
import { IArtist } from "@/types/artist";
import { useCreatorContext } from "../context";

function ArtistPill({ artist }: { artist: IArtist }) {
  const { deselectArtist } = useCreatorContext();

  const { id, name, uri } = artist;

  function onClick() {
    deselectArtist(id);
  }

  return (
    <button
      type="button"
      value={uri}
      className={classNames(
        "p-[5px] w-max border overflow-hidden flex items-center gap-2.5 text-left cursor-pointer",
        "bg-app-black/10 transition-all hover:scale-[101%]",
      )}
      onClick={onClick}
    >
      <span className="text-sm">{name}</span>
      <span className="text-[10px] font-bold">🅇</span>
    </button>
  );
}

export default memo(ArtistPill);

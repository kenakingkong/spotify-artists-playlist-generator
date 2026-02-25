import { IArtist } from "@/types/artist";
import classNames from "classnames";

export default function SelectedArtistPreview({ artist }: { artist: IArtist }) {
  const { name, uri } = artist;

  return (
    <button
      type="button"
      value={uri}
      className={classNames(
        "w-max p-1 rounded border overflow-hidden flex items-center text-left cursor-pointer",
        "transition-transform hover:scale-[101%] focus:scale-[101%]"
      )}
    >
      <p className="text-sm">{name}</p>
    </button>
  );
}

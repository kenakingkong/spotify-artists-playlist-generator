import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";
import { IArtist } from "@/types/artist";
import { ICreatorContextProps } from "./types";

export const MAX_ARTISTS = 10;

const CreatorContext = createContext<ICreatorContextProps>({
  playlistUri: null,
  artists: [],
  reset: () => {},
  selectArtist: () => {},
  deselectArtist: () => {},
  toggleArtist: () => {},
  generatePlaylist: () => {},
});

export function CreatorContextProvider({
  onReset,    
  children,
}: {
  onReset: () => void;
  children: ReactNode;
}) {
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [playlistUri, setPlaylistUri] = useState<string | null>(null);

  function reset() {
    setArtists([]);
    setPlaylistUri(null);
    onReset();
  }

  function selectArtist(artist: IArtist) {
    setArtists((prev) => [...prev, artist]);
  }

  function deselectArtist(artistId: string) {
    setArtists((prev) =>
      prev.filter((artist: IArtist) => artist.id !== artistId),
    );
  }

  function toggleArtist(artist: IArtist) {
    if (artists.some((a) => a.id === artist.id)) {
      deselectArtist(artist.id);
    } else {
      selectArtist(artist);
    }
  }

  async function generatePlaylist(
    onSuccess?: () => void,
    onError?: (err: Error) => void,
  ) {
    try {
      const { data } = await axios.post("/api/spotify/playlists/generate", {
        artists: artists.map((a) => ({ id: a.id, name: a.name })),
      });

      setPlaylistUri(data.data.uri);
      setArtists([]);
      onSuccess?.();
    } catch (err) {
      onError?.(err as Error);
    }
  }

  return (
    <CreatorContext.Provider
      value={{
        playlistUri,
        artists,
        reset,
        selectArtist,
        deselectArtist,
        toggleArtist,
        generatePlaylist,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
}

export function useCreatorContext() {
  return useContext(CreatorContext);
}

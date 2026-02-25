import { IArtist } from "@/types/artist";
import { createContext, ReactNode, useContext, useState } from "react";
import { ICreatorContextProps } from "./types";
import { ITrack } from "@/types/track";
import generatePlaylistName from "@/utils/generatePlaylistName";
import axios from "axios";

const CreatorContext = createContext<ICreatorContextProps>({
  playlistUri: null,
  artists: [],
  selectArtist: () => {},
  deselectArtist: () => {},
  toggleArtist: () => {},
  generatePlaylist: () => {},
});

export function CreatorContextProvider({
  userId,
  children,
}: {
  userId: string;
  children: ReactNode;
}) {
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [playlistUri, setPlaylistUri] = useState<string | null>(null);

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
      // get top tracks per artist
      const artistTrackUris = await Promise.all(
        artists.map(async (artist) => {
          const { data } = await axios.get(
            `/api/spotify/artists/${artist.id}/top-tracks`,
          );
          return data.data.tracks.map((track: ITrack) => track.uri);
        }),
      );

      // create a playlist
      const createPlaylistResponse = await axios.post(
        "/api/spotify/playlists",
        {
          userId,
          name: generatePlaylistName(artists.map((a) => a.name)),
        },
      );
      const { id: playlistId, uri } = createPlaylistResponse.data.data;

      // add tracks to playlist
      await axios.post(`/api/spotify/playlists/${playlistId}/tracks`, {
        uris: Array.from(new Set(artistTrackUris.flat())),
      });

      setPlaylistUri(uri);
      setArtists([]);
      onSuccess?.();
    } catch (err: any) {
      onError?.(err);
    }
  }

  return (
    <CreatorContext.Provider
      value={{
        playlistUri,
        artists,
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

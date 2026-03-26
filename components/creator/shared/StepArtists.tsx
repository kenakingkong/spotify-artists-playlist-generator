import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import useFetch from "@/hooks/useFetch";
import SearchBar from "@/components/ui/SearchBar";

import { useCreatorContext } from "../context";
import ArtistsList from "./ArtistsList";
import GeneratePlaylistButton from "./GeneratePlaylistButton";
import SelectedArtists from "./SelectedArtists";
import SectionHeader from "@/components/ui/SectionHeader";

const DEBOUNCE_DELAY = 300;

export default function StepArtists() {
  const { playlistUri } = useCreatorContext();

  const [query, setQuery] = useState<string | undefined>();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const topArtistsData = useFetch("/api/spotify/me/top-artists?limit=10");
  const queryArtistsData = useFetch(
    query ? `/api/spotify/search/artists?limit=10&q=${query}` : undefined,
  );

  const searchedArtists = queryArtistsData.data?.data?.artists?.items;
  const topArtists = topArtistsData.data?.data?.items;

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      setQuery(event.target.value.trim() || undefined);
    }, DEBOUNCE_DELAY);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  if (playlistUri) return null;

  return (
    <div>
      <SectionHeader>Add artists</SectionHeader>
      <SearchBar
        id="search-artists"
        placeholder="search any artist..."
        onChange={onChange}
      />
      <div className="grid lg:grid-cols-2 lg:gap-[10px]">
        <div className="space-y-[5px]">
          <ArtistsList
            id="searched-artists"
            artists={searchedArtists}
            isLoading={queryArtistsData.isLoading}
            error={queryArtistsData.error}
          />
          {!query && topArtists && (
            <ArtistsList
              id="top-artists"
              artists={topArtistsData.data?.data?.items || []}
              isLoading={topArtistsData.isLoading}
              error={topArtistsData.error}
            />
          )}
        </div>
        <div className="h-full p-[10px] lg:px-0">
          <div className="h-full flex flex-col justify-between lg:border border-app-black space-y-[10px]">
            <div className="lg:p-[10px]">
              <SelectedArtists />
            </div>
            <GeneratePlaylistButton />
          </div>
        </div>
      </div>
    </div>
  );
}

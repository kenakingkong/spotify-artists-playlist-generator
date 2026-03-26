import React, { useState } from "react";
import ErrorBoundary from "../ui/ErrorBoundary";
import PlaylistEmbed from "../ui/PlaylistEmbed";
import SectionHeader from "../ui/SectionHeader";


const DEFAULT_PLAYLISTS = {
  "spotify:playlist:6hGg3TyQPnrh46s4TtLy8f": "CLUB DARC 02.27.26: Chris Stussy, DJ Seinfeld, DJ Tennis, Skiis",
  "spotify:playlist:20dD6PlCOxkNDTlnqfVEm6": "CLUB DARC 03.07.26: Peggy Gou, Armand Van Helden, Silva Bumpa, Vertigo",
  "spotify:playlist:6n0Cel9V4PDzT0ovlTVeN6": "CLUB DARC 03.13.26: Mau P, Ben Sterling, Miguelle & Tons, Clearcast",
  "spotify:playlist:1qdYnIAuPCW4bJ18I9JZj1": "CLUB DARC 03.14.26: Michael Bibi, The Martinez Brothers, NEIL FRANCES, Luch, Brown Angel",
  "spotify:playlist:3V6v7gjl9a9z0dusp1ffcu": "CLUB DARC 04.18.26: Prospa, Josh Baker, Rossi., Chloé Caillet, Omar+, Marsolo, TÄRA",
}

export default function Gallery() {
  const totalPlaylists = Object.keys(DEFAULT_PLAYLISTS).length
  const [selectedPlaylistUri, setSelectedPlaylistUri] = useState<string | null>(null);

  function selectPlaylist(event: React.MouseEvent<HTMLButtonElement>) {
    const uri = event.currentTarget.value;
    setSelectedPlaylistUri(prev => prev === uri ? null : uri);
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto grid lg:grid-cols-2 lg:mt-[20px]">
      <div>
        <SectionHeader>Featured Playlists [{totalPlaylists}]</SectionHeader>
        <ul>
          {Object.entries(DEFAULT_PLAYLISTS).map(([uri, name], index) => (
            <li
              key={`playlist-${uri}`}
              className="border-b border-app-black"
            >
              <button
                className="group flex items-center text-left cursor-pointer w-full"
                value={uri}
                onClick={selectPlaylist}
                data-selected={selectedPlaylistUri === uri}
              >
                <div className="bg-app-black text-app-gray p-[10px] lg:p-[15px] lg:text-lg">
                  <p>0{index + 1}</p>
                </div>
                <p className="group-data-[selected=true]:bg-app-black/10 px-[10px] line-clamp-2 text-sm lg:text-lg">
                  {name}
                </p>
              </button>
              {selectedPlaylistUri === uri && (
                <div className="lg:hidden">
                  <ErrorBoundary>
                    <PlaylistEmbed key={uri} uri={uri} />
                  </ErrorBoundary>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden lg:block">
        <ErrorBoundary>
          {selectedPlaylistUri ? (
            <PlaylistEmbed
              key={selectedPlaylistUri}
              uri={selectedPlaylistUri}
            />
          ) : (
            <div className="border border-app-black h-full p-[10px] flex items-center justify-center">
              ⬅️ Select a playlist to play
            </div>
          )
          }
        </ErrorBoundary>
      </div>
    </div>
  );
}

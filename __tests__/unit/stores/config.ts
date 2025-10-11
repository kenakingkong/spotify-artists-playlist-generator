import { IArtist } from "@/types/artist";
import { ITrack } from "@/types/track";

export const mockArtists: Array<IArtist> = [
  {
    href: "",
    id: "artist1",
    images: [],
    name: "The Beatles",
    type: "artist",
    uri: "artist:1",
  },
  {
    href: "",
    id: "artist2",
    images: [],
    name: "Beatles Tribute Band",
    type: "artist",
    uri: "artist:2",
  },
  {
    href: "",
    id: "artist3",
    images: [],
    name: "Rolling Stones",
    type: "artist",
    uri: "artist:3",
  },
];

export const mockTracks: Array<ITrack> = [
  {
    artists: [mockArtists[0], mockArtists[1]],
    href: "",
    id: "track1",
    name: "Yesterday",
    preview_url: "",
    type: "track",
    uri: "track:1",
  },
  {
    artists: [mockArtists[1]],
    href: "",
    id: "track2",
    name: "Yesterday Once More",
    preview_url: "",
    type: "track",
    uri: "track:2",
  },
  {
    artists: [mockArtists[2]],
    href: "",
    id: "track3",
    name: "Tomorrow",
    preview_url: "",
    type: "track",
    uri: "track:3",
  },
  {
    artists: [],
    href: "",
    id: "track4",
    name: "Song 4",
    preview_url: "",
    type: "track",
    uri: "track:4",
  },
];

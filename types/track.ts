import { IArtist } from "./artist";
import { IImage } from "./image";

export interface ITrack {
  id: string;
  uri: string;
  name: string;
  href: string;
  preview_url: string;
  type: string; //"track";
  album?: IAlbum;
  artists: Array<Partial<IArtist>>;
  available_markets?: Array<string>;
  disc_number?: number;
  duration_ms?: number;
  explicit?: false;
  external_ids?: Record<string, string>;
  external_urls?: Record<string, string>;
  is_playable?: false;
  linked_from?: {};
  restrictions?: Record<string, string>;
  popularity?: number;
  track_number?: number;
  is_local?: false;
}

export interface IAlbum {
  id: string;
  uri: string;
  name: string;
  href: string;
  images: Array<IImage>;
  type: string; // "album"
  release_date: string;
  artists: Array<Partial<IArtist>>;
  release_date_precision: string;
  album_type: string; // "compilation",
  total_tracks: number;
  available_markets: Array<string>; // ["CA", "BR", "IT"],
  external_urls: Record<string, string>;
  restrictions: Record<string, string>;
}

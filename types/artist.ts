import { IImage } from "./image";

export interface IArtist {
  id: string;
  uri: string;
  name: string;
  href: string;
  images: Array<IImage>;
  type: string; // "artist"
  popularity?: number;
  genres?: string[];
  external_urls?: Record<string, string>;
  followers?: {
    href: string;
    total: number;
  };

}

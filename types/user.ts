import { IImage } from "./image";

export interface IUser {
  id: string;
  displayName: string;
  email: string;
  image?: IImage;
}

export interface ISpotifyUser {
  type: string;
  id: string;
  display_name: string;
  email: string;
  href: string;
  images: Array<IImage>;
}

import { IImage } from "./image";

export interface IUser {
  id: string;
  displayName: string;
  email: string;
  image?: IImage;
}

export interface ISpotifyUser {
  type: "user";
  id: "test";
  display_name: "test";
  email: "test@email.com";
  href: "https://api.spotify.com/v1/users/test";
  images: Array<IImage>;
}

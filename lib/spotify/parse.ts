import { ISpotifyUser, IUser } from "@/types/user";

export function parseUserProfile(data?: ISpotifyUser) {
  if (!data) return null

  return {
    id: data.id,
    email: data.email,
    displayName: data.display_name,
    image: data.images?.[0],
  } as IUser;
}

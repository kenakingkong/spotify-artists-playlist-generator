import { supabase } from "../supabase";

type PlaylistCreatedPayload = {
  playlistId: string;
  artists: string[];
};

export async function trackPlaylistCreated(
  userId: string,
  payload: PlaylistCreatedPayload
) {
  const { error } = await supabase.from("events").insert({
    event: "playlist_created",
    user_id: userId,
    payload,
    environment: process.env.NODE_ENV,
  });

  if (error) {
    console.error("[events] trackPlaylistCreated error:", error.message);
  }
}
 
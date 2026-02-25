import { supabase } from "../supabase";

export async function getPlaylistsCreatedTodayCount(
  userId: string
): Promise<number> {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("event", "playlist_created")
    .eq("user_id", userId)
    .gte("created_at", startOfDay.toISOString());

  if (error) {
    console.error("[events] getPlaylistsCreatedTodayCount error:", error.message);
    return 0;
  }

  return count ?? 0;
}

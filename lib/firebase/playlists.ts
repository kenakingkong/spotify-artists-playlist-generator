import { database } from "firebase-admin";
import { db } from "./db";

type PlaylistCreatedPayload = {
  userId: string;
  playlistId: string;
  artists: string[];
};

export async function trackPlaylistCreated({
  userId,
  playlistId,
  artists,
}: PlaylistCreatedPayload) {
  const newPlaylist = {
    userId,
    playlistId,
    artists,
    environment: process.env.NODE_ENV || "development",
    timestamp: database.ServerValue.TIMESTAMP,
  };

  db.ref("playlists")
    .push(newPlaylist)
    .then((ref) =>
      console.log("[firebase] trackPlaylistCreated success:", ref.key),
    )
    .catch((err) => {
      console.error("[firebase] trackPlaylistCreated failed:", err.message);
    });
}

export async function getPlaylistsCreatedTodayCount(
  userId: string,
): Promise<number> {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  try {
    const snapshot = await db
      .ref("playlists")
      .orderByChild("userId")
      .equalTo(userId)
      .once("value");

    if (!snapshot.exists()) return 0;

    let count = 0;
    snapshot.forEach((child) => {
      const { timestamp } = child.val();
      if (timestamp && timestamp >= startOfDay.getTime()) count++;
    });

    return count;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[firebase] retrieve playlists count error:", message);
    return 0;
  }
}

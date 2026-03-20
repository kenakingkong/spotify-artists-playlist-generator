/**
 * @jest-environment node
 */

jest.mock("@/lib/firebase/db", () => ({
  db: { ref: jest.fn() },
}));

import { db } from "@/lib/firebase/db";
import {
  trackPlaylistCreated,
  getPlaylistsCreatedTodayCount,
} from "@/lib/firebase/playlists";

const refMock = db.ref as jest.Mock;

afterEach(() => {
  jest.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// trackPlaylistCreated
// ---------------------------------------------------------------------------

describe("unit/lib/firebase/playlists — trackPlaylistCreated", () => {
  const PAYLOAD = {
    userId: "user-1",
    playlistId: "playlist-1",
    artists: ["Artist A", "Artist B"],
  };

  let pushMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    pushMock = jest.fn();
    refMock.mockReturnValue({ push: pushMock });
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("pushes to db.ref('playlists') with correct payload shape", async () => {
    pushMock.mockResolvedValueOnce({ key: "abc123" });

    await trackPlaylistCreated(PAYLOAD);
    await Promise.resolve();

    expect(refMock).toHaveBeenCalledWith("playlists");
    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: PAYLOAD.userId,
        playlistId: PAYLOAD.playlistId,
        artists: PAYLOAD.artists,
        environment: expect.any(String),
        timestamp: expect.anything(),
      })
    );
  });

  it("logs success with the ref key", async () => {
    pushMock.mockResolvedValueOnce({ key: "abc123" });

    await trackPlaylistCreated(PAYLOAD);
    await Promise.resolve();

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("trackPlaylistCreated success"),
      "abc123"
    );
  });

  it("logs error when push rejects", async () => {
    pushMock.mockRejectedValueOnce(new Error("DB write failed"));

    await trackPlaylistCreated(PAYLOAD);
    await Promise.resolve();

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("trackPlaylistCreated failed"),
      "DB write failed"
    );
  });

  it("includes NODE_ENV in the pushed document", async () => {
    pushMock.mockResolvedValueOnce({ key: "x" });

    await trackPlaylistCreated(PAYLOAD);

    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        environment: process.env.NODE_ENV || "development",
      })
    );
  });
});

// ---------------------------------------------------------------------------
// getPlaylistsCreatedTodayCount
// ---------------------------------------------------------------------------

function makeSnapshot(entries: { userId: string; timestamp?: number }[]) {
  return {
    exists: () => entries.length > 0,
    forEach: (cb: (child: { val: () => any }) => void) => {
      entries.forEach((e) => cb({ val: () => e }));
    },
  };
}

function todayMs() {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}

function yesterdayMs() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  d.setUTCHours(23, 59, 59, 999);
  return d.getTime();
}

describe("unit/lib/firebase/playlists — getPlaylistsCreatedTodayCount", () => {
  let onceMock: jest.Mock;
  let equalToMock: jest.Mock;
  let orderByChildMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    onceMock = jest.fn();
    equalToMock = jest.fn(() => ({ once: onceMock }));
    orderByChildMock = jest.fn(() => ({ equalTo: equalToMock }));
    refMock.mockReturnValue({ orderByChild: orderByChildMock });
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("returns 0 when snapshot does not exist", async () => {
    onceMock.mockResolvedValueOnce(makeSnapshot([]));

    const count = await getPlaylistsCreatedTodayCount("user-1");

    expect(count).toBe(0);
  });

  it("queries the correct ref, child, and userId", async () => {
    onceMock.mockResolvedValueOnce(makeSnapshot([]));

    await getPlaylistsCreatedTodayCount("user-42");

    expect(refMock).toHaveBeenCalledWith("playlists");
    expect(orderByChildMock).toHaveBeenCalledWith("userId");
    expect(equalToMock).toHaveBeenCalledWith("user-42");
    expect(onceMock).toHaveBeenCalledWith("value");
  });

  it("counts only entries with a timestamp from today", async () => {
    const entries = [
      { userId: "user-1", timestamp: Date.now() },       // today
      { userId: "user-1", timestamp: Date.now() },       // today
      { userId: "user-1", timestamp: yesterdayMs() },    // yesterday — excluded
    ];
    onceMock.mockResolvedValueOnce(makeSnapshot(entries));

    const count = await getPlaylistsCreatedTodayCount("user-1");

    expect(count).toBe(2);
  });

  it("counts an entry at exactly the start of today", async () => {
    onceMock.mockResolvedValueOnce(makeSnapshot([{ userId: "user-1", timestamp: todayMs() }]));

    const count = await getPlaylistsCreatedTodayCount("user-1");

    expect(count).toBe(1);
  });

  it("returns 0 and logs error when the query rejects", async () => {
    onceMock.mockRejectedValueOnce(new Error("DB read failed"));

    const count = await getPlaylistsCreatedTodayCount("user-1");

    expect(count).toBe(0);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("retrieve playlists count error"),
      "DB read failed"
    );
  });

  it("skips entries with a missing timestamp", async () => {
    const entries: { userId: string; timestamp?: number }[] = [
      { userId: "user-1" },
      { userId: "user-1", timestamp: Date.now() },
    ];
    onceMock.mockResolvedValueOnce(makeSnapshot(entries));

    const count = await getPlaylistsCreatedTodayCount("user-1");

    expect(count).toBe(1);
  });
});

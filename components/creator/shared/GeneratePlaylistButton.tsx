import { useState } from "react";
import { useCreatorContext } from "../context";

const STATUSES = {
  idle: "idle",
  loading: "loading",
  error: "error",
  success: "success",
};

export default function GeneratePlaylistButton() {
  const [status, setStatus] = useState<string>(STATUSES.idle);
  const { artists, generatePlaylist } = useCreatorContext();

  function onSubmit() {
    if (!artists.length) {
      alert("Select 1 or more artists to create a playlist");
      return;
    }

    generatePlaylist(
      () => setStatus(STATUSES.success),
      () => setStatus(STATUSES.error),
    );
  }

  return (
    <button className="button" onClick={onSubmit}>
      {status === STATUSES.loading ? (
        <span>creating...</span>
      ) : (
        <span>create playlist</span>
      )}
    </button>
  );
}

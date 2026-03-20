import { useState } from "react";
import { useCreatorContext } from "../context";
import { useToast } from "@/contexts/ToastContext";
import { ERRORS } from "@/lib/errors";

const STATUSES = {
  idle: "idle",
  loading: "loading",
  error: "error",
  success: "success",
};

export default function GeneratePlaylistButton() {
  const [status, setStatus] = useState<string>(STATUSES.idle);
  const { artists, generatePlaylist } = useCreatorContext();
  const { error } = useToast();

  function onSubmit() {
    if (!artists.length) {
      error(ERRORS.NO_ARTISTS_SELECTED);
      return;
    }

    setStatus(STATUSES.loading);
    generatePlaylist(
      () => setStatus(STATUSES.success),
      (err) => {
        setStatus(STATUSES.error);

        const isRateLimit = (err as { response?: { status?: number } }).response?.status === 429;
        error(isRateLimit ? ERRORS.RATE_LIMIT_EXCEEDED : ERRORS.GENERIC);
      },
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

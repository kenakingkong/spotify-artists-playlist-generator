const DEFAULT_PLAYLIST_NAME = "My Playlist";
const END_CAP = " and more";
const MAX_CHARS = 100;

export default function generatePlaylistName(
  artistNames: string[],
  backupName = DEFAULT_PLAYLIST_NAME,
) {
  if (artistNames.length === 0) return backupName;

  const names = [...artistNames];
  let joined = names.join(", ");

  if (joined.length <= MAX_CHARS) return joined;

  while (names.length > 1 && joined.length + END_CAP.length > MAX_CHARS) {
    names.pop();
    joined = names.join(", ");
  }

  return joined + END_CAP;
}

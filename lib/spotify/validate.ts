export function isValidUriString(uris?: string): boolean {
  if (!uris) return false;
  if (!uris.startsWith("uris=")) return false;

  const clean = uris.replace(/^uris=/, "").trim();
  if (!clean) return false;

  const arr = clean
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);

  if (arr.length < 1 || arr.length > 100) return false;

  const invalid = arr.find((u) => !u.startsWith("spotify:track:"));
  if (invalid) return false;

  return true;
}

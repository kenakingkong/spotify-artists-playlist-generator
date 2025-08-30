/**
 * Filters an array of track URIs to valid Spotify track URIs (must start with 'spotify:track:')
 * and limits the length to 1-100 items.
 */
function validateUris(uris?: string[] | string): string[] {
  if (!uris) return [];

  const uriArray: string[] = Array.isArray(uris) ? uris : uris.split(",");

  const validURIS = uriArray
    .map((u) => u.trim())
    .filter((u) => u.startsWith("spotify:track:"))
    .slice(0, 100);

  if (!validURIS.length) return [];

  return validURIS;
}
/**
 * Converts a list of track URIs into a comma-separated list (String).
 */
export function urisToQueryString(uris?: string[]): string {
  const validUris = validateUris(uris);

  if (!validUris.length) return "";
  return validUris.join(",");
}

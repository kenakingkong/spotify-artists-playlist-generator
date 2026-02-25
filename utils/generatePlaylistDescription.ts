const DEFAULT_URL = "https://spotify-artists-playlist-generator.vercel.app/";

export default function generatePlaylistDescription(url = DEFAULT_URL) {
  return `This playlist was created with ${url}`;
}

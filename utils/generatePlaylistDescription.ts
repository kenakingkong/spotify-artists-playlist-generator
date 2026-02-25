const DEFAULT_URL = "https://setlists.makenakong.com/";

export default function generatePlaylistDescription(url = DEFAULT_URL) {
  return `This playlist was created with ${url}`;
}

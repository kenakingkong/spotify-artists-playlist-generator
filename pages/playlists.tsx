import Head from "next/head";
import Gallery from "@/components/home/gallery";

export default function Playlists() {
  return (
    <>
      <Head>
        <title>Your Playlists | Setlists</title>
        <meta name="description" content="View and manage the Spotify playlists you've created with Setlist." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Gallery />
    </>
  );
}

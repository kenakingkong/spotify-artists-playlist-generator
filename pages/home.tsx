import Head from "next/head";
import Bars from "@/components/home/bars";
import Gallery from "@/components/home/gallery";
import Hero from "@/components/home/hero";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-app-gray pb-[20px] lg:pb-[50px]">
      <Head>
        <title>Setlists | Create a Spotify Playlist from Your Favorite Artists</title>
        <meta name="description" content="Enter your favorite DJs or artists and we'll pull their top tracks into a ready-to-play Spotify playlist." />
      </Head>
      <Hero isAuthenticated={isAuthenticated} />
      <Bars />
      <Gallery />
    </div>
  );
}

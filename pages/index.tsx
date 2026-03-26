import Head from "next/head";
import Creator from "@/components/creator";
import Bars from "@/components/home/bars";
import Gallery from "@/components/home/gallery";
import Hero from "@/components/home/hero";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Creator />;

  const title = "Setlists | Create a Spotify Playlist from Your Favorite Artists";
  const description = "The free Spotify playlist generator for concert and festival prep. Pick up to 10 artists, get all their top tracks in one playlist. Try it free.";

  return (
    <div className="bg-app-gray">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL ?? "https://setlist.makenakong.com"} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL ?? "https://setlist.makenakong.com"} />
      </Head>
      <Hero isAuthenticated={isAuthenticated} />
      <Bars />
      <Gallery />
    </div>
  );
}

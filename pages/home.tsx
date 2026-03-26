import Bars from "@/components/home/bars";
import Gallery from "@/components/home/gallery";
import Hero from "@/components/home/hero";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-app-gray">
      <Hero isAuthenticated={isAuthenticated} />
      <Bars />
      <Gallery />
      <div className="w-full max-w-[1000px] mx-auto p-[10px] py-[20px] text-sm lg:mt-[20px]">
        <p>I made this app because I needed to quickly generate playlists for sets where I didn’t know all the djs.</p>
        <br />
        <p>
          <a href="https://makenakong.com" target="_blank" rel="noopener noreferrer" className="link">makenakong.com</a>
          |
          <a href="https://github.com/kenakingkong/spotify-artists-playlist-generator" target="_blank" rel="noopener noreferrer" className="link">github repo</a>
        </p>
      </div>
    </div>
  );
}

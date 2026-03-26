import Head from "next/head";
import Link from "next/link";
import SignInButton from "@/components/auth/SignInButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { useAuth } from "@/contexts/AuthContext";

export default function About() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Head>
        <title>about | setlists</title>
        <meta
          name="description"
          content="setlists lets you pick artists and instantly builds a spotify playlist from their top tracks. great for concert prep, festival lineups, or dj sets."
        />
        <meta property="og:title" content="about | setlists" />
        <meta
          property="og:description"
          content="setlist lets you pick artists and instantly builds a spotify playlist from their top tracks. great for concert prep, festival lineups, or dj sets."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://setlist.makenakong.com"}/about`}
        />
      </Head>
      <div className="w-full max-w-[700px] mx-auto p-[10px] py-[50px] space-y-[20px]">
        <h1 className="text-5xl font-sans font-black">About setlists</h1>

        <div className="space-y-[10px]">
          <SectionHeader>what</SectionHeader>
          <p className="text-sm">
            Pick up to 10 artists, we grab their top tracks and drops them into a new spotify playlist.
          </p>
          <ol className="list-decimal list-inside text-sm space-y-[5px]">
            <li>Sign in with spotify.</li>
            <li>Search and add artists.</li>
            <li>Hit <strong>create playlist</strong>. we pull each artist&apos;s top tracks into a new playlist on your account.</li>
            <li>Open it in spotify and start listening</li>
          </ol>
        </div>
        <div className="space-y-[10px]">
          <SectionHeader>why</SectionHeader>
          <p className="text-sm">
            i built this for myself.
            i&apos;d go to sets without knowing the openers/b2bs because i couldn&apos;t find the time/energy to look each dj up and listen to their songs.
            i needed to ramp up quick, all i needed was their top tracks and the spotify magic shuffle.
            and now i have it.
          </p>
        </div>
        <div className="space-y-[10px]">
          <SectionHeader>how</SectionHeader>
          <p className="text-sm">
            Source on{" "}
            <a
              href="https://github.com/kenakingkong/spotify-artists-playlist-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              github
            </a>
          </p>
        </div>
        <div className="space-y-[10px]">
          <SectionHeader>who</SectionHeader>
          <p className="text-sm">
            🔗{" "}
            <a
              href="https://makenakong.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              makenakong.com
            </a>
            <br />
            <span>
              <img src="/spotify.svg" alt="" width={14} height={14} className="inline" />{" "}
              <a
                href="https://open.spotify.com/user/kenaking?si=c87311baebc94706"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                @kenaking
              </a>
            </span>
          </p>
        </div>
        <div>
          {isAuthenticated ? (
            <Link href="/" className="w-full lg:w-max button button-pink">
              create a setlist ➡️
            </Link>
          ) : (
            <div className="space-y-[10px] max-w-[300px]">
              <SignInButton />
              <p className="text-sm text-center text-app-black/50">
                sign in to start creating
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://setlists.makenakong.com";
const SITE_NAME = "Setlists";
const DEFAULT_DESCRIPTION = "The free Spotify playlist generator for concert and festival prep. Pick up to 10 artists, get all their top tracks in one playlist. Try it free.";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <AuthProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{SITE_NAME} | Spotify Playlist Generator</title>
          <meta name="description" content={DEFAULT_DESCRIPTION} />
          <meta name="keywords" content="spotify playlist generator, artist playlist creator, dj setlist generator, create spotify playlist, top tracks playlist, music discovery tool" />
          <meta name="author" content="makenakong" />

          {/* Favicons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* OG defaults */}
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={SITE_URL} />
          <meta property="og:title" content={`${SITE_NAME} | Spotify Playlist Generator`} />
          <meta property="og:description" content={DEFAULT_DESCRIPTION} />
          <meta property="og:image" content={`${SITE_URL}/setlists-share-card-1200x628.png`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="628" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${SITE_NAME} | Spotify Playlist Generator`} />
          <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
          <meta name="twitter:image" content={`${SITE_URL}/setlists-share-card-1200x628.png`} />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
      <Analytics />
    </ToastProvider>
  );
}

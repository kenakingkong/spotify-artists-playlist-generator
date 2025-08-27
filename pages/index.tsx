import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Wizard from "@/components/wizard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className}`}>
      <header className="p-4">
        <Header />
      </header>
      <main className="p-4">
        <Wizard />
      </main>
      <footer className="p-4">
        <Footer />
      </footer>
    </div>
  );
}

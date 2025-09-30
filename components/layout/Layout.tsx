import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <header className="p-4 max-w-xl mx-auto">
          <Header />
        </header>
        <main className="p-4 max-w-xl mx-auto">{children}</main>
        <footer className="p-4 max-w-xl mx-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
}

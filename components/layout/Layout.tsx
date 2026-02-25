import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import classNames from "classnames";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const classes = classNames(
    "p-2 max-w-xl mx-auto",
    geistSans.className,
    geistMono.className,
  );

  return (
    <>
      <header className={classes}>
        <Header />
      </header>
      <main className={classes}>{children}</main>
      {/* <footer className={classes}>
        <Footer />
      </footer> */}
    </>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import classNames from "classnames";
import Footer from "./Footer";

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
    geistSans.className,
    geistMono.className,
  );

  return (
    <>
      <header className={classNames("w-full bg-app-black p-[10px] lg:py-[20px]", classes)}>
        <Header />
      </header>
      <main className={classes}>{children}</main>
      <footer className={classNames("w-full bg-app-black p-[10px] lg:py-[20px]", classes)}>
        <Footer />
      </footer>
    </>
  );
}

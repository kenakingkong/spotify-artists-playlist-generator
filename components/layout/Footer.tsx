import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-[5px]">
      <nav className="w-full">
        <ul className="flex items-center gap-[10px]">
          <li><Link href="/home" className="link text-xs">Home</Link></li>
          <li><Link href="/about" className="link text-xs">About</Link></li>
        </ul>
      </nav>
      <p className="w-full text-xs lg:text-right text-app-gray">
        Copyright © {new Date().getFullYear()} Makena Kong. All rights reserved.
      </p>
    </div>
  );
}

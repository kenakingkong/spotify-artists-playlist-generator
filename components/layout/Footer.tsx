export default function Footer() {
  return (
    <div className="w-full max-w-[1000px] mx-auto flex items-center justify-between gap-[5px]">
      <p className="text-xs text-app-gray">
        Copyright © {new Date().getFullYear()} Makena Kong. All rights reserved.
      </p>
    </div>
  );
}

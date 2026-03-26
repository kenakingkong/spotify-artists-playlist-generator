export default function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="w-full max-w-[1000px] mx-auto border-y border-app-black">
      <h2 className="w-max bg-app-pink text-base font-bold p-[10px] lg:px-[20px]">{children}</h2>
    </header>
  );
}

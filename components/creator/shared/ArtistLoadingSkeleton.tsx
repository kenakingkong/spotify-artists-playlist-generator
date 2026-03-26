export default function ArtistLoadingSkeleton() {
  return (
    <div className="w-full text-left border overflow-hidden flex items-center animate-pulse">
      <div className="w-10 h-10 bg-black/10"></div>
      <div className="grow p-2">
        <div className="w-36 h-4 bg-black/10"></div>
      </div>
    </div>
  );
}

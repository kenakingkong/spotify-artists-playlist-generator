export default function Bars() {
  return (
    <div className="w-full max-w-[1000px] mx-auto p-[2.5px] flex gap-[2.5px] lg:gap-[5px]">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`bar-${i}`}
          className="w-[15px] lg:w-[20px] h-[75px] lg:h-[125px] border" />
      ))}
    </div>
  )
}
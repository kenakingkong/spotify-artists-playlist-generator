import { useState, useEffect, useRef } from 'react'

const TOTAL_BARS = 50
const OPACITIES = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]

export default function Bars() {
  const [startIndex, setStartIndex] = useState<number | null>(null)

  useEffect(() => {
    setStartIndex(Math.floor(Math.random() * (50 - 19 + 1)))
  }, [])
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting
      if (!entry.isIntersecting) setHoverIndex(null)
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const barIndex = Math.floor((relativeX / rect.width) * TOTAL_BARS)
      setHoverIndex(Math.max(0, Math.min(TOTAL_BARS - 1, barIndex)))
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const activeStart = hoverIndex !== null ? hoverIndex - 9 : startIndex ?? null

  return (
    <div ref={containerRef} className="w-full max-w-[1000px] mx-auto p-[2.5px] flex gap-[2.5px] lg:gap-[5px]">
      {Array.from({ length: TOTAL_BARS }).map((_, i) => {
        const seqIndex = activeStart !== null ? i - activeStart : -1
        const isActive = seqIndex >= 0 && seqIndex < 19
        return (
          <div
            key={`bar-${i}`}
            className="w-[15px] lg:w-[20px] h-[75px] lg:h-[125px] border"
          >
            {isActive && <div className="w-full h-full bg-app-black" style={{ opacity: OPACITIES[seqIndex] }} />}
          </div>
        )
      })}
    </div>
  )
}

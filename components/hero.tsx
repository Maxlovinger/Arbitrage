"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

function StockCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Generate multiple stock line paths
    const lines: { points: number[]; speed: number; opacity: number; color: string }[] = []
    for (let i = 0; i < 6; i++) {
      const points: number[] = []
      let y = Math.random() * canvas.height * 0.6 + canvas.height * 0.2
      for (let x = 0; x < 200; x++) {
        y += (Math.random() - 0.48) * 8
        y = Math.max(canvas.height * 0.1, Math.min(canvas.height * 0.9, y))
        points.push(y)
      }
      lines.push({
        points,
        speed: 0.04 + Math.random() * 0.04,
        opacity: 0.08 + Math.random() * 0.15,
        color: i % 2 === 0 ? "16, 185, 129" : "52, 211, 153", // emerald-500 / emerald-400
      })
    }

    // Grid lines
    const drawGrid = () => {
      ctx.strokeStyle = "rgba(16, 185, 129, 0.04)"
      ctx.lineWidth = 1

      const gridSpacing = 80
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawGrid()

      // Draw stock lines
      for (const line of lines) {
        const rawOffset = (time * line.speed) % line.points.length
        const baseIndex = Math.floor(rawOffset)
        const frac = rawOffset - baseIndex

        ctx.beginPath()
        ctx.strokeStyle = `rgba(${line.color}, ${line.opacity})`
        ctx.lineWidth = 1.5

        const step = canvas.width / 100
        for (let i = 0; i < 100; i++) {
          const idx0 = (i + baseIndex) % line.points.length
          const idx1 = (i + baseIndex + 1) % line.points.length
          const x = i * step
          const y = line.points[idx0] * (1 - frac) + line.points[idx1] * frac
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Glow under the line
        ctx.beginPath()
        for (let i = 0; i < 100; i++) {
          const idx0 = (i + baseIndex) % line.points.length
          const idx1 = (i + baseIndex + 1) % line.points.length
          const x = i * step
          const y = line.points[idx0] * (1 - frac) + line.points[idx1] * frac
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, `rgba(${line.color}, ${line.opacity * 0.3})`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Floating particles
      for (let i = 0; i < 30; i++) {
        const x = ((i * 137.5 + time * 0.012) % canvas.width)
        const y = ((i * 97.3 + Math.sin(time * 0.001 + i) * 30) % canvas.height)
        const size = 1 + Math.sin(time * 0.002 + i) * 0.5
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${0.15 + Math.sin(time * 0.0015 + i) * 0.1})`
        ctx.fill()
      }

      time++
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export function Hero() {
  const router = useRouter()
  const titleWords = "ARBITRAGE".split("")
  const [visibleLetters, setVisibleLetters] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)

  useEffect(() => {
    if (visibleLetters < titleWords.length) {
      const timeout = setTimeout(() => setVisibleLetters(visibleLetters + 1), 120)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 400)
      return () => clearTimeout(timeout)
    }
  }, [visibleLetters, titleWords.length])

  useEffect(() => {
    if (subtitleVisible) {
      const timeout = setTimeout(() => setButtonVisible(true), 600)
      return () => clearTimeout(timeout)
    }
  }, [subtitleVisible])

  return (
    <div className="h-svh bg-black relative overflow-hidden">
      <StockCanvas />

      {/* Edge fades */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div>

      {/* Center radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_70%)] z-10 pointer-events-none" />

      {/* Content */}
      <div className="h-svh items-center w-full absolute z-20 px-10 flex justify-center flex-col">
        {/* Title */}
        <div className="text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold font-orbitron tracking-[0.2em] md:tracking-[0.3em]">
          <div className="flex overflow-hidden text-white">
            {titleWords.map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ${
                  index < visibleLetters
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${index * 80}ms`,
                  textShadow: index < visibleLetters ? "0 0 40px rgba(16, 185, 129, 0.3)" : "none",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <p
          className={`mt-4 md:mt-6 text-sm md:text-lg xl:text-xl text-gray-400 tracking-[0.15em] uppercase transition-all duration-700 ${
            subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Economics Consulting & Market Intelligence
        </p>

        {/* Divider line */}
        <div
          className={`mt-8 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent transition-all duration-1000 ${
            subtitleVisible ? "w-64 md:w-96 opacity-100" : "w-0 opacity-0"
          }`}
        />

        {/* Enter Button */}
        <div
          className={`mt-12 transition-all duration-700 ${
            buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() => router.push("/dashboard")}
            className="group relative cursor-pointer px-10 py-3.5 rounded-full
              bg-white/[0.08] backdrop-blur-xl
              border-0
              text-white/90 text-sm font-medium tracking-[0.2em] uppercase
              shadow-[0_0_30px_rgba(16,185,129,0.06),inset_0_1px_0_rgba(255,255,255,0.06)]
              transition-all duration-500 ease-out
              hover:bg-white/[0.14]
              hover:shadow-[0_0_40px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]
              hover:scale-[1.02]
              active:scale-[0.98] active:bg-white/[0.1]"
          >
            <span className="relative z-10 flex items-center gap-3">
              Enter
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 opacity-60 group-hover:opacity-100" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

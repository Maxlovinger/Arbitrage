import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Geist } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: "Arbitrage - Economics Consulting & Market Intelligence",
  description: "Data-driven economic insights, stock analysis, and market intelligence",
}

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${geist.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}

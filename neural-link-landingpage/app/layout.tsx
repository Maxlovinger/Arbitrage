import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Geist } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Neural Link - The Future of Human-Computer Interaction",
  description: "Revolutionary brain-computer interface technology connecting minds to machines",
  generator: "v0.app",
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
    <html lang="en" className={`${orbitron.variable} ${geist.variable} antialiased dark`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

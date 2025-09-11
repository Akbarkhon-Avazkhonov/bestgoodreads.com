import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "bestgoodreads.com – Where Your Next Favorite Book Awaits",
  description:
    "Find the finest books through genuine insights from critics and passionate readers.",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

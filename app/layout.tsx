import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Kalam, Playfair_Display } from "next/font/google"
import StickyNote from "@/components/sticky-note"
import DesktopFolders from "@/components/desktop-folders"
import MenuBar from "@/components/menu-bar"
import DockNavigation from "@/components/dock-navigation"
import WindowManager from "@/components/window-manager"

const inter = Inter({ subsets: ["latin"] })
const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Akib's Portfolio",
  description: "Software Developer Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${kalam.variable} ${playfair.variable}`}>
        <MenuBar />
        <StickyNote />
        <DesktopFolders />
        <WindowManager />
        {children}
        <DockNavigation />
      </body>
    </html>
  )
}

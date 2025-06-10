"use client"

import { useState, useEffect } from "react"
import { Wifi, Battery, Volume2, Moon, Sun, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { useWindowManager } from "@/hooks/use-window-manager"

export default function MenuBar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const isMobile = useIsMobile()
  const { openWindow, focusWindow } = useWindowManager()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handlePortfolioClick = () => {
    router.push("/")
  }

  const handleContactClick = () => {
    openWindow("contact", "Contact")
    setTimeout(() => focusWindow("contact"), 100)
  }

  const handleProfileClick = () => {
    openWindow("profile", "Profile")
    setTimeout(() => focusWindow("profile"), 100)
  }

  const handleProjectsClick = () => {
    const newWindowId = `finder-${Date.now()}`
    openWindow(newWindowId, "Projects", "/Projects")
    setTimeout(() => focusWindow(newWindowId), 100)
  }

  const handleResumeClick = () => {
    const pdfWindowId = "pdfviewer"
    openWindow(pdfWindowId, "Resume.pdf")
    setTimeout(() => focusWindow(pdfWindowId), 100)
  }

  return (
    <>
      {/* Mobile menu - hidden on desktop using CSS */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-6 bg-gray-100 bg-opacity-90 backdrop-blur-md border-b border-gray-200 z-50 flex items-center justify-between px-4 text-xs text-gray-700">
        <div>
          <span className="font-medium">🍎 </span>
          <button
            onClick={handlePortfolioClick}
            className="font-medium hover:text-blue-600 cursor-pointer transition-colors"
          >
            Akib's Portfolio
          </button>
        </div>
        <span className="font-mono text-[10px]">
          {currentTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>

      {/* Desktop menu bar - hidden on mobile using CSS */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 h-6 bg-gray-100 bg-opacity-90 backdrop-blur-md border-b border-gray-200 z-50 items-center justify-between px-4 text-xs text-gray-700">
        <div className="flex items-center space-x-4">
          <span className="font-medium">🍎</span>
          <button
            onClick={handlePortfolioClick}
            className="font-medium hover:text-blue-600 cursor-pointer transition-colors"
          >
            Akib's Portfolio
          </button>
          <button 
            onClick={handleProfileClick}
            className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"
          >
            Profile
          </button>
          <button 
            onClick={handleProjectsClick}
            className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"
          >
            Projects
          </button>
          <button 
            onClick={handleResumeClick}
            className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"
          >
            Resume
          </button>
          <button 
            onClick={handleContactClick}
            className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"
          >
            Contact
          </button>
          
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={toggleDarkMode} className="hover:bg-gray-200 rounded-full p-0.5">
            {isDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
          </button>
          <Wifi className="w-3 h-3" />
          <Volume2 className="w-3 h-3" />
          <Battery className="w-3 h-3" />
          <span className="font-mono">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            {currentTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </div>
    </>
  )
}

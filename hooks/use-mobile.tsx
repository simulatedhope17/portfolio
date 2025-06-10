"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Create a media query list
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    
    // Set initial value
    setIsMobile(mediaQuery.matches)

    // Create event listener
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    // Add listener
    mediaQuery.addEventListener("change", handleChange)

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return isMobile
}

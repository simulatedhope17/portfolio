"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Menu, X } from "lucide-react"

export default function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-6 left-4 right-4 z-40 flex items-center justify-between">
        <Link
          href="/"
          className="text-black font-medium hover:text-coral-500 transition-colors flex items-center space-x-2"
        >
          <span className="text-lg">🍎</span>
          <span className="hidden sm:inline">Akib's Portfolio</span>
        </Link>

  )
}

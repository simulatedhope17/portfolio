"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search, SidebarClose, ArrowLeftRight, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Finder from "./finder"
import { XAxis, YAxis } from "recharts"

interface MacWindowProps {
  id: string
  title: string
  children: React.ReactNode
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onFocus: () => void
  onMinimize: () => void
  windowIndex?: number
}

export default function MacWindow({
  id,
  title,
  children,
  isMinimized,
  zIndex,
  onClose,
  onFocus,
  onMinimize,
  windowIndex = 0,
}: MacWindowProps) {
  console.log(`MacWindow: id='${id}', title='${title}'`);
  const isMobile = useIsMobile()
  const [position, setPosition] = useState(() => {
    // Calculate offset based on window index
    const offsetX = windowIndex * 20 // Reduced offset for each window
    const offsetY = windowIndex * 20 // Reduced offset for each window
    
    // Center the window on screen with slight upward offset and apply the index-based offset
    const x = Math.max(0, (window.innerWidth - 700) / 2 + offsetX)
    const y = Math.max(24, (window.innerHeight - 500) / 2 - 30 + offsetY) // Increased upward offset
    
    // Ensure window stays within screen bounds
    const maxX = window.innerWidth - 200 // Keep at least 200px visible
    const maxY = window.innerHeight - 200
    
    return {
      x: Math.min(maxX, x),
      y: Math.min(maxY, y)
    }
  })
  const [size, setSize] = useState(() => {
    if (isMobile) {
      return {
        width: window.innerWidth,
        height: window.innerHeight - 100,
      }
    }
    if (id === "music") {
      return {
        width: 350,
        height: 500,
      }
    }
    if (id === "resume") {
      return {
        width: 400,
        height: 500,
      }
    }
    if (id === "gravity-wars") {
      setPosition({ x: 0, y: 0 })
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        
      }
    }
    return {
      width: 700,
      height: 500,
    }
  })
  const [isMaximized, setIsMaximized] = useState(isMobile)
  const [previousState, setPreviousState] = useState({ position: { x: 0, y: 0 }, size: { width: 700, height: 500 } })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeEdge, setResizeEdge] = useState<"n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [isMinimizing, setIsMinimizing] = useState(false)
  const [isOpening, setIsOpening] = useState(true)
  const [isRestoring, setIsRestoring] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [showScrollbar, setShowScrollbar] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollTimer = useRef<NodeJS.Timeout | undefined>(undefined)

  // Log isMinimized state changes for debugging
  useEffect(() => {
    console.log(`Window ${id} isMinimized state changed to: ${isMinimized}`);
    if (!isMinimized) {
      // When window is being restored (not minimized)
      console.log(`Window ${id}: Setting isRestoring to true`);
      setIsRestoring(true);
      // Reset minimizing state when restoring
      setIsMinimizing(false);
    }
  }, [isMinimized, id]);

  // Log isRestoring state changes for debugging
  useEffect(() => {
    console.log(`Window ${id} isRestoring state changed to: ${isRestoring}`);
    if (isRestoring) {
      // Reset isRestoring after the restore animation completes
      const timer = setTimeout(() => {
        console.log(`Window ${id}: Resetting isRestoring to false`);
        setIsRestoring(false);
      }, 300); // Match the restore animation duration
      return () => clearTimeout(timer);
    }
  }, [isRestoring, id]);

  // Prevent text selection during resize and drag
  useEffect(() => {
    if (isResizing || isDragging) {
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
    } else {
      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''
    }

    return () => {
      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''
    }
  }, [isResizing, isDragging])

  // Update window size and position when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (isMobile) {
        setPosition({ x: 0, y: 0 })
        setSize({ width: window.innerWidth, height: window.innerHeight - 100 })
        setIsMaximized(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile])

  // Handle opening animation
  useEffect(() => {
    setIsOpening(true)
    const timer = setTimeout(() => {
      setIsOpening(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  // Handle window close with animation
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  // Handle window minimize with different animation
  const handleMinimize = () => {
    console.log(`Window ${id}: Starting minimize animation`);
    setIsMinimizing(true);
    setIsRestoring(false); // Ensure not in restoring state when minimizing
    setTimeout(() => {
      console.log(`Window ${id}: Completing minimize action`);
      onMinimize();
    }, 300); // Match the animation duration
  }

  // Handle window maximize/restore
  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(previousState.position)
      setSize(previousState.size)
      setIsMaximized(false)
    } else {
      setPreviousState({ position, size })
      setPosition({ x: 0, y: 24 })
      setSize({ width: window.innerWidth, height: window.innerHeight - 24 })
      setIsMaximized(true)
    }
  }

  // Handle window dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return // Disable dragging on mobile

    if (!isMaximized && (e.target === e.currentTarget || (e.target as HTMLElement).closest(".window-header"))) {
      setIsDragging(true)
      const rect = windowRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
      onFocus()
    }
  }

  // Handle window resizing
  const handleResizeStart = (e: React.MouseEvent, edge: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw") => {
    if (isMobile) return // Disable resizing on mobile

    if (!isMaximized) {
      e.stopPropagation()
      setIsResizing(true)
      setResizeEdge(edge)
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      })
      onFocus()
    }
  }

  // Handle scroll events to show/hide scrollbar
  const handleScroll = () => {
    setShowScrollbar(true)
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current)
    }
    scrollTimer.current = setTimeout(() => {
      setShowScrollbar(false)
    }, 1000)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        // Keep window within screen bounds
        const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x))
        const newY = Math.max(24, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y))
        setPosition({ x: newX, y: newY })
      } else if (isResizing && !isMaximized && resizeEdge) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y
        let newWidth = size.width
        let newHeight = size.height
        let newX = position.x
        let newY = position.y

        // Handle horizontal resizing
        if (resizeEdge.includes("e")) {
          newWidth = Math.max(200, resizeStart.width + deltaX)
        } else if (resizeEdge.includes("w")) {
          newWidth = Math.max(200, resizeStart.width - deltaX)
          newX = resizeStart.x + deltaX
        }

        // Handle vertical resizing
        if (resizeEdge.includes("s")) {
          newHeight = Math.max(150, resizeStart.height + deltaY)
        } else if (resizeEdge.includes("n")) {
          newHeight = Math.max(150, resizeStart.height - deltaY)
          newY = resizeStart.y + deltaY
        }

        // Keep window within screen bounds
        newX = Math.max(0, Math.min(window.innerWidth - newWidth, newX))
        newY = Math.max(24, Math.min(window.innerHeight - newHeight, newY))

        setSize({ width: newWidth, height: newHeight })
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeEdge(null)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current)
      }
    }
  }, [isDragging, isResizing, dragOffset, resizeStart, isMaximized, resizeEdge, position, size])

  // The window should render if it's not minimized OR if it's currently restoring
  if (isMinimized && !isRestoring) {
    console.log(`Window ${id}: Not rendering because isMinimized=${isMinimized} and isRestoring=${isRestoring}`);
    return null;
  }

  // Mobile window layout
  if (isMobile) {
    return (
      <div
        ref={windowRef}
        className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-md z-50 flex flex-col"
        style={{
          top: 24,
          bottom: 60, // Leave space for the dock
          opacity: isClosing ? 0 : 1,
          transition: isClosing ? "opacity 0.2s ease-out" : "opacity 0.3s ease-in",
        }}
      >
        {/* Mobile Window Header */}
        <div className="bg-gradient-to-b from-gray-100 to-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-base font-medium text-gray-700">{title}</div>
          <div className="w-8"></div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    )
  }

  // Desktop window layout
  return (
    <div
      ref={windowRef}
      className={`fixed bg-white bg-opacity-95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-200 overflow-hidden select-none ${
        isMaximized ? "rounded-none" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transformOrigin: "center center",
        transition: isClosing
          ? "opacity 0.2s ease-out, transform 0.2s ease-out"
          : isMinimizing
            ? "opacity 0.3s ease-out, transform 0.3s ease-out"
            : isOpening
              ? "opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : isRestoring
                ? "opacity 0.3s ease-in, transform 0.3s ease-in" // Restore animation
                : isMaximized || (!isDragging && !isResizing)
                  ? "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  : "none",
        opacity: isClosing || isMinimizing ? 0 : isOpening || isRestoring ? 1 : 1,
        transform: isClosing
          ? "scale(0.95)"
          : isMinimizing
            ? "scale(0.8) translateY(50px) rotateX(15deg)"
            : isOpening
              ? "scale(1)"
              : isRestoring
                ? "scale(1)" // Restore to normal scale
                : "scale(1)",
        animationDelay: isOpening ? "0.1s" : "0s",
      }}
      onMouseDown={handleMouseDown}
      onClick={onFocus}
    >
      {/* Window Header (Title Bar) */}
      <div className="window-header bg-gradient-to-b from-gray-100 to-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between cursor-move">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center group"
          >
            <span className="text-red-900 opacity-0 group-hover:opacity-100 text-[8px] font-bold">✕</span>
          </button>
          <button
            onClick={handleMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors flex items-center justify-center group"
          >
            <span className="text-yellow-900 opacity-0 group-hover:opacity-100 text-[8px] font-bold">−</span>
          </button>
          <button
            onClick={handleMaximize}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center group"
          >
            <span className="text-green-900 opacity-0 group-hover:opacity-100 text-[8px] font-bold">
              {isMaximized ? "⤓" : "⛶"}
            </span>
          </button>
        </div>
        <div className="text-sm font-medium text-gray-700 text-center flex-1">{title}</div>
        <div className="w-16"></div>
      </div>

      {/* Window Content */}
      <div className="flex h-full" style={{ height: isMobile ? "calc(100% - 60px)" : "calc(100% - 72px)" }}>
        <div ref={contentRef} className="flex-1 overflow-auto relative" onScroll={handleScroll}>
          {children}

          {/* Custom macOS-style scrollbar */}
          <div
            className={`absolute right-1 top-1 bottom-1 w-2 transition-opacity duration-300 ${
              showScrollbar ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-2 h-24 bg-gray-400 bg-opacity-50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Resize handles - only show on desktop */}
      {!isMaximized && !isMobile && (
        <>
          {/* Edge handles */}
          <div className="absolute top-0 left-0 right-0 h-2 cursor-n-resize hover:bg-blue-500 hover:bg-opacity-20 z-50 select-none" onMouseDown={(e) => handleResizeStart(e, "n")} />
          <div className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize hover:bg-blue-500 hover:bg-opacity-20 z-50 select-none" onMouseDown={(e) => handleResizeStart(e, "s")} />
          <div className="absolute top-0 left-0 h-full w-2 cursor-w-resize hover:bg-blue-500 hover:bg-opacity-20 z-50 select-none" onMouseDown={(e) => handleResizeStart(e, "w")} />
          <div className="absolute top-0 right-0 h-full w-2 cursor-e-resize hover:bg-blue-500 hover:bg-opacity-20 z-50 select-none" onMouseDown={(e) => handleResizeStart(e, "e")} />
          
          {/* Corner handles */}
          <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize hover:bg-blue-500 hover:bg-opacity-20 z-50 select-none" onMouseDown={(e) => handleResizeStart(e, "nw")} />
          <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize hover:bg-blue-500 hover:bg-opacity-20 z-50 select-none" onMouseDown={(e) => handleResizeStart(e, "ne")} />
          <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize hover:bg-blue-500 hover:bg-opacity-20 z-50 select-none" onMouseDown={(e) => handleResizeStart(e, "sw")} />
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-blue-500 hover:bg-opacity-20 z-50 select-none" onMouseDown={(e) => handleResizeStart(e, "se")} />
        </>
      )}

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-5 bg-gray-50 border-t border-gray-200 px-1 sm:px-3 flex items-center">
        <span className="text-[10px] sm:text-xs text-gray-500">5 items</span>
        <span className="flex-1"></span>
        <span className="text-[10px] sm:text-xs text-gray-500">42.5 GB</span>
      </div>
    </div>
  )
}

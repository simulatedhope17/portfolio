"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {User, Folder, Trash2, FileText, Image, Music, Rocket, Circle, GraduationCap, Mail } from "lucide-react"
import { useWindowManager } from "@/hooks/use-window-manager"
import { useIsMobile } from "@/hooks/use-mobile"
import { windowConfigs } from "@/lib/window-config"

const initialFolders: Array<{
  id: string
  name: string
  icon: React.ElementType
  color: string
  windowId: string
  position: { top?: number; left?: number; right?: number; bottom?: number }
  initialPath?: string
}> = [
  
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    color: "bg-purple-500",
    windowId: "contact",
    position: { top: 430, left: 130 },
  },
  {
    id: "loopcraft",
    name: "Project 01\n(LoopCraft)",
    icon: Circle,
    color: "bg-blue-700",
    windowId: "loopcraft",
    position: { top: 190, right: 80 },
  },
  {
    id: "gravity-wars",
    name: "Project 02\n(GravityWars)",
    icon: Rocket,
    color: "bg-gray-900",
    windowId: "gravitywars",
    position: { top: 380, right: 80 },
  },
  // {
  //   id: "photos",
  //   name: "lifedump.photos",
  //   icon: Image,
  //   color: "bg-pink-500",
  //   windowId: "photos",
  //   position: { top: 620, right: 80 },
  // },
  {
    id: "pulmonary-nodule-analysis-system",
    name: "Project 03\n(Pulmonary Nodule Analysis System)",
    icon: FileText,
    color: "bg-teal-400",
    windowId: "pulmonary-nodule-analysis-system",
    position: { top: 480, right: 170 },
  },
  {
    id: "cs2204-project",
    name: "Project 04\n(CS2204-Project)",
    icon: GraduationCap,
    color: "bg-orange-400",
    windowId: "cs2204-project",
    position: { top: 330, right: 230 },
  },
  {
    id: "resume",
    name: "Resume.pdf",
    icon: FileText,
    color: "bg-red-400",
    windowId: "resume",
    position: { top: 220, left: 205 },
  },

]

export default function DesktopFolders() {
  const [folders, setFolders] = useState(initialFolders)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [draggedFolder, setDraggedFolder] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const { openWindow } = useWindowManager()
  const [clickedFolder, setClickedFolder] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const handleMouseDown = (e: React.MouseEvent, folderId: string) => {
    if (isMobile) return // Disable dragging on mobile

    e.preventDefault()
    setDraggedFolder(folderId)
    setIsDragging(false) // Reset dragging state on mouse down

    const folder = folders.find((f) => f.id === folderId)
    if (folder) {
      const rect = e.currentTarget.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleClick = (folder: (typeof folders)[0]) => {
    // Only open the window if we weren't dragging
    if (!isDragging) {
      // Add click animation
      setClickedFolder(folder.id)
      setTimeout(() => setClickedFolder(null), 200)

      // Open window with delay for animation
      setTimeout(() => {
        console.log("Opening window:", folder.windowId);
        if (folder.windowId === "finder" && folder.initialPath) {
          openWindow(folder.windowId + Date.now(), folder.name.replace("\n", " "), folder.initialPath);
        } else {
          openWindow(folder.windowId, folder.name.replace("\n", " "));
        }
      }, 100)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedFolder) {
        const moveDistance = Math.abs(e.clientX - dragOffset.x) + Math.abs(e.clientY - dragOffset.y)

        if (moveDistance > 5) {
          setIsDragging(true)
        }

        if (isDragging) {
          setFolders((prev) =>
            prev.map((folder) => {
              if (folder.id === draggedFolder) {
                return {
                  ...folder,
                  position: {
                    top: e.clientY - dragOffset.y,
                    left: e.clientX - dragOffset.x,
                    right: undefined,
                    bottom: undefined,
                  },
                }
              }
              return folder
            }),
          )
        }
      }
    }

    const handleGlobalMouseUp = () => {
      setTimeout(() => {
        setDraggedFolder(null)
      }, 100)
    }

    if (draggedFolder) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [draggedFolder, dragOffset, isDragging])

  // Mobile layout - grid of icons
  if (isMobile) {
    const mobileFolders = folders.filter(folder => folder.id !== 'profile' && folder.id !== 'photos');
    return (
      <div className="fixed bottom-16 left-0 right-0 z-30 px-4 py-2">
        <div className="flex flex-col-reverse">
          {Array.from({ length: Math.ceil(mobileFolders.length / 5) }, (_, i) => {
            const start = i * 5;
            const rowFolders = mobileFolders.slice(start, start + 5);
            // Pad the last row with empty spaces if needed
            const paddedRow: (typeof mobileFolders[0] | null)[] = [...rowFolders];
            while (paddedRow.length < 5) {
              paddedRow.push(null);
            }
            return (
              <div key={i} className="grid grid-cols-5 gap-3 mb-3">
                {paddedRow.map((folder, index) => (
                  folder ? (
                    <div
                      key={folder.id}
                      className="flex flex-col items-center space-y-1 cursor-pointer"
                      onClick={() => handleClick(folder)}
                    >
                      <div
                        className={`w-12 h-12 ${folder.color} rounded-lg flex items-center justify-center shadow-md transform transition-all duration-200 ${
                          clickedFolder === folder.id ? "scale-95 brightness-110" : ""
                        }`}
                      >
                        <folder.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] text-center max-w-full leading-tight bg-white bg-opacity-80 px-1 rounded whitespace-pre-line">
                        {folder.name.includes("Project") 
                          ? folder.name.split("\n")[0] 
                          : folder.name.replace("\n", " ")}
                      </span>
                    </div>
                  ) : (
                    <div key={`empty-${index}`} className="w-12 h-12" />
                  )
                ))}
              </div>
            );
          })}
        </div>
      </div>
    )
  }
  
  // Desktop layout - positioned icons
  return (
    <>
      {folders.map((folder, index) => {
        const config = windowConfigs[folder.windowId]
        if (!config) return null

        return (
          <div
            key={folder.id}
            className="fixed z-30 cursor-pointer group select-none"
            style={{
              top: folder.position.top,
              left: folder.position.left,
              right: folder.position.right,
              bottom: folder.position.bottom,
              transition: draggedFolder === folder.id ? "none" : "all 0.2s ease-out",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onMouseDown={(e) => handleMouseDown(e, folder.id)}
            onClick={() => handleClick(folder)}
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-16 h-16 ${config.color} rounded-lg flex items-center justify-center shadow-lg transform transition-all duration-200 ${
                  hoveredIndex === index ? "scale-110 shadow-xl -translate-y-1" : ""
                } ${draggedFolder === folder.id ? "scale-105 rotate-2 shadow-2xl" : ""} ${
                  clickedFolder === folder.id ? "scale-95 brightness-110" : ""
                }`}
              >
                <config.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs text-center max-w-20 leading-tight group-hover:text-blue-500 transition-colors bg-white bg-opacity-80 px-1 rounded whitespace-pre-line">
                {folder.name}
              </span>
            </div>
          </div>
        )
      })}
    </>
  )
}

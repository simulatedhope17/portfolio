"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Check, Plus } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const todoItems = [
  { text: "Land my dream internship", completed: false, icon: "🎯" },
  { text: "Drink water, exercise and go for a run", completed: true, icon: "💧" },
  { text: "Move to HK", completed: true, icon: "✈️" },
  { text: "Finish CS without losing my mind", completed: false, icon: "🎓" },
  { text: "Upload banger music covers on Instagram", completed: false, icon: "🎵" },
  { text: "Eat more fruits and vegetable", completed: true, icon: "🍎" },
  { text: "Travel somewhere new every year", completed: false, icon: "🗺️" },
]

export default function StickyNote() {
  const [todos, setTodos] = useState(todoItems)
  const [isMinimized, setIsMinimized] = useState(true)
  const [position, setPosition] = useState({ x: 95, y: 150 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const noteRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const toggleTodo = (index: number) => {
    setTodos((prev) => prev.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item)))
  }

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return // Disable dragging on mobile

    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".note-header")) {
      if ((e.target as HTMLElement).closest(".collapse-button")) {
        return
      }
      setIsDragging(true)
      const rect = noteRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  // Mobile version - simplified sticky note
  if (isMobile) {
    return (
      <div className="fixed top-10 right-4 z-40 w-full max-w-[180px] bg-yellow-200 shadow-lg rounded-lg overflow-hidden">
        <div className="bg-yellow-300 p-2 flex items-center justify-between">
          <h3 className="font-bold text-xs">To do:</h3>
          <button
            onClick={toggleMinimized}
            className="text-yellow-800 hover:text-yellow-900 w-4 h-4 flex items-center justify-center"
          >
            {isMinimized ? <Plus className="w-3 h-3" /> : <span className="text-xs font-bold">−</span>}
          </button>
        </div>

        {!isMinimized && (
          <div className="p-2">
            <ul className="text-xs space-y-1">
              {todos.slice(0, 4).map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-1 cursor-pointer hover:bg-yellow-100 p-1 rounded transition-colors"
                  onClick={() => toggleTodo(index)}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className={`flex-1 ${item.completed ? "line-through text-gray-600" : ""}`}>{item.text}</span>
                  {item.completed ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-400 rounded"></div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  // Desktop version - draggable sticky note
  return (
    <div
      ref={noteRef}
      className="fixed w-56 bg-yellow-200 shadow-xl z-40 font-kalam transform hover:rotate-0 transition-transform duration-300 hidden lg:block select-none rounded-lg"
      style={{
        left: position.x,
        top: position.y,
        transform: isDragging ? "rotate(0deg) scale(1.05)" : "rotate(-1deg)",
        transition: isDragging ? "none" : "all 0.2s ease-out",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="note-header bg-yellow-300 p-2 flex items-center justify-between cursor-move rounded-t-lg">
        <h3 className="font-bold text-sm">To do:</h3>
        <div className="flex items-center space-x-1">
          <button
            onClick={toggleMinimized}
            className="collapse-button text-yellow-800 hover:text-yellow-900 w-4 h-4 flex items-center justify-center"
          >
            {isMinimized ? <Plus className="w-3 h-3" /> : <span className="text-xs font-bold">−</span>}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-3">
          <ul className="text-xs space-y-1">
            {todos.slice(0, 6).map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 cursor-pointer hover:bg-yellow-100 p-1 rounded transition-colors"
                onClick={() => toggleTodo(index)}
              >
                <span className="text-sm">{item.icon}</span>
                <span className={`flex-1 ${item.completed ? "line-through text-gray-600" : ""}`}>{item.text}</span>
                {item.completed ? (
                  <Check className="w-3 h-3 text-green-600" />
                ) : (
                  <div className="w-3 h-3 border border-gray-400 rounded"></div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-3 pt-2 border-t border-yellow-400 text-xs text-gray-600">
            Progress: {todos.filter((item) => item.completed).length}/{todos.length}
          </div>
        </div>
      )}
    </div>
  )
}

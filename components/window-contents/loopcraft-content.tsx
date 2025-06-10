"use client"

import type React from "react"

interface LoopCraftContentProps {
  windowId: string
}

export default function LoopCraftContent({ windowId }: LoopCraftContentProps) {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://loop-craft-six.vercel.app/"
        className="w-full h-full border-0"
        title="LoopCraft"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
} 
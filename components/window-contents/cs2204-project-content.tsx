"use client"

import type React from "react"

interface CS2204ProjectContentProps {
  windowId: string
}

export default function CS2204ProjectContent({ windowId }: CS2204ProjectContentProps) {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://simulatedhope17.github.io/CS2204-Project/"
        className="w-full h-full border-0"
        title="CS2204 Project"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
} 
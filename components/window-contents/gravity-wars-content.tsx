"use client"

import type React from "react"

interface GravityWarsContentProps {
  windowId: string
}

export default function GravityWarsContent({ windowId }: GravityWarsContentProps) {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://gravity-warsio.vercel.app"
        className="w-full h-full border-0"
        title="Gravity Wars"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
} 
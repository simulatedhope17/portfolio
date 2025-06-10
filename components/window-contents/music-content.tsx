"use client"

import { useState } from "react"
import { useMusicStore } from "@/store/musicStore"

interface MusicContentProps {
  windowId: string
}

export default function MusicContent({ windowId }: MusicContentProps) {
  const spotifyPlaylists = [
    {
      name: "summer flows 0.02",
      src: "https://open.spotify.com/embed/album/3NRNR4txhuRLhnQUUlqWXH?utm_source=generator"
    },
    {
      name: "My Heart It Beats for You",
      src: "https://open.spotify.com/embed/playlist/5esmerdzc4jeDKQRyy8tom?utm_source=generator"
    },
    {
      name: "For Lovers",
      src: "https://open.spotify.com/embed/album/0gwS2D9sukMLXNvleEnYr2?utm_source=generator"
    },
    {
      name: "summer,",
      src: "https://open.spotify.com/embed/playlist/4bKLRu5jpvThL3lqRb1RNf?utm_source=generator"
    },
    {
      name: "ABSOLUTE HEARTBREAK",
      src: "https://open.spotify.com/embed/album/11Ax1twWIvL2xltYzbH3Up?utm_source=generator"
    },
    {
      name: "CHARLIE",
      src: "https://open.spotify.com/embed/album/2LTqBgZUH4EkDcj8hdkNjK?utm_source=generator"
    },
    {
      name: "love is not dying",
      src: "https://open.spotify.com/embed/album/5mkf4N44kdEwYgaOk3hRLF?utm_source=generator"
    },
    {
      name: "poochie",
      src: "https://open.spotify.com/embed/playlist/5G0OhkLulLUAhCsSzT3xWN?utm_source=generator"
    },
    {
      name: "i think you think too much of me",
      src: "https://open.spotify.com/embed/album/7AVvQhnDEUidKyJsXmQ7ju?utm_source=generator"
    }
  ]

  const { selectedSpotifyPlaylistIndex, setSelectedSpotifyPlaylistIndex } = useMusicStore()

  return (
    <div className="h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-2 sm:p-4 border-b border-white border-opacity-20">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Playlists</h2>
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {spotifyPlaylists.map((playlist, index) => (
            <button
              key={index}
              onClick={() => setSelectedSpotifyPlaylistIndex(index)}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium transition-all ${selectedSpotifyPlaylistIndex === index ? "bg-white text-purple-900" : "bg-white bg-opacity-20 hover:bg-opacity-30"}`}
            >
              {playlist.name}
            </button>
          ))}
        </div>
      </div>

      {/* Spotify Embed */}
      <div className="flex-1 p-2 sm:p-4 flex items-center justify-center">
        <iframe
          style={{ borderRadius: "12px" }}
          src={spotifyPlaylists[selectedSpotifyPlaylistIndex].src}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}

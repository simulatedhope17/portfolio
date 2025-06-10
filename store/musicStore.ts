import { create } from 'zustand'

interface MusicStore {
  selectedSpotifyPlaylistIndex: number
  setSelectedSpotifyPlaylistIndex: (index: number) => void
  isMusicWindowMinimized: boolean
  setIsMusicWindowMinimized: (minimized: boolean) => void
}

export const useMusicStore = create<MusicStore>((set) => ({
  selectedSpotifyPlaylistIndex: 0,
  setSelectedSpotifyPlaylistIndex: (index) => set({ selectedSpotifyPlaylistIndex: index }),
  isMusicWindowMinimized: false,
  setIsMusicWindowMinimized: (minimized) => set({ isMusicWindowMinimized: minimized }),
})) 
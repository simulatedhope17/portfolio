"use client"

import { create } from "zustand"

interface Window {
  id: string
  title: string
  isMinimized: boolean
  zIndex: number
  windowIndex: number
  initialPath?: string
}

interface WindowManagerState {
  windows: Window[]
  nextZIndex: number
  openWindow: (id: string, title: string, initialPath?: string) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  setWindowCustomTitle: (id: string, newTitle: string) => void
  openOrFocusFinder: (title: string, initialPath: string) => void
}

export const useWindowManager = create<WindowManagerState>((set, get) => ({
  windows: [],
  nextZIndex: 1000,

  openWindow: (id: string, title: string, initialPath?: string) => {
    const { windows, nextZIndex } = get()
    const existingWindow = windows.find((w) => w.id === id)

    if (existingWindow) {
      // Focus existing window
      const maxZIndex = Math.max(...windows.map(w => w.zIndex), nextZIndex)
      set({
        windows: windows.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w)),
        nextZIndex: maxZIndex + 2,
      })
    } else {
      // Create new window with windowIndex and immediately give it highest zIndex
      const maxZIndex = Math.max(...windows.map(w => w.zIndex), nextZIndex)
      set({
        windows: [
          ...windows,
          {
            id,
            title,
            isMinimized: false,
            zIndex: maxZIndex + 1,
            windowIndex: windows.length,
            initialPath,
          },
        ],
        nextZIndex: maxZIndex + 2,
      })
    }
  },

  closeWindow: (id: string) => {
    const { windows } = get()
    const closedWindowIndex = windows.find((w) => w.id === id)?.windowIndex ?? -1
    
    set((state) => ({
      windows: state.windows
        .filter((w) => w.id !== id)
        .map((w) => ({
          ...w,
          windowIndex: w.windowIndex > closedWindowIndex ? w.windowIndex - 1 : w.windowIndex,
        })),
    }))
  },

  focusWindow: (id: string) => {
    const { windows, nextZIndex } = get()
    const maxZIndex = Math.max(...windows.map(w => w.zIndex), nextZIndex)
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w)),
      nextZIndex: maxZIndex + 2,
    }))
  },

  minimizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) => 
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    }))
  },

  setWindowCustomTitle: (id: string, newTitle: string) => {
    set((state) => ({
      windows: state.windows.map((w) => 
        w.id === id ? { ...w, title: newTitle } : w
      ),
    }))
  },

  openOrFocusFinder: (title: string, initialPath: string) => {
    const { windows, focusWindow, openWindow } = get();
    
    // Determine the target windowId based on the initialPath
    const targetWindowId = initialPath === "/Trash" ? "trash" : `finder-${Date.now()}`;

    const existingFinder = windows.find(w => 
      (w.id.startsWith("finder") || w.id === "trash") && w.initialPath === initialPath
    );

    if (existingFinder) {
      focusWindow(existingFinder.id);
    } else {
      // Use the determined targetWindowId for opening
      openWindow(targetWindowId, title, initialPath);
    }
  },
}))

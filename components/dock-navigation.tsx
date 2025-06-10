"use client"

import { useState } from "react"
import { useWindowManager } from "@/hooks/use-window-manager"
import { useIsMobile } from "@/hooks/use-mobile"
import { windowConfigs, type WindowConfig } from "@/lib/window-config"
import { Trash2 } from "lucide-react"

interface DockItem extends WindowConfig {
  isOpen?: boolean;
  isMinimized?: boolean;
}

// Get permanent dock items from window configs, excluding profile, resume, and project windows
const dockItems: DockItem[] = Object.values(windowConfigs).filter(item => 
  !['loopcraft', 'gravitywars', 'pulmonary-nodule-analysis-system', 'cs2204-project'].includes(item.windowId)
)


// Get mobile dock items - include Gravity Wars game
const mobileDockItems: DockItem[] = [
  windowConfigs.finder,
  windowConfigs.terminal,
  windowConfigs.profile,
  windowConfigs.photos,
  windowConfigs.contact,
  windowConfigs["gravity-wars"],
]

export default function DockNavigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { windows, openWindow, focusWindow, minimizeWindow, openOrFocusFinder } = useWindowManager()
  const isMobile = useIsMobile()

  // Create a map of permanent dock items for easy lookup
  const permanentDockItemsMap = new Map(dockItems.map(item => [item.windowId, item]))

  // Filter out windows that already have a permanent dock item
  const windowsWithoutPermanentDockItem = windows.filter(
    (window) => !permanentDockItemsMap.has(window.id)
  )

  // Create temporary dock items for windows without permanent icons
  const temporaryDockItems: DockItem[] = windowsWithoutPermanentDockItem.map(window => ({
    label: window.title,
    icon: windowConfigs[window.id]?.icon || windowConfigs.finder.icon, // Use window config icon if available, fallback to finder
    color: windowConfigs[window.id]?.color || "bg-gray-500", // Use window config color if available, fallback to gray
    windowId: window.id,
  }));

  // Combine permanent and temporary dock items
  const allDockItems = [...dockItems, ...temporaryDockItems];

  // Map combined dock items to include their current state (isOpen, isMinimized)
  const currentDockItems = allDockItems.map(item => {
    const windowState = windows.find(w => w.id === item.windowId);
    return {
      ...item,
      isOpen: !!windowState, // Window is open if it exists in the windows state
      isMinimized: windowState?.isMinimized || false, // Get minimized state if window exists
    };
  });

  // Mobile version - simplified dock with fewer icons (only permanent ones)
  if (isMobile) {
    // Map mobile dock items to include their current state
    const mobileItems = mobileDockItems
      .filter(item => item && item.windowId) // Filter out any invalid items
      .map(item => {
        const windowState = windows.find(w => w.id === item.windowId);
        return {
          ...item,
          isOpen: !!windowState,
          isMinimized: windowState?.isMinimized || false,
        };
      });

    return (
      <div className="fixed bottom-2 left-0 right-0 z-50 px-4">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-white/40">
          <div className="flex items-center justify-between">
            {mobileItems.map((item, index) => (
              <div
                key={`${item.windowId}-${index}`}
                className="flex-1 flex justify-center"
                onClick={() => {
                  if (item.isMinimized) {
                    minimizeWindow(item.windowId);
                  } else {
                    if (item.windowId === "trash") {
                      openOrFocusFinder("Trash", "/Trash");
                    } else {
                      openWindow(item.windowId, item.label);
                    }
                  }
                }}
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all duration-200 ${
                    item.isOpen ? 'ring-2 ring-white/50' : ''
                  }`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Desktop version - full dock with hover effects
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white border-opacity-30">
        <div className="flex items-end space-x-1">
          {currentDockItems.map((item, index) => (
            <div
              key={item.windowId}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                // Use the isMinimized state from the item to decide action
                if (item.isMinimized) {
                  minimizeWindow(item.windowId); // Toggle to restore
                } else {
                  // If not minimized, open or focus the window
                  if (item.windowId === "trash") {
                    openOrFocusFinder("Trash", "/Trash");
                  } else {
                    openWindow(item.windowId, item.label); // openWindow handles focusing if already open
                  }
                }
              }}
            >
              <div
                className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center transition-all duration-300 transform shadow-lg cursor-pointer ${
                  hoveredIndex === index ? "scale-125 -translate-y-2" : ""
                } ${hoveredIndex !== null && hoveredIndex !== index ? "scale-90" : ""}`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>

              {hoveredIndex === index && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {item.label}
                </div>
              )}

              {/* Indicator dot: show if window is open (visible or minimized) */}
              {item.isOpen && (
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

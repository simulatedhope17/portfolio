import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search, PanelLeft, Grid, User, Trash2, List, Folder, FileText, Code, Image as ImageIcon, FileWarning, Globe, Video, VideoIcon, MoveIcon, Film } from "lucide-react"
import { useWindowManager } from "@/hooks/use-window-manager"
import { projectData } from "@/components/window-contents/projects-content"
import { FileItem, FinderContentProps as ImportedFinderContentProps } from "@/components/window-contents/finder-content"
import { LucideIcon } from "lucide-react"

interface FinderProps {
  children: React.ReactNode
  windowId: string
  initialPath?: string
}

export default function Finder({ children, windowId, initialPath }: FinderProps) {
  console.log('Finder component initialized:', { windowId, initialPath });
  const { openWindow, focusWindow, setWindowCustomTitle } = useWindowManager()
  const [hasSidebar, setHasSidebar] = useState(true)
  const [currentPath, setCurrentPath] = useState(initialPath || "/")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [history, setHistory] = useState<string[]>([initialPath || "/"])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const fileStructure: Record<string, FileItem[]> = {
    "/": [
      { name: "Projects", type: "folder", icon: Folder, color: "text-blue-500" },
      { name: "Akib_Arifeen_Resume.pdf", type: "file", icon: FileText, color: "text-red-500" },
      { name: "Trash", type: "folder", icon: Trash2, color: "text-gray-500" },
    ],
    "/Projects": [
      {
        name: "Project 01 (LoopCraft)",
        type: "folder",
        icon: Code,
        color: "text-purple-500",
        windowId: "loopcraft",
      },
      {
        name: "Project 02 (Gravity Wars)",
        type: "folder",
        icon: Code,
        color: "text-blue-500",
        windowId: "gravitywars",
      },
      {
        name: "Project 03 (Pulmonary Nodule Analysis System)",
        type: "folder",
        icon: Code,
        color: "text-teal-500",
        windowId: "pulmonary-nodule-analysis-system",
      },
      {
        name: "Project 04 (CS2204-Project)",
        type: "folder",
        icon: Code,
        color: "text-orange-500",
        windowId: "cs2204-project",
      },
    ],
    "/Trash": [
      { name: "World Domination Plan.txt", type: "file", icon: FileText, color: "text-gray-600" },
      { name: "breakdown.img", type: "file", icon: ImageIcon, color: "text-pink-500" },
      { name: "sorry_no_thanks.pdf", type: "file", icon: FileWarning, color: "text-red-500" },
      { name: "until_I_found_you.mov", type: "file", icon: Film, color: "text-blue-500" },
    ],
  }

  // Function to flatten the file structure recursively
  const flattenFileStructure = (structure: Record<string, FileItem[]>): FileItem[] => {
    let allItems: FileItem[] = [];
    for (const path in structure) {
      allItems = allItems.concat(structure[path]);
    }
    return allItems;
  };

  const allFiles: FileItem[] = flattenFileStructure(fileStructure) // Use the new flatten function

  const currentFiles = fileStructure[currentPath] || []

  const navigateToFolder = (item: FileItem) => {
    if (item.windowId) {
      openWindow(item.windowId!, item.name)
      setTimeout(() => {
        focusWindow(item.windowId!)
      }, 100)
    } else if (item.type === "folder") {
      let newPath: string;
      // Ensure path concatenation includes a slash unless at the root
      if (currentPath === '/') {
        newPath = '/' + item.name;
      } else {
        newPath = currentPath + '/' + item.name;
      }

      // Prevent navigating to the same path if already there
      if (newPath === currentPath) {
        return;
      }

      setCurrentPath(newPath)
      // Add to history
      const newHistory = history.slice(0, currentHistoryIndex + 1)
      newHistory.push(newPath)
      setHistory(newHistory)
      setCurrentHistoryIndex(newHistory.length - 1)
      // Update window title to show current folder
      setWindowCustomTitle(windowId, item.name)
    }
  }

  const goBack = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1
      setCurrentHistoryIndex(newIndex)
      const newPath = history[newIndex]
      setCurrentPath(newPath)
      // Update window title based on the folder name
      const folderName = newPath === "/" ? "Finder" : newPath.split("/").pop() || "Finder"
      setWindowCustomTitle(windowId, folderName)
    }
  }

  const goForward = () => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1
      setCurrentHistoryIndex(newIndex)
      const newPath = history[newIndex]
      setCurrentPath(newPath)
      // Update window title based on the folder name
      const folderName = newPath === "/" ? "Finder" : newPath.split("/").pop() || "Finder"
      setWindowCustomTitle(windowId, folderName)
    }
  }

  const getFileSize = (fileName: string) => {
    const sizes = ["2.4 MB"]
    return sizes[Math.floor(Math.random() * sizes.length)]
  }

  // Filter files based on searchQuery, using allFiles
  const filteredFiles = allFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine which files to display: search results if query exists, else current folder files
  const displayedFiles = searchQuery ? filteredFiles : currentFiles

  const openFinderAtLocation = (folderPath: string, folderName: string) => {
    const newWindowId = `finder-${Date.now()}`;
    openWindow(newWindowId, folderName, folderPath);
    setTimeout(() => {
      focusWindow(newWindowId);
    }, 100);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50 bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center gap-1">
          <button
            onClick={goBack}
            disabled={currentHistoryIndex === 0}
            className={`p-1.5 rounded ${currentHistoryIndex === 0 ? 'opacity-50' : 'hover:bg-gray-200'}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goForward}
            disabled={currentHistoryIndex === history.length - 1}
            className={`p-1.5 rounded ${currentHistoryIndex === history.length - 1 ? 'opacity-50' : 'hover:bg-gray-200'}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent border-none outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setHasSidebar(!hasSidebar)}
            className="p-1.5 rounded hover:bg-gray-200"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="p-1.5 rounded hover:bg-gray-200"
          >
            {viewMode === "list" ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Window Content with sidebar */}
      <div className="flex h-full" style={{ height: "calc(100% - 0px)" }}>
        {/* Sidebar */}
        {hasSidebar && (
          <div className="w-32 sm:w-48 bg-gray-100 bg-opacity-80 backdrop-blur-sm border-r border-gray-200 p-2 sm:p-3 overflow-y-auto">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 sm:mb-2 px-1 sm:px-2">Folders</h4>
                <ul className="space-y-0.5 sm:space-y-1">
                  {["Projects", "Profile", "Resume", "Trash"].map((item) => {
                    let clickHandler = () => {}; // Initialize with a no-op function
                    if (item === "Profile") {
                      clickHandler = () => {
                        openWindow("profile", "Profile");
                        setTimeout(() => focusWindow("profile"), 100);
                      };
                    } else if (item === "Resume") {
                      clickHandler = () => {
                        openWindow("resume", "Resume");
                        setTimeout(() => focusWindow("resume"), 100);
                      };
                    } else if (item === "Projects") {
                      const projectsFolder = fileStructure["/"]?.find(f => f.name === "Projects");
                      if (projectsFolder) {
                        clickHandler = () => {
                          const targetPath = "/Projects";
                          if (currentPath !== targetPath) {
                            setCurrentPath(targetPath);
                            const newHistory = history.slice(0, currentHistoryIndex + 1);
                            newHistory.push(targetPath);
                            setHistory(newHistory);
                            setCurrentHistoryIndex(newHistory.length - 1);
                            setWindowCustomTitle(windowId, projectsFolder.name);
                          }
                        };
                      }
                    } else if (item === "Trash") {
                      const trashFolder = fileStructure["/"]?.find(f => f.name === "Trash");
                      if (trashFolder) {
                        clickHandler = () => {
                          const targetPath = "/Trash";
                          if (currentPath !== targetPath) {
                            setCurrentPath(targetPath);
                            const newHistory = history.slice(0, currentHistoryIndex + 1);
                            newHistory.push(targetPath);
                            setHistory(newHistory);
                            setCurrentHistoryIndex(newHistory.length - 1);
                            setWindowCustomTitle(windowId, trashFolder.name);
                          }
                        };
                      }
                    }
                    // For other sidebar items that are not explicitly handled above,
                    // clickHandler remains the initial no-op function.
                    return (
                      <li
                        key={item}
                        className="text-xs sm:text-sm text-gray-700 hover:bg-blue-500 hover:text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded cursor-pointer"
                        onClick={clickHandler}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 overflow-auto relative">
          {/* Children (FinderContent) will be rendered here */}
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                currentPath: currentPath,
                viewMode: viewMode,
                currentFiles: displayedFiles,
                navigateToFolder: navigateToFolder,
                getFileSize: getFileSize,
                openWindow: openWindow,
                focusWindow: focusWindow,
              } as ImportedFinderContentProps);
            }
            return child;
          })}
        </div>
      </div>

      {/* Status Bar */}
      {/* Removed Status Bar content */}
    </>
  )
} 
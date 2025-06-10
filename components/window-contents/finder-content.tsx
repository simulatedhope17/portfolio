"use client"

import React, { useState, useEffect } from "react"
import { Folder, FileText, Code, Image as ImageIcon, FileWarning, ScrollText, Globe } from "lucide-react"
import { LucideIcon } from "lucide-react";

export interface FileItem {
  name: string;
  type: "folder" | "file";
  icon: LucideIcon;
  color: string;
  windowId?: string; // Optional: for opening project details
}

export interface FinderContentProps {
  currentPath?: string;
  viewMode?: "list" | "grid";
  currentFiles?: FileItem[];
  navigateToFolder?: (item: FileItem) => void;
  openWindow?: (id: string, title: string, content?: React.ReactNode) => void;
  getFileSize?: (fileName: string) => string;
  focusWindow?: (id: string) => void;
}

export default function FinderContent({
  currentPath = "/",
  viewMode = "list",
  currentFiles = [],
  navigateToFolder = () => {},
  openWindow = () => {},
  getFileSize = () => "",
  focusWindow = () => {},
}: FinderContentProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFileClick = (file: FileItem) => {
    if (file.name === "Akib_Arifeen_Resume.pdf") {
      openWindow("pdfviewer", "Akib_Arifeen_Resume.pdf");
      setTimeout(() => {
        focusWindow("pdfviewer");
      }, 100);
    } else if (file.name === "until_I_found_you.mov") {
      openWindow("video-player", "until_I_found_you.mov");
      setTimeout(() => {
        focusWindow("video-player");
      }, 100);
    } else {
      navigateToFolder(file);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Path bar */}
      <div className="bg-gray-50 border-b border-gray-200 px-3 py-3 sm:px-4 sm:py-2 flex items-center space-x-2 overflow-x-auto">
        <span className="text-sm text-gray-600">📁</span>
        <span className="text-sm text-gray-800 whitespace-nowrap">{currentPath}</span>
      </div>

      {/* File listing */}
      <div className="flex-1 overflow-auto p-3 sm:p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {currentFiles.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 sm:p-4 rounded-lg hover:bg-blue-50 active:bg-blue-100 cursor-pointer group"
                onClick={() => handleFileClick(file)}
              >
                <file.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${file.color} mb-2 sm:mb-3 group-hover:scale-110 transition-transform`} />
                <span className="text-sm text-center text-gray-800 group-hover:text-blue-600 line-clamp-2 px-1">{file.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1.5">
            {currentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-blue-50 active:bg-blue-100 cursor-pointer group"
                onClick={() => handleFileClick(file)}
              >
                <file.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${file.color}`} />
                <div className="min-w-0 flex-1">
                  <span className="text-sm text-gray-800 group-hover:text-blue-600 truncate block">{file.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentFiles.length === 0 && (
          <div className="text-center text-gray-500 mt-8 sm:mt-12">
            <Folder className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 text-gray-300" />
            <p className="text-base sm:text-lg">This folder is empty</p>
          </div>
        )}
      </div>
    </div>
  )
}

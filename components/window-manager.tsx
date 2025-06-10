"use client"

import { useWindowManager } from "@/hooks/use-window-manager"
import MacWindow from "@/components/mac-window"
import ProjectsContent from "@/components/window-contents/projects-content"
import ContactContent from "@/components/window-contents/contact-content"
import ResumeContent from "@/components/window-contents/resume-content"
import PhotosContent from "@/components/window-contents/photos-content"
import PdfViewerContent from "@/components/window-contents/pdf-viewer-content"
import TerminalContent from "@/components/window-contents/terminal-content"
import FinderContent from "@/components/window-contents/finder-content"
import Finder from "@/components/finder"
import MusicContent from "@/components/window-contents/music-content"
import DemoContent from "@/components/window-contents/demo-content"
import GravityWarsContent from "@/components/window-contents/gravity-wars-content"
import ProfileContent from "@/components/window-contents/profile-content"
import VideoPlayerContent from "@/components/window-contents/video-player-content"

type WindowContentComponent = React.ComponentType<{ windowId: string }>

const windowContents: Record<string, WindowContentComponent> = {
  contact: ContactContent,
  resume: ResumeContent,
  photos: PhotosContent,
  terminal: TerminalContent,
  music: MusicContent,
  loopcraft: ProjectsContent,
  gravitywars: ProjectsContent,
  "pulmonary-nodule-analysis-system": ProjectsContent,
  "cs2204-project": ProjectsContent,
  "loop-craft": ProjectsContent,
  "gravity-wars": GravityWarsContent,
  "cs2204-project-demo": ProjectsContent,
  projects: ProjectsContent,
  profile: ProfileContent,
  "video-player": VideoPlayerContent,
}

// Add demo window content mapping for non-gravity-wars windows
Object.keys(windowContents).forEach(key => {
  if (key !== 'projects' && key !== 'gravity-wars') {
    windowContents[`${key}-demo`] = DemoContent
  }
})

export default function WindowManager() {
  const { windows, closeWindow, focusWindow, minimizeWindow } = useWindowManager()

  return (
    <>
      {windows.map((window) => {
        console.log("Window ID:", window.id);
        console.log("Available window contents:", Object.keys(windowContents));
        const ContentComponent = windowContents[window.id]
        console.log("Content Component:", ContentComponent);

        return (
          <MacWindow
            key={window.id}
            id={window.id}
            title={window.title}
            isMinimized={window.isMinimized}
            zIndex={window.zIndex}
            windowIndex={window.windowIndex}
            onClose={() => closeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
          >
            {window.id.startsWith("finder") || window.id === "trash" ? (
              <Finder windowId={window.id} initialPath={window.initialPath}>
                <FinderContent />
              </Finder>
            ) : window.id === "pdfviewer" ? (
              <PdfViewerContent windowId={window.id} filePath="../Akib_Arifeen_Resume.pdf" />
            ) : window.id === "video-player" ? (
              <VideoPlayerContent windowId={window.id} videoSrc="../mov.mp4" />
            ) : ContentComponent ? (
              <ContentComponent windowId={window.id} />
            ) : null}
          </MacWindow>
        )
      })}
    </>
  )
}

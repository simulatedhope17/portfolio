import { useWindowManager } from "@/hooks/use-window-manager"
import { projectData } from "./projects-content"

interface DemoContentProps {
  windowId: string
}

export default function DemoContent({ windowId }: DemoContentProps) {
  // Extract the project title from the window ID (remove '-demo' suffix)
  const projectTitle = windowId.replace('-demo', '')
  const project = Object.values(projectData).find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-') === projectTitle
  )

  if (!project?.liveUrl) {
    return <div>Demo not available</div>
  }

  return (
    <div className="w-full h-full">
      <iframe
        src={project.liveUrl}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
} 
import Image from "next/image"
import { Github, Link as LinkIcon } from "lucide-react"
import { useWindowManager } from "@/hooks/use-window-manager"

interface ProjectsContentProps {
  windowId: string
}

export const projectData = {
  loopcraft: {
    title: "LoopCraft",
    subtitle: "Craft Your Sound",
    description: "An intuitive multi-track audio looping app designed for musicians of all levels. Record, overdub, and arrange loops with playful controls and clear visuals.",
    details: [
      "Multi-track recording and overdubbing",
      "Clear visual feedback (waveforms!)",
      "One-tap controls for easy looping",
      "Tempo sync and metronome",
      "Mobile and desktop friendly design",
    ],
    color: "bg-purple-500",
    liveUrl: "https://loop-craft-six.vercel.app",
    githubUrl: "https://github.com/simulatedhope17/loop-craft.git",
    previewImage: "../p1-prev.png",
    role: "<Full Stack Developer/>",
    status: "<In Development/>",
    techStack: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Web Audio API",
      "Vercel",
      "Git"
    ],
    timeline: {
      duration: "2 weeks",
      phases: [
        "Week 1: Planning & Research",
        "Week 2: UI/UX Design & Implementation"
      ]
    },
    progress: 50,
    progressMessage: "UI/UX implemented",
  },
  gravitywars: {
    title: "Gravity Wars",
    subtitle: "Cosmic Battle Arena",
    description: "An immersive space io combat game where players harness the power of gravity to defeat opponents. Navigate through cosmic arenas, collect power-ups, and master the art of gravity manipulation to become the ultimate space warrior.",
    details: [
      "Gravity-based movement and combat mechanics",
      "Real-time physics simulation with Canvas",
      "Power-up system with cosmic abilities",
      "Global score tracking and leaderboard (Planned)",
      "Cross-platform support (Mobile & Desktop)"
    ],
    color: "bg-blue-500",
    liveUrl: "https://gravity-warsio.vercel.app",
    githubUrl: "https://github.com/simulatedhope17/gravity-wars.io",
    previewImage: "../p2-prev.png",
    role: "<Full Stack Developer/>",
    status: "<In Development/>",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML5 Canvas",
      "WebSocket",
      "Vercel"
    ],
    timeline: {
      duration: "3 weeks",
      phases: [
        "Week 1: Planning & Research",
        "Week 2: UI/UX & Mobile Controls",
        "Week 3: Core Game Mechanics & Physics"
      ]
    },
    progress: 70,
    progressMessage: "UI/UX and physics implemented",
  },
  "pulmonary-nodule-analysis-system": {
    title: "Pulmonary Nodule Analysis System",
    subtitle: "Smart CT Scan Report Analysis",
    description: "A Jupyter Notebook-based system that analyzes CT scan reports to extract and structure pulmonary nodule information using LangChain and local LLMs via Ollama.",
    details: [
      "Identifies pulmonary nodules with size measurements",
      "Extracts anatomical locations (LUL, RLL, etc.)",
      "Captures clinical descriptors (calcified, non-calcified)",
      "Structured output parsing with validation (LangChain)",
      "Processes reports without cloud dependencies (Ollama)",
      "Maintains data privacy"
    ],
    color: "bg-teal-500",
    liveUrl: undefined,
    githubUrl: "https://github.com/simulatedhope17/report-structuring-using-llama",
    previewImage: "/placeholder.svg?height=150&width=250&text=Project+3+Preview",
    role: "<AI/ML Engineer/>",
    status: "<Completed/>",
    techStack: [
      "Python",
      "Jupyter Notebook",
      "LangChain",
      "Ollama",
      "Gemma2 (LLM)",
      "python-dotenv",
    ],
    timeline: {
      duration: "4 weeks",
      phases: [
        "Week 1: Research & Setup (Google Collab, Ollama, LangChain)",
        "Week 2: Report Structuring & Validation",
      ]
    },
    progress: 100,
    progressMessage: "",
  },
  "cs2204-project": {
    title: "CS2204-Project",
    subtitle: "University Website Showcase",
    description: "A functioning university website built with HTML, CSS, and JavaScript. It features a dynamic Program Page with rotating promotional messages, a reservation form on the Visit Page with form validation, and an Apply Page for major applications with real-time table updates.",
    details: [
      "Program Page: Rotating promotional messages and continuous video switching",
      "Visit Page: Validated reservation form with server simulation",
      "Apply Page: Dynamic major selection and ranking with real-time updates",
      "Uses external JavaScript for server action simulation",
      "HTML for structure, CSS for design, JavaScript for functionality",
    ],
    color: "bg-orange-500",
    liveUrl: "https://simulatedhope17.github.io/CS2204-Project/",
    githubUrl: "https://github.com/simulatedhope17/CS2204-Project",
    previewImage: "../p4-prev.png",
    role: "<Web Developer/>",
    status: "<Completed/>",
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    timeline: {
      duration: "School Project",
      phases: [
        "HTML Structure Implementation",
        "CSS Styling & Responsiveness",
        "JavaScript Functionality & Validation",
      ]
    },
    progress: 100,
    progressMessage: "",
  },
}

export default function ProjectsContent({ windowId }: ProjectsContentProps) {
  const { openWindow, focusWindow } = useWindowManager()
  console.log("Window ID:", windowId);
  console.log("Available projects:", Object.keys(projectData));
  
  const project = projectData[windowId as keyof typeof projectData]
  console.log("Selected project:", project);

  if (!project) {
    return <div>Project not found</div>
  }

  const handleLiveDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (project.liveUrl) {
      const windowId = project.title.toLowerCase() === "gravity wars" 
        ? "gravity-wars"
        : `${project.title.toLowerCase().replace(/\s+/g, '-')}-demo`
      openWindow(windowId, project.title)
      setTimeout(() => {
        focusWindow(windowId)
      }, 100)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row items-start bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex-1 w-full">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{project.title}</h2>
          <h3 className="text-base sm:text-lg text-blue-600 font-medium mb-3 sm:mb-4">{project.subtitle}</h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{project.description}</p>
        </div>
        <div className="w-full sm:w-auto pt-3 sm:pt-4 flex justify-start sm:justify-between items-center">
          <div className="flex space-x-2">
            {project.liveUrl && (
              <a
                href="#"
                onClick={handleLiveDemoClick}
                className="bg-red-500 hover:bg-red-800 text-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm transition-colors flex items-center gap-1"
              >
                <LinkIcon size={14} className="sm:w-4 sm:h-4" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm transition-colors flex items-center gap-1"
              >
                <Github size={14} className="sm:w-4 sm:h-4" />
                GitHub Repo
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4 shadow-sm">
          <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
            Key Features
            {project.status !== "<Completed/>" && " (In Progress)"}
          </h4>
          <ul className="space-y-1.5 sm:space-y-2">
            {project.details.map((detail, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className={`w-1.5 sm:w-2 h-1.5 sm:h-2 ${project.color} rounded-full mt-1.5 sm:mt-2 flex-shrink-0`}></span>
                <span className="text-xs sm:text-sm text-gray-700">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4 shadow-sm">
          <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Project Preview</h4>
          <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
            <Image
              src={project.previewImage}
              alt={project.title}
              width={250}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4 shadow-sm">
          <h4 className="font-medium text-gray-900 mb-2 text-xs sm:text-sm">Timeline</h4>
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-purple-200"></div>
            <div className="space-y-1.5 sm:space-y-2">
              {project.timeline.phases.map((phase, index) => (
                <div key={index} className="relative pl-4 sm:pl-5">
                  <div className={`absolute left-0 w-2 sm:w-3 h-2 sm:h-3 rounded-full ${project.color} flex items-center justify-center`}>
                    <span className="w-1 h-1 bg-gray-100 text-gray-700 rounded-full"></span>
                  </div>
                  <div className="bg-gray-200 backdrop-blur-sm rounded-md p-1.5 sm:p-2 border border-purple-100">
                    <p className="text-[10px] sm:text-xs text-gray-700">{phase}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4 shadow-sm">
          <h4 className="font-medium text-gray-900 mb-2 text-xs sm:text-sm">Tech Stack</h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.techStack.map((tech, index) => (
              <span key={index} className="text-[10px] sm:text-xs bg-gray-200 text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2.5 sm:p-3 shadow-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 ${project.color} rounded-full`}></div>
              <h4 className="font-medium text-gray-900 text-[10px] sm:text-xs">Role</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-700 mt-1 sm:mt-1.5 pl-3 sm:pl-4">{project.role}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2.5 sm:p-3 shadow-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 ${project.color} rounded-full animate-pulse`}></div>
              <h4 className="font-medium text-gray-900 text-[10px] sm:text-xs">Status</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-700 mt-1 sm:mt-1.5 pl-3 sm:pl-4">{project.status}</p>
            <div className="mt-1.5 sm:mt-2 pl-3 sm:pl-4">
              <div className="h-1 sm:h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${project.color} rounded-full`} style={{ width: `${project.progress}%` }}></div>
              </div>
              {project.progressMessage && (
                <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5 sm:mt-1">
                  {project.progressMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
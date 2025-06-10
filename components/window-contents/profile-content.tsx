import Image from "next/image"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import { useWindowManager } from "@/hooks/use-window-manager"

interface ProfileContentProps {
  windowId: string
}

export default function ProfileContent({ windowId }: ProfileContentProps) {
  const { openWindow, focusWindow } = useWindowManager()

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="relative">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
              <Image
                src="../akib.jpeg"
                alt="Akib"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2.5 ml-4">
              <a
                href="https://github.com/simulatedhope17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors transform hover:scale-110 -rotate-12"
              >
                <FaGithub size={26} />
              </a>
              <a
                href="https://linkedin.com/in/akibarifeen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors transform hover:scale-110"
              >
                <FaLinkedin size={28} />
              </a>
              <button
                onClick={() => {
                  openWindow("contact", "Contact");
                  setTimeout(() => focusWindow("contact"), 100);
                }}
                className="text-gray-700 hover:text-gray-900 transition-colors transform hover:scale-110 rotate-12"
              >
                <FaEnvelope size={24} />
              </button>
            </div>
          </div>
          <div className="mt-2 mb-2 text-center">
            <span className="text-5xl font-bold font-mono tracking-wider bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent transform hover:scale-105 hover:-rotate-1 transition-all duration-300 inline-block">Akib</span>
          </div>
        </div>

        <div className="space-y-0 text-gray-700 font-mono text-sm">
          <p className="leading-relaxed">
            <span className="text-base font-semibold text-gray-600 block text-center mb-0.5">Software Developer | CS Student @ CityUHK</span>

            Creating simple, user-friendly products that simplify complexity. I am passionate about designing websites that are both functional and beautiful. Iterate, innovate and elevate.</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["Web Development", "React", "Typescript", "Tailwind", "Next.js", "Node.js", "MySQL", "Docker", "Python", "C++", "Java", "Git", "Figma"].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900 mb-3">Experience</h3>
          <div className="space-y-3">
            <div className="flex">
              <div className="w-24 flex-shrink-0 text-sm text-gray-500">2025 May - Present</div>
              <div>
                <h4 className="font-medium text-gray-900">Teaching Assistant</h4>
                <p className="text-sm text-gray-600">(EdgeAIoTM) for Gifted Students, CityUHK</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-24 flex-shrink-0 text-sm text-gray-500">2024 - Present</div>
              <div>
                <h4 className="font-medium text-gray-900">Tiger Ambassador</h4>
                <p className="text-sm text-gray-600">Talent and Education Development Office, CityUHK</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-24 flex-shrink-0 text-sm text-gray-500">2024 June - August</div>
              <div>
                <h4 className="font-medium text-gray-900">Web Development Intern</h4>
                <p className="text-sm text-gray-600">Seth Biotech Limited</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

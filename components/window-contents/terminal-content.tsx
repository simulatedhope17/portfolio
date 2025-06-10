"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useWindowManager } from "@/hooks/use-window-manager"
import emailjs from '@emailjs/browser'

interface TerminalContentProps {
  windowId: string
}

export default function TerminalContent({ windowId }: TerminalContentProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<
    Array<{ command: string; output: string; type: "command" | "output" | "error" }>
  >([
    { command: "", output: "Welcome to Akib's CLI. Type 'help' for commands.", type: "output" },
    { command: "", output: "", type: "output" },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  type CommandFunction = {
    (args: string[]): string;
  } | {
    (): string;
  }

  const { openWindow } = useWindowManager()

  const commands: {
    [key: string]: CommandFunction
  } = {
    help: () => `COMMANDS:
- projects      : List all my projects
- project <id>  : Show details of a specific project (e.g., project loopcraft)
- skills        : List my technical skills
- about         : Show information about me
- contact       : Get my contact information
- clear         : Reset terminal
- sudo          : Unlock hidden features
- music         : Open music player
- resume        : View my resume
- photos        : View my photos
- open <app>    : Open a specific application (e.g., open music, open resume, open profile)
- send_msg "name" "email" "subject" "message" : Send a message to me.`,

    projects: () => `Available Projects:
1. LoopCraft - An intuitive multi-track audio looping app
2. Gravity Wars - An immersive space io combat game
3. Pulmonary Nodule Analysis System - Smart CT Scan Report Analysis
4. CS2204-Project - University Website Showcase

Type 'project <id>' to view details of a specific project.`,

    project: (args: string[]) => {
      const projectId = args[0]?.toLowerCase()
      const projectData = {
        loopcraft: {
          title: "LoopCraft",
          description: "An intuitive multi-track audio looping app designed for musicians of all levels.",
          tech: ["React.js", "TypeScript", "Tailwind CSS", "Web Audio API"],
          status: "In Development",
          url: "https://loop-craft-six.vercel.app"
        },
        "gravity-wars": {
          title: "Gravity Wars",
          description: "An immersive space io combat game with gravity-based mechanics.",
          tech: ["Next.js", "TypeScript", "HTML5 Canvas", "WebSocket"],
          status: "In Development",
          url: "https://gravity-warsio.vercel.app"
        },
        "pulmonary-nodule-analysis-system": {
          title: "Pulmonary Nodule Analysis System",
          description: "A Jupyter Notebook-based system for CT scan report analysis using LangChain and local LLMs.",
          tech: ["Python", "LangChain", "Ollama", "Gemma2"],
          status: "Completed",
          url: "https://github.com/simulatedhope17/report-structuring-using-llama"
        },
        "cs2204-project": {
          title: "CS2204-Project",
          description: "A functioning university website with dynamic features and form validation.",
          tech: ["HTML", "CSS", "JavaScript"],
          status: "Completed",
          url: "https://simulatedhope17.github.io/CS2204-Project/"
        }
      }

      if (!projectId || !projectData[projectId as keyof typeof projectData]) {
        return `Project not found. Available projects:
- loopcraft
- gravity-wars
- pulmonary-nodule-analysis-system
- cs2204-project`
      }

      const project = projectData[projectId as keyof typeof projectData]
      return `Project: ${project.title}
Description: ${project.description}
Status: ${project.status}
Tech Stack: ${project.tech.join(", ")}
URL: ${project.url}`
    },

    skills: () => `Technical Skills:
Frontend: React, TypeScript, Tailwind CSS
Backend: Node.js, Python
Database: MySQL
Languages: Python, C++, Java
Tools: Git, Figma, Docker
Frameworks: Next.js`,

    about: () => `About Me:
Software Engineer | CS Student @ CityUHK
Creating simple, user-friendly products that simplify complexity. 
I am passionate about designing websites that are both functional and beautiful. 
Iterate, innovate and elevate.
`,

    contact: () => `Contact Information:
Email: aarifeen2-c@my.cityu.edu.hk
Phone: +85294632126
Location: 22 Cornwall St Kowloon
GitHub: https://github.com/simulatedhope17
LinkedIn: https://www.linkedin.com/in/akibarifeen/`,

    clear: () => "CLEAR_TERMINAL",

    open: (args: string[]) => {
      const appName = args[0]?.toLowerCase()
      const availableApps: { [key: string]: string } = {
        music: "music",
        resume: "resume",
        photos: "photos",
        about: "about",
        contact: "contact",
        terminal: "terminal",
        projects: "projects",
        loopcraft: "loopcraft",
        gravitywars: "gravitywars",
        "pulmonary-nodule-analysis-system": "pulmonary-nodule-analysis-system",
        "cs2204-project": "cs2204-project",
        profile: "profile",
      }

      if (!appName || !availableApps[appName]) {
        return `App not found: ${appName}. Try 'open music', 'open resume', 'open photos', 'open profile', 'open contact', 'open projects'.`
      }

      const appToOpen = availableApps[appName]
      openWindow(appToOpen, appName.charAt(0).toUpperCase() + appName.slice(1))
      return `Opening ${appName}...`
    },

    send_msg: (args: string[]) => {
      if (args.length < 4) {
        return "Usage: send_msg \"<your_name>\" \"<your_email>\" \"<subject>\" \"<your_message_here>\". Use quotes for spaces."
      }

      const [name, email, subject, message] = args

      const serviceId = 'service_ol7rqzi'
      const templateId = 'template_vgo814j'
      const publicKey = 'kgjkoomyH9SkfdI9o'

      if (!publicKey) {
        return "Error: EmailJS Public Key is not defined. Please set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your environment variables."
      }

      emailjs.send(serviceId, templateId, {
        name,
        email,
        subject,
        message,
        time: new Date().toLocaleString()
      }, publicKey)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text)
          return 'Message sent successfully!'
        })
        .catch((err) => {
          console.log('FAILED...', err)
          return 'Failed to send message. Please try again later.'
        })
      return "Message Sent! I will reply to you as soon as possible"
    },

    "sudo coffee": () => `Password: *******
[!] Brewing...
>> Caffeine Level: 9001mg (Nerd Mode Activated)
>> Status: Ready to code for 48 hours straight
>> Side effects: Increased productivity, decreased sleep`,

    "sudo rage": () => `[!] KERNEL PANIC DETECTED
>> (╯°□°)╯︵ ┻━┻
>> Error: Too much debugging
>> Solution: Take a break, grab coffee
>> Status: Rage mode deactivated`,

    debug_life: () => `Stack Trace:
>> at Life.makeDecisions(life.js:23)
>> at Career.choosePath(career.js:45)
>> at Education.study(university.js:12)
>> ReferenceError: motivation is not defined
>> Solution: Coffee.brew() && Music.play()`,

    "git push --motivation": () => {
      const quotes = [
        "Code is poetry written in logic.",
        "Every expert was once a beginner.",
        "The best error message is the one that never shows up.",
        "Programming is thinking, not typing.",
        "First, solve the problem. Then, write the code.",
      ]
      return `>> ${quotes[Math.floor(Math.random() * quotes.length)]}`
    },
  }

  const parseCommandArgs = (input: string): string[] => {
    const regex = /"([^"]*)"|\S+/g;
    const matches = [];
    let match;
    while ((match = regex.exec(input)) !== null) {
      matches.push(match[1] || match[0]);
    }
    return matches;
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    const parsedArgs = parseCommandArgs(trimmedCmd)
    const command = parsedArgs[0]?.toLowerCase()
    const args = parsedArgs.slice(1)

    if (trimmedCmd === "") return

    // Add to command history
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)

    // Add command to terminal history
    setHistory((prev) => [...prev, { command: cmd, output: "", type: "command" }])

    // Execute command
    if (command === "clear") {
      setHistory([
        { command: "", output: "Welcome to Akib's CLI. Type 'help' for commands.", type: "output" },
        { command: "", output: "", type: "output" },
      ])
    } else if (command === "project") {
      const output = commands.project(args)
      setHistory((prev) => [...prev, { command: "", output, type: "output" }])
    } else if (command === "open") {
      const output = commands.open(args)
      setHistory((prev) => [...prev, { command: "", output, type: "output" }])
    } else if (command === "send_msg") {
      const output = commands.send_msg(args)
      setHistory((prev) => [...prev, { command: "", output, type: "output" }])
    } else if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands](args)
      setHistory((prev) => [...prev, { command: "", output, type: "output" }])
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: "",
          output: `Command not found: ${cmd}. Try 'help' ¯\_(ツ)_/¯`,
          type: "error",
        },
      ])
    }

    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm overflow-hidden flex flex-col">
      <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 space-y-1">
        {history.map((entry, index) => (
          <div key={index}>
            {entry.command && (
              <div className="flex">
                <span className="text-blue-400">akib@portfolio:~$ </span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <div className={`whitespace-pre-line ${entry.type === "error" ? "text-red-400" : "text-green-400"}`}>
                {entry.output}
              </div>
            )}
          </div>
        ))}

        <div className="flex">
          <span className="text-blue-400">akib@portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-white flex-1 font-mono"
            autoFocus
          />
          <span className="animate-pulse">█</span>
        </div>
      </div>
    </div>
  )
}

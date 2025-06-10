"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Orb from "./components/Orb"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentRole, setCurrentRole] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const roles = ["Software Developer", "Full Stack Developer", "UI/UX Designer"]
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Page load animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300)
  }, [])

  // Typing animation effect
  useEffect(() => {
    const currentText = roles[roleIndex]
    const typingSpeed = 100
    const deletingSpeed = 50
    const pauseTime = 1000

    if (!isTyping && !isDeleting) {
      setIsTyping(true)
    }

    if (isTyping) {
      if (currentRole === currentText) {
        setTimeout(() => {
          setIsTyping(false)
          setIsDeleting(true)
        }, pauseTime)
      } else {
        const timeout = setTimeout(() => {
          setCurrentRole(currentText.slice(0, currentRole.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      }
    }

    if (isDeleting) {
      if (currentRole === "") {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      } else {
        const timeout = setTimeout(() => {
          setCurrentRole(currentText.slice(0, currentRole.length - 1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentRole, isTyping, isDeleting, roleIndex])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:justify-center -mt-24 md:mt-0">
        <div className={`text-center relative ${isLoaded ? "animate-unfold" : "opacity-0 scale-0"}`}>
          <div className="hidden md:block">
            <Orb hue={45} hoverIntensity={0.3} />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-light text-gray-800 mb-4 hover-zoom mt-0">welcome to my</h1>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-light italic text-black mb-8 hover-zoom">portfolio.</h2>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto hover-zoom mt-0">
              Akib Arifeen <span className="breathing-glow">&lt;/&gt;</span>{" "}
              <span className="typing-text">
                {currentRole}
                <span className="typing-cursor">|</span>
              </span>
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in animation-delay-1200">
          <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        @keyframes unfold {
          0% { 
            transform: scale(0.1) rotate(45deg); 
            opacity: 0; 
          }
          50% { 
            transform: scale(0.8) rotate(10deg); 
            opacity: 0.8; 
          }
          75% { 
            transform: scale(1.05) rotate(-3deg); 
            opacity: 1; 
          }
          100% { 
            transform: scale(1) rotate(0); 
            opacity: 1; 
          }
        }
        
        @keyframes breathing-glow {
          0%, 100% { 
            text-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; 
            color: #3b82f6;
          }
          50% { 
            text-shadow: 0 0 15px #3b82f6, 0 0 25px #3b82f6, 0 0 35px #3b82f6; 
            color: #60a5fa;
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -30px, 0);
          }
          70% {
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-unfold {
          animation: unfold 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .breathing-glow {
          animation: breathing-glow 4s ease-in-out infinite;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          padding: 0 2px;
          display: inline-block;
        }
        
        .hover-zoom {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }
        
        .hover-zoom:hover {
          transform: scale(1.08);
        }

        .typing-text {
          display: inline-block;
          min-width: 200px;
        }

        .typing-cursor {
          display: inline-block;
          width: 1px;
          height: 1.4em;
          background-color: #94a3b8;
          margin-left: 2px;
          animation: blink 1.2s step-end infinite;
          vertical-align: middle;
        }
        
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

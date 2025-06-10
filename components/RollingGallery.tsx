"use client"

import React, { useEffect, useState } from "react"
import {
  motion,
  useAnimation,
  AnimatePresence,
} from "framer-motion"

interface RollingGalleryProps {
  autoplay?: boolean
  images?: { url: string; description: string }[]
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  images = [],
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [animationDirection, setAnimationDirection] = useState(1) // 1 for next (slide from right), -1 for prev (slide from left)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (autoplay && images.length > 0) {
      interval = setInterval(() => {
        setAnimationDirection(1)
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 3000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [autoplay, images.length, currentImageIndex])

  const handlePrev = () => {
    // If going from first to last, simulate sliding back from left
    const newIndex = (currentImageIndex - 1 + images.length) % images.length
    setAnimationDirection(-1)
    setCurrentImageIndex(newIndex)
  }

  const handleNext = () => {
    // If going from last to first, simulate sliding in from right
    const newIndex = (currentImageIndex + 1) % images.length
    setAnimationDirection(1)
    setCurrentImageIndex(newIndex)
  }

  if (images.length === 0) {
    return null
  }

  const currentImage = images[currentImageIndex]

  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-xl shadow-lg flex items-center justify-center">
      <AnimatePresence initial={false} custom={animationDirection}>
        <motion.div
          key={currentImage.url}
          initial={{ x: animationDirection * 500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ x: animationDirection * -500 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center p-4"
        >
          <img
            src={currentImage.url}
            alt={currentImage.description}
            className="h-[250px] w-[444px] rounded-[10px] border-[2px] border-white/20 object-cover shadow-md sm:h-[220px] sm:w-[391px]"
          />
          <p className="mt-4 text-gray-800 text-sm font-sans italic bg-white/60 px-3 py-1 rounded-md z-50 whitespace-nowrap backdrop-blur-sm text-center">
            {currentImage.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 bg-white/50 rounded-full p-2 text-gray-800 shadow-md hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 z-30"
            aria-label="Previous Image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 bg-white/50 rounded-full p-2 text-gray-800 shadow-md hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 z-30"
            aria-label="Next Image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

export default RollingGallery;
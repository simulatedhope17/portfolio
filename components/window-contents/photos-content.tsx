"use client"

import Image from "next/image"
import { Grid, List, LayoutGrid } from "lucide-react"
import { useState } from "react"
import { usePhotoStore } from "@/store/photoStore"
import RollingGallery from "../RollingGallery"
import { Photo } from "@/lib/photo-data"

interface PhotosContentProps {
  windowId: string
}

export default function PhotosContent({ windowId }: PhotosContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "gallery">("gallery")
  const { photos } = usePhotoStore()
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const handleBackClick = () => {
    setSelectedPhoto(null)
  }

  return (
    <div className="space-y-4 bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm font-light italic mt-1">
            Life's too short for boring photos. Here's some chaos from my camera roll.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-white/50 backdrop-blur-sm rounded-md p-0.5 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-white/50"}`}
            >
              <Grid className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-white/50"}`}
            >
              <List className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode("gallery")}
              className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === "gallery" ? "bg-white shadow-sm" : "hover:bg-white/50"}`}
            >
              <LayoutGrid className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === "grid" && !selectedPhoto && (
        <div className="grid grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="aspect-square bg-white rounded-lg overflow-hidden group relative shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => handlePhotoClick(photo)}
            >
              <Image
                src={photo.url}
                alt={photo.description}
                width={120}
                height={120}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                <div className="p-3 w-full text-white">
                  <p className="text-sm font-medium font-sans">{photo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "list" && !selectedPhoto && (
        <div className="space-y-2 bg-white/50 backdrop-blur-sm rounded-lg p-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="flex items-center space-x-3 p-3 hover:bg-white/80 rounded-lg transition-all duration-200 cursor-pointer"
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={photo.url}
                  alt={photo.description}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 font-sans">{photo.description}</p>
                <p className="text-xs text-gray-500 font-light">{photo.date}</p>
              </div>
              <div className="text-xs text-gray-500 font-light">{photo.size}</div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "gallery" && !selectedPhoto && (
        <div className="space-y-4">
          <RollingGallery
            autoplay={true}
            pauseOnHover={true}
            images={photos.map((photo) => ({
              url: photo.url,
              description: photo.description,
            }))}
          />
          <div className="grid grid-cols-6 gap-2">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 relative group shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => handlePhotoClick(photo)}
              >
                <Image
                  src={photo.url}
                  alt={photo.description}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-2 w-full text-white">
                    <p className="text-xs font-medium font-sans truncate">{photo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div className="space-y-4">
          <button
            onClick={handleBackClick}
            className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200 text-gray-700 text-sm font-medium"
          >
            Back to Photos
          </button>
          <div className="flex flex-col items-center">
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] bg-white rounded-lg overflow-hidden shadow-lg mb-4">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.description}
                layout="fill"
                objectFit="contain"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-gray-800 text-sm sm:text-md font-sans italic mb-4 px-4">
              {selectedPhoto.description}
            </p>
          </div>
          <div className="overflow-x-auto whitespace-nowrap py-2 no-scrollbar">
            <div className="inline-flex space-x-2 sm:space-x-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`inline-block w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0 cursor-pointer ${
                    selectedPhoto.id === photo.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => handlePhotoClick(photo)}
                >
                  <Image
                    src={photo.url}
                    alt={photo.description}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

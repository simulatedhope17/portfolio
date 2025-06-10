import { create } from 'zustand'
import { Photo, initialPhotos } from '@/lib/photo-data'

interface PhotoStore {
  photos: Photo[]
  addPhoto: (photo: Omit<Photo, 'id'>) => void
  removePhoto: (id: string) => void
  updatePhoto: (id: string, photo: Partial<Photo>) => void
}

export const usePhotoStore = create<PhotoStore>((set) => ({
  photos: initialPhotos,
  addPhoto: (photo) => set((state) => ({
    photos: [...state.photos, { ...photo, id: Date.now().toString() }]
  })),
  removePhoto: (id) => set((state) => ({
    photos: state.photos.filter((photo) => photo.id !== id)
  })),
  updatePhoto: (id, updatedPhoto) => set((state) => ({
    photos: state.photos.map((photo) =>
      photo.id === id ? { ...photo, ...updatedPhoto } : photo
    )
  }))
})) 
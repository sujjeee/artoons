import { create } from "zustand"

// Define the state interface
interface ImageData {
  imageUrl: string | null
  imagePrompt: string | null
}

interface ImageState {
  data: ImageData
  setData: (newData: Partial<ImageData>) => void
}

// Create the Zustand store
export const useImageStore = create<ImageState>((set) => ({
  data: {
    imageUrl: null,
    imagePrompt: null,
  },
  setData: (newData) =>
    set((state) => ({
      data: {
        ...state.data,
        ...newData,
      },
    })),
}))

"use client"
import React, { useState, useEffect } from "react"

const images = [
  "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/blonde-girl.jpeg",
  "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/bear.jpeg",
  "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/aeroplane.jpeg",
  "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cat-fish-bowl.jpeg",
]

export default function PaSmoothImageTransitionCardge() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const preloadImage = (url: any) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(url)
        img.onerror = reject
        img.src = url
      })
    }

    const changeBackground = async () => {
      const nextIndex = (currentIndex + 1) % images.length
      await preloadImage(images[nextIndex])
      setCurrentIndex(nextIndex)
    }

    const interval = setInterval(changeBackground, 3000)
    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 font-sans">
      <div className="w-[300px] h-[400px] rounded-[15px] overflow-hidden relative shadow-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white bg-opacity-80 text-gray-800 z-10">
          <h2 className="text-xl font-bold mb-2">Illustration Card</h2>
          <p>Enjoy the beautiful artwork!</p>
        </div>
      </div>
    </div>
  )
}

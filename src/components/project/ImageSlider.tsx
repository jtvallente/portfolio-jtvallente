import { useState } from "react"

interface ImageSliderProps {
  images: string[]
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [index, setIndex] = useState(0)
  const baseUrl = import.meta.env.BASE_URL ?? "/"
  const resolvedImages = images.map((src) =>
    `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}${src.replace(
      /^\//,
      ""
    )}`
  )

  const prev = () =>
    setIndex((i) => (i === 0 ? resolvedImages.length - 1 : i - 1))

  const next = () =>
    setIndex((i) => (i === resolvedImages.length - 1 ? 0 : i + 1))

  return (
    <div className="relative border border-github-border rounded-md overflow-hidden bg-github-bg">
      <img
        src={resolvedImages[index]}
        alt={`Project screenshot ${index + 1}`}
        className="w-full aspect-[5/3] object-contain bg-github-canvas"
      />

      {resolvedImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2
                       bg-github-surface border border-github-border
                       px-2 py-1 rounded text-sm"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2
                       bg-github-surface border border-github-border
                       px-2 py-1 rounded text-sm"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}

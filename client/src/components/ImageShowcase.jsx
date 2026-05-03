import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const videoRef = useRef(null)

  const slides = [
    { type: 'image', src: '/models/pixel1.jpg', alt: 'Shoe Collection 1' },
    { type: 'image', src: '/models/pixel2.jpg', alt: 'Shoe Collection 2' },
    { type: 'image', src: '/models/pixel3.jpg', alt: 'Shoe Collection 3' },
    { type: 'video', src: '/models/slide4.mp4', alt: 'Shoe Video' }
  ]

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isPlaying, slides.length])

  // Handle video playback
  useEffect(() => {
    if (videoRef.current && slides[currentSlide].type === 'video') {
      videoRef.current.load()
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Video autoplay failed:', error)
        })
      }
    }
  }, [currentSlide, slides])

  const handleMouseMove = (e) => {
    if (slides[currentSlide].type !== 'image') return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    if (slides[currentSlide].type === 'image') {
      setIsHovering(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setMousePosition({ x: 50, y: 50 })
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsHovering(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsHovering(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsHovering(false)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div 
      className="relative w-full h-screen bg-black overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {slides[currentSlide].type === 'image' ? (
            <motion.img
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover"
              style={{
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                imageRendering: 'high-quality',
              }}
              animate={{
                scale: isHovering ? 1.5 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeOut'
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src={slides[currentSlide].src}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Hover hint overlay - only show on images */}
      {slides[currentSlide].type === 'image' && !isHovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="text-white text-center bg-black/50 px-8 py-4 rounded-lg">
            <p className="text-2xl font-semibold mb-2">Hover to Zoom</p>
            <p className="text-lg">Move your cursor to explore details</p>
          </div>
        </motion.div>
      )}

      {/* Controls Container - Bottom Right */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4 z-20">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}



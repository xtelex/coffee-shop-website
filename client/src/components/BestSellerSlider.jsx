import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BestSeller from './BestSeller'
import AirForce1 from './AirForce1'

export default function BestSellerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPainting, setIsPainting] = useState(false)
  
  // Multiple slides with different shoes
  const slides = [
    {
      id: 0,
      component: BestSeller,
      name: 'Nike Air Max Akatsuki'
    },
    {
      id: 1,
      component: AirForce1,
      name: 'Air Force 1 Low'
    }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1 && !isPainting) {
      setDirection(1)
      setIsPainting(true)
      // Change slide in the middle of animation
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
      }, 900)
      // Reset after animation
      setTimeout(() => {
        setIsPainting(false)
        setDirection(0)
      }, 1800)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0 && !isPainting) {
      setDirection(-1)
      setIsPainting(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1)
      }, 900)
      setTimeout(() => {
        setIsPainting(false)
        setDirection(0)
      }, 1800)
    }
  }

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="relative w-full h-screen overflow-hidden isolate">
      {/* The slide content */}
      <div className="absolute inset-0">
        <CurrentSlideComponent
          onNext={currentSlide < slides.length - 1 ? handleNext : null}
          onPrevious={currentSlide > 0 ? handlePrevious : null}
          showPrevious={currentSlide > 0}
          currentSlide={currentSlide}
          totalSlides={slides.length}
        />
      </div>

      {/* Paint brush transition - contained within this section only */}
      <AnimatePresence>
        {isPainting && (
          <motion.div
            initial={{ x: direction > 0 ? '-100%' : '100%' }}
            animate={{ x: direction > 0 ? '100%' : '-100%' }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.8,
              ease: [0.65, 0, 0.35, 1]
            }}
            className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center"
          >
            {/* Colored trail based on next slide */}
            <div 
              className="absolute inset-0"
              style={{
                background: direction > 0 
                  ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.95) 100%)'
                  : 'linear-gradient(-90deg, transparent 0%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.95) 100%)'
              }}
            />
            
            {/* "ShoesKopo" text sliding across */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative z-10"
            >
              <h1 
                className="text-9xl font-black tracking-tight"
                style={{
                  color: direction > 0 ? '#000000' : '#ffffff',
                  textShadow: direction > 0 
                    ? '0 0 40px rgba(0,0,0,0.3)' 
                    : '0 0 40px rgba(255,255,255,0.3)'
                }}
              >
                ShoesKopo
              </h1>
            </motion.div>

            {/* Trailing particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: direction > 0 ? '-10%' : '110%',
                    y: `${20 + i * 5}%`,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{ 
                    x: direction > 0 ? '110%' : '-10%',
                    y: `${20 + i * 5}%`,
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 1.8,
                    delay: i * 0.05,
                    ease: "easeInOut"
                  }}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: direction > 0 ? '#000000' : '#ffffff',
                    boxShadow: direction > 0 
                      ? '0 0 20px rgba(0,0,0,0.5)' 
                      : '0 0 20px rgba(255,255,255,0.5)'
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { motion } from 'framer-motion'
import { useEffect, useRef, useState, memo } from 'react'

const Hero3D = memo(function Hero3D() {
  const videoRef = useRef(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  
  // List of videos to cycle through
  const videos = [
    '/models/background.mp4',
    '/models/background2.mp4',
    '/models/background3.mp4'
  ]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Reset video and play from start
    video.load()
    const playPromise = video.play()
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Video autoplay failed:', error)
      })
    }

    // When video ends, switch to next video
    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }

    video.addEventListener('ended', handleVideoEnd)
    
    return () => {
      video.removeEventListener('ended', handleVideoEnd)
    }
  }, [currentVideoIndex, videos.length])

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Video Background - Cycles through multiple videos */}
      <video
        ref={videoRef}
        key={currentVideoIndex}
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          filter: 'brightness(0.7)',
          transform: 'translateZ(0)',
          willChange: 'auto'
        }}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Bottom gradient overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.5) 50%, transparent 100%)'
        }}
      />

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center px-8 w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-7xl font-bold mb-6 text-white">
            ShoesKopo
          </h1>
          <p className="text-2xl text-white mb-10 leading-relaxed">
            "Step into style. Every great journey starts with the right shoes." 
            Explore our premium collection of sneakers and footwear with immersive 3D visualization.
          </p>
          <div className="flex gap-4">
            <button className="text-white px-8 py-3 rounded text-lg font-semibold transition bg-black hover:bg-gray-800">
              Explore Now
            </button>
            <button className="bg-transparent text-white px-8 py-3 rounded text-lg font-semibold hover:bg-white/10 transition border-2 border-white">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      {/* Video indicator dots */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentVideoIndex ? 'bg-red-600 w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-5" />
    </div>
  )
})

export default Hero3D

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

export default function Hero3D() {
  const [currentVideo, setCurrentVideo] = useState(1)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      // Switch to the next video when current one ends
      if (currentVideo === 1) {
        setCurrentVideo(2)
      } else {
        setCurrentVideo(1)
      }
    }

    video.addEventListener('ended', handleVideoEnd)
    return () => video.removeEventListener('ended', handleVideoEnd)
  }, [currentVideo])

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Video Background - Alternating between two videos */}
      <video
        ref={videoRef}
        key={currentVideo} // Force re-render when video changes
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      >
        <source 
          src={currentVideo === 1 ? '/models/background.mp4' : '/models/background2.mp4'} 
          type="video/mp4" 
        />
      </video>
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center px-8 w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-7xl font-bold mb-6" style={{ color: '#E50914' }}>
            KickFlix
          </h1>
          <p className="text-2xl text-white mb-10 leading-relaxed">
            "Step into style. Every great journey starts with the right shoes." 
            Explore our premium collection of sneakers and footwear with immersive 3D visualization.
          </p>
          <div className="flex gap-4">
            <button className="text-white px-8 py-3 rounded text-lg font-semibold transition" style={{ backgroundColor: '#E50914' }}>
              Explore Now
            </button>
            <button className="bg-transparent text-white px-8 py-3 rounded text-lg font-semibold hover:bg-red-600 transition" style={{ border: '2px solid #E50914' }}>
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-5" />
    </div>
  )
}

import { motion } from 'framer-motion'

export default function Hero3D() {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      >
        <source src="/models/background3.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Bottom gradient overlay - blends video into dark background (no blur) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.5) 50%, transparent 100%)'
        }}
      />

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

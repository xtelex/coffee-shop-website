import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function SportsCategories() {
  const scrollContainerRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const categories = [
    { name: 'Basketball', video: '/models/basketball.mp4' },
    { name: 'Running', video: '/models/running.mp4' },
    { name: 'Football', video: '/models/football.mp4' },
    { name: 'Gym', video: '/models/gym.mp4' },
    { name: 'Yoga', video: '/models/yoga.mp4' },
    { name: 'Golf', video: '/models/golf.mp4' }
  ]

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="py-16 bg-white relative">
      <div className="px-8 mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-black"
        >
          Shop by Sport
        </motion.h2>
        <p className="text-gray-600 mt-2">Find the perfect shoes for your activity</p>
      </div>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition"
        aria-label="Scroll left"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition"
        aria-label="Scroll right"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto px-8 pb-4 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-80 group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              {/* Video */}
              <video
                src={category.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Category name */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIndex === index ? '100%' : '60px' }}
                  transition={{ duration: 0.3 }}
                  className="h-1 bg-white"
                />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-white mt-3 text-sm"
                >
                  Shop {category.name} shoes →
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

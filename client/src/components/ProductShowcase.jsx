import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ProductShowcase() {
  const scrollContainerRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const products = [
    { id: 1, name: 'Air Jordan 1 High', price: '₱9,800', image: '/models/s1.jpg', category: 'Basketball' },
    { id: 2, name: 'Nike Dunk Low', price: '₱7,500', image: '/models/s2.jpg', category: 'Lifestyle' },
    { id: 3, name: 'Air Max 90', price: '₱8,200', image: '/models/s3.jpg', category: 'Running' },
    { id: 4, name: 'Air Force 1', price: '₱6,800', image: '/models/s4.jpg', category: 'Classic' },
    { id: 5, name: 'Jordan 4 Retro', price: '₱11,500', image: '/models/s5.jpg', category: 'Basketball' },
    { id: 6, name: 'Nike Blazer Mid', price: '₱7,200', image: '/models/s6.jpg', category: 'Lifestyle' },
    { id: 7, name: 'Air Max 97', price: '₱9,500', image: '/models/s7.jpg', category: 'Running' },
    { id: 8, name: 'Dunk High', price: '₱8,800', image: '/models/s8.jpg', category: 'Lifestyle' },
    { id: 9, name: 'Jordan 1 Low', price: '₱7,800', image: '/models/s9.jpg', category: 'Basketball' },
    { id: 10, name: 'Air Max Plus', price: '₱9,200', image: '/models/s10.jpg', category: 'Running' }
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
      {/* Header */}
      <div className="px-8 mb-8 flex items-center justify-between">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-black uppercase tracking-tight"
          >
            Featured Collection
          </motion.h2>
          <p className="text-gray-600 mt-2">Discover our latest arrivals</p>
        </div>
        <button className="text-black font-semibold hover:underline">
          View All →
        </button>
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
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0 w-96 group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Product Card */}
            <div className="bg-gray-50 rounded-lg overflow-hidden relative">
              {/* Favorite Icon */}
              <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Product Image */}
              <div className="aspect-square bg-white flex items-center justify-center p-6 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="p-5 bg-white">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-black mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-black">{product.price}</p>
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

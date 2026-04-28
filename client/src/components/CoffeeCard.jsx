import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CoffeeCard({ coffee }) {
  return (
    <div className="w-64 h-96 bg-white border-2 border-black rounded-lg overflow-hidden shadow-lg">
      <div className="h-3/4 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
        {/* Coffee cup emoji */}
        <span className="text-8xl">☕</span>
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-bold text-lg text-black">{coffee.name || 'Coffee Name'}</h3>
        <p className="text-gray-600 text-sm">{coffee.origin || 'Origin'}</p>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ShoeCard({ shoe }) {
  return (
    <div className="w-64 h-96 bg-black border-2 border-primary-red rounded-lg overflow-hidden shadow-lg hover:shadow-primary-red/50 transition-shadow">
      <div className="h-3/4 bg-gradient-to-br from-dark-800 to-dark-700 flex items-center justify-center">
        {/* Sneaker emoji */}
        <span className="text-8xl">👟</span>
      </div>
      <div className="p-4 bg-black">
        <h3 className="font-bold text-lg text-white">{shoe.name || 'Shoe Name'}</h3>
        <p className="text-gray-400 text-sm">{shoe.brand || 'Brand'}</p>
        <p className="text-primary-red font-semibold mt-1">${shoe.price || '0.00'}</p>
      </div>
    </div>
  )
}

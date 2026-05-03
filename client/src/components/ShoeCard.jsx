import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ShoeCard({ shoe }) {
  return (
    <div className="w-64 h-96 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
      <div className="h-3/4 bg-light-100 flex items-center justify-center overflow-hidden">
        {shoe.image_url ? (
          <img 
            src={shoe.image_url} 
            alt={shoe.name}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <span className="text-8xl">👟</span>
        )}
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-bold text-lg text-black">{shoe.name || 'Shoe Name'}</h3>
        <p className="text-gray-600 text-sm">{shoe.brand || 'Brand'}</p>
        <p className="text-black font-semibold mt-1">${shoe.price || '0.00'}</p>
      </div>
    </div>
  )
}

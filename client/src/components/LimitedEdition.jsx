import { motion } from 'framer-motion'

export default function LimitedEdition() {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Image Container - Full width, no spaces */}
      <img
        src="/models/limitededition.jpg"
        alt="Limited Edition Nike Air Jordan 1"
        className="w-full h-full object-cover"
      />
      
      {/* Text Overlay at Bottom */}
      <div className="absolute bottom-12 left-12 z-10">
        <h2 className="text-8xl font-black text-white uppercase tracking-tight leading-none" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
          Limited<br/>Edition
        </h2>
      </div>
    </div>
  )
}

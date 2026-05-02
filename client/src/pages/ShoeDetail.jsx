import { useParams } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'

export default function ShoeDetail() {
  const { id } = useParams()

  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-8">
        {/* 3D View */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-[600px] bg-dark-800 border-2 border-primary-red rounded-lg overflow-hidden"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} color="#DC143C" />
            <OrbitControls enableZoom={true} />
            <Environment preset="sunset" />
            {/* Shoe model will go here */}
          </Canvas>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-bold text-primary-red">Shoe Name</h1>
          <p className="text-gray-400 text-lg">
            Premium quality, exceptional comfort, and timeless style. These kicks deliver
            an unmatched experience with superior craftsmanship and design.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-primary-red text-white px-8 py-3 rounded hover:bg-primary-dark-red transition">
              Add to Collection
            </button>
            <button className="bg-transparent text-white border-2 border-primary-red px-8 py-3 rounded hover:bg-primary-red transition">
              Learn More
            </button>
          </div>

          <div className="space-y-4 pt-8">
            <div className="text-white">
              <span className="text-gray-400">Brand:</span>
              <span className="ml-2">Nike</span>
            </div>
            <div className="text-white">
              <span className="text-gray-400">Category:</span>
              <span className="ml-2">Running</span>
            </div>
            <div className="text-white">
              <span className="text-gray-400">Available Sizes:</span>
              <span className="ml-2">7, 8, 9, 10, 11, 12</span>
            </div>
            <div className="text-white">
              <span className="text-gray-400">Price:</span>
              <span className="ml-2 font-bold text-primary-red">$150.00</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

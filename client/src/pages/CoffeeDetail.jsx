import { useParams } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'

export default function CoffeeDetail() {
  const { id } = useParams()

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-8">
        {/* 3D View */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-[600px] bg-gray-100 border-2 border-black rounded-lg overflow-hidden"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <OrbitControls enableZoom={true} />
            <Environment preset="sunset" />
            {/* Coffee model will go here */}
          </Canvas>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-bold text-black">Coffee Name</h1>
          <p className="text-gray-600 text-lg">
            Rich, smooth, and perfectly balanced. This coffee delivers an exceptional
            experience with notes of chocolate and caramel.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition">
              Add to Favorites
            </button>
            <button className="bg-white text-black border-2 border-black px-8 py-3 rounded hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>

          <div className="space-y-4 pt-8">
            <div className="text-black">
              <span className="text-gray-600">Origin:</span>
              <span className="ml-2">Colombia</span>
            </div>
            <div className="text-black">
              <span className="text-gray-600">Roast Level:</span>
              <span className="ml-2">Medium</span>
            </div>
            <div className="text-black">
              <span className="text-gray-600">Flavor Notes:</span>
              <span className="ml-2">Chocolate, Caramel, Nutty</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

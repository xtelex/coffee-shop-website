import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
import backgroundImage from '../image/img1.jpg'

function CoffeeModel() {
  const { scene } = useGLTF('/models/cup_of_coffee/scene.gltf')
  return <primitive object={scene} scale={2} position={[0, -3, 0]} />
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  )
}

export default function Hero3D() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      {/* 3D Canvas - Your Sketchfab coffee model */}
      <div className="absolute inset-0 right-0 w-1/2 ml-auto">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Suspense fallback={<Loader />}>
            <CoffeeModel />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          <Environment preset="sunset" />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center px-8 w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-7xl font-bold mb-6 text-white">
            On The Way Coffee
          </h1>
          <p className="text-2xl text-white mb-10 leading-relaxed">
            "Life happens, coffee helps. Every great day starts with a great cup." 
            Explore our premium collection of artisan coffees with immersive 3D visualization.
          </p>
          <div className="flex gap-4">
            <button className="bg-black text-white px-8 py-3 rounded text-lg font-semibold hover:bg-gray-800 transition">
              Explore Now
            </button>
            <button className="bg-white text-black border-2 border-black px-8 py-3 rounded text-lg font-semibold hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-5" />
    </div>
  )
}

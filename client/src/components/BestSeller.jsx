import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'

function AirMaxModel() {
  const { scene } = useGLTF('/models/nike_air_max_akatsuki/scene.gltf')
  
  return (
    <primitive 
      object={scene} 
      scale={4}
      position={[0, -2, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  )
}

export default function BestSeller({ onNext, onPrevious, showPrevious = false, currentSlide = 0, totalSlides = 1 }) {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Large Background Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <h1 className="text-[20rem] font-black text-white/5 select-none leading-none">
          SHOES<br/>KO PO
        </h1>
      </motion.div>

      {/* Red Vignette Effect around the shoe */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/30 rounded-full blur-[150px]"></div>
      </motion.div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute top-12 left-12 z-20"
      >
        <h2 className="text-6xl font-bold text-white mb-2">Best Seller</h2>
        <div className="w-24 h-1 bg-red-600"></div>
      </motion.div>

      {/* 3D Canvas */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.6,
          delay: 0.3,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: true,
            powerPreference: "high-performance",
            alpha: true
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#ff0000" />
            <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={1} color="#ff0000" />
            <pointLight position={[0, 5, 5]} intensity={1.5} color="#ff0000" />
            <pointLight position={[5, 0, 5]} intensity={1} color="#ff0000" />
            <pointLight position={[-5, 0, 5]} intensity={1} color="#ff0000" />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
            
            <AirMaxModel />
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={1}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              enableDamping={true}
              dampingFactor={0.05}
            />
            
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
      ></motion.div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        viewport={{ once: true }}
        className="absolute bottom-12 left-12 z-20"
      >
        <p className="text-gray-300 text-xl mb-4 max-w-md">
          Experience the exclusive Nike Air Max Akatsuki in stunning 3D. Drag to rotate and explore every detail.
        </p>
        <div className="flex gap-4">
          {showPrevious && (
            <button 
              onClick={onPrevious}
              className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
          )}
          <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition">
            Shop Now
          </button>
          {onNext && (
            <button 
              onClick={onNext}
              className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2"
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-red-600' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

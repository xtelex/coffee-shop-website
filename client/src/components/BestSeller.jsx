import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, memo } from 'react'
import { motion } from 'framer-motion'

const AirMaxModel = memo(function AirMaxModel() {
  const { scene } = useGLTF('/models/nike_air_max_akatsuki/scene.gltf')
  
  return (
    <primitive 
      object={scene} 
      scale={4}
      position={[0, -2, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  )
})

// Preload the model
useGLTF.preload('/models/nike_air_max_akatsuki/scene.gltf')

const BestSeller = memo(function BestSeller({ onNext, onPrevious, showPrevious = false, currentSlide = 0, totalSlides = 1 }) {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20rem] font-black text-white/5 select-none leading-none">
          SHOES<br/>KO PO
        </h1>
      </div>

      {/* Red Vignette Effect around the shoe */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/30 rounded-full blur-[150px]"></div>
      </div>

      {/* Section Title */}
      <div className="absolute top-12 left-12 z-20">
        <h2 className="text-6xl font-bold text-white mb-2">Best Seller</h2>
        <div className="w-24 h-1 bg-red-600"></div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: false,
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true
          }}
          dpr={1}
          performance={{ min: 0.1 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ff0000" />
            <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#ff0000" />
            
            <AirMaxModel />
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              enableDamping={false}
            />
            
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>

      {/* Bottom Info */}
      <div className="absolute bottom-12 left-12 z-20">
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
      </div>

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
})

export default BestSeller

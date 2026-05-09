import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, memo } from 'react'
import { motion } from 'framer-motion'

const AirForce1Model = memo(function AirForce1Model() {
  const { scene } = useGLTF('/models/air_force_1_low_07_whitedark_beetroot/scene.gltf')
  
  return (
    <primitive 
      object={scene} 
      scale={0.15}
      position={[0, -1, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  )
})

// Preload the model
useGLTF.preload('/models/air_force_1_low_07_whitedark_beetroot/scene.gltf')

const AirForce1 = memo(function AirForce1({ onNext, onPrevious, showPrevious = false, currentSlide = 0, totalSlides = 1 }) {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20rem] font-black text-black/5 select-none leading-none">
          SHOES<br/>KO PO
        </h1>
      </div>

      {/* White Vignette Effect around the shoe */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-200/40 rounded-full blur-[150px]"></div>
      </div>

      {/* Section Title */}
      <div className="absolute top-12 left-12 z-20">
        <h2 className="text-6xl font-bold text-black mb-2">Best Seller</h2>
        <div className="w-24 h-1 bg-black"></div>
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
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, -5, -5]} intensity={1} />
            
            <AirForce1Model />
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              enableDamping={false}
            />
            
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl"></div>

      {/* Bottom Info */}
      <div className="absolute bottom-12 left-12 z-20">
        <p className="text-gray-700 text-xl mb-4 max-w-md">
          The timeless Nike Air Force 1 Low in stunning white. A classic that never goes out of style. Drag to rotate and explore every detail.
        </p>
        <div className="flex gap-4">
          {showPrevious && (
            <button 
              onClick={onPrevious}
              className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
          )}
          <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
            Shop Now
          </button>
          {onNext && (
            <button 
              onClick={onNext}
              className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition flex items-center gap-2"
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
            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-black' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  )
})

export default AirForce1

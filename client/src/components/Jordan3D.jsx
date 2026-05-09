import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, memo } from 'react'

const JordanModel = memo(function JordanModel() {
  const { scene } = useGLTF('/models/nike_air_jordan_1/scene.gltf')
  
  return (
    <primitive 
      object={scene} 
      scale={10}
      position={[0, -1, 0]}
    />
  )
})

// Preload the model
useGLTF.preload('/models/nike_air_jordan_1/scene.gltf')

export default function Jordan3D() {
  return (
    <div className="relative w-full h-[600px] bg-white overflow-hidden">
      {/* Large Background Text - ShoesKopo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[18rem] font-black text-gray-200 select-none leading-none text-center tracking-tighter">
          SHOES<br/>KO PO
        </h1>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-0" style={{
        backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          dpr={1}
          performance={{ min: 0.1 }}
          gl={{ 
            powerPreference: 'high-performance',
            antialias: false,
            stencil: false,
            depth: true
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            
            <JordanModel />
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              autoRotate={true}
              autoRotateSpeed={1}
              enableDamping={false}
            />
            
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-black/20 z-20"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-black/20 z-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-black/20 z-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-black/20 z-20"></div>
      
      {/* Bottom text overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-20">
        <p className="text-black text-sm font-semibold tracking-widest uppercase">Drag to Rotate</p>
      </div>
    </div>
  )
}

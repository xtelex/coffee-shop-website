import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Text3D, Center, useGLTF } from '@react-three/drei'
import { Physics, useBox } from '@react-three/cannon'
import { useState, useRef, Suspense, useEffect } from 'react'

// Gun Component attached to camera - First Person View
function Gun({ onShoot }) {
  const { scene } = useGLTF('/models/mp5_submachine_gun (1)/scene.gltf')
  const { camera } = useThree()
  const gunRef = useRef()
  const [recoil, setRecoil] = useState(false)
  
  // Attach gun to camera and make it follow camera rotation
  useFrame(() => {
    if (gunRef.current && camera) {
      // Make gun a child of camera to follow its rotation
      gunRef.current.position.set(0.4, -0.3, -0.8) // Right, down, forward from camera
      gunRef.current.rotation.set(0, 0, 0)
      
      // Apply recoil effect
      if (recoil) {
        gunRef.current.position.z += 0.05
      }
    }
  })
  
  // Add gun to camera on mount
  useEffect(() => {
    if (gunRef.current && camera) {
      camera.add(gunRef.current)
      return () => {
        camera.remove(gunRef.current)
      }
    }
  }, [camera])
  
  const handleShoot = () => {
    setRecoil(true)
    onShoot()
    setTimeout(() => setRecoil(false), 100)
  }
  
  return (
    <group ref={gunRef}>
      <primitive 
        object={scene.clone()} 
        scale={0.3} 
        position={[0, 0, 0]} 
        rotation={[0, Math.PI / 2, 0]}
      />
      {/* Muzzle Flash */}
      {recoil && (
        <mesh position={[0, 0.1, -0.5]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  )
}

// Fallback Gun attached to camera
function FallbackGun({ onShoot }) {
  const { camera } = useThree()
  const gunRef = useRef()
  const [recoil, setRecoil] = useState(false)
  
  // Attach gun to camera
  useFrame(() => {
    if (gunRef.current && camera) {
      gunRef.current.position.set(0.4, -0.3, -0.8)
      gunRef.current.rotation.set(0, 0, 0)
      
      if (recoil) {
        gunRef.current.position.z += 0.05
      }
    }
  })
  
  // Add gun to camera on mount
  useEffect(() => {
    if (gunRef.current && camera) {
      camera.add(gunRef.current)
      return () => {
        camera.remove(gunRef.current)
      }
    }
  }, [camera])
  
  const handleShoot = () => {
    setRecoil(true)
    onShoot()
    setTimeout(() => setRecoil(false), 100)
  }
  
  return (
    <group ref={gunRef}>
      {/* Gun body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.05, 0.3]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Gun barrel */}
      <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Muzzle Flash */}
      {recoil && (
        <mesh position={[0, 0, -0.3]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      )}
    </group>
  )
}

// Falling Letter Component
function Letter({ position, letter, onHit }) {
  const [hit, setHit] = useState(false)
  
  const [ref, api] = useBox(() => ({
    mass: hit ? 1 : 0, // Make it fall when hit
    position: position,
    args: [1, 1, 0.5],
  }))

  const handleClick = () => {
    setHit(true)
    onHit()
    // Apply force to make it fall
    api.velocity.set(0, -5, 0)
    api.angularVelocity.set(
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10
    )
  }

  return (
    <mesh ref={ref} onClick={handleClick} castShadow>
      <boxGeometry args={[1, 1, 0.5]} />
      <meshStandardMaterial color={hit ? '#ff0000' : '#4CAF50'} />
      <Center position={[0, 0, 0.3]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
        >
          {letter}
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </Center>
    </mesh>
  )
}

// Ground Component
function Ground() {
  const [ref] = useBox(() => ({
    position: [0, -5, 0],
    args: [20, 1, 20],
    type: 'Static',
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[20, 1, 20]} />
      <meshStandardMaterial color="#808080" />
    </mesh>
  )
}

// Crosshair Component
function Crosshair() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
      <div className="relative w-8 h-8">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500"></div>
        <div className="absolute left-1/2 top-0 w-0.5 h-full bg-red-500"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 border-2 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  )
}

// Main Game Component
export default function ShootingGame() {
  const [score, setScore] = useState(0)
  const [ammo, setAmmo] = useState(30)
  const word = "COFFEE"

  const handleShoot = () => {
    if (ammo > 0) {
      setAmmo(ammo - 1)
    }
  }

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Score Display */}
      <div className="absolute top-4 left-4 z-10 text-white text-2xl font-bold">
        <div>Score: {score}</div>
        <div className="text-lg">Ammo: {ammo}/30</div>
      </div>

      {/* Crosshair */}
      <Crosshair />

      {/* 3D Scene */}
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} castShadow />
        
        {/* Gun Model with Suspense */}
        <Suspense fallback={<FallbackGun onShoot={handleShoot} />}>
          <Gun onShoot={handleShoot} />
        </Suspense>
        
        <Physics gravity={[0, -9.8, 0]}>
          {/* Letters */}
          {word.split('').map((letter, index) => (
            <Letter
              key={index}
              position={[(index - word.length / 2) * 2, 2, 0]}
              letter={letter}
              onHit={() => setScore(score + 10)}
            />
          ))}
          
          {/* Ground */}
          <Ground />
        </Physics>

        <OrbitControls enableRotate={true} enablePan={false} enableZoom={false} />
      </Canvas>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-lg">Click on letters to shoot them!</p>
        <p className="text-sm">Click the gun or press anywhere to fire</p>
      </div>
    </div>
  )
}

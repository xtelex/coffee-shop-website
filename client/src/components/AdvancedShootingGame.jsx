import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls, Text } from '@react-three/drei'
import { Physics, useBox } from '@react-three/cannon'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'

// Letter Component with Physics
function ShootableLetter({ position, letter, onHit }) {
  const [hit, setHit] = useState(false)
  const meshRef = useRef()
  
  const [ref, api] = useBox(() => ({
    mass: 0, // Static initially
    position: position,
    args: [1, 1.5, 0.3],
  }))

  useEffect(() => {
    if (hit) {
      // Make it dynamic and apply force when hit
      api.mass.set(1)
      api.applyImpulse([
        (Math.random() - 0.5) * 5,
        -2,
        (Math.random() - 0.5) * 5
      ], [0, 0, 0])
      
      // Add rotation
      api.angularVelocity.set(
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10
      )
    }
  }, [hit, api])

  const handleShot = () => {
    if (!hit) {
      setHit(true)
      onHit()
    }
  }

  return (
    <mesh ref={ref} userData={{ shootable: true, onShot: handleShot }} castShadow>
      <boxGeometry args={[1, 1.5, 0.3]} />
      <meshStandardMaterial 
        color={hit ? '#ff4444' : '#4CAF50'} 
        transparent 
        opacity={hit ? 0.7 : 1}
      />
      <Text
        position={[0, 0, 0.16]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {letter}
      </Text>
    </mesh>
  )
}

// Gun Component (First Person View)
function Gun({ onShoot }) {
  const gunRef = useRef()
  const { camera } = useThree()
  
  useFrame(() => {
    if (gunRef.current) {
      // Position gun relative to camera
      gunRef.current.position.copy(camera.position)
      gunRef.current.position.add(new THREE.Vector3(0.3, -0.3, -0.5))
      gunRef.current.rotation.copy(camera.rotation)
    }
  })

  return (
    <group ref={gunRef}>
      {/* Simple gun shape - replace with actual 3D model */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.4]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0, -0.05, -0.15]}>
        <boxGeometry args={[0.08, 0.15, 0.2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  )
}

// Shooting System
function ShootingSystem({ onHit }) {
  const { camera, scene } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const [muzzleFlash, setMuzzleFlash] = useState(false)

  useEffect(() => {
    const handleClick = () => {
      // Show muzzle flash
      setMuzzleFlash(true)
      setTimeout(() => setMuzzleFlash(false), 100)

      // Raycast from camera center
      raycaster.current.setFromCamera(new THREE.Vector2(0, 0), camera)
      const intersects = raycaster.current.intersectObjects(scene.children, true)

      // Check if we hit a shootable object
      for (let intersect of intersects) {
        let obj = intersect.object
        while (obj) {
          if (obj.userData.shootable && obj.userData.onShot) {
            obj.userData.onShot()
            onHit()
            break
          }
          obj = obj.parent
        }
      }
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [camera, scene, onHit])

  return muzzleFlash ? (
    <pointLight position={camera.position} intensity={2} distance={5} color="#ffaa00" />
  ) : null
}

// Ground
function Ground() {
  const [ref] = useBox(() => ({
    position: [0, -2, 0],
    args: [50, 1, 50],
    type: 'Static',
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[50, 1, 50]} />
      <meshStandardMaterial color="#2d2d2d" />
    </mesh>
  )
}

// Main Game
export default function AdvancedShootingGame() {
  const [score, setScore] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  
  const letters = [
    { pos: [-4, 1, -8], letter: 'O' },
    { pos: [-2, 1, -8], letter: 'T' },
    { pos: [0, 1, -8], letter: 'W' },
    { pos: [2, 1, -8], letter: 'C' },
    { pos: [4, 1, -8], letter: 'O' },
    { pos: [-3, 1, -12], letter: 'F' },
    { pos: [-1, 1, -12], letter: 'F' },
    { pos: [1, 1, -12], letter: 'E' },
    { pos: [3, 1, -12], letter: 'E' },
  ]

  const handleHit = () => {
    setScore(prev => prev + 10)
  }

  return (
    <div className="relative w-full h-screen bg-black">
      {/* UI Overlay */}
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">OTW Coffee Shooting Game</h1>
            <p className="mb-4">Click to start playing</p>
            <p className="text-sm">Move mouse to aim • Click to shoot</p>
          </div>
        </div>
      )}

      {/* Score */}
      <div className="absolute top-4 left-4 text-white text-3xl font-bold z-10 bg-black bg-opacity-50 px-4 py-2 rounded">
        Score: {score}
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40">
        <div className="w-6 h-6 border-2 border-white rounded-full opacity-70" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
      </div>

      {/* 3D Scene */}
      <Canvas shadows camera={{ fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />

        <Physics gravity={[0, -9.8, 0]}>
          {/* Letters */}
          {letters.map((item, index) => (
            <ShootableLetter
              key={index}
              position={item.pos}
              letter={item.letter}
              onHit={handleHit}
            />
          ))}

          {/* Ground */}
          <Ground />
        </Physics>

        {/* Gun */}
        <Gun />

        {/* Shooting System */}
        <ShootingSystem onHit={handleHit} />

        {/* Controls */}
        <PointerLockControls onLock={() => setIsLocked(true)} onUnlock={() => setIsLocked(false)} />
      </Canvas>
    </div>
  )
}

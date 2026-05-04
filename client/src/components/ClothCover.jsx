import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ClothCover({ isRevealing, direction, onComplete }) {
  const meshRef = useRef()
  const progressRef = useRef(0)

  // Create a grid of vertices for the cloth
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 12, 30, 20)
    return geo
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current || !isRevealing) return

    // Animate the reveal
    progressRef.current += delta * 1.5 // Speed of reveal

    if (progressRef.current >= 1) {
      progressRef.current = 1
      if (onComplete) onComplete()
    }

    const positions = meshRef.current.geometry.attributes.position
    const originalPositions = geometry.attributes.position

    // Create folding/bunching effect
    for (let i = 0; i < positions.count; i++) {
      const x = originalPositions.getX(i)
      const y = originalPositions.getY(i)
      
      // Calculate how much this vertex should be affected
      const normalizedX = (x + 10) / 20 // 0 to 1
      const revealProgress = progressRef.current
      
      let newX = x
      let newY = y
      let newZ = 0

      if (direction > 0) {
        // Pulling to the right
        if (normalizedX < revealProgress) {
          // This part is being pulled
          const pullAmount = (revealProgress - normalizedX) * 20
          newX = x + pullAmount
          
          // Add folding/bunching effect
          const foldIntensity = Math.sin(normalizedX * Math.PI * 8 + revealProgress * 10) * 0.5
          newZ = foldIntensity * (1 - normalizedX) * 2
          newY = y + Math.abs(foldIntensity) * 0.3
        }
      } else {
        // Pulling to the left
        if (normalizedX > (1 - revealProgress)) {
          const pullAmount = (revealProgress - (1 - normalizedX)) * 20
          newX = x - pullAmount
          
          const foldIntensity = Math.sin(normalizedX * Math.PI * 8 - revealProgress * 10) * 0.5
          newZ = foldIntensity * normalizedX * 2
          newY = y + Math.abs(foldIntensity) * 0.3
        }
      }

      positions.setXYZ(i, newX, newY, newZ)
    }

    positions.needsUpdate = true
    meshRef.current.geometry.computeVertexNormals()
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 2]}>
      <meshStandardMaterial 
        color="#1a1a1a"
        side={THREE.DoubleSide}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

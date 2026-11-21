import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import type { Mesh } from 'three'

function PhotoSphere({ image, position }: { image: string; position: [number, number, number] }) {
  const sphere = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const texture = useTexture(image)

  useFrame((_, delta) => {
    if (sphere.current) {
      sphere.current.rotation.y += delta * 0.35
    }
  })

  return (
    <mesh
      ref={sphere}
      position={position}
      scale={hovered ? 1.15 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.9, 48, 48]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0.1], fov: 60 }}>
      <color attach="background" args={['#101827']} />
      <ambientLight intensity={1.5} />
      <PhotoSphere image="/goku.jpg" position={[-2.1, 0, -4]} />
      <PhotoSphere image="/messixd.jpg" position={[0, 0, -4]} />
      <PhotoSphere image="/Muricioxd.jpg" position={[2.1, 0, -4]} />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.4} />
    </Canvas>
  )
}

export default App
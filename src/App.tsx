import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { BackSide, type Mesh } from 'three'
import './App.css'

function PhotoSphere({
  image,
  position,
  triangle = false,
}: {
  image: string
  position: [number, number, number]
  triangle?: boolean
}) {
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
      {triangle ? (
        <coneGeometry args={[0.8, 1.4, 3]} />
      ) : (
        <sphereGeometry args={[0.8, 48, 48]} />
      )}
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

function Panorama() {
  const panorama = useTexture('/360.jpg')

  return (
    <mesh>
      <sphereGeometry args={[100, 64, 64]} />
      <meshBasicMaterial map={panorama} side={BackSide} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
      <Suspense fallback={null}>
        <Panorama />
        <PhotoSphere image="/goku.jpg" position={[-1.8, 0, -4]} />
        <PhotoSphere image="/messixd.jpg" position={[0, 0, -4]} triangle />
        <PhotoSphere image="/Muricioxd.jpg" position={[1.8, 0, -4]} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.35}
        enableDamping
      />
    </Canvas>
  )
}

export default App

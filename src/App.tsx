import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { BackSide, CanvasTexture, SRGBColorSpace, type Mesh } from 'three'
import './App.css'

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
      <sphereGeometry args={[0.8, 48, 48]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

function Panorama() {
  const texture = useTexture('/messixd.jpg')
  const panorama = useMemo(() => {
    const image = texture.image
    if (!(image instanceof HTMLImageElement)) {
      throw new Error('La imagen panorámica no se pudo cargar.')
    }

    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('No se pudo crear la textura panorámica.')
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    const panoramaTexture = new CanvasTexture(canvas)
    panoramaTexture.colorSpace = SRGBColorSpace
    return panoramaTexture
  }, [texture])

  useEffect(() => () => panorama.dispose(), [panorama])

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
        <PhotoSphere image="/messixd.jpg" position={[0, 0, -4]} />
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

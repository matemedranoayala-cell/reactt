import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { BackSide } from 'three'
import './App.css'

function Panorama() {
  const texture = useTexture('/messixd.jpg')

  return (
    <mesh>
      <sphereGeometry args={[100, 64, 64]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
      <Suspense fallback={null}>
        <Panorama />
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

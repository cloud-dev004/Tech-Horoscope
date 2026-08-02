import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

// A rotating shape with a texture (photo placeholder)
const ShapeWithPhoto = () => {
  const meshRef = useRef();

  // Load a placeholder texture
  const texture = useLoader(
    THREE.TextureLoader,
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Hero3D = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] lg:h-[700px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.5}
          color="#8B5CF6"
        />
        <directionalLight
          position={[10, 10, -5]}
          intensity={0.5}
          color="#f97316"
        />

        <ShapeWithPhoto />

        <Environment preset="city" />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Hero3D;

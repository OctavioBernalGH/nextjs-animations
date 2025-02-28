"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";

function Model() {
  const { scene } = useGLTF("/models/coche2.glb");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= 0.005; // 🔄 Rotación suave en el eje Y
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.2} position={[0, -1, 0]} />;
}

export default function TestModel() {
  const canvas = useMemo(() => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 1, 5] }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        {/* 🔹 Permite mover solo en horizontal */}
        <OrbitControls enableZoom={false}/>
      </Canvas>
    </div>
  ), []);

  return canvas;
}

useGLTF.preload("/models/coche2.glb");

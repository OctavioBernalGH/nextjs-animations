"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei"; // 🔹 Importamos `Html`
import { Suspense, useRef, useState, useEffect } from "react";

function Model({ setLoaded }) {
  const { scene } = useGLTF("/models/coche2.glb");

  const modelRef = useRef();

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= 0.005; // 🔄 Rotación automática
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -1, 0]} />;
}

export default function TestModel() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
      {/* 🔹 Modal de Carga */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          Cargando modelo...
        </div>
      )}

      <Canvas camera={{ position: [0, 1, 5] }} shadows style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Model setLoaded={setLoaded} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// 🔹 Precarga el modelo
useGLTF.preload("/models/coche2.glb");

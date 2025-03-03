"use client";

import Image from "next/image";
import TestScenne from "@/renders/TestScenne";
import { useGLTF } from "@react-three/drei";
import dynamic from "next/dynamic";


const TestModel = dynamic(() => import("@/renders/TestModel"), { ssr: true });

export default function Home() {
  return (
    <div className="">
      <main className="">
        <TestModel />
        <TestScenne></TestScenne>
      </main>
    </div>
  );
}

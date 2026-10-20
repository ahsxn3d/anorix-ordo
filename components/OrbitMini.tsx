"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import Lazy3D from "./kit/Lazy3D";
const CoreScene = dynamic(() => import("./CoreScene"), { ssr: false });
export default function OrbitMini({ stage = 1 }: { stage?: number }) {
  const p = useRef(stage);
  return <Lazy3D render={({ onReady, running }) => <CoreScene progress={p} running={running} onReady={onReady} />} />;
}

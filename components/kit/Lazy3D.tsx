"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

class Boundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function webglOK() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

/** Static poster is ALWAYS painted first; the canvas fades in over it once its first frame has rendered.
 *  If WebGL is missing / context lost / chunk fails, the poster simply stays. */
export default function Lazy3D({ poster, alt = "", render, className = "", priority = false, eager = false }: {
  poster: string; alt?: string; className?: string; priority?: boolean; eager?: boolean;
  render: (p: { onReady: () => void; running: boolean }) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);
  const [dead, setDead] = useState(false);
  useEffect(() => {
    if (!webglOK()) { setDead(true); return; }
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMount(true); setRunning(e.isIntersecting); }, { rootMargin: "150% 0px" });
    io.observe(el);
    let t = 0;
    if (eager) t = window.setTimeout(() => setMount(true), 1200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [eager]);
  useEffect(() => {
    if (!mount) return;
    const c = ref.current?.querySelector("canvas");
    if (!c) return;
    const lost = (e: Event) => { e.preventDefault(); setDead(true); };
    c.addEventListener("webglcontextlost", lost);
    return () => c.removeEventListener("webglcontextlost", lost);
  }, [mount, ready]);
  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      <Image src={poster} alt={alt} fill priority={priority} sizes="100vw" className={`object-cover transition-opacity duration-700 ${ready && !dead ? "opacity-0" : "opacity-100"}`} />
      {mount && !dead && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <Boundary onError={() => setDead(true)}>{render({ onReady: () => setReady(true), running })}</Boundary>
        </div>
      )}
    </div>
  );
}

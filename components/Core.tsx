"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CoreScene = dynamic(() => import("./CoreScene"), { ssr: false });

const chapters = [
  ["01", "Ingest", "Every signal, untangled.", "Ordo connects to CRM, billing, ERP and the warehouse, and turns thousands of loose events into one live model of your revenue."],
  ["02", "Reason", "One model of the business.", "Agents share a single, auditable graph of accounts, contracts and cash, so every decision traces back to a source row."],
  ["03", "Execute", "Agents that close the loop.", "Specialist agents work in orbit around that core: posting, chasing, forecasting and renewing, around the clock."],
];

export default function Core() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [mount, setMount] = useState(false);
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMount(true); setRunning(e.isIntersecting); }, { rootMargin: "60% 0px" });
    io.observe(el);
    const bar = el.querySelector<HTMLElement>(".core-bar");
    const st = ScrollTrigger.create({
      trigger: el, start: "top top", end: "bottom bottom", scrub: true,
      onUpdate: (s) => {
        progress.current = s.progress;
        const a = s.progress < 0.36 ? 0 : s.progress < 0.7 ? 1 : 2;
        setActive((p) => (p === a ? p : a));
        if (bar) bar.style.transform = `scaleX(${s.progress})`;
      },
    });
    return () => { io.disconnect(); st.kill(); };
  }, []);

  return (
    <section id="core" ref={root} className="relative z-0 h-[420vh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">{mount && <CoreScene progress={progress} running={running} />}</div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-ink)_92%)]" />
        <div className="wrap pointer-events-none relative flex h-full flex-col justify-between pb-8 pt-24 md:pb-12 md:pt-28">
          <div className="flex items-start justify-between">
            <p className="mono text-paper/55">02 — The core</p>
            <p className="mono hidden text-paper/60 md:block">Scroll to assemble</p>
          </div>
          <div className="grid grid-cols-4 items-end gap-4 md:grid-cols-12 md:gap-6">
            <div className="relative col-span-4 min-h-[230px] md:col-span-5 md:min-h-[260px]">
              {chapters.map(([n, k, h, p], i) => (
                <div key={n} className={`absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-[900ms] will-change-transform ease-[cubic-bezier(.16,1,.3,1)] ${active === i ? "translate-y-0 opacity-100" : active > i ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0"}`}>
                  <p className="mono mb-4 text-mint">{n} / {k}</p>
                  <h2 className="display text-[clamp(44px,6vw,96px)] text-paper">{h}</h2>
                  <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-paper/60 md:text-[16px]">{p}</p>
                </div>
              ))}
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <div className="flex gap-6">
                {chapters.map(([n, k], i) => (
                  <span key={n} className={`mono transition-colors duration-500 ${active >= i ? "text-paper" : "text-paper/45"}`}>{k}</span>
                ))}
              </div>
              <div className="mt-3 h-px w-full bg-white/15">
                <div className="core-bar h-px origin-left scale-x-0 bg-mint" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

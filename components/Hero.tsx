"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AgentConsole from "./AgentConsole";
import { Arrow } from "./Nav";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(inner.current, {
        scale: 0.92, yPercent: 8, opacity: 0.35, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".hero-console", { y: 60, autoAlpha: 0, rotateX: 18 }, { y: 0, autoAlpha: 1, rotateX: 0, duration: 1.6, delay: 0.5, ease: "expo.out" });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="top" ref={root} className="relative overflow-clip bg-ink pb-[clamp(80px,12vw,180px)] pt-[clamp(112px,11vw,160px)]">
      <div ref={inner} className="origin-top will-change-transform">
        <div aria-hidden className="hero-orb spin-slow pointer-events-none absolute will-change-transform -right-[18vw] top-[-12vw] h-[64vw] w-[64vw] rounded-full opacity-60" style={{ background: "conic-gradient(from 0deg, transparent 0 60%, rgba(124,255,196,.16) 75%, transparent 90%)", maskImage: "radial-gradient(circle, transparent 54%, #000 55%, #000 56%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, transparent 54%, #000 55%, #000 56%, transparent 70%)" }} />
        <div className="wrap relative grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6">
          <div className="col-span-4 md:col-span-7">
            <p className="mono mb-6 flex items-center gap-2 text-paper/55" data-fade data-immediate>
              <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Agent OS for web builders
            </p>
            <h1 className="display text-[clamp(56px,10.4vw,168px)] text-paper">
              {["One brief.", "A whole", "crew."].map((l, i) => (
                <span key={l} className="line-mask"><span className={`hero-line block ${i === 2 ? "text-mint" : ""}`} style={{ animationDelay: `${0.12 + i * 0.09}s` }}>{l}</span></span>
              ))}
            </h1>
            <p className="hero-soft mt-8 max-w-[440px] text-[17px] leading-relaxed text-paper/70">
              Helm is a layered agent OS for web designers and vibe-coders. Give it a mission and it plans, builds, checks and ships in a loop, stops for your approval where it matters, and keeps a kill switch one key away.
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-fade data-immediate data-delay="0.75">
              <a href="#demo" className="btn-mint">Join the early list <Arrow /></a>
              <a href="#core" className="btn-ghost text-paper">See the mission loop</a>
            </div>
          </div>
          <div className="col-span-4 mt-14 [perspective:1200px] md:col-span-5 md:mt-6">
            <div className="hero-console"><AgentConsole /></div>
          </div>
        </div>
        <div className="wrap mt-[clamp(56px,5vw,84px)]">
          <div className="grid grid-cols-2 gap-y-6 border-t border-white/10 pt-6 md:grid-cols-4" data-fade data-immediate data-delay="1">
            {[["5 layers", "from brief to ship"], ["Approvals", "on pushes, deploys, spend"], ["Kill switch", "one key halts every agent"], ["Receipts", "every step logged"]].map(([a, b]) => (
              <div key={b}>
                <p className="display text-[clamp(30px,3.2vw,46px)] text-paper" style={{ fontStretch: "80%" }}>{a}</p>
                <p className="mono mt-1 text-paper/60">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

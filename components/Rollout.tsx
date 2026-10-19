"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const phases = [
  { n: "01", k: "Shadow", w: "Weeks 1–2", h: "Watch first.", p: "Agents run silently beside your team, replaying real work and scoring themselves against every human decision.", stat: ["98.7%", "agreement before go-live"] },
  { n: "02", k: "Take over", w: "Weeks 3–6", h: "Then do.", p: "Workflows flip to autonomous one by one, with approvals where you want them and receipts on everything.", stat: ["71%", "of RevOps hours returned"] },
  { n: "03", k: "Compound", w: "Ongoing", h: "Get sharper.", p: "Every correction becomes training. The longer Ordo runs, the fewer exceptions it hands back.", stat: ["−8%", "exceptions, month over month"] },
];

function Diagram({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeOpacity=".22">
        {Array.from({ length: 9 }).map((_, k) => <line key={k} x1={k * 40} y1="0" x2={k * 40} y2="200" />)}
        {Array.from({ length: 6 }).map((_, k) => <line key={k} x1="0" y1={k * 40} x2="320" y2={k * 40} />)}
      </g>
      {i === 0 && (<g className="draw" fill="none" strokeWidth="2">
        <path d="M0 150 C 60 140, 90 70, 160 80 S 260 40, 320 50" stroke="currentColor" strokeOpacity=".5" strokeDasharray="5 6" />
        <path d="M0 155 C 60 145, 90 78, 160 86 S 260 48, 320 56" stroke="var(--color-mint)" pathLength={1} />
      </g>)}
      {i === 1 && (<g>
        {[0, 1, 2, 3, 4, 5, 6].map((k) => <rect key={k} className="bar" x={18 + k * 42} y={200 - (40 + k * 20)} width="24" height={40 + k * 20} rx="3" fill={k > 3 ? "var(--color-mint)" : "currentColor"} fillOpacity={k > 3 ? 1 : 0.25} />)}
      </g>)}
      {i === 2 && (<g className="draw" fill="none" strokeWidth="2">
        {[34, 58, 82].map((r, k) => <circle key={r} cx="160" cy="100" r={r} stroke={k === 2 ? "var(--color-mint)" : "currentColor"} strokeOpacity={k === 2 ? 1 : 0.4} pathLength={1} />)}
        <circle cx="160" cy="100" r="6" fill="var(--color-mint)" stroke="none" />
      </g>)}
    </svg>
  );
}

export default function Rollout() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true, anticipatePin: 1 } });
      t.querySelectorAll<HTMLElement>(".phase").forEach((card) => {
        gsap.fromTo(card, { rotateY: -14, z: -120, opacity: 0.35 }, { rotateY: 0, z: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 45%", scrub: true } });
        card.querySelectorAll<SVGGeometryElement>(".draw [pathLength]").forEach((p) => gsap.fromTo(p, { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 85%", end: "left 35%", scrub: true } }));
        const bars = card.querySelectorAll(".bar");
        if (bars.length) gsap.fromTo(bars, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, stagger: 0.06, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 85%", end: "left 35%", scrub: true } });
      });
    });
    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      track.current!.querySelectorAll<HTMLElement>(".phase").forEach((card) => {
        card.querySelectorAll<SVGGeometryElement>(".draw [pathLength]").forEach((p) => gsap.fromTo(p, { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 75%", once: true } }));
        const bars = card.querySelectorAll(".bar");
        if (bars.length) gsap.fromTo(bars, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, stagger: 0.06, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 75%", once: true } });
      });
    });
    return () => mm.revert();
  }, []);
  return (
    <section id="rollout" ref={root} className="relative z-10 overflow-hidden bg-ink text-paper">
      <div className="lg:flex lg:h-[100svh] lg:items-center">
        <div ref={track} className="flex flex-col gap-6 px-[clamp(16px,3.4vw,48px)] py-[clamp(88px,11vw,140px)] [perspective:1400px] lg:w-max lg:flex-row lg:items-stretch lg:gap-6 lg:py-0">
          <div className="flex flex-col justify-between lg:w-[38vw] lg:pr-10">
            <p className="mono text-paper/60">04 — The rollout</p>
            <h2 className="display mt-6 text-[clamp(52px,7.4vw,124px)]" data-reveal="lines">Shadow.<br />Take over.<br /><span className="text-mint">Compound.</span></h2>
            <p className="mt-8 max-w-[38ch] text-[16px] leading-relaxed text-paper/60" data-fade>No big-bang migration. Ordo earns autonomy one workflow at a time, on your data, with your rules.</p>
          </div>
          {phases.map((ph, i) => (
            <article key={ph.n} className="phase flex min-h-[520px] flex-col justify-between rounded-[28px] border border-white/10 bg-graphite p-7 [transform-style:preserve-3d] md:p-9 lg:h-[72vh] lg:w-[36vw]">
              <div className="flex items-center justify-between">
                <span className="mono text-mint">{ph.n} / {ph.k}</span>
                <span className="mono text-paper/60">{ph.w}</span>
              </div>
              <div className="my-8 text-paper"><Diagram i={i} /></div>
              <div>
                <h3 className="display text-[clamp(44px,4.6vw,76px)]">{ph.h}</h3>
                <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-paper/60">{ph.p}</p>
                <div className="mt-7 flex items-end justify-between border-t border-white/10 pt-5">
                  <span className="display text-[40px] text-paper" style={{ fontStretch: "80%" }}>{ph.stat[0]}</span>
                  <span className="mono max-w-[18ch] text-right text-paper/60">{ph.stat[1]}</span>
                </div>
              </div>
            </article>
          ))}
          <div className="hidden w-[8vw] lg:block" />
        </div>
      </div>
    </section>
  );
}

"use client";
import Mock from "./Mock";
import { useEffect, useRef } from "react";

const cases = [
  { img: "build", tone: "light", tag: "Build", h: "Figma to live page", p: "A frame and your tokens in, a typed, responsive page out, previewed locally." },
  { img: "fix", tone: "dark", tag: "Fix", h: "The fix-it run", p: "Describe the bug in a sentence. Helm finds the cause, patches it and proves it at every width." },
  { img: "audit", tone: "light", tag: "Audit", h: "The site audit", p: "Overlaps, contrast, broken hovers and slow frames, ranked and fixed one diff at a time." },
  { img: "missions", tone: "dark", tag: "Missions", h: "Overnight missions", p: "Queue a mission with a scope and a budget before bed. Wake up to receipts and a held push." },
];

export default function Library() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, id: -1, x: 0, s: 0 });
  const by = (d: number) => scroller.current?.scrollBy({ left: d * Math.min(560, window.innerWidth * 0.8), behavior: "smooth" });
  const end = () => {
    const el = scroller.current; if (!el || !drag.current.down) return;
    drag.current.down = false;
    if (el.hasPointerCapture(drag.current.id)) el.releasePointerCapture(drag.current.id);
    el.classList.remove("is-dragging");
  };
  useEffect(() => {
    const reset = () => end();
    window.addEventListener("blur", reset);
    return () => window.removeEventListener("blur", reset);
  }, []);
  return (
    <section id="library" className="sheet relative z-10 -mt-10 bg-paper text-ink">
      <div className="wrap pt-[clamp(88px,11vw,170px)]">
        <div className="grid grid-cols-4 items-end gap-4 md:grid-cols-12 md:gap-6">
          <div className="col-span-4 md:col-span-8">
            <p className="mono mb-8 text-stone">05 — Use cases</p>
            <h2 className="display text-[clamp(48px,6.6vw,108px)]" data-reveal="lines">Start with<br />one mission.</h2>
          </div>
          <div className="col-span-4 flex gap-2 md:col-span-4 md:justify-end">
            <button aria-label="Previous" onClick={() => by(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper">←</button>
            <button aria-label="Next" onClick={() => by(1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper">→</button>
          </div>
        </div>
      </div>
      <div
        ref={scroller}
        className="lib-scroller mt-12 flex cursor-grab snap-x snap-mandatory scroll-px-[clamp(16px,3.4vw,48px)] gap-4 overflow-x-auto px-[clamp(16px,3.4vw,48px)] pb-[clamp(88px,11vw,170px)] select-none [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || e.button !== 0) return;
          const el = scroller.current!;
          drag.current = { down: true, id: e.pointerId, x: e.clientX, s: el.scrollLeft };
          el.setPointerCapture(e.pointerId);
          el.classList.add("is-dragging");
        }}
        onPointerMove={(e) => { if (!drag.current.down) return; scroller.current!.scrollLeft = drag.current.s - (e.clientX - drag.current.x); }}
        onPointerUp={end}
        onPointerCancel={end}
        onLostPointerCapture={end}
      >
        {cases.map((c, i) => (
          <article key={c.h} className="group w-[82vw] shrink-0 snap-start sm:w-[56vw] lg:w-[34vw]">
            <div data-clip className={`relative aspect-[4/3] overflow-hidden rounded-[20px] ${c.tone === "dark" ? "bg-graphite" : "bg-[#e2dfd8]"}`}>
              <div className="lib-zoom absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)]">
                <Mock kind={c.img} dark={c.tone === "dark"} />
              </div>
              <span className={`mono absolute left-4 top-4 rounded-full px-3 py-1.5 backdrop-blur ${c.tone === "dark" ? "bg-white/10 text-paper" : "bg-ink/5 text-ink"}`}>{c.tag}</span>
              <span className="mono absolute right-4 top-4 text-[11px] opacity-50" style={{ color: c.tone === "dark" ? "var(--color-paper)" : "var(--color-ink)" }}>0{i + 1}</span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h3 className="display text-[clamp(30px,2.6vw,42px)]" style={{ fontStretch: "78%" }}>{c.h}</h3>
                <p className="mt-2 max-w-[36ch] text-[15px] leading-relaxed text-ink/60">{c.p}</p>
              </div>
              <a href="/features" aria-label="See the layers" className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 lib-arrow">↗</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

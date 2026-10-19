"use client";
import Image from "next/image";
import { useRef } from "react";

const cases = [
  { img: "pipeline", tone: "light", tag: "Pipeline", h: "Self-healing CRM", p: "Stages, amounts and dates that fix themselves overnight." },
  { img: "billing", tone: "dark", tag: "Billing", h: "Contract-to-cash", p: "Signed PDF in, correct invoice out, ledger balanced." },
  { img: "forecast", tone: "light", tag: "Forecast", h: "The 6 a.m. number", p: "A bottom-up forecast rebuilt from signals every morning." },
  { img: "renewals", tone: "dark", tag: "Renewals", h: "Churn, caught early", p: "Fading usage flagged 90 days out with the save play drafted." },
];

export default function Library() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, s: 0, moved: false });
  const by = (d: number) => scroller.current?.scrollBy({ left: d * Math.min(560, window.innerWidth * 0.8), behavior: "smooth" });
  return (
    <section id="library" className="sheet relative z-10 -mt-10 bg-paper text-ink">
      <div className="wrap pt-[clamp(88px,11vw,170px)]">
        <div className="grid grid-cols-4 items-end gap-4 md:grid-cols-12 md:gap-6">
          <div className="col-span-4 md:col-span-8">
            <p className="mono mb-8 text-stone">05 — Use-case library</p>
            <h2 className="display text-[clamp(48px,6.6vw,108px)]" data-reveal="lines">Start with<br />one workflow.</h2>
          </div>
          <div className="col-span-4 flex gap-2 md:col-span-4 md:justify-end">
            <button aria-label="Previous" onClick={() => by(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper">←</button>
            <button aria-label="Next" onClick={() => by(1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper">→</button>
          </div>
        </div>
      </div>
      <div
        ref={scroller}
        data-lenis-prevent-wheel
        className="mt-12 flex cursor-grab snap-x snap-mandatory scroll-px-[clamp(16px,3.4vw,48px)] gap-4 overflow-x-auto scroll-smooth px-[clamp(16px,3.4vw,48px)] pb-[clamp(88px,11vw,170px)] [scrollbar-width:none] active:cursor-grabbing md:gap-6 [&::-webkit-scrollbar]:hidden"
        onPointerDown={(e) => { if (e.pointerType !== "mouse") return; drag.current = { down: true, x: e.clientX, s: scroller.current!.scrollLeft, moved: false }; scroller.current!.style.scrollSnapType = "none"; scroller.current!.style.scrollBehavior = "auto"; }}
        onPointerMove={(e) => { if (!drag.current.down) return; const dx = e.clientX - drag.current.x; if (Math.abs(dx) > 4) drag.current.moved = true; scroller.current!.scrollLeft = drag.current.s - dx; }}
        onPointerUp={() => { drag.current.down = false; scroller.current!.style.scrollSnapType = ""; scroller.current!.style.scrollBehavior = ""; }}
        onPointerLeave={() => { if (drag.current.down) { drag.current.down = false; scroller.current!.style.scrollSnapType = ""; scroller.current!.style.scrollBehavior = ""; } }}
      >
        {cases.map((c, i) => (
          <article key={c.h} className="group w-[82vw] shrink-0 snap-start sm:w-[56vw] lg:w-[34vw]">
            <div data-clip className={`relative aspect-[4/3] overflow-hidden rounded-[20px] ${c.tone === "dark" ? "bg-graphite" : "bg-[#e2dfd8]"}`}>
              <Image src={`/img/${c.img}.webp`} alt="" fill sizes="(min-width:1024px) 34vw, (min-width:640px) 56vw, 82vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" draggable={false} />
              <span className={`mono absolute left-4 top-4 rounded-full px-3 py-1.5 backdrop-blur ${c.tone === "dark" ? "bg-white/10 text-paper" : "bg-ink/5 text-ink"}`}>{c.tag}</span>
              <span className="mono absolute right-4 top-4 text-[11px] opacity-50" style={{ color: c.tone === "dark" ? "var(--color-paper)" : "var(--color-ink)" }}>0{i + 1}</span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h3 className="display text-[clamp(30px,2.6vw,42px)]" style={{ fontStretch: "78%" }}>{c.h}</h3>
                <p className="mt-2 max-w-[36ch] text-[15px] leading-relaxed text-ink/60">{c.p}</p>
              </div>
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:rotate-45">↗</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

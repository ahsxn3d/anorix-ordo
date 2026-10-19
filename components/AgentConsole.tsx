"use client";
import { useEffect, useRef, useState } from "react";

const runs = [
  {
    id: "014", task: "Build a landing page from this Figma frame, match our tokens, and open a local preview.",
    steps: [
      ["Plan", "Brief parsed · 1 page, 6 sections, 2 new components"],
      ["Read", "Figma frame, tokens.css, repo structure"],
      ["Build", "6 components written · build passes"],
      ["Check", "Critic + browser QA at 1440 / 1024 / 768 / 390"],
      ["Ask", "Preview ready · push held for your approval"],
    ],
    result: ["Ready", "waiting on your approval"],
  },
  {
    id: "015", task: "Fix the mobile nav overlapping the pricing cards and get it ready for staging.",
    steps: [
      ["Plan", "Scope: /pricing at 390–768 px only"],
      ["Read", "DOM snapshot, CSS, last 3 commits"],
      ["Build", "Root cause: header z-index · 2-line patch"],
      ["Check", "No overlap at 4 widths · 0 console errors"],
      ["Ask", "Commit prepared · staging push needs you"],
    ],
    result: ["2 lines", "changed, nothing else touched"],
  },
];

export default function AgentConsole() {
  const [run, setRun] = useState(0);
  const [step, setStep] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (box.current) io.observe(box.current);
    let s = -1, r = 0;
    const id = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      s++;
      if (s > 7) { s = -1; r = (r + 1) % runs.length; setRun(r); }
      setStep(s);
    }, 900);
    return () => { clearInterval(id); io.disconnect(); };
  }, []);
  const R = runs[run];
  const done = step >= 5;
  return (
    <div ref={box} className="relative w-full overflow-hidden rounded-[22px] border border-white/10 bg-graphite shadow-[0_40px_120px_-40px_rgba(124,255,196,0.18)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-mint pulse-dot" />
          <span className="mono text-paper/70">helm / mission #{R.id}</span>
        </div>
        <span className="mono text-paper/60">live</span>
      </div>
      <div className="px-5 pb-5 pt-4">
        <p className="mono mb-2 text-paper/60">Request</p>
        <p className="min-h-[3em] text-[15px] leading-snug text-paper/90">{R.task}</p>
        <ol className="mt-5 space-y-1.5">
          {R.steps.map(([name, detail], i) => {
            const state = step > i ? "done" : step === i ? "active" : "idle";
            return (
              <li key={name + R.id} className={`flex h-[50px] items-center gap-3 rounded-xl px-3 transition-[background-color] duration-500 ${state === "active" ? "bg-white/[0.06]" : ""}`}>
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all duration-500 ${state === "done" ? "border-mint bg-mint text-ink" : state === "active" ? "border-mint" : "border-white/15"}`}>
                  {state === "done" ? <svg viewBox="0 0 12 12" className="h-2.5 w-2.5"><path d="m2.5 6.2 2.2 2.2 4.8-4.8" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg> : state === "active" ? <span className="h-1.5 w-1.5 rounded-full bg-mint pulse-dot" /> : null}
                </span>
                <span className={`mono w-[64px] shrink-0 ${state === "idle" ? "text-paper/50" : "text-paper/80"}`}>{name}</span>
                <span className={`line-clamp-2 min-w-0 flex-1 text-[12.5px] leading-[1.35] transition-[transform,color] duration-500 ${state === "idle" ? "translate-x-1 text-paper/0" : "text-paper/60"}`}>{detail}</span>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-mint transition-[width] duration-700 ease-out" style={{ width: `${Math.max(0, Math.min(5, step + 1)) * 20}%` }} />
        </div>
        <div className={`mt-4 flex items-end justify-between transition-all duration-700 ${done ? "opacity-100" : "translate-y-2 opacity-0"}`}>
          <div>
            <p className="display text-[40px] text-mint" style={{ fontStretch: "80%" }}>{R.result[0]}</p>
            <p className="text-[13px] text-paper/55">{R.result[1]}</p>
          </div>
          <span className="mono rounded-full border border-mint/40 px-3 py-1.5 text-mint">Checked</span>
        </div>
      </div>
    </div>
  );
}

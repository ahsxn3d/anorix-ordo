"use client";
import { useEffect, useRef, useState } from "react";

const agents = [
  { k: "Planner", d: "Breaks a brief into steps with scope, approvals and a definition of done, and keeps the mission on course as it changes.",
    rows: [["Brief: portfolio v2", "Mission drafted", "7 steps · 3 approvals", "ok"], ["Scope", "Files locked", "app/ · components/", "ok"], ["Unclear copy", "Question for you", "Hero headline", "flag"], ["Done means", "Defined", "4 widths · 0 errors", "ok"]] },
  { k: "Builder", d: "Writes and edits code in your repo, with your stack and your design tokens, in small diffs you can actually read.",
    rows: [["Hero.tsx", "Created", "+84 lines", "ok"], ["tokens.css", "Reused", "No new colours", "ok"], ["Pricing grid", "Refactored", "3 files", "ok"], ["New dependency", "Wants gsap", "Approval needed", "flag"]] },
  { k: "Critic", d: "Reviews every diff against the brief, the design and your house rules before anything reaches QA.",
    rows: [["Hero.tsx", "Low contrast", "Raised to 4.6:1", "ok"], ["Nav", "Duplicate links", "Removed", "ok"], ["Copy", "Claim not in brief", "Sent back", "flag"], ["Diff 12", "Approved", "Clean", "ok"]] },
  { k: "QA", d: "Drives a real browser at 1440, 1024, 768 and 390: overlaps, console errors, hover states and frame rate, with screenshots attached.",
    rows: [["/ at 390 px", "Overlap", "CTA under nav", "flag"], ["/ at 1440 px", "Passed", "0 console errors", "ok"], ["Hover states", "Passed", "12 checked", "ok"], ["Scroll", "Passed", "Trace saved", "ok"]] },
  { k: "Shipper", d: "Prepares commits, previews and deploys, and holds every outward step until you say go.",
    rows: [["Commit", "Prepared", "feat: pricing grid", "ok"], ["Preview", "Running", "localhost:3010", "ok"], ["git push", "Held", "Waiting for you", "flag"], ["Deploy", "Not requested", "Off by default", "ok"]] },
];

export default function Agents() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    const t = window.setInterval(() => { if (inView.current && !paused) setI((v) => (v + 1) % agents.length); }, 4200);
    return () => { clearInterval(t); io.disconnect(); };
  }, [paused]);
  useEffect(() => {
    const unpause = () => setPaused(false);
    window.addEventListener("scroll", unpause, { passive: true });
    return () => window.removeEventListener("scroll", unpause);
  }, []);
  const A = agents[i];
  return (
    <section id="agents" ref={ref} className="sheet relative z-10 -mt-10 bg-bone text-ink">
      <div className="wrap py-[clamp(88px,11vw,170px)]">
        <div className="grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
          <p className="mono col-span-4 text-stone md:col-span-3">03 — The layers</p>
          <h2 className="display col-span-4 text-[clamp(48px,6.6vw,108px)] md:col-span-9" data-reveal="lines">Five layers.<br />One mission.</h2>
        </div>
        <div className="mt-[clamp(56px,7vw,110px)] grid grid-cols-4 gap-10 lg:grid-cols-12 lg:gap-6" onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)} onPointerLeave={() => setPaused(false)} onPointerCancel={() => setPaused(false)}>
          <div role="tablist" aria-label="Agents" className="col-span-4 lg:col-span-6">
            {agents.map((a, k) => (
              <button key={a.k} role="tab" aria-selected={k === i} onClick={() => setI(k)}
                className="group relative flex w-full items-center justify-between border-t border-ink/12 py-3 text-left md:py-4">
                <span className={`display text-[clamp(40px,5.6vw,92px)] transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${k === i ? "translate-x-0 text-ink" : "text-ink/35 group-hover:translate-x-2 group-hover:text-ink/45"}`}>{a.k}</span>
                <span className={`mono transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}>0{k + 1}</span>
                {k === i && !paused && <span key={i} className="absolute bottom-0 left-0 h-px w-full origin-left bg-ink" style={{ animation: "grow 4.2s linear forwards" }} />}
              </button>
            ))}
          </div>
          <div className="col-span-4 lg:col-span-6 lg:pl-6">
            <div className="lg:sticky lg:top-28">
              <p key={A.k + "d"} className="min-h-[calc(17px*1.625*3)] max-w-[46ch] text-[17px] leading-relaxed text-ink/70" style={{ animation: "rise .8s cubic-bezier(.16,1,.3,1) both" }}>{A.d}</p>
              <div className="mt-8 overflow-hidden rounded-[22px] bg-ink text-paper shadow-[0_40px_80px_-40px_rgba(12,13,15,.5)]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                  <span className="mono text-paper/60">{A.k.toLowerCase()}-layer · mission 014</span>
                  <span className="mono flex items-center gap-2 text-mint"><span className="h-1.5 w-1.5 rounded-full bg-mint pulse-dot" />running</span>
                </div>
                <ul>
                  {A.rows.map((r, k) => (
                    <li key={A.k + r[0]} className="grid h-[58px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-white/[0.07] px-5 last:border-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
                      style={{ animation: `rise .7s cubic-bezier(.16,1,.3,1) ${k * 0.07}s both` }}>
                      <span className="truncate text-[14px] text-paper/90">{r[0]}</span>
                      <span className="hidden truncate text-[13px] text-paper/50 md:block lg:hidden xl:block">{r[1]}</span>
                      <span className="hidden truncate font-mono text-[12px] text-paper/70 md:block">{r[2]}</span>
                      <span className={`mono rounded-full px-2.5 py-1 ${r[3] === "ok" ? "bg-mint/10 text-mint" : "bg-[#ffb86b]/10 text-[#ffb86b]"}`}>{r[3] === "ok" ? "Done" : "Needs you"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

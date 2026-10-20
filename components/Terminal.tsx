"use client";
import { useEffect, useRef, useState } from "react";
import { layers, docs } from "@/lib/data";

type L = { t: string; h?: string; c?: string };
const status: L[] = [
  { t: "$ helm status", c: "text-paper" },
  { t: "mission 12  ·  pricing page      step 6/7   waiting for approval", c: "text-paper/70" },
  { t: "mission 13  ·  nav overlap 390px  step 3/5   qa running", c: "text-paper/70" },
  { t: "mission 14  ·  overnight audit    queued     23:00", c: "text-paper/70" },
  { t: "kill switch: ARMED  ·  deploys: off  ·  pushes: held", c: "text-mint" },
  { t: "", c: "" },
  { t: "$ tree helm.site", c: "text-paper" },
];
const tree: L[] = [
  { t: "helm.site/", h: "/" },
  { t: "├── features/", h: "/features" }, ...layers.map((l, i) => ({ t: `│   ${i === layers.length - 1 ? "└" : "├"}── ${l.slug}`, h: `/features/${l.slug}` })),
  { t: "├── docs/", h: "/docs" }, ...docs.map((d, i) => ({ t: `│   ${i === docs.length - 1 ? "└" : "├"}── ${d.slug}.md`, h: `/docs/${d.slug}` })),
  { t: "├── pricing", h: "/pricing" }, { t: "├── changelog", h: "/changelog" }, { t: "├── cart", h: "/cart" },
  { t: "├── about", h: "/about" }, { t: "├── faq", h: "/faq" }, { t: "└── contact", h: "/contact" },
];
export default function Terminal() {
  const all = [...status, ...tree], root = useRef<HTMLDivElement>(null), [n, setN] = useState(0), [ch, setCh] = useState(0), [kill, setKill] = useState(false);
  useEffect(() => {
    let started = false, t = 0;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(all.length); return; } tick(); } }, { threshold: .25 });
    let line = 0, c = 0;
    const tick = () => { const cur = all[line]; if (!cur) return; const typed = cur.t.startsWith("$"); if (typed && c < cur.t.length) { c++; setCh(c); t = window.setTimeout(tick, 38); return; } line++; c = 0; setN(line); setCh(0); t = window.setTimeout(tick, typed ? 260 : 70); };
    io.observe(root.current!); return () => { io.disconnect(); clearTimeout(t); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const cur = all[n];
  return (
    <footer className="relative z-10 bg-ink text-paper">
      <div className="wrap py-[clamp(64px,8vw,120px)]">
        <div ref={root} className="overflow-hidden rounded-[14px] border border-white/10 bg-[#08090a] shadow-[0_40px_120px_-40px_rgba(124,255,196,.18)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" /><span className="mono ml-3 text-paper/45">helm — zsh — 120×32</span></div>
          <div className="grid gap-10 p-5 md:grid-cols-12 md:p-8">
            <pre className="mono min-h-[520px] overflow-x-auto whitespace-pre text-[12.5px] leading-[1.75] md:col-span-8 md:text-[13.5px]">
              {all.slice(0, n).map((l, i) => l.h ? <a key={i} href={l.h} className="block w-fit text-paper/80 hover:bg-mint hover:text-ink">{l.t}</a> : <span key={i} className={`block ${l.c}`}>{l.t || " "}</span>)}
              {cur && cur.t.startsWith("$") && <span className="block text-paper">{cur.t.slice(0, ch)}<span className="caret">▋</span></span>}
              {!cur && <span className="block text-paper">$ <span className="caret">▋</span></span>}
            </pre>
            <div className="flex flex-col justify-between gap-8 md:col-span-4 md:border-l md:border-white/10 md:pl-8">
              <div><p className="mono text-paper/45">Kill switch</p>
                <button role="switch" aria-checked={kill} onClick={() => setKill(!kill)} className={`mt-4 flex h-[64px] w-[132px] items-center rounded-full p-1.5 transition-colors duration-500 ${kill ? "bg-[#ff5f57]" : "bg-mint"}`}><span className={`grid h-[52px] w-[52px] place-items-center rounded-full bg-ink text-[11px] font-semibold transition-transform duration-500 ${kill ? "translate-x-[68px] text-[#ff5f57]" : "text-mint"}`}>{kill ? "STOP" : "ARMED"}</span></button>
                <p className="mt-4 text-[14px] leading-relaxed text-paper/60">{kill ? "Every agent stopped. Stop report written. That's how fast it is in Helm." : "One key stops every agent, running or queued. Try it."}</p></div>
              <div><p className="display text-[clamp(40px,4vw,64px)]">Take the helm.</p><a href="/pricing" className="btn-mint mt-5">See plans →</a></div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-3 text-paper/50 md:flex-row"><span className="mono">© 2026 Helm by Anorix. Concept site; checkout is a demo.</span><span className="mono">exit 0</span></div>
      </div>
    </footer>
  );
}

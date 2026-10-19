"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const stats = [
  { v: 71, s: "%", l: "of RevOps hours handed back to the team" },
  { v: 4.2, s: "×", l: "faster month-end close, from 9 days to 2" },
  { v: 38, s: "M", pre: "$", l: "in leaked revenue recovered across customers" },
  { v: 0, s: "", l: "migrations. Ordo works on the stack you have", text: "Zero" },
];
const stack = ["Salesforce", "HubSpot", "Stripe", "NetSuite", "Snowflake", "Chargebee", "QuickBooks", "Slack", "Gong", "BigQuery", "Zuora", "Xero"];

export default function Proof() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count); const dec = end % 1 ? 1 : 0; const o = { v: 0 };
        gsap.to(o, { v: end, duration: 2.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true }, onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
      });
      gsap.fromTo(".proof-line", { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, ease: "power2.out", scrollTrigger: { trigger: ".proof-line", start: "top 85%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative z-10 bg-ink text-paper">
      <div className="wrap py-[clamp(88px,11vw,170px)]">
        <p className="mono mb-10 text-paper/60">06 — Proof</p>
        <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.l} className={`border-b border-white/10 py-8 sm:px-6 lg:border-b-0 ${i > 0 ? "lg:border-l" : "lg:pl-0"} ${i % 2 ? "sm:border-l" : "sm:pl-0"}`} data-fade data-delay={i * 0.08}>
              <p className="display text-[clamp(72px,8vw,136px)]" style={{ fontStretch: "70%" }}>
                {s.pre}{s.text ? s.text : <span data-count={s.v}>0</span>}<span className="text-mint">{s.s}</span>
              </p>
              <p className="mt-3 max-w-[26ch] text-[15px] leading-relaxed text-paper/55">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12" data-fade>
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-graphite p-6 lg:col-span-8 md:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-paper/60">Recovered revenue · trailing 12 months</span>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-mint"><span className="h-1.5 w-1.5 rounded-full bg-mint pulse-dot" />live</span>
            </div>
            <svg viewBox="0 0 800 260" className="mt-6 h-auto w-full" aria-hidden="true">
              <defs><linearGradient id="pf" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7cffc4" stopOpacity=".35" /><stop offset="1" stopColor="#7cffc4" stopOpacity="0" /></linearGradient></defs>
              {[0, 1, 2, 3].map((k) => <line key={k} x1="0" x2="800" y1={40 + k * 60} y2={40 + k * 60} stroke="#eceae4" strokeOpacity=".08" />)}
              <path d="M0 230 C 80 220 120 200 180 196 S 300 150 360 140 S 480 120 540 90 S 680 50 800 30 L800 260 L0 260Z" fill="url(#pf)" />
              <path className="proof-line" d="M0 230 C 80 220 120 200 180 196 S 300 150 360 140 S 480 120 540 90 S 680 50 800 30" fill="none" stroke="#7cffc4" strokeWidth="2.5" pathLength={1} />
              <path d="M0 240 C 100 236 200 230 300 224 S 500 214 800 200" fill="none" stroke="#eceae4" strokeOpacity=".35" strokeDasharray="4 6" />
              <circle cx="800" cy="30" r="6" fill="#7cffc4" />
            </svg>
            <div className="mt-4 flex justify-between font-mono text-[11px] text-paper/50">{["Nov", "Jan", "Mar", "May", "Jul", "Sep"].map((m) => <span key={m}>{m}</span>)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1">
            {[["Exceptions", "−63%", 38], ["Hours back / wk", "212", 82], ["Days to close", "2.1", 24]].map(([l, v, w]) => (
              <div key={l as string} className="rounded-[24px] border border-white/10 bg-graphite p-5 last:col-span-2 lg:last:col-span-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-paper/60">{l}</p>
                <p className="display mt-3 text-[44px]" style={{ fontStretch: "78%" }}>{v}</p>
                <div className="mt-3 h-1 rounded-full bg-white/10"><div className="h-1 rounded-full bg-mint" style={{ width: `${w}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[clamp(80px,9vw,140px)] grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
          <h2 className="display col-span-4 text-[clamp(40px,4.6vw,76px)] md:col-span-5" data-reveal="lines">Reads from<br />your stack.<br />Writes back.</h2>
          <ul className="col-span-4 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 sm:grid-cols-3 md:col-span-7 md:grid-cols-4">
            {stack.map((n) => (
              <li key={n} className="flex h-[86px] items-center justify-center bg-ink text-[15px] font-medium tracking-tight text-paper/55 transition-colors duration-300 hover:bg-graphite hover:text-mint md:h-[104px]">{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
